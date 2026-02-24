"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import type { Card } from "@/utils/types";

type CreateDeckAction = (
	data: { authorId: string },
	formData: FormData
) => Promise<void>;

export const createDeck: CreateDeckAction = async (data, formData) => {
	const title = formData.get("title") as string;

	await prisma.deck.create({
		data: { title, authorId: data.authorId }
	});

	revalidatePath("/decks");
};

export const deleteDeck = async (id: string) => {
	await prisma.deck.delete({ where: { id } });

	revalidatePath("/decks");
};

export const postCard = async (card: Card, deckId: string) => {
	const existing = await prisma.deckCard.findUnique({
		where: {
			deckId_cardId: {
				deckId,
				cardId: card.id
			}
		}
	});

	if (existing) {
		if (existing.quantity >= 4 && card.category !== "Energy") {
			return;
		}
		await prisma.deckCard.update({
			where: { id: existing.id },
			data: { quantity: existing.quantity + 1 }
		});
	} else {
		await prisma.deckCard.create({
			data: {
				deckId,
				quantity: 1,
				cardId: card.id,
				cardName: card.name,
				cardImage: card.image,
				cardType: card.category
			}
		});
	}

	revalidatePath(`/cards/${card.id}`);
};
