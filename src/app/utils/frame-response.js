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
                text: 'Select a Horse Number (1-10)',
            },
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: Date.now(),
            }
        }),
    );
}

export const getRacingFrame = (state, raceInfo) => {
    let { isRacing, raceState } = raceInfo
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${NEXT_PUBLIC_URL}/racing.png`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `update`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: Date.now(),
            }
        }),
    );
}

export const getWaitingFrame = (state, raceInfo, text) => {
    let { isRacing, raceState } = raceInfo
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${NEXT_PUBLIC_URL}/waiting.png`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `update - ${text}`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: Date.now(),
            }
        }),
    );
}


