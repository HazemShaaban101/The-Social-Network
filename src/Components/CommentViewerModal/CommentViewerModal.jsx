import React from "react";
import style from "./CommentViewerModal.module.css";

import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function CommentViewerModal({ openModal, setOpenModal, postID }) {
	const getPostComments = () => {
		return axios.get(
			`https://linked-posts.routemisr.com/posts/${postID}/comments`,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
				},
			}
		);
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ["getPostComments", postID],
		queryFn: getPostComments,
		staleTime: 200000,
		enabled: !!postID,
	});
	// console.log(data);

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Comment section</ModalHeader>
				<ModalBody>
					{isLoading ? (
						<>
							<div className="spinner">
								<div className="double-bounce1"></div>
								<div className="double-bounce2"></div>
							</div>
						</>
					) : (
						<div className="commentHead flex flex-col gap-3 mx-5">
							{data?.data.comments &&
								data.data.comments.map((comment) => {
									// console.log(comment);
									return (
										<p
											key={comment._id}
											className="dark:text-white">
											<span className="text-teal-400">
												{comment.commentCreator.name}:{" "}
											</span>
											{comment.content}
										</p>
									);
								})}
						</div>
					)}
				</ModalBody>
				{/* <ModalFooter></ModalFooter> */}
			</Modal>
		</>
	);
}
