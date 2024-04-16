import { useQuery } from "@tanstack/react-query";
import { redirect, type RouteObject} from "react-router-dom";

export const authRoute: RouteObject = {
	path: "auth",
	loader: async (params) => {
		const searchParams = new URL(params.request.url).searchParams;
		const code = searchParams.get("code") || "";
		if (code === "") {
			return redirect("/auth_failed");
		}
		const res = await fetch(`/api/auth/signin/?code=${code}`, {
			method: "GET",
		});
		if (!res.ok) {
			return redirect("/auth_failed");
		}
		return redirect("/search/all");
	},
	Component: () => (
		<div className="size-full flex justify-center items-center">
			<div className="bg-gray-900 text-white p-4 rounded-lg text-center">
				Authentication will soon be completed. Please wait a few seconds...
			</div>
		</div>
	),
};

export function useAuth() {
	return useQuery({
		queryKey: ["auth"],
		queryFn: whoami,
		staleTime: Number.POSITIVE_INFINITY,
	});
}

async function whoami() {
	const res = await fetch("/api/auth");
	if (res.status === 403) {
		return null;
	}
	if (res.status !== 200) throw res.statusText;
	const data = await res.json();
	return data.data.viewer as {
		name: string;
		login: string;
		avatarUrl: string;
		url: string;
	};
}
