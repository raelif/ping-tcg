"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Link as LinkIcon, Trash, Trash2 } from "lucide-react";

import { deleteDeck } from "@/lib/actions";
import { Deck } from "@/app/generated/prisma/client";

type DeckEntryProps = {
	deck: Deck;
};

const DeckEntry = ({ deck }: DeckEntryProps) => {
	const [isDeleting, startDelete] = useTransition();

	return (
		<div className="flex justify-between gap-10">
			<span className="text-lg font-semibold">{deck.title}</span>
			<div className="inline-flex">
				<Link
					href={`/decks/${deck.id}`}
					className="ml-2 cursor-pointer rounded-full p-1 hover:bg-blue-100"
				>
					<LinkIcon className="h-5 w-5 text-blue-500" />
				</Link>
				<button
					disabled={isDeleting}
					className="ml-2 cursor-pointer rounded-full p-1 hover:bg-red-100"
					onClick={() => startDelete(() => deleteDeck(deck.id))}
				>
					{isDeleting ? (
						<Trash className="h-5 w-5 text-red-500" />
					) : (
						<Trash2 className="h-5 w-5 text-stone-500" />
					)}
				</button>
			</div>
		</div>
	);
};

export default DeckEntry;
