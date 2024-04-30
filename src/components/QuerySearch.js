'use client'
import React, { useEffect, useState } from 'react'
import ImageList from './ImageList'
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from 'axios';

const QuerySearch = ({ initialData, params }) => {

    const fetchPosts = async ({ pageParam = null }) => {
        const url = pageParam ? `https://www.reddit.com/search.json?q=${params}&after=${pageParam}&include_over_18=true` : `https://www.reddit.com/search.json?q=${params}&&include_over_18=true`;
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
        initialData: initialData, // Use initialData here
        keepPreviousData: false,
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
    }, [fetchNextPage, isFetchingNextPage, hasNextPage, params]);

    const postData = data ? data.pages.map(page => page.children).flat() : [];



    return (
        <>
            <ImageList data={postData}/>
        </>
    );
}

export default QuerySearch;
