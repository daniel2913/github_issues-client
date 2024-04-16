import type { CommentsRequest, IssueDetailed, IssuesRequest, SearhPersonalRequest, SearhPublicRequest } from "./types";

export function rectDetailedIssue(data: IssueDetailed) {
	return data.data.repository.issue;
}

export function rectComments(data: CommentsRequest) {
	const page = data.data.repository.issue.comments.nodes;
	return { page, ...data.data.repository.issue.comments.pageInfo };
}

export function rectIssues(data: IssuesRequest) {
	const page = data.data.repository.issues.nodes.map((issue) => ({
		...issue,
		author: issue.author.login,
		comments: issue.comments.totalCount,
	}));
	return { page, ...data.data.repository.issues.pageInfo };
}

export function rectRepos(data: SearhPublicRequest | SearhPersonalRequest) {
	const list =
		"search" in data.data
			? data.data.search.edges.map((node) => ({ ...node.node }))
			: data.data.user[Object.keys(data.data.user)[0]].nodes;
	const page = list.map((item) => ({
		...item,
		stargazers: item.stargazers.totalCount,
		issues: item.issues.totalCount,
	}));
	const pageInfo =
		"search" in data.data
			? data.data.search.pageInfo
			: data.data.user[Object.keys(data.data.user)[0]].pageInfo;
	return { page, ...pageInfo };
}
