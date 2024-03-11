import { ImageResponse } from 'next/og'
import { Faster_One } from 'next/font/google'
const faster_one_font = Faster_One({ weight: '400', subsets: ['latin'] })
import {API_URL, horses, NEXT_PUBLIC_URL  } from '../../config';



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

 function getPoints(standings: any, horseID: any) {
  let index = standings.indexOf(horseID)
  switch (index) {
    case 0:
      return 10
    case 1: 
      return 5
    case 2:
      return 2
    default:
      return 0
  }
 }

 function showYourPick(horseID: any, isResultsPage: any, standings: any){
  let srcImage = `https://w3bbie.xyz/runners/${horseID}.png`
  let imageSize = 70
  let _id = parseInt(horseID) - 1 
  let points = getPoints(standings, horseID)
  let pointString = `You Won ${points} Points.`
  let _isShowingResults = isResultsPage == "true"
  let point_earned = points > 0
  console.log("isResultsPage" ,_isShowingResults)
  return(
    <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'center', flexDirection: "column", marginTop: 30}}>
        <p style={{fontSize: 40, marginTop:0, marginBottom:0, padding: 0}}>You Picked:</p>
        <img src={srcImage} style={{height: imageSize, width: imageSize, borderRadius: 50}} />
        <p style={{fontSize: 30, marginTop:10, marginBottom:0, padding: 0}}>{horses[_id]}</p>
        <p style={{fontSize: 30, marginTop:10, marginBottom:0, padding: 0, color: "#24FFB0"}}>{point_earned && _isShowingResults && pointString}</p>
    </div>
  )
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

function showHorse(horse: any, horseID: any){
  let horsePhoto = `${API_URL}/${horseID}.png`
  let photoSize = 150
  if (horse) {
    return (
      <div style={{display: 'flex',  alignItems: 'center',
      justifyContent: 'center', flexDirection: "column", marginTop: 150}} >
         {/*<img src={horsePhoto} style={{height: photoSize, width: photoSize, borderRadius: 30}} />*/}
         <img src={horsePhoto} height={"150px"} width={"150px"} style={{borderRadius: 30}} />
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

    const standings = searchParams.get('raceStandings')?.slice(0, 100).split("-")

    //const selectedHorseID = searchParams.get('racingSelectedHorseID')?.slice(0, 100)

    const hasRacingHorseID = searchParams.has('racingSelectedHorseID')
    const racingHorseIDSelected = hasRacingHorseID
      ? searchParams.get('racingSelectedHorseID')?.slice(0, 100)
      : ''

      const isResultsPage = searchParams.has('isResults')
      const isResultsPageState = isResultsPage
        ? searchParams.get('isResults')?.slice(0, 100)
        : ''

      //console.log("hasSelectedHorse", isResultsPage, hasSelectedHorse, standings, hasRacingHorseID, racingHorseIDSelected)

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
            hasSelectedHorse && showHorse(horse, horseID)
          }
          {
           standings && showStandings(standings)
          }
          
          {
            racingHorseIDSelected && showYourPick(racingHorseIDSelected, isResultsPageState, standings)
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