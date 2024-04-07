'use server'
import React from 'react'
import PostList from '@/components/PostList'
import Navbar from '@/components/Navbar'
import SearchHeader from '@/components/SearchHeader'


async function getData(params) {
  const res = await fetch(`https://www.reddit.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const page = async() => {
   
  const intialData = await getData(params?.slug)

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
