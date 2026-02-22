import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from "@tanstack/react-query";

import { progCardFetcher } from "@/lib/fetcher";
import CardList from "@/components/CardList";
import { initialState, LIMIT } from "@/utils/constants";

const HomePage = async () => {
	const queryClient = new QueryClient();
	const { name, type, rarity, page } = initialState;

	await queryClient.prefetchQuery({
		queryKey: ["CardSearch", name, type, rarity, page],
		queryFn: progCardFetcher({
			pagination: { page, limit: LIMIT }
		})
	});

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans">
			<main className="container mx-auto px-8 py-8 xl:px-32">
				<p className="text-lg font-semibold">
					Welcome to the Pokemon TCG Database
				</p>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<CardList />
				</HydrationBoundary>
			</main>
		</div>
	);
};

export default HomePage;
