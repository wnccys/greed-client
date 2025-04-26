import "@renderer/Assets/main.css";
import "@renderer/Assets/global.css";
import ReactDOM from "react-dom/client";
import { App } from "@renderer/App/App";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { SelectedGame } from "@renderer/SelectedGame";
import { Catalog } from "@renderer/Catalog";
import { ErrorElement } from "@renderer/ErrorElement";
import { Settings } from "@renderer/Settings";
import { Downloads } from "@renderer/Downloads";
import { Library } from "@renderer/Library";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@renderer/queryClient";

const router = createHashRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "catalog",
				element: <Catalog />,
			},
			{
				path: "selected-game/:gameId/:gameName",
				element: <SelectedGame />,
			},
			{
				path: "settings",
				element: <Settings />,
			},
			{ path: "downloads", element: <Downloads /> },
			{
				path: "library",
				element: <Library />,
			},
		],
		errorElement: <ErrorElement />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>,
);
