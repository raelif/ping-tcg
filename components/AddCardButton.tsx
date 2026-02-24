"use client";

import { useState, useTransition } from "react";

import type { Deck } from "@/app/generated/prisma/client";
import type { Card } from "@/utils/types";
import { postCard } from "@/lib/actions";

type AddCardButtonProps = {
	card: Card;
	decks: Deck[];
};

const AddCardButton = ({ card, decks }: AddCardButtonProps) => {
	const [currentDeck, setCurrentDeck] = useState(
		decks.length ? decks[0].id : ""
	);
	const [isAdding, startAdding] = useTransition();

	return (
		<>
			<span>Add to current Deck:</span>
			<div className="grid grid-cols-12">
				<select
					name="decks"
					className="col-span-12 rounded bg-gray-100 px-4 py-2 font-bold sm:col-span-9 sm:rounded-l"
					value={currentDeck}
					onChange={e => setCurrentDeck(e.target.value)}
				>
					{decks.map(deck => (
						<option key={deck.id} value={deck.id}>
							{deck.title}
						</option>
					))}
				</select>
				<button
					disabled={isAdding}
					className="col-span-12 cursor-pointer rounded bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800 sm:col-span-3 sm:rounded-r"
					type="button"
					onClick={() =>
						startAdding(() => postCard(card, currentDeck))
					}
				>
					{isAdding ? "Adding..." : "Add"}
				</button>
			</div>
		</>
	);
};

export default AddCardButton;
