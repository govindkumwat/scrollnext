// pages/search/[id].js

import { BottomNavigation } from "@/components/BottomNavigation";
import Navbar from "@/components/Navbar";
import QuerySearch from "@/components/QuerySearch";
import SearchHeader from "@/components/SearchHeader";
import { Suspense } from "react";

export const generateMetadata = async ({params}) => {
  return {
    title: `${params.slug} on Scrollway`,
    description: `Search Results for ${params.slug}`,
  };
};

async function getData(params) {
  try { 
  const res = await fetch(`https://www.reddit.com/search.json?q=${params}&include_over_18=true`)
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
    <Suspense fallback='Loading'>
    <Navbar/>
    </Suspense>
    <Suspense fallback='Loading'>
    <SearchHeader detail={params?.params?.slug}/>
    </Suspense>
    <Suspense fallback='Loading'>
    <QuerySearch intialData = {data?.data} params={params?.params?.slug}/>
    </Suspense>
    <BottomNavigation/>
    </>
     
  );
};

export default page;