export type CardFetcherArgs = Partial<{
	name: string;
	type: string;
	rarity: string;
	pagination: Partial<{ page: number; limit: number }>;
}>;

export type CardBrief = {
	id: string;
	localId: string;
	name: string;
	image?: string;
};

export type Card = CardBrief & {
	// Card type: “Pokemon”, “Energy”, or “Trainer”
	category: string;
	// Card rarity (Common, Uncommon, Rare, etc.)
	rarity?: string;
};

export const cardFetcher = async ({
	name,
	type,
	rarity,
	pagination
}: CardFetcherArgs): Promise<CardBrief[]> => {
	const queryParams = new URLSearchParams();
	if (name) {
		queryParams.append("name", `like:${name}`);
	}
	if (type) {
		queryParams.append("category", type);
	}
	if (rarity) {
		queryParams.append("rarity", rarity);
	}
	if (pagination?.page) {
		queryParams.append("pagination:page", pagination.page.toString());
	}
	if (pagination?.limit) {
		queryParams.append(
			"pagination:itemsPerPage",
			pagination.limit.toString()
		);
	}

	const response = await fetch(
		`https://api.tcgdex.net/v2/en/cards?${queryParams.toString()}`
	);

	return await response.json();
};

export const progCardFetcher =
	({ name, type, rarity, pagination }: CardFetcherArgs) =>
	async () =>
		await cardFetcher({ name, type, rarity, pagination });
