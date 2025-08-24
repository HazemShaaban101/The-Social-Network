import React, { useState } from "react";
import style from "./PostCard.module.css";
import {
	Navigate,
	useLocation,
	useNavigate,
	useOutletContext,
} from "react-router-dom";
import { Button } from "flowbite-react";
import DelPostBtn from "../DelPostBtn/DelPostBtn";

export default function PostCard({
	post,
	setOpenCommentsModal,
	setCommentModalPostID,
	setOpenAddCommentsModal,
	setAddCommentModalPostID,
	setEditPostModalPost,
	setOpenEditPostModal,
}) {
	const navigate = useNavigate();
	const location = useLocation();

	const { userID } = useOutletContext();

	return (
		<>
			<div className="entirePost relative group overflow-hidden last-of-type:mb-3">
				<div
					className="postCard bg-[#f5f5f5] dark:bg-gradient-to-bl dark:from-teal-600  dark:to-teal-300 dark:text-white w-full drop-shadow-2xl rounded-2xl overflow-hidden"
					onClick={() => {
						if (location.pathname !== `/posts/${post._id}`) {
							navigate(`/posts/${post._id}`);
						}
					}}>
					<div className="header flex justify-between items-center m-3 mb-0 pb-3 border-b-2 border-b-gray-400">
						<div className="userData flex gap-3 items-center">
							<img
								className="w-8 rounded-full bg-white"
								src={post?.user?.photo}
								alt="user pic"
							/>
							<p className="text-teal-500 dark:text-white">
								{post?.user?.name}
							</p>
						</div>
						<p className="text-gray-400">{post.createdAt}</p>
					</div>
					<div className="postContent">
						{post.body && (
							<p className="m-3 text-wrap overflow-hidden">
								{post.body}
							</p>
						)}
						{post.image && (
							<img
								className="w-full"
								src={post.image}
								alt="post pic"
							/>
						)}
					</div>
				</div>

				<div
					className="commentSection w-full  py-3 bg-gradient-to-br from-teal-600 to-teal-400 text-white mt-2 rounded-2xl overflow-hidden"
					onClick={() => {
						setCommentModalPostID(post._id);
						setOpenCommentsModal(true);
					}}>
					<div className="commentHead flex flex-col gap-3 mx-5">
						{post?.comments[0]?.commentCreator.name && (
							<p>
								<span className="text-teal-400">
									{post?.comments[0].commentCreator.name}:{" "}
								</span>
								{post?.comments[0].content}
							</p>
						)}
						{post?.comments[1]?.commentCreator.name && (
							<p>
								<span className="text-teal-400">
									{post?.comments[1].commentCreator.name}:{" "}
								</span>
								{post?.comments[1].content}
							</p>
						)}
						{post?.comments[2]?.commentCreator.name && (
							<p>
								<span className="text-teal-400">
									{post?.comments[2].commentCreator.name}:{" "}
								</span>
								{post?.comments[2].content}
							</p>
						)}
					</div>
					<div
						className="createComment mx-2"
						onClick={(e) => {
							e.stopPropagation();
							setAddCommentModalPostID(post._id);
							setOpenAddCommentsModal(true);
						}}>
						<button className="w-full p-3 bg-teal-800 rounded-full mt-2 hover:cursor-pointer text-left text-teal-300">
							Create comment
						</button>
					</div>
				</div>
				{post.user._id == userID && (
					<div className="absolute left-1/2 -translate-x-1/2 -top-[50px] group-hover:top-1.5 flex gap-3 transition-all duration-[300ms] delay-[1s]">
						<Button
							color={"yellow"}
							className="w-[40px] h-[40px] rounded-full"
							onClick={() => {
								setEditPostModalPost(post);
								setOpenEditPostModal(true);
							}}>
							<i className="fa fa-pencil-alt"></i>
						</Button>
						<DelPostBtn postID={post._id} />
					</div>
				)}
			</div>
		</>
	);
}
