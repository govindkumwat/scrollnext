import React from 'react'
import DetailPage from '@/components/DetailPage'


async function getSingle(params) {
  const res = await fetch(`https://www.reddit.com/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const page = async ({params, postData}) => {


  const data = await getSingle(params?.slug[3])
  
  return (
   <DetailPage data={data[0]?.data?.children[0]?.data} />
  )
}

export default page
