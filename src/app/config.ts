// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
//export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3000/runners' : 'https://w3bbie.xyz/runners';
//export const API_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3001' : 'https://framerunnner.netlify.app';

// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'https://637d-2600-1700-9cc0-3ab0-4898-f7f9-6af3-aa8.ngrok-free.app/runners' : 'https://637d-2600-1700-9cc0-3ab0-4898-f7f9-6af3-aa8.ngrok-free.app/runners';
export const API_URL = process.env.NODE_ENV == "development" ? 'https://1732-2600-1700-9cc0-3ab0-4898-f7f9-6af3-aa8.ngrok-free.app' : 'https://framerunnner.netlify.app';

export const enum FrameState {
    Init,
    Betting,
    Adopting
}

export const enum RaceState {
    Betting,
    Racing,
    ShowingWinner
}

export const horses = [
    "EtherGallop",
    "BlockChain Blitz",
    "RapChain",
    "Warp Speed",
    "Django",
    "Turbo Typhoon",
    "Thunderbolt",
    "Quantum Quicksilver",
    "Based",
    "Higher"
]