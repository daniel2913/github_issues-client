import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import type { CommentProps } from "../data/types";

dayjs.extend(relative);
const relativeTime = (time: number) => dayjs(time).fromNow();

export function Comment(comment: CommentProps) {
	return (
		<div className="bg-gray-900 w-full text-white rounded-lg p-4 mb-4">
			<div className="flex items-center justify-between mb-2">
				<span className="font-bold flex gap-2">
					<img
						src={comment.author?.avatarUrl || ""}
						alt={comment.author?.login || ""}
						className="w-8 h-8 rounded-full mr-2"
					/>
					{comment.author?.login || "Unknown"}
				</span>
				<span className="text-gray-600">
							{relativeTime(dayjs(comment.createdAt).unix() * 1000)}
				</span>
			</div>
			<div
				className="text-white text-lg"
				dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
			/>
		</div>
	);
}
