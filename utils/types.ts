// * Page types
type SearchParams = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type DeckDetailPageProps = {
	params: Promise<{ deckId: string }>;
} & Partial<SearchParams>;

export type CardDetailPageProps = {
	params: Promise<{ cardId: string }>;
} & Partial<SearchParams>;

// * Data types
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
	// Pokemon type:
	description?: string;
	// Trainer type:
	effect?: string;
};
