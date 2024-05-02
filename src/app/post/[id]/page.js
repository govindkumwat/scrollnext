import React, { Suspense } from 'react'
import DetailPage from '@/components/DetailPage'
import axios from 'axios';

// export async function generateMetadata(
//   { params },
// ) {
//   // read route params
//   const id = params.id
//   // fetch data
//   const metaData = await fetch(`https://www.reddit.com/${id}.json`).then((res) => res.json())
//   // const metaData = await axios(`https://www.reddit.com/${id}.json`);
//   // optionally access and extend (rather than replace) parent metadata 

//   console.log(metaData, 'metaData')
//   return {
//     title: metaData.data[0]?.data?.children[0]?.data.title,
//     description: `Scrollway ${metaData.data[0]?.data?.children[0]?.data?.title}`
   
//   }
// }

// async function getSingle({params}) {
//   try {
//     const id = params.id
//     const res = await axios(`https://www.reddit.com/${id}.json`);
//     return res.data; 
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; 
//   }
// }

const page = async (params) => {  
  // const data =  await getSingle(params);

  

  return (
    <>
    <Suspense fallback={'Loading..'}>
    <DetailPage />
    </Suspense>
    </>
  )
}

export default page
