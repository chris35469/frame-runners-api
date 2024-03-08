import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, API_URL } from '../../config';
import { getData } from '../../utils/firebase'
import { getBetFrame, getRacingFrame } from '../../utils/frame-response'
//const API_URL = "https://zizzamia.xyz"

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT', allowFramegear: true });

    let raceInfo = await getData()

    if (!isValid) {
        return new NextResponse("Message not valid", { status: 500 });
    }

    let text = message.input || '';
    let state = {
        page: 0,
        time: Date.now(),
        _state: "",
    };

    try {
        state = JSON.parse(decodeURIComponent(message.state?.serialized));
        console.log(state)
    } catch (e) {
        console.log("error parsing")
    }

    text = `${text} - ${state?.page}`

    let { isRacing, raceState } = raceInfo

    // After First page check race state
    switch (raceState) {
        case 0:
            return getBetFrame(state, raceInfo, text)
        case 1:
            return getRacingFrame(state, raceInfo)
        default:
            break;
    }

    return getBetFrame(state, raceInfo, text)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'auto';
