import prisma from "@/lib/prisma";

import type { DeckDetailPageProps } from "@/utils/types";
import { notFound } from "next/navigation";

const getDeckDetailPageProp = async (deckId: string) => {
	try {
		const [deck, deckCards] = await Promise.all([
			prisma.deck.findUnique({ where: { id: deckId } }),
			prisma.deckCard.findMany({ where: { deckId } })
		]);

		return { deck, deckCards };
	} catch (error) {
		console.error(error);
		return {};
	}
};

const DeckDetailPage = async ({ params }: DeckDetailPageProps) => {
	const { deckId } = await params;
	const { deck, deckCards } = await getDeckDetailPageProp(deckId);

	if (!deck) {
		notFound();
	}

	return (
		<div className="flex items-center justify-center font-sans">
			<main className="container mx-auto px-8 py-8 xl:px-32">
				<h1 className="text-5xl">{`${deck.title}:`}</h1>
				<div className="flex flex-wrap justify-center gap-4 p-6 font-serif text-lg">
					{!!deckCards.length &&
						deckCards.map(deckCard => {
							return (
								<div
									key={deckCard.id}
									className="w-full grow rounded-md border-l-8 border-green-500 bg-gray-100 p-2 text-black md:w-5/12 lg:w-3/12"
								>
									<div className="grid grid-cols-12 gap-2">
										<div className="col-span-1 place-self-center text-2xl font-bold">
											{deckCard.quantity}
										</div>
										<div className="col-span-10 text-xl">
											{deckCard.cardName}
											<p className="pt-1 text-sm font-thin text-gray-500">{`Type: ${deckCard.cardType}`}</p>
										</div>
										<div className="col-span-1"></div>
									</div>
								</div>
							);
						})}
				</div>
			</main>
		</div>
	);
};

export default DeckDetailPage;
