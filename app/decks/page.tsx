import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import DeckList from "@/components/DeckList";

const getDeckListPageProps = async () => {
	try {
		const session = await auth();
		if (!session?.user) {
			throw new Error("User not authenticated");
		}

		const decks = await prisma.deck.findMany({
			where: { authorId: session.user.id }
		});

		return { authorId: session.user.id ?? "", decks };
	} catch (error) {
		console.error(error);
		return { authorId: "", decks: [] };
	}
};

const DeckListPage = async () => {
	const { authorId, decks } = await getDeckListPageProps();

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans">
			<main className="container mx-auto px-8 py-8 xl:px-32">
				<DeckList authorId={authorId} decks={decks} />
			</main>
		</div>
	);
};

export default DeckListPage;
