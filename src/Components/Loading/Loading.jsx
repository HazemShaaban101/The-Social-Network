import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
	return (
		<>
			<div className="flex justify-center items-center w-full">
				<div className="sk-folding-cube">
					<div className="sk-cube1 sk-cube"></div>
					<div className="sk-cube2 sk-cube"></div>
					<div className="sk-cube4 sk-cube"></div>
					<div className="sk-cube3 sk-cube"></div>
				</div>
			</div>
		</>
	);
}
