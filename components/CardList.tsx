"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { progCardFetcher } from "@/lib/fetcher";
import Pagination from "@/components/Pagination";

import { PokemonCard } from "@/lit-components/PokemonCardWrapper";

import { debounceCall } from "@/utils/debounce";
import { initialState, LIMIT } from "@/utils/constants";

const CardList = () => {
	const [inputName, setInputName] = useState("");
	const [inputType, setInputType] = useState("");
	const [inputRarity, setInputRarity] = useState("");

	const [{ name, type, rarity, page }, setState] = useState(
		() => initialState
	);

	const {
		data: cards,
		isFetching,
		error
	} = useQuery({
		queryKey: ["CardSearch", name, type, rarity, page],
		queryFn: progCardFetcher({
			name,
			type,
			rarity,
			pagination: { page, limit: LIMIT }
		}),
		placeholderData: keepPreviousData
	});

	const setName = useCallback((newName: string) => {
		setState(prev => ({ ...prev, name: newName, page: 1 }));
	}, []);

	const setType = useCallback((newType: string) => {
		setState(prev => ({ ...prev, type: newType, page: 1 }));
	}, []);

	const setRarity = useCallback((newRarity: string) => {
		setState(prev => ({ ...prev, rarity: newRarity, page: 1 }));
	}, []);

	const setPage = useCallback((newPage: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setState(prev => ({ ...prev, page: newPage }));
	}, []);

	return (
		<div className="mx-auto p-4">
			<div className="mb-6 flex flex-wrap gap-2">
				<input
					type="text"
					value={inputName}
					onChange={e =>
						debounceCall({
							query: e.target.value,
							callback: setName,
							inputCallback: setInputName
						})
					}
					placeholder="Name"
					className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
				/>
				<input
					type="text"
					value={inputType}
					onChange={e =>
						debounceCall({
							query: e.target.value,
							callback: setType,
							inputCallback: setInputType
						})
					}
					placeholder="Type"
					className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
				/>
				<input
					type="text"
					value={inputRarity}
					onChange={e =>
						debounceCall({
							query: e.target.value,
							callback: setRarity,
							inputCallback: setInputRarity
						})
					}
					placeholder="Rarity"
					className="rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
				/>
			</div>

			<div
				className={clsx(
					isFetching && "opacity-50",
					"grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
				)}
			>
				{error && (
					<p className="col-span-full text-center text-red-500">
						Error loading cards
					</p>
				)}
				{!isFetching && cards?.length === 0 && (
					<p className="col-span-full text-center">No cards found.</p>
				)}

				{cards?.map(card => (
					<Link key={card.id} href={`/cards/${card.id}`}>
						<PokemonCard
							key={card.id}
							name={card.name}
							image={
								card.image
									? `${card.image}/high.webp`
									: "/back.webp"
							}
						/>
					</Link>
				))}
			</div>

			{/* pagination control */}
			<div className="mt-6 flex justify-center">
				<Pagination page={page} onPageChange={setPage} />
			</div>
		</div>
	);
};

export default CardList;
