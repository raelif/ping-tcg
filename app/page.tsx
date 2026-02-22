import { cardFetcher } from "@/data/fetcher";
import CardList from "@/components/CardList";
import { LIMIT } from "@/utils/constants";

const HomePage = async () => {
	const cards = await cardFetcher({
		pagination: { page: 1, limit: LIMIT }
	});

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans">
			<main className="flex flex-col items-center justify-between px-16 py-32">
				<p className="text-lg font-semibold">
					Welcome to the Pokemon TCG Database
				</p>
				<CardList initialCards={cards} />
			</main>
		</div>
	);
};

export default HomePage;
