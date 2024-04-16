import { Link } from "react-router-dom";
import type { RepoProps } from "../data/types";

export function Repo(repo: RepoProps) {
	return (
		<article className="flex h-40 w-full justify-start gap-8 bg-gray-900 p-4 rounded-lg overflow-hidden">
			<div className="basis-1/5 h-full aspect-square flex-grow-0 relative">
				<a className="" href={repo.owner.url}>
					<img
						className="h-full absolute inset-0 object-fill rounded-full"
						alt={repo.owner.login}
						src={repo.owner.avatarUrl}
					/>
				</a>
			</div>
			<div className="basis-full">
				<Link to={`/repo/${repo.owner.login}/${repo.name}`}>
					<h2 className="mb-4 text-emerald-500 text-4xl break-words ">
						{repo.owner.login}/&shy;{repo.name} 
					</h2>
				</Link>
				<p
					className="text-3xl"
					dangerouslySetInnerHTML={{ __html: repo.descriptionHTML }}
				/>
			</div>
			<footer className="flex flex-col justify-center ml-auto gap-8 items-end">
				<span className="flex gap-2 items-center">
					{repo.issues}
					<svg
						aria-hidden="true"
						height="20"
						viewBox="0 0 16 16"
						version="1.1"
						width="20"
						data-view-component="true"
						className="fill-gray-600"
					>
						<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
						<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>
					</svg>
				</span>
				<span className="flex gap-2 items-center">
					{repo.stargazers}
					<svg
						aria-hidden="true"
						height="20"
						viewBox="0 0 16 16"
						version="1.1"
						width="20"
						data-view-component="true"
						className=" fill-gray-600"
					>
						<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
					</svg>
				</span>
			</footer>
		</article>
	);
}
