import React from 'react'
import PostList from '@/components/PostList'
import Navbar from '@/components/Navbar'
import SearchHeader from '@/components/SearchHeader'




async function getData(params) {
  try {
  const res = await fetch(`https://api.reddit.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}
}

export const metadata = {
  title: '...',
  description: '...',
}
 

async function getAboutData(params) {
  try {
    const res = await fetch(`https://api.reddit.com/r/${params}/about.json`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be handled at a higher level
  }
}
const page = async({params}) => {
  const data = params && await getData(params?.slug)
  const about =  await getAboutData(params?.slug)
  
  return (
    <div>
           
      <Navbar/>
      <SearchHeader detail = {about?.data}/>
      <div className='headerTextContainer'>
      <PostList intialData = {data?.data} params={params?.slug}/>
      </div>
    </div>
  )
}

export default page
