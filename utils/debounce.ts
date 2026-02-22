import { SEARCH_DELAY, SEARCH_QUERY_MIN_LENGTH } from "./constants";

type DebounceCallType = {
	query: string;
	callback: (query: string) => void;
	inputCallback: (query: string) => void;
	delay?: number;
	bound?: number;
};

let searchTimer: ReturnType<typeof setTimeout> | number = 0;
export const debounceCall = ({
	query,
	callback,
	inputCallback,
	delay = SEARCH_DELAY,
	bound = SEARCH_QUERY_MIN_LENGTH
}: DebounceCallType) => {
	clearTimeout(searchTimer);
	inputCallback(query);

	if (query) {
		if (query.length > bound - 1) {
			searchTimer = setTimeout(callback, delay, query);
		}
	} else {
		callback(query);
	}
};
