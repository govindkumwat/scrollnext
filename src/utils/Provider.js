"use client"

import { ReactNode } from "react"
import { QueryClientProvider, QueryClient, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {NextUIProvider} from '@nextui-org/react'
import ErrorBoundary from "@/components/ErrorBoundary"
import NextNProgress from 'nextjs-progressbar';

export default function Provider({children}) {
    const queryClient = new QueryClient()

    return (
        <ErrorBoundary>
        <NextUIProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <NextNProgress options={{ easing: 'ease', speed: 500 }} />            {children}
        </QueryClientProvider>
        </NextUIProvider>
        </ErrorBoundary>
    )
}