import { rectComments, rectDetailedIssue, rectIssues, rectRepos } from "./rectifiers";

type Author = {
	login: string;
	avatarUrl: string;
	url: string;
};

type Comment = {
	createdAt: string;
	bodyHTML: string;
	author: Author;
};

export type CommentsRequest = {
	data: {
		repository: {
			issue: {
				comments: {
					nodes: Comment[];
					pageInfo: PageInfo;
				};
			};
		};
	};
};

export type IssueDetailed = {
	data: {
		repository: {
			issue: {
				author: Author;
				titleHTML: string;
				bodyHTML: string;
				createdAt: string;
				id: string;
			};
		};
	};
};

type Issue = {
	titleHTML: string;
	number: number;
	createdAt: string;
	url: string;
	author:Author
	comments: {
		totalCount: number;
	};
};

export type IssuesRequest = {
	data: {
		repository: {
			issues: {
				nodes: Issue[];
				pageInfo: PageInfo;
			};
		};
	};
};


export type PageInfo = {
	hasNextPage: boolean;
	endCursor: string;
};

export type SearhPublicRequest = {
	data: {
		search: {
			edges: {
				node: Repository;
			}[];
			pageInfo: PageInfo;
		};
	};
};

export type SearhPersonalRequest = {
	data: {
		user: {
			[key: string]: {
				nodes: Repository[];
				pageInfo: PageInfo;
			};
		};
	};
};

export type Repository = {
	name: string;
	issues: {
		totalCount: number;
	};
	stargazers: {
		totalCount: number;
	};
	url: string
	descriptionHTML: string;
	owner: {
		id: string;
		login: string;
		url: string;
		avatarUrl: string;
	};
};

export type IssueProps = ReturnType<typeof rectIssues>["page"][number];
export type IssueDetailedProps = ReturnType<typeof rectDetailedIssue>;
export type CommentProps = ReturnType<typeof rectComments>["page"][number];
export type RepoProps = ReturnType<typeof rectRepos>["page"][number]
