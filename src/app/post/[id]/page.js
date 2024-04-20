import React from 'react'
import DetailPage from '@/components/DetailPage'
import axios from 'axios';

export async function generateMetadata(
  { params },

) {
  // read route params
  const id = params.id
 
  // fetch data
  const metaData = await axios(`https://api.reddit.com/${id}.json`);
 
  // optionally access and extend (rather than replace) parent metadata
 
  return {
    title: metaData.data[0]?.data?.children[0]?.data.title,
    description: `Scrollway ${metaData.data[0]?.data?.children[0]?.data?.title}`
   
  }
}


async function getSingle(params) {
  try {
    const res = await axios(`https://api.reddit.com/${params?.id}.json`);
    return res.data; // Access the JSON data from the response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }
}

const page = async ({params, postData}) => {  
  const data =  await getSingle(params);

  return (
    <>
    <DetailPage data={data[0]?.data?.children[0]?.data}/>
    </>
  )
}

export default page
