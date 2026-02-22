"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function deleteDeck(id: string) {
	await prisma.deck.delete({ where: { id } });

	revalidatePath("/decks");
}
