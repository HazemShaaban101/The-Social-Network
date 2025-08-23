import React, { useEffect } from "react";
import style from "./CommentViewerModal.module.css";

import {
	Button,
	buttonGroupTheme,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Spinner,
} from "flowbite-react";
import { useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import CommentEditorModal from "../CommentEditorModal/CommentEditorModal";
import { toast } from "react-toastify";
import DelCommentBtn from "../DelCommentBtn/DelCommentBtn";

export function CommentViewerModal({ openModal, setOpenModal, postID }) {
	const [commentData, setCommentData] = useState({ id: "", comment: "" });

	const [openEditCommentModal, setOpenEditCommentModal] = useState(false);

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

	// get user data
	function getUserData() {
		return axios.get(
			"https://linked-posts.routemisr.com/users/profile-data",
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
					// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiY2YzZTMzZGEyMTdjNGFmMjFmMDAiLCJpYXQiOjE3MTYyNDYyNzJ9.OQe7MoFR8-z4zqJQjSkJxn37guZeKxUSJgMZLSliuVQ",
				},
			}
		);
	}

	const userData = useQuery({
		queryKey: ["getUserData", localStorage.getItem("socializzeUser")],
		queryFn: getUserData,
		staleTime: 200000,
		retry: false,
	});

	useEffect(() => {
		commentData.comment && setOpenEditCommentModal(true);
	}, [commentData]);

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
										<div
											className=" flex justify-between items-center"
											key={comment._id}>
											<p className="dark:text-white">
												<span className="text-teal-400">
													{
														comment.commentCreator
															.name
													}
													:{" "}
												</span>
												{comment.content}
											</p>
											{comment?.commentCreator?._id ==
												userData?.data?.data?.user
													._id && (
												<div className="flex gap-2">
													<Button
														className="w-9"
														color={"yellow"}
														onClick={() => {
															setCommentData(
																structuredClone(
																	{
																		id: comment._id,
																		comment:
																			comment.content,
																	}
																)
															);
														}}>
														<i className="fa fa-pencil text-xs"></i>
													</Button>
													<DelCommentBtn
														commentID={comment._id}
														postID={postID}
													/>
												</div>
											)}
										</div>
									);
								})}
						</div>
					)}
				</ModalBody>
				{/* <ModalFooter></ModalFooter> */}

				<CommentEditorModal
					openModal={openEditCommentModal}
					setOpenModal={setOpenEditCommentModal}
					comment={commentData}
				/>
			</Modal>
		</>
	);
}
