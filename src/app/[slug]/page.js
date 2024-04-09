import React from 'react'
import PostList from '@/components/PostList'
import Navbar from '@/components/Navbar'
import SearchHeader from '@/components/SearchHeader'
import { useParams } from 'next/navigation'


async function getData(params) {
  try {
  const res = await fetch(`https://www.reddit.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}
}

async function getAboutData(params) {
  try {
    const res = await fetch(`https://www.reddit.com/r/${params}/about.json`);
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
          <meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />   
      <Navbar/>
      <SearchHeader detail = {about?.data}/>
      <div className='headerTextContainer'>
      <PostList intialData = {data?.data} params={params?.slug}/>
      </div>
    </div>
  )
}

export default page
