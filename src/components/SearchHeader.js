import React from 'react'
import { useParams } from 'next/navigation'




const SearchHeader = (detail) => {


  return (
    <div className='headerdetail'>
    <div className='headerImage'>
    <img  src={detail.banner_background_image?.split('?')[0]?.replace('amp;','')} alt="weather-icon"/>
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
