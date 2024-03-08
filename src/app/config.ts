// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3000/runners' : 'https://w3bbie.xyz/runners';
export const API_URL = process.env.NODE_ENV == "development" ? 'http://localhost:3001' : 'https://testapi35.netlify.app';
