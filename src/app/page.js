import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";


async function getData(params) {
  const res = await fetch(`https://www.reddit.com/r/${params}.json`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
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
    <PostList intialData = {data?.data} params={params}/>
   </main>
  );
}
