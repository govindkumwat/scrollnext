import React, { Suspense } from 'react'
import PostList from '@/components/PostList'
import Navbar from '@/components/Navbar'
import SearchHeader from '@/components/SearchHeader'
import axios from 'axios'
import { BottomNavigation } from '@/components/BottomNavigation'


// async function getData(params) {
//   try {
//     const res = await axios(`https://www.reddit.com/r/${params.slug}.json`);
//     return res.data; // Access the JSON data from the response object
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Re-throw the error to propagate it up the call stack.
//   }
// }

export const generateMetadata = async ({ params }) => {
  try {
    const res = await axios.get(`https://www.reddit.com/r/${params?.slug}/about.json`);
    if (!res.data) {
      throw new Error('Failed to fetch data');
    }
    // Assuming you want to access the title from the first post in the subreddit
    return {
      title: res.data.data.title + '-' + 'Scrollway',
      description: `Scrollway ${res.data.data.public_description}`,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

async function getAboutData(params) {
  try {
    const res = await axios(`https://www.reddit.com/r/${params?.slug}/about.json`);
    return res.data; // Access the JSON data from the response object
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to propagate it up the call stack.
  }
}

const page = async({params}) => {
   const data =  await getData(params)
  const about =  await getAboutData(params)
  
  return (
    <div>
      <Suspense fallback='loading'>
      <Navbar/>
      </Suspense>
      <Suspense fallback='loading'>
      {/* <SearchHeader  /> */}
      <SearchHeader detail={about?.data} />
      </Suspense>

      <div className='headerTextContainer'>
        <Suspense fallback='loading'>
      <PostList data={data?.data?.children[0]}/>
      {/* <PostList /> */}
      </Suspense>
      <BottomNavigation/>
      </div>
    </div>
  )
}

export default page
