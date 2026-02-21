const DeckDetailPage = async ({
	params
}: {
	params: Promise<{ deckId: string }>;
}) => {
	const { deckId } = await params;

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans">
			<main className="flex flex-col items-center justify-between py-32 px-16">
				{`DeckDetailPage - ${deckId}`}
			</main>
		</div>
	);
};

export default DeckDetailPage;
