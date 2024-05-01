import React, { Suspense } from 'react'
import DetailPage from '@/components/DetailPage'
import axios from 'axios';

// export async function generateMetadata(
//   { params },

// ) {
//   // read route params
//   const id = params.id
 
//   // fetch data
//   const metaData = await axios(`https://www.reddit.com/${id}.json`);
 
//   // optionally access and extend (rather than replace) parent metadata
 
//   return {
//     title: metaData.data[0]?.data?.children[0]?.data.title,
//     description: `Scrollway ${metaData.data[0]?.data?.children[0]?.data?.title}`
   
//   }
// }


async function getSingle({params}) {
  try {
    const id = params.id
    console.log(id, 'id that we need')
    const res = await axios(`https://www.reddit.com/${id}.json`);
    return res.data; // Access the JSON data from the response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }
}

const page = async (params) => {  
  console.log(params, 'this is params we need')
  const data =  await getSingle(params);

  

  return (
    <>
    <Suspense fallback={'Loading..'}>
    <DetailPage data={data[0]?.data?.children[0]?.data}/>
    </Suspense>
    </>
  )
}

export default page
