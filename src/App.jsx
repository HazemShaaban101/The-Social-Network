import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/Feed";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ path: "", element: <Home /> },
				{ path: "register", element: <Register /> },
				{ path: "login", element: <Login /> },
				{ path: "feed", element: <Feed /> },
				{ path: "profile", element: <Profile /> },
			],
		},
	]);

	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}>
					<Layout />
				</RouterProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
