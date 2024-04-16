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
						onKeyDown={e=>{if (e.key==="Enter") onClick()}}
						value={query}
						type="search"
						onInput={(e) => setQuery(e.currentTarget.value)}
					/>
					<button
						className="rounded-r-lg bg-emerald-400 w-12"
						type="button"
						onClick={onClick}
					>
						S
					</button>
				</div>
			</div>
		</div>
	);
}
