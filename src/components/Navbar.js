'use client'

import React, { useEffect } from 'react'
import axios from 'axios';

const Navbar = () => {

  const [inputValue, setInputValue] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (inputValue && inputValue.length > 2) {
      setLoading(true);
      axios(`https://www.reddit.com/subreddits/search.json?q=${inputValue}&include_over_18=on&limit=150&t=all`)
        .then((data) => {
          setResults(data?.data?.data?.children)
          setLoading(false)
        })
        .catch((error) => {
          // Handle the error here
          console.error("Error fetching data:", error);
          setLoading(false);
          // You can also set an error state or display an error message to the user.
        });
    }
  }, [inputValue])

  return (
    <div className='navbarContainer'>
      <div className='searchInput'>
        <input placeholder='Search Here..' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <div className='searchResults'>
          {!loading ? results.map((result, index) => {
            return <div key={index} className='searchResultItem'>
              <div className='itemLogo' ></div>
              <div className='itemtitleanddesc'>
                <p>{result?.data?.title}</p>
                <p>{result?.data?.description}</p>
              </div>

              <div className='itemsubsand18plus'>
                <p>{result?.data?.subscribers}</p>
                <p>{result?.data?.over18 && '18+'}</p>
              </div>
             
            </div>
          }) : 'Loading...'}
        </div>
      </div>
      <div className='navLogo'>SCROLLWAY</div>
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