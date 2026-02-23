import Image from "next/image";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import type { User } from "next-auth";
import type { Deck } from "@/app/generated/prisma/client";
import type { Card, CardDetailPageProps } from "@/utils/types";

import AddCardButton from "@/components/AddCardButton";

const getCardDetailPageProps = async (cardId: string) => {
	let card: Card | undefined;
	let decks: Deck[] = [];
	let user: User | undefined;

	try {
		const response = await fetch(
			`https://api.tcgdex.net/v2/en/cards/${cardId}`
		);
		card = await response.json();
	} catch (error) {
		console.error(error);
		return { card, decks, user };
	}

	try {
		const session = await auth();
		user = session?.user;

		if (!user) {
			return { card, decks, user };
		}

		decks = await prisma.deck.findMany({
			where: { authorId: user.id }
		});
	} catch (error) {
		console.error(error);
	}

	return { card, decks, user };
};

const CardDetailPage = async ({ params }: CardDetailPageProps) => {
	const { cardId } = await params;
	const { card, decks, user } = await getCardDetailPageProps(cardId);

	if (!card) {
		notFound();
	}

	return (
		<div className="relative mx-auto max-w-7xl p-5 sm:p-10 md:p-16">
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
				<div className="sm:col-span-5">
					<div
						className="relative"
						style={{ aspectRatio: "600/825" }}
					>
						<Image
							fill
							src={
								card.image
									? `${card.image}/high.webp`
									: "/back.webp"
							}
							alt={card.name}
							style={{ objectFit: "contain" }}
							loading="eager"
							sizes="(min-width: 1280px) 400px, (min-width: 768px) 300px, 200px"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-2 pt-2 sm:col-span-7">
					<div className="flex w-full flex-col gap-3.5 sm:max-w-md">
						<p className="w-full rounded-md bg-gray-100 p-3">
							<span className="font-bold">Name:</span>
							<span className="ml-2">{card.name}</span>
						</p>
						<p className="w-full rounded-md bg-gray-100 p-3">
							<span className="font-bold">Type:</span>
							<span className="ml-2">{card.category}</span>
						</p>
						{card.rarity && (
							<p className="w-full rounded-md bg-gray-100 p-3">
								<span className="font-bold">Rarity:</span>
								<span className="ml-2">{card.rarity}</span>
							</p>
						)}
						{card.description && (
							<p className="w-full rounded-md bg-gray-100 p-3">
								<span className="font-bold">Description:</span>
								<span className="ml-2">{card.description}</span>
							</p>
						)}
						{card.effect && (
							<p className="w-full rounded-md bg-gray-100 p-3">
								<span className="font-bold">Effect:</span>
								<span className="ml-2">{card.effect}</span>
							</p>
						)}
						{user && !!decks.length && (
							<AddCardButton card={card} decks={decks} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardDetailPage;
