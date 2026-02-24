"use client";

import type { PropsWithChildren } from "react";

import {
	isServer,
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query";

import { SEARCH_STALE_TIME } from "@/utils/constants";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: SEARCH_STALE_TIME,
				initialDataUpdatedAt: 1,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false
			}
		}
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export default function Providers({ children }: PropsWithChildren) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
