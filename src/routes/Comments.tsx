import { redirect, type RouteObject } from "react-router-dom";
import { GenericList } from "../components/GenericList";
import { Comment } from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { useInfiniteQuery} from "@tanstack/react-query";
import { rectComments, rectDetailedIssue } from "../data/rectifiers";
import IssueDetailed from "../components/IssueDetailed";
import { queryClient } from "../main";

export const commentsRoute: ()=>RouteObject = ()=>({
	path: "repo/:owner/:repoName/:issueNumber",
	Component: () => (
		<>
			<IssueDetailed />
			<GenericList Component={Comment} />
			<CommentInput />
		</>
	),
	loader: async (args) => {
		const { owner, repoName, issueNumber } = args.params;
		if (!owner || !repoName || !issueNumber) return redirect("/not_found");

		const queryFn = async ({ pageParam }: { pageParam: string }) => {
			const res = await fetch(
				`/api/comments/?owner=${owner}&repo_name=${repoName}&issue_number=${issueNumber}&after=${pageParam}`,
			);
			const commentsData = await res.json();
			return rectComments(commentsData);
		};
		const queryKey = ["comments", owner, repoName, issueNumber];
		function useRouteQuery() {
			return useInfiniteQuery({
				queryKey,
				queryFn,
				initialPageParam: "null",
				getNextPageParam: (last) =>
					(last.hasNextPage && last.endCursor) || null,
				staleTime: 1000 * 60 * 10,
			});
		}
			queryClient.prefetchInfiniteQuery({
			queryKey,
			queryFn,
			initialPageParam: "null",
		});
		const issue = await fetchIssueDetails(owner, repoName, issueNumber);
		return { useRouteQuery, issue };
	},
})

async function fetchIssueDetails(
	owner: string,
	repoName: string,
	issueNumber: string,
) {
	const res = await fetch(
		`/api/issue_details/?owner=${owner}&repo_name=${repoName}&issue_number=${issueNumber}`,
	);
	const issueData = await res.json();
	return rectDetailedIssue(issueData);
}

