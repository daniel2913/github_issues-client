import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import type { IssueProps } from "../data/types";

dayjs.extend(relative);
const relativeTime = (time: number) => dayjs(time).fromNow();

export default function Issue(issue: IssueProps) {
	return (
		<Link to={`${issue.number}`}>
			<article className="bg-gray-900 rounded-lg p-6 mb-4">
				<div className="flex items-center mb-2">
					<span className="font-bold">{issue.author}</span>
				</div>
				<div className="flex items-center justify-between mb-4">
					<div className="basis-4/5">
						<h2
							dangerouslySetInnerHTML={{ __html: issue.titleHTML }}
							className="text-xl font-bold"
						/>
					</div>
					<div className="flex flex-col items-end">
						<span className="flex gap-2 items-center">
							{issue.comments}
							<svg
								aria-hidden="true"
								height="20"
								viewBox="0 0 16 16"
								version="1.1"
								width="20"
								data-view-component="true"
								className="fill-gray-600"
							>
								<path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
							</svg>
						</span>
						<span className="text-gray-600">
							{relativeTime(dayjs(issue.createdAt).unix() * 1000)}
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
}
