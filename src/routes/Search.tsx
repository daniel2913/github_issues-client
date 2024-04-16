import {
	type RouteObject,
	redirect,
} from "react-router-dom";
import { GenericList } from "../components/GenericList";
import { Repo } from "../components/Repo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchLayout } from "./searchLayout";
import { rectRepos } from "../data/rectifiers";
import { queryClient } from "../main";



export const searchRoute: RouteObject = {
	Component: () => (
		<>
			<SearchLayout />
			<GenericList Component={Repo} />
		</>
	),
	path: "search/:filter",
	loader: async (args) => {
		const { filter } = args.params;
		const searchParams = new URL(args.request.url).searchParams;
		const query = searchParams.get("query") || "";
		const queryKey = ["repos", filter, query];

		if (!filter || !["all", "star", "watch", "own"].includes(filter))
			return redirect("/not_found");

		if (filter !== "all") {
			if (!queryClient.getQueryData(["auth"])) return redirect("/not_allowed")
			queryKey.push("authed")
		}
		const queryFn = async ({ pageParam }: { pageParam: string }) => {
			const res = await fetch(
				`/api/search/${filter}?query=${query}&after=${pageParam}`,
			);
			const repoData = await res.json();
			return rectRepos(repoData);
		};
		function useRouteQuery() {
			return useInfiniteQuery({
				queryKey,
				queryFn,
				initialPageParam: "null",
				getNextPageParam: (last) => (last.hasNextPage && last.endCursor) || null,
				staleTime: 1000 * 60 * 10,
			});
		}
		await queryClient.prefetchInfiniteQuery({
			queryKey,
			queryFn,
			initialPageParam: "null",
			staleTime: 1000 * 60 * 10,
		});
		return { useRouteQuery };
	},
};


