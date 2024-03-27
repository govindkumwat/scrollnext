import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";


async function getData() {
  const res = await fetch('https://www.reddit.com/r/dog.json')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 

export default async function Home() {

  const data = await getData()

  return (
   <main>
    <Navbar/>
    <PostList intialData = {data?.data}/>
   </main>
  );
}
