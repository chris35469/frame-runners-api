import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

//export const runtime = 'edge'

function showHorse(horse: any){
  if (horse) {
    return (
      <p
    style={{
      backgroundImage:
        'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: 80,
      fontWeight: 700,
      margin: 0,
    }}
  >
    {horse}
  </p>
    )
  } else {
    return (<></>)
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    //selectedHorse
    const hasSelectedHorse = searchParams.has('selectedHorse')
    const horse = hasSelectedHorse
      ? searchParams.get('selectedHorse')?.slice(0, 100)
      : ''

    // ?title=<title>
    /*
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Default Title'

    // ?description=
    const hasDescription = searchParams.has('description')
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 100)
      : ''
      */

    const image = searchParams.get('image')?.slice(0, 100)
    //const backgroundImage = searchParams.get('image')?.slice(0, 100)
    //console.log(backgroundImage, description, title)

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
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
            showHorse(horse)
          }
        </div>
      ),
      {
        width: 600,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}