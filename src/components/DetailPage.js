'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const DetailPage = ({ data, closeButton, onClose, isOpen }) => {
  const router = useRouter()
  const currentState = window.history.state;

  const handleBack = () => {
    if (isOpen) {
      onClose();
    } else {
      if (window.history.length <= 1) {
        // Redirect to home page if there's no previous history within the same domain
        router.push('/');
      } else {
        window.history.go(-1);
      }
    }

    // Revert the change by restoring the previous state
    window.history.replaceState(currentState, currentState?.title, currentState?.url);
  };

  return (
    <div className='detailImage'>
      <img src={data?.url_overridden_by_dest} />
      <div className='detailText'>{data?.title}</div>
      <div className='detailCross' onClick={handleBack}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
        </svg>
      </div>
    </div>
  )
}

export default DetailPage
