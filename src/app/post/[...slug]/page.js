import React from 'react'
import DetailPage from '@/components/DetailPage'


async function getSingle(params) {
  try {
    if(params) {
      const res = await fetch(`https://www.reddit.com/${params}.json`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    }
  
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }
}

const page = async ({params, postData}) => {


  const data = await getSingle(params?.slug[3])
  
  return (
   <DetailPage data={data[0]?.data?.children[0]?.data} />
  )
}

export default page
