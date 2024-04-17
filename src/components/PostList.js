'use client'
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'
import { QueryClientProvider, QueryClient, useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useParams } from 'next/navigation';


const PostList = ({ initialData, homeParams }) => {
    const params = useParams()
    const [meta, setMeta] = useState([])


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const getMeta = await axios(`https://api.reddit.com/r/${params.slug}/about.json`);
    //             setMeta(getMeta.data.data);
    //         } catch (error) {
    //             // Handle error
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    
    //     fetchData();
    // }, [params.slug]);

    const fetchPosts = async ({ pageParam = null }) => {
        const url = pageParam ? `https://api.reddit.com/r/${homeParams || params.slug}.json?after=${pageParam}` : `https://api.reddit.com/r/${homeParams || params.slug}.json`;
        const response = await axios.get(url);
        return response.data.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage) => lastPage?.after,
        // initialData: initialData, // Use initialData here
  
    });

    useEffect(() => {
        function handleScroll() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Check if the user has scrolled to the bottom of the page
            if (windowHeight + scrollTop >= documentHeight && !isFetchingNextPage && hasNextPage) {
                fetchNextPage();
            }
        }

        // Add event listener when component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchNextPage, isFetchingNextPage, hasNextPage]);

    const postData = data ? data.pages.map(page => page.children).flat() : [];


    return (
        <>
       
       
            <ImageList data={postData} meta = {meta}/>
        </>
    );
}

export default PostList;
