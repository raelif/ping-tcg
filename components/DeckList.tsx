import { Deck } from "@/app/generated/prisma/client";
import { createDeck } from "@/lib/actions";

import DeckEntry from "./DeckEntry";

type DeckListProps = {
	authorId: string;
	decks: Deck[];
};

const DeckList = ({ authorId, decks }: DeckListProps) => {
	return (
		<div className="flex h-screen flex-col items-start gap-4">
			<form
				className="rounded border border-gray-300"
				action={createDeck.bind(null, { authorId })}
			>
				<input
					className="rounded-l px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
					type="text"
					name="title"
					placeholder="Title"
				/>
				<button
					className="cursor-pointer rounded-r bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800"
					type="submit"
				>
					Create
				</button>
			</form>

			<p className="text-lg font-semibold">Your Deck List:</p>
			<div className="grid grid-flow-row gap-4">
				{decks.map(deck => (
					<DeckEntry key={deck.id} deck={deck} />
				))}
			</div>
		</div>
	);
};

export default DeckList;
