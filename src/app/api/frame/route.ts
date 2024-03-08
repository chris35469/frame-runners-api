import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, API_URL } from '../../config';
import { getData } from '../../utils/firebase'
import { getBetFrame } from '../../utils/frame-response'
//const API_URL = "https://zizzamia.xyz"

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT', allowFramegear: true });

    let raceInfo = await getData()

    if (!isValid) {
        return new NextResponse("Message not valid", { status: 500 });
    }

    const text = message.input || '';
    let state = {
        page: 0,
        time: Date.now()
    };

    try {
        state = JSON.parse(decodeURIComponent(message.state?.serialized));
        console.log(state)
    } catch (e) {
        console.log("error parsing")
    }

    return getBetFrame(state, raceInfo, text)
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'auto';
