"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { progCardFetcher, type CardBrief } from "@/data/fetcher";
import Pagination from "@/components/Pagination";
import { LIMIT } from "@/utils/constants";
import { debounceCall } from "@/utils/debounce";

type CardListProps = {
	initialCards: CardBrief[];
};

const initialState = {
	name: "",
	type: "",
	rarity: "",
	page: 1
};

const CardList = ({ initialCards }: CardListProps) => {
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
		initialData: initialCards
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
				{!isFetching && cards.length === 0 && (
					<p className="col-span-full text-center">No cards found.</p>
				)}
				{cards.map((card, idx) => (
					<div
						key={card.id}
						className="rounded border bg-white p-4 shadow transition hover:shadow-lg"
					>
						<p className="text-lg font-semibold">{card.name}</p>
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
								loading={idx < 9 ? "eager" : "lazy"}
								sizes="(min-width: 1280px) 400px, (min-width: 768px) 300px, 200px"
							/>
						</div>
					</div>
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
