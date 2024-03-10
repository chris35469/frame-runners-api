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
        state = JSON.parse(decodeURIComponent(message.state?.serialized));
    } catch (e) {
        //console.error(e);
    }

    let raceInfo = await getData('game-state')

    if (!isValid) {
        return new NextResponse("Message not valid", { status: 500 });
    }

    let text = message.interactor.verified_accounts[0] || '';
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
    /*
    let fb = fbManager.getPlayerInfo()
    console.log("fb", fb)
    */

    //let user_path = `players/${fid}`
    //let playerInfo = await getData(user_path)

    /*
    if (playerInfo == null) {
        user_info.joined = Date.now()
        setData(user_path, user_info)
    }
    */

    text = `${fid} - ${user_info.username}`

    text = `${text} - ${state?.page}`

    let page = state?.page

    let { isRacing, raceState } = raceInfo

    /*
    console.log(state?.page)
    let image = ""
    switch (state?.page) {
        case FrameState.Betting:
            image = `${NEXT_PUBLIC_URL}/bet.png`
            return getBetFrame("", "", image, state)
        case FrameState.Adopting:
            image = `${NEXT_PUBLIC_URL}/home.png`
            return getBetFrame("", "", image, state)
        default:
            break;
    }

    image = `${NEXT_PUBLIC_URL}/waiting.png`
    return getBetFrame("", "", image, state)
    */

    let image = ""

    // After First page check race state

    switch (raceState) {
        case "0":
            let playerInfo = await fbManager.isPlayerBetting()
            console.log(playerInfo)

            if (playerInfo != null) {
                //console.log("player betted.")
                image = `${NEXT_PUBLIC_URL}/waiting.png`
                let horse = horses[playerInfo.bet]
                return getWaitingFrame(horse, image)
            } else {
                if (page == FrameState.Betting) {
                    bet(fbManager, message)
                    // Send to page telling player what there current bet is
                }
            }
            image = `${NEXT_PUBLIC_URL}/bet.png`
            return getBetFrame(image, state)
        case "1":
            image = `${NEXT_PUBLIC_URL}/waiting.png`
            return getBetFrame(image, state)
        case "2":
            return getWaitingFrame(state, raceInfo, text)
        case "3":
            image = `${NEXT_PUBLIC_URL}/bet.png`
            return getBetFrame(image, state)
        default:
            break;
    }

    //return getBetFrame(state, raceInfo, text)
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
