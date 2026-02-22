"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { progCardFetcher, type Card } from "@/data/fetcher";
import { LIMIT } from "@/utils/constants";

type CardListProps = {
	initialCards: Card[];
};

const CardList = ({ initialCards }: CardListProps) => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [rarity, setRarity] = useState("");
	const [page, setPage] = useState(1);

	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["CardSearch", name, type, rarity, page],
		queryFn: progCardFetcher({
			name,
			type,
			rarity,
			pagination: { page, limit: LIMIT }
		}),
		initialData: initialCards
	});

	return <div></div>;
};

export default CardList;
