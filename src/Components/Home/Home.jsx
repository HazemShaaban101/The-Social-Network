import React from "react";
import style from "./Home.module.css";
import homePic from "../../assets/Social interaction.gif";

export default function Home() {
	return (
		<>
			<div className="w-full dark:bg-[#06606e]">
				<div className="container mx-auto">
					<div className="flex">
						<div className="flex-1">
							<img src={homePic} alt="home pic for socializze" />
						</div>
						<div className="flex-1 flex items-center justify-center flex-wrap content-center">
							<h1 className="text-center text-[#06606e] dark:text-white text-6xl">
								Socializze is the new social media form!
							</h1>
							<h2 className="text-center text-[#8b8f9afd] text-3xl mt-4">
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
