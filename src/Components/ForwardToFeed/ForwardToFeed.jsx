import React from "react";
import style from "./ForwardToFeed.module.css";
import { Navigate } from "react-router-dom";

export default function ForwardToFeed() {
	return (
		<>
			{localStorage.getItem("socializzeUser") && (
				<Navigate to={"/Feed"} />
			)}
		</>
	);
}
