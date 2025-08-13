import React from "react";
import style from "./RouteProtector.module.css";
import { Navigate } from "react-router-dom";

export default function RouteProtector() {
	return (
		<>{!localStorage.getItem("socializzeUser") && <Navigate to={"/"} />}</>
	);
}
