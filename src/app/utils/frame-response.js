import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL, API_URL } from '../config';

export const getBetFrame = (state, raceInfo, text) => {
    let { isRacing, raceState } = raceInfo
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${NEXT_PUBLIC_URL}/bet.png`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `👁️ ${isRacing} - ${raceState}`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                },
                {
                    label: `${text}`,
                },
            ],
            input: {
                text: 'What is the password?',
            },
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: Date.now(),
            }
        }),
    );
}
