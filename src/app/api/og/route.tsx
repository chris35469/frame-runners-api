import { ImageResponse } from 'next/og'
import { Faster_One } from 'next/font/google'
const faster_one_font = Faster_One({ weight: '400', subsets: ['latin'] })
import {API_URL } from '../../config';



// App router includes @vercel/og.
// No need to install it.

//export const runtime = 'edge'

const getFaster = async () => {
  let font_link = `${API_URL}/FasterOne-Regular.ttf`
  const response = await fetch(
     new URL(font_link, import.meta.url)
   );
   const faster = await response.arrayBuffer();
 
   return faster;
 }

function showHorse(horse: any, horseID: any){
  let horsePhoto = `${API_URL}/${horseID}.png`
  let photoSize = 150
  if (horse) {
    return (
      <div style={{display: 'flex',  alignItems: 'center',
      justifyContent: 'center', flexDirection: "column", marginTop: 150}}>
         <img src={horsePhoto} style={{height: photoSize, width: photoSize, borderRadius: 30}} />
      
    
      <p
    style={{
      backgroundImage:
        'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: 40,
      fontWeight: 700,
      margin: 0,
    }}
  >
    {horse}
  </p>
  </div>
    )
  } else {
    return (<></>)
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasSelectedHorse = searchParams.has('selectedHorse')
    const horse = hasSelectedHorse
      ? searchParams.get('selectedHorse')?.slice(0, 100)
      : ''
    const hasHorseID = searchParams.has('horseID')
    const horseID = hasHorseID
      ? searchParams.get('horseID')?.slice(0, 100)
      : ''
    const image = searchParams.get('image')?.slice(0, 100)

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundImage: `url(${image})`,
            fontSize: 80,
            fontWeight: 700,
            textAlign: 'center',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
          {
            showHorse(horse, horseID)
          }
        </div>
      ),
      {
        width: 600,
        height: 630,
        fonts: [
          {
            name: 'FasterOne-Regular',
            data: await getFaster(),
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}