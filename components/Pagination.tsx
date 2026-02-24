"use client";

import React from "react";

type PaginationProps = {
	page: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({ page, onPageChange }: PaginationProps) => {
	const prev = () => {
		if (page > 1) onPageChange(page - 1);
	};

	const next = () => {
		onPageChange(page + 1);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10);
		if (!isNaN(value) && value >= 1) {
			onPageChange(value);
		}
	};

	return (
		<div className="pagination flex items-center space-x-2">
			<button
				onClick={prev}
				disabled={page <= 1}
				className="rounded bg-blue-500 px-3 py-1 text-white disabled:bg-gray-300"
			>
				Previous
			</button>
			<input
				type="number"
				value={page}
				min={1}
				onChange={handleInput}
				aria-label="page number"
				className="w-16 rounded border border-gray-300 px-2 py-1 text-center"
			/>
			<button
				onClick={next}
				className="rounded bg-blue-500 px-3 py-1 text-white"
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
