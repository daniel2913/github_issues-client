import type { useInfiniteQuery } from "@tanstack/react-query";
import {
	useLoaderData,
	useNavigate,
	type LoaderFunctionArgs,
} from "react-router-dom";

export type ListRouteLoader<T> = (
	args: LoaderFunctionArgs,
) => Promise<{ useRouteQuery: () => ReturnType<typeof useInfiniteQuery<{ page: T[] }>> }>;

export type QueryFn<T> = ({ pageParam }: { pageParam: string }) => Promise<{
	page: T[];
	hasNextPage: boolean;
	endCursor: string;
}>;

export function GenericList<T extends Record<string, unknown>>({
	Component,
}: { Component: React.FunctionComponent<T> }) {
	const nav = useNavigate();
	const { useRouteQuery } = useLoaderData() as Awaited<
		ReturnType<ListRouteLoader<T>>
	>;
	if (!useRouteQuery) {
		nav("/error");
		return null;
	}
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		refetch,
		isFetchingNextPage,
	} = useRouteQuery();
	if (!data) {
		if (isFetching) return <span className="text-lg font-bold">Loading...</span>
		return <ErrorElement onClick={refetch} />;
	}
	return (
		<ol className="flex flex-col w-full items-center gap-12 ">
			{data.pages.map((page) =>
				page.page.map((props, idx) => (
					<li key={idx} className="w-4/5">
						<Component {...props} />
					</li>
				))
			)}
			{hasNextPage ? (
				<button
					className="bg-gray-200 disabled:bg-gray-400 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg"
					type="button"
					disabled={isFetchingNextPage}
					onClick={() => fetchNextPage()}
				>
					{isFetchingNextPage ? "Loading" : "Load more"}
				</button>
			) : null}
		</ol>
	);
}

type ErrorElementProps = {
	onClick: () => void;
};

function ErrorElement(props: ErrorElementProps) {
	return (
		<div className="size-full flex justify-center items-center text-lg font-bold">
			<button onClick={props.onClick} type="button" className="rounded-lg bg-red-400 px-2 py-1">
				<span className="">Some Error Occured</span>
				<br />
				<span>Try Again</span>
			</button>
		</div>
	);
}
