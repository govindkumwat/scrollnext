import React from 'react'

async function getData(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const About = async({params}) => {
  const data = await getData(params.id)

  console.log(params)



  return (
    <div>About: {data.title}</div>
  )
}

export default About