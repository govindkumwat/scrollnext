import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import { BottomNavigation } from "@/components/BottomNavigation";

export const generateMetadata = async () => {
  return {
    title: 'Scrollway || Get and scroll photos and videos',
    description: `Get your daily dose of Reddit NSFW and Bollywood updates, along with stunning pet and nature photography on Scrollway.`,
  };
};


async function getData(params) {
  try {
  const res = await fetch(`https://www.api.reddits.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data for you')
  }
 
  return res.json()
} catch(error) {
  console.log(error)
}
}
 

export default async function Home() {
  const params = 'pics'
  const data = await getData(params)


  return (
   <main>
    <meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />   
    <Navbar/>
    <PostList intialData = {data?.data} homeParams={params}/>
    <BottomNavigation/>
   </main>
  );
}
