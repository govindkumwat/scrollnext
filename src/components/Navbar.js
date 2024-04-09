'use client'

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useDeferredValue, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


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
  const [isLoading, setLoading] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('blur')

  const handleOpen = () => {
    onOpen();
  }

  const router = useRouter()

  useEffect(() => {
    if (deferredQuery.length > 2) {
      setLoading(true)
      axios(`https://www.reddit.com/subreddits/search.json?q=${deferredQuery}&include_over_18=${'off'}&limit=150&t=all`)
        .then((res) => {
          setSearchResult(res?.data?.data?.children)
          setLoading(false)
        })
    }

  }, [deferredQuery])

  return (
    <div className='navbarContainer'>
      <div className='searchInput'>
        {/* add cross button in input box so user can erase the search term*/}
        
        <input placeholder='Search Here..'  onClick={() => handleOpen()} />
        <button onClick={() => {
          setSearchResult([])
          setInputValue('')
        }} className='crossbtn'>
        
        </button>
      </div>


      <Modal backdrop={backdrop} isOpen={isOpen}  size={'3xl'}  onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Search</ModalHeader>
              <ModalBody>

                <div class="flex items-center w-full px-4 border-b border-default-400/50 dark:border-default-100">
                  <svg aria-hidden="true" fill="none" focusable="false" height="24" role="presentation" viewBox="0 0 24 24" width="24" class="text-default-400 text-lg"><path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M22 22L20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                  <input class="w-full px-2 h-14 font-sans text-lg outline-none rounded-none bg-transparent text-default-700 placeholder-default-500 dark:text-default-500 dark:placeholder:text-default-300" placeholder="Search..." cmdk-input="" autoFocus autocomplete="off" autocorrect="off" spellcheck="false" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-controls=":rji:" aria-labelledby=":rjj:" id=":rjk:" type="text" vvalue={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                  <kbd class="space-x-0.5 rtl:space-x-reverse items-center font-sans text-center shadow-small bg-default-100 text-foreground-600 rounded-small hidden md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">
                    <span>ESC</span>
                    </kbd>
                    </div>
                    {isLoading && 'Please wait while fetching data for you...'}
                {
                  
                  searchResult?.length > 0 &&
                  <div className='searchResult'>
                    {/* limit search result to only 5 items */}
                    {searchResult?.filter((data) => (data?.data?.allow_images == true || data?.data?.allow_videos == true || data?.data?.allow_videogifs == true) && data?.data?.subreddit_type !== "restricted" && data?.data?.subscribers > 1000)?.map((item, index) => (
                      <div key={index} className='searchItems' onClick={() => router.push(`/${item.data.url.split('/')[2]}`, { shallow: true })}>
                        <div className='searchthumbs'>
                          <img src={item?.data?.icon_img?.length > 0 ? item.data.icon_img : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='} />
                        </div>
                        <div className='titleanddescription'>
                          <p className='SearchItemName'>{item.data.title?.replace(/&amp;/g, '&')}</p>
                          <p className='searchItemDescription'>{item.data.public_description || item.data.description?.replace(/&amp;/g, '&')}</p>
                        </div>
                        <div className='subscribersandtype'>
                          {/* convert subscribers number in k, m */}

                          <p className='subscribers'>{formatSubscribers(item.data.subscribers)}</p>
                          <p className='contentType'>{item.data.over18 ? 'NSFW' : ''}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
      <div className='navLogo'>SCROLLWAY</div>
      {/* <div onClick={() => window.history.replaceState(null, '', '/about') }>Raju</div> */}
      <div className='navSocial'>
        <div className='categoryname'>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clip-rule="evenodd"></path></svg>
        Categories
        </div>
        <div>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
        </div>
        <div>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path></svg>
        </div>
      
      </div>
    </div>
  )
}

export default Navbar