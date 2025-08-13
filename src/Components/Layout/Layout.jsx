import React, { useState } from "react";
import style from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
	const [isDark, setIsDark] = useState(false);

	function toggleDark() {
		setIsDark(!isDark);
	}

	return (
		<>
			<NavBar isDark={isDark} toggleDark={toggleDark} />
			<ToastContainer />
			<Outlet />
			<Footer />
		</>
	);
}
