import React from "react";
import style from "./Footer.module.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
	const { pathname } = useLocation();

	return (
		<>
			<div
				className={
					pathname == "/" ||
					pathname == "/login" ||
					pathname == "/register"
						? "fixed bottom-0 left-0 right-0"
						: ""
				}>
				<div className="flex justify-center items-center p-1 flex-wrap text-white bg-teal-600 dark:bg-slate-700">
					<p className="text-md w-full text-center">
						Made by Hazem Shaaban for route academy.
					</p>
					<p className="text-gray-300">all rights reserved - 2025</p>
				</div>
			</div>
		</>
	);
}
