import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, API_URL, FrameState, horses } from '../../config';
import { getData, setData } from '../../utils/firebase'
import { FBManager } from '../../utils/FBManager'
import { getBetFrame, getRacingFrame, getWaitingFrame } from '../../utils/frame-response'
const sdk = require('api')('@neynar/v2.0#2rxv131ltj1id4t');

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT', allowFramegear: true });

    let state = {
        page: 0,
        time: Date.now(),
        _state: "",
    };

    try {
        if (message) state = JSON.parse(decodeURIComponent(message.state?.serialized));
    } catch (e) {
        //console.error(e);
    }

    let raceInfo = await getData('game-state')

    if (!isValid) {
        return new NextResponse("Message not valid", { status: 500 });
    }

    //let text = message.interactor.verified_accounts[0] || '';
    let fid = message.interactor.fid

    let user_info = await sdk.userBulk({ fids: fid, api_key: process.env.neynar_api })
        .then((res: any) => {
            let { username, display_name, pfp_url, fid } = res.data.users[0]
            return { username, display_name, pfp_url, fid }
        })
        .catch((err: any) => console.error(err));
    user_info.points = 0
    user_info.address = message.interactor.verified_accounts[0] || ''

    // Check if player in fb
    let fbManager = new FBManager(user_info)
    fbManager.init()

    let page = state?.page

    let { raceState } = raceInfo
    let playerInfo = await fbManager.isPlayerBetting()

    // After First page check race state
    console.log(raceInfo, page)
    switch (raceState) {
        case "0": // Betting Open
            let waitingImage = `${NEXT_PUBLIC_URL}/waiting.png`
            if (playerInfo != null) { //Player already placed a bet
                //image = `${NEXT_PUBLIC_URL}/waiting.png`
                let horse = horses[playerInfo.bet - 1]
                return getWaitingFrame(horse, playerInfo.bet, waitingImage)
            } else { // Player did not bet
                if (page == FrameState.Betting) {
                    bet(fbManager, message)
                    let _input = parseInt(message.input)
                    let horse = horses[_input - 1]
                    return getWaitingFrame(horse, _input, waitingImage)
                } else if (page == FrameState.Init) {
                    return getBetFrame(`${NEXT_PUBLIC_URL}/bet.png`, state)
                }
            }

            break
        case "1": // Racing
            let raceStandings = await fbManager.getRaceStandings()
            //console.log("raceStandings", raceStandings)
            let image = `${NEXT_PUBLIC_URL}/racing.png`
            if (playerInfo != null) { //Player placed a bet
                let horse = horses[playerInfo.bet - 1]
                return getRacingFrame(horse, playerInfo.bet, image, raceStandings)
            } else { //Player did not place a bet
                return getRacingFrame("", null, image, raceStandings)
            }
        case "2":
            //return getWaitingFrame(state, raceInfo, text)
            break
        case "3":
            image = `${NEXT_PUBLIC_URL}/bet.png`
            return getBetFrame(image, state)
        default:
            console.log("reached default state of switch statement")
            break;
    }

    return getBetFrame(`${NEXT_PUBLIC_URL}/home.png`, state)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

function bet(fbManager: FBManager, message: any) {
    let _input = parseInt(message.input)
    let valid = _input >= 0 && _input <= 10
    if (valid) {
        fbManager.storeBet(_input)
    }
}

export const dynamic = 'auto';
