'use client'
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'
import { QueryClientProvider, QueryClient, useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import axios from 'axios';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const PostList = ({ initialData, params }) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const fetchPosts = async ({ pageParam = null }) => {
    const url = pageParam ? `https://reddit.com/r/${params}.json?after=${pageParam}` : `https://reddit.com/r/${params}.json`;
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
    keepPreviousData : true,
    staleTime: 60 * 1000,
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


    const handlePopup = () => {
     alert('true')
     onOpen();
        }

    return (
        <>
            <ImageList data={postData} handlePopup= {handlePopup} />
        </>
    );
}

export default PostList;
