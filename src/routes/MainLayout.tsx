import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import GHIcon from "../data/GHIcon";
import { queryClient } from "../main";

export default function MainLayout() {
	const { data, isLoading, refetch } = useAuth();
	const navigate = useNavigate();
	return (
		<>
			<header className="flex text-lg px-8 h-16 items-center bg-gray-900">
				<h1 className="mr-auto text-xl">
					GitHub <span className="text-xs relative bottom-3">Skill</span> Issues
				</h1>
				<nav className="flex justify-between basis-3/5">
					<Link
						className="hover:underline underline-offset-4"
						to={"/search/all"}
					>
						Search Repositories
					</Link>
					<Link
						className="hover:underline underline-offset-4"
						to={"/search/own"}
					>
						Own Repositories
					</Link>
					<Link
						className="hover:underline underline-offset-4"
						to={"/search/star"}
					>
						Starred Repositories
					</Link>
					<Link
						className="hover:underline underline-offset-4"
						to={"/search/watch"}
					>
						Watched Repositories
					</Link>
				</nav>
				<div className="ml-auto">
					{data ? (
						<div className="flex gap-4 items-center">
							<a className="flex gap-2" href={data.url}>
								<img
									className="w-8 h-8 rounded-full"
									alt={data.login}
									src={data.avatarUrl}
								/>
								<p className="text-xl font-bold">{data.login}</p>
							</a>
							<button
								type="submit"
								onClick={async () => {
									const resp = await fetch("/api/auth/signout", {
										method: "GET",
									});
									if (resp.ok) {
										refetch()
										navigate("/search/all");
										queryClient.invalidateQueries({
											queryKey: ["authed"],
											exact: false,
										});
									}
								}}
								className="bg-red-400 rounded-lg px-2 py-1 font-bold"
							>
								Sign out
							</button>
						</div>
					) : isLoading ? (
						<p className="text-xl font-bold">Loading</p>
					) : (
						<a
							className="text-xl flex gap-2 font-bold"
							href="https://github.com/login/oauth/authorize?scope=public_repo&client_id=f510dbaedecaf3df4b62"
						>
							<GHIcon />
							Sign in
						</a>
					)}
				</div>
			</header>
			<div className="w-fit text-2xl items-center flex gap-2 px-2 py-2">
				<button
					className="bg-gray-800 px-4 py-1 rounded"
					onClick={() => navigate(-1)}
					type="button"
				>
					{"<"}
				</button>
				<button
					className="bg-gray-800 px-4 py-1 rounded"
					onClick={() => navigate(1)}
					type="button"
				>
					{">"}
				</button>
			</div>
			<div className="px-6 h-full flex flex-col justify-center items-center">
				<Outlet />
			</div>
		</>
	);
}
