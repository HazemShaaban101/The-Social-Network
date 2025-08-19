import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
	return (
		<>
			<div className="flex justify-center items-center w-full">
				<div className="sk-folding-cube dark:!bg-slate-300">
					<div className="sk-cube1 sk-cube bg-teal-600"></div>
					<div className="sk-cube2 sk-cube bg-teal-900"></div>
					<div className="sk-cube4 sk-cube bg-teal-400"></div>
					<div className="sk-cube3 sk-cube bg-teal-700"></div>
				</div>
			</div>
		</>
	);
}
