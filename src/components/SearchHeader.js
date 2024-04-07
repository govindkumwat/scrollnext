import React from 'react'
import { useParams } from 'next/navigation'


async function getAboutData(params) {
    const res = await fetch(`https://www.reddit.com/r/${params}/about.json`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

const SearchHeader = async() => {

    const detail =  await getAboutData(params?.slug)

  return (
    <div className='headerdetail'>
    <div className='headerImage'>
    <img  src={detail.banner_background_image.split('?')[0].replace('amp;','')} alt="weather-icon"/>
    </div>
    <div className='headerText'>
    
    {detail.display_name}
    <div className='headericons'>
    </div>
    </div>

    </div>
  )
}

export default SearchHeader
