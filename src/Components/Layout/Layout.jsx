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

	function toggleDark() {
		setIsDark(!isDark);
	}

	return (
		<>
			<div className="bg-teal-200 dark:bg-slate-900">
				<ReactQueryDevtools initialIsOpen={false} />
				<NavBar isDark={isDark} toggleDark={toggleDark} />
				<ToastContainer />
				<Outlet />
				<Footer />
			</div>
		</>
	);
}
