'use client'

import axios from 'axios'
import React, { useDeferredValue, useEffect, useState } from 'react'

const formatSubscribers = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'm';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number?.toString();
  }
}

const Navbar = () => {

  const [inputValue, setInputValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const deferredQuery = useDeferredValue(inputValue);

  useEffect(() => {
    axios(`https://www.reddit.com/subreddits/search.json?q=${deferredQuery}&include_over_18=${'on'}&limit=150&t=all`)
    .then((res) => {
        setSearchResult(res?.data?.data?.children)
    })
  },[inputValue])

  return (
    <div className='navbarContainer'>
        <div className='searchInput'>
          {/* add cross button in input box so user can erase the search term*/}
            <input placeholder='Search Here..' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => setInputValue('')}  className='crossbtn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    {
      searchResult?.length > 0 &&
      <div className='searchResult'>
          {/* limit search result to only 5 items */}
            {searchResult?.map((item, index) => (
                <div className='searchItems' key={index}>
                  <div className='searchthumbs'>
                    <img src={item?.data?.icon_img?.length > 0 ? item.data.icon_img : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='}/>
                  </div>
                  <div className='titleanddescription'>
                  <p className='SearchItemName'>{item.data.display_name}</p>
                  <p className='searchItemDescription'>{item.data.public_description || item.data.description}</p>
                  </div>
                  <div className='subscribersandtype'>
                    {/* convert subscribers number in k, m */}

                  <p className='subscribers'>{formatSubscribers(item.data.subscribers)}</p>
                  <p className='contentType'>{item.data.over18 ? 'RED' : ''}</p>
                  </div>
                </div>
            ))}
        </div>
    }
        

        <div className='navLogo'>Logo</div>
        <div className='navSocial'>
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </div>
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </div>
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </div>
            <div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </div>
        </div>
    </div>
  )
}

export default Navbar