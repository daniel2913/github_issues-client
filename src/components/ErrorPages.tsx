import { Link, useNavigate } from "react-router-dom";
import GHIcon from "../data/GHIcon";

type ErrorPageProps = {
	children: React.ReactNode
	title: string
	description: string
}

function ErrorPage(props: ErrorPageProps) {
	return (
		<div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 bg-black flex items-center justify-center">
			<div className="p-8 bg-gray-900 shadow-lg rounded-lg">
				<h1 className="text-3xl text-center font-bold text-red-600 mb-4">
					{props.title}
				</h1>
				<p className="text-white text-xl font-bold mb-6">
					{props.description}
				</p>
				<div className="flex justify-center space-x-4">
					{props.children}
				</div>
			</div>
		</div>
	)
}

export function AuthError() {
	return (
		<ErrorPage title="Authentication failed" description="Sorry, your authentication failed. Please try again.">
			<Link
				to={`https://github.com/login/oauth/authorize?scope=public_repo&client_id=f510dbaedecaf3df4b62&redirect=${document.referrer}`}
				className="flex gap-2 items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				<GHIcon />
				Try again
			</Link>
			<Link
				to="/search/all"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Main Page
			</Link>
		</ErrorPage>
	)
}

export function NotFound() {
	const navigate = useNavigate()
	return (
		<ErrorPage title="Page Not Found" description="This page doesn't seem to exist">
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="flex gap-2 items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Go back
			</button>
			<Link
				to="/search/all"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Main Page
			</Link>
		</ErrorPage>
	)
}

export function NotAllowed() {
	return (
		<ErrorPage title="Not Allowed" description="You do not have permission to access this page.">
			<Link
				to={`https://github.com/login/oauth/authorize?scope=public_repo&client_id=f510dbaedecaf3df4b62&redirect=${document.referrer}`}
				className="flex gap-2 items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				<GHIcon />
				Sign In
			</Link>
			<Link
				to="/search/all"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Main Page
			</Link>
		</ErrorPage>
	)
}
