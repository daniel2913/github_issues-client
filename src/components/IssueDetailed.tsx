import { useLoaderData } from "react-router-dom";
import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import type { IssueDetailedProps } from "../data/types";

dayjs.extend(relative);
const relativeTime = (time: number) => dayjs(time).fromNow();

export default function IssueDetailed(){
	const {issue} = useLoaderData() as {issue:IssueDetailedProps}
  return (
    <div className="bg-gray-900 w-4/5 rounded-lg p-4 mb-20">
			<header className="flex justify-between">
				<span className="font-bold flex gap-2 mb-2">
					<img
						src={issue.author?.avatarUrl || ""}
						alt={issue.author?.login || ""}
						className="w-8 h-8 rounded-full mr-2"
					/>
				{issue.author?.login || "Unknown"}
				</span>
				<span className="text-gray-600">
							{relativeTime(dayjs(issue.createdAt).unix() * 1000)}
				</span>
			</header>
        <div className="ml-4">
          <h2 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: issue.titleHTML }}/>
        </div>
      <div className="mt-4 text-lg" dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}/>
    </div>
  );
};
