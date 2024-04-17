import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import {createBrowserRouter } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import { authRoute } from "./routes/Auth";
import { searchRoute } from "./routes/Search";
import { repoRoute } from "./routes/Issues";
import { commentsRoute } from "./routes/Comments";
import { NotAllowed, NotFound, AuthError } from "./components/ErrorPages";


export let queryClient = new QueryClient();

function App() {
	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={Router} />
			</QueryClientProvider>
		</React.StrictMode>
	);
}

const Router = createBrowserRouter([
	{
		Component: MainLayout,
		children: [
			searchRoute,
			repoRoute,
			authRoute,
			commentsRoute(),
			{
				path: "not_allowed",
				Component: NotAllowed
			},
			{
				path: "*",
				Component: NotFound,
			},
			{
				path: "auth_failed",
				Component: AuthError
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<App/>)
