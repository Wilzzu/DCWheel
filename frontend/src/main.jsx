// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import "./index.css";
import ErrorPage from "./routes/ErrorPage.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import WheelContextProvider from "../src/contexts/WheelContextProvider.jsx";
import PrivacyPolicy from "./routes/PrivacyPolicy.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: "privacy",
		element: <PrivacyPolicy />,
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<WheelContextProvider>
			<RouterProvider router={router} />
		</WheelContextProvider>
	</QueryClientProvider>
	// </React.StrictMode>
);
