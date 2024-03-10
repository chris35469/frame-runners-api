import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL, API_URL, FrameState } from '../config';

export const getRacingFrame = (selectedHorse, horseID, image) => {
    const searchParams = new URLSearchParams({ racingSelectedHorse: selectedHorse, racingSelectedHorseID: horseID, image })
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${API_URL}/api/og?${searchParams}`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `Update`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: FrameState.Betting,
                time: Date.now(),
            }
        })
    )
}

export const getBetFrame = (image, state) => {
    const searchParams = new URLSearchParams({ image })
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${API_URL}/api/og?${searchParams}`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `Bet ${state?.page}`,
                },
            ],
            input: {
                text: 'Select a Horse Number (1-10)',
            },
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: FrameState.Betting,
                time: Date.now(),
            }
        })
    )
}


export const getWaitingFrame = (selectedHorse, horseID, image) => {
    const searchParams = new URLSearchParams({ selectedHorse, horseID, image })
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${API_URL}/api/og?${searchParams}`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `Update`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: FrameState.Betting,
                time: Date.now(),
            }
        })
    )
}


/*
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
                    label: `${text}`,
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: 0,
                time: Date.now(),
            }
        }),
    );
}*/

/*
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
}*/
