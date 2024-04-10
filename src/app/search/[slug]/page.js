// pages/search/[id].js

import Navbar from "@/components/Navbar";
import QuerySearch from "@/components/QuerySearch";

async function getData(params) {
  try {
  const res = await fetch(`https://api.reddit.com/search.json?q=${params?.params?.slug}&include_over_18=true`)
  if (!res.ok) {
    throw new Error('Failed to fetch data for you')
  }
 
  return res.json()
} catch(error) {
  console.log(error)
}
}

const page = async(params) => {

  const data = await getData(params.params.slug);

  return (

    <>
    <Navbar/>
    <QuerySearch intialData = {data?.data} params={params?.params?.slug}/>
    </>
     
  );
};

export default page;