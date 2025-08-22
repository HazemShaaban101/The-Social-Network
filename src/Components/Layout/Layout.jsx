import React, { useState } from "react";
import style from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Layout() {
	const [isDark, setIsDark] = useState(false);
	const [userID, setUserID] = useState("");

	function toggleDark() {
		setIsDark(!isDark);
	}

	return (
		<>
			<div className="">
				<ReactQueryDevtools initialIsOpen={false} />
				<NavBar
					isDark={isDark}
					toggleDark={toggleDark}
					userID={userID}
					setUserID={setUserID}
				/>
				<ToastContainer />
				<Outlet context={{ userID: userID }} />
				<Footer />
			</div>
		</>
	);
}
