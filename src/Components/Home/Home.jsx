import React from "react";
import style from "./Home.module.css";
import homePic from "../../assets/Social interaction.gif";
import ForwardToFeed from "../ForwardToFeed/ForwardToFeed";
import { Helmet } from "react-helmet";

export default function Home() {
	// if user data is saved, forward user to feed page
	if (localStorage.getItem("socializzeUser")) {
		return <ForwardToFeed />;
	}
	return (
		<>
			<Helmet>
				<title>Socializze Home</title>
			</Helmet>
			<div className="w-full dark:bg-[#06606e] overflow-auto h-dvh">
				<div className="container mx-auto">
					<div className="flex flex-col md:flex-row items-center mt-10 gap-3">
						<div className="md:flex-1">
							<img
								src={homePic}
								alt="home pic for socializze"
								className="rounded-2xl"
							/>
						</div>
						<div className="md:flex-1 flex items-center justify-center flex-wrap content-center">
							<h1 className="text-center text-[#06606e] dark:text-white lg:text-6xl md:text-4xl sm-text-3xl text-2xl">
								Socializze is the new social media form!
							</h1>
							<h2 className="text-center text-[#8b8f9afd] lg:text-3xl md:text-2xl sm-text-xl text-lg mt-4">
								Scroll through cat videos, Make new friends,
								Share your memories to the world. All that and
								more on Socializze.
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
