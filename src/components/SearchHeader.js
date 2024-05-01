'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';

const SearchHeader = ({params}) => {
  
  const [detail, setDetail] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = params.params.slug && await fetch(`https://www.reddit.com/r/${params.params.slug}/about.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetail(data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Clean-up function to cancel any pending requests if component unmounts or id changes
    return () => {
      // Your clean-up code here, if any
    };
  }, [params]);

  console.log(detail, 'detail')

  return (
    <div className='headerdetail'>
    <div className='headerImage'>
    <img  src={ !detail?.banner_background_image ? 'https://styles.redditmedia.com/t5_2qh45/styles/bannerBackgroundImage_uy5it2p3oht01.png' : detail?.banner_background_image?.split('?')[0]?.replace('amp;','')} alt=""/>
    </div>
    <div className='headerText'>
    {detail?.title || detail}
    <div className='headericons'>
    </div>
    </div>

    </div>
  )
}

export default SearchHeader
