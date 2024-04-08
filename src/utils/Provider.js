"use client"

import { ReactNode } from "react"
import { QueryClientProvider, QueryClient, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {NextUIProvider} from '@nextui-org/react'

export default function Provider({children}) {
    const queryClient = new QueryClient()

    return (
        <NextUIProvider>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            {children}
        </QueryClientProvider>
        </NextUIProvider>
    )
}