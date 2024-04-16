import {
	useLoaderData,
} from "react-router-dom";
import React  from "react";
import { useAuth } from "../routes/Auth";
import type { ListRouteLoader } from "./GenericList";
import type { CommentProps } from "postcss";
import type { IssueDetailedProps } from "../data/types";

export default function CommentInput() {
	const {
		issue: { id },
		useRouteQuery,
	} = useLoaderData() as {
		issue: IssueDetailedProps;
		useRouteQuery: Awaited<
			ReturnType<ListRouteLoader<CommentProps>>
		>["useRouteQuery"];
	};
	const [comment, setComment] = React.useState("");
	const [loading,setLoading] = React.useState(false)
	const { data: user } = useAuth();
	const { hasNextPage, refetch } = useRouteQuery();
	if (!user || hasNextPage) return null;
	return (
		<div className="flex items-start justify-center w-full">
			<form
				onSubmit={async (e)=>{
					e.preventDefault()
					const form = new FormData(e.currentTarget)
					setLoading(true)
					const resp = await fetch(`/api/comments/new?subject_id=${id}`,{method:"post",body:form})
					setLoading(false)
					if (resp.ok){
						setComment("")
						refetch()
					}
				}}
				className="mt-4 w-4/5 relative"
			>
			<img
				src={user.avatarUrl}
				alt="User Avatar"
				className="w-12 absolute -left-14 top-1 h-12 rounded-full mr-4"
			/>
				<textarea
					value={comment}
					name="body"
					onChange={(e) => setComment(e.currentTarget.value)}
					placeholder="Enter your comment..."
					className="w-full p-2 border rounded text-black"
				>
				</textarea>
				<div className="flex justify-end">
				<button
					type="submit"
					disabled={loading}
					className="mt-2 disabled:bg-blue-200 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
				>
					Add Comment
				</button>
				</div>
			</form>
		</div>
	);
}
