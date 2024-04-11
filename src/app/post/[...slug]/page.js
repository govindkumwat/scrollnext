import React from 'react'
import DetailPage from '@/components/DetailPage'
import axios from 'axios';
import { Metadata } from 'next';

export const generateMetadata = async({params}) => {

  try {
    const res = await axios(`https://api.reddit.com/${params?.slug[3]}.json`);
    return {
      title: res.data[0]?.data?.children[0]?.data.title,
      description: `Scrollway ${res.data[0]?.data?.children[0]?.data?.title}`,
    } // Access the JSON data from the response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }

  
}


async function getSingle(params) {
  try {
    const res = await axios(`https://api.reddit.com/${params?.slug[3]}.json`);
    return res.data; // Access the JSON data from the response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }
}

const page = async ({params, postData}) => {


  const data = await getSingle(params)
  
  return (

    <>
    
   
    <DetailPage data={data[0]?.data?.children[0]?.data} />

    </>
   
  )
}

export default page
