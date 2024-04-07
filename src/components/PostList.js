'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import ImageList from './ImageList'
import { useParams } from 'next/navigation'

async function getData(params) {
  const res = await fetch(`https://www.reddit.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const PostList = async() => {
  const params = useParams()
  const intialData = await getData(params?.slug)
    const [page, setPage] = useState(1)
    const [isBottom, setIsBottom] = useState(false);
    const [data, setdata] = useState(intialData?.children || [])
    const [after,setAfter] = useState(intialData?.after)

    useEffect(() => {
        function handleScroll() {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
          // Check if the user has scrolled to the bottom of the page
          if (windowHeight + scrollTop >= documentHeight) {
            setIsBottom(true);
          } else {
            setIsBottom(false);
          }
        }
    
        // Add event listener when component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
      }, []); // Empty dependency array ensures the effect runs only once on mount

      console.log(data, 'data')
    

      useEffect(() => {
        const fetchData = async () => {
          
            try {
                if(isBottom){
                const response = await axios(`https://reddit.com/r/${params}.json?after=${after}`);
                const responseData = response?.data?.data;
                if (responseData && responseData.children) {
                    const newData = responseData.children
                    console.log(response?.data?.data?.after, 'response')
                    console.log(newData, 'newData')
                    setdata((prevData) => [...prevData, ...newData]);
                    setAfter(response?.data?.data?.after)
                    
                }}
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [isBottom]);



    return (
       <>
       <ImageList data={data}/>
       </>
    )
}

export default PostList