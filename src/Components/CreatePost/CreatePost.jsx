import React, { useState } from "react";
import style from "./CreatePost.module.css";
import CreatePostModal from "../CreatePostModal/CreatePostModal";

export default function CreatePost() {
	const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
	return (
		<>
			<CreatePostModal
				openModal={openCreatePostModal}
				setOpenModal={setOpenCreatePostModal}
			/>
			<div className="createPost py-5 px-3 bg-gradient-to-tl from-teal-600 to-teal-400 rounded-2xl">
				<p
					className="bg-teal-700 text-teal-400 p-4 pl-6 text-xl rounded-full cursor-pointer"
					onClick={() => {
						setOpenCreatePostModal(true);
					}}>
					Create post
				</p>
			</div>
		</>
	);
}
