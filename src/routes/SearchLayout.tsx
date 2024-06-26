import React from "react";
import { useSearchParams } from "react-router-dom";

export function SearchLayout() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = React.useState(searchParams.get("query") || "");
	function onClick() {
		setSearchParams((old) => ({ ...old, query }));
	}
	if (!location.pathname.includes("search/all")) return null
	return (
		<div className="w-full flex justify-center">
			<div className="w-4/5 min-w-[50rem] flex flex-col items-center">
				<div className="w-1/2 p-4 flex justify-center">
					<input
						className="text-black text-3xl p-2 px-4 w-full rounded-l-lg"
						onKeyDown={e => { if (e.key === "Enter") onClick() }}
						value={query}
						type="search"
						onInput={(e) => setQuery(e.currentTarget.value)}
					/>
					<button
						className="rounded-r-lg bg-emerald-400 w-12 flex justify-center items-center"
						type="button"
						onClick={onClick}
					>
						<svg
							width="30"
							height="30"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C2.68629 1 0 3.68629 0 7C0 10.3137 2.68629 13 6 13C7.64669 13 9.13845 12.3366 10.2226 11.2626L14.7873 14.8403C15.1133 15.0959 15.5848 15.0387 15.8403 14.7127C16.0958 14.3867 16.0387 13.9153 15.7126 13.6597L11.1487 10.0826C11.6892 9.18164 12 8.12711 12 7C12 3.68629 9.31371 1 6 1ZM1.5 7C1.5 4.51472 3.51472 2.5 6 2.5C8.48528 2.5 10.5 4.51472 10.5 7C10.5 9.48528 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48528 1.5 7Z" fill="currentColor" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
