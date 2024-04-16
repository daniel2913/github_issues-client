import { redirect, type RouteObject } from "react-router-dom";
import { GenericList } from "../components/GenericList";
import Issue from "../components/Issue";
import { useInfiniteQuery } from "@tanstack/react-query";
import { rectIssues } from "../data/rectifiers";
import { queryClient } from "../main";

export const repoRoute: RouteObject = {
	path: "repo/:owner/:repoName",
	Component: () => <GenericList Component={Issue} />,
	loader: async(args)=>{
		const { owner, repoName} = args.params;
		if (!owner || !repoName)
			return redirect("/not_found");

		const queryFn = async ({ pageParam }: { pageParam: string }) => {
			const res = await fetch(
				`/api/issues/?owner=${owner}&repo_name=${repoName}&after=${pageParam}`,
			);
			const issuesData = await res.json();
			return rectIssues(issuesData);
		};
		const queryKey = ["issues", owner, repoName]
		function useRouteQuery() {
			return useInfiniteQuery({
				queryKey,
				queryFn,
				initialPageParam: "null",
				getNextPageParam:(last)=>(last.hasNextPage && last.endCursor) || null,
				staleTime: 1000 * 60 * 10,
			});
		}
		queryClient.prefetchInfiniteQuery({
			queryKey,
			queryFn,
			initialPageParam: "null",
			staleTime: 1000*60*10
		});
		return {useRouteQuery}
	}
};

