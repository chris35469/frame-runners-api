import { ImageResponse } from 'next/og'
import {API_URL, horses, NEXT_PUBLIC_URL  } from '../../config';

// App router includes @vercel/og.
// No need to install it.

const getFaster = async () => {
  let font_link = `${API_URL}/FasterOne-Regular.ttf`
  const response = await fetch(
     new URL(font_link, import.meta.url)
   );
   const faster = await response.arrayBuffer();
 
   return faster;
 }


 function showStandings(standings: any) {
  const listItems = standings.map((id: string, index: any) =>{
    let srcImage = `https://w3bbie.xyz/runners/${id}.png`
    if (index >= 5) return (<></>)
    return (<div style={{display: 'flex',  alignItems: 'center', justifyContent: 'center', flexDirection: "row"}} key={id}>
      <p style={{fontSize: 35, marginTop:0, marginBottom:0, padding: 0}}>{index+1}. {horses[parseInt(id)-1]}</p>
      <img src={srcImage} height={"30px"} width={"30px"} style={{borderRadius: 20, marginLeft: 10}} />
    </div>
    )
  }
  );

  return (
    <div style={{display: 'flex',  alignItems: 'center',
    justifyContent: 'center', flexDirection: "column", marginTop: 175}} >
      {listItems}
  </div>
  )
 }

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const bgImage = searchParams.has('image') ? searchParams.get('image')?.slice(0, 100) : ''

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
            backgroundImage: `url(${bgImage})`,
            fontSize: 80,
            fontWeight: 700,
            textAlign: 'center',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }}
        >
        <p>Hello World</p>
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