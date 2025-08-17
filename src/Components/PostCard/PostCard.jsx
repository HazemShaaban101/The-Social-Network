import React, { useState } from "react";
import style from "./PostCard.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function PostCard({
	post,
	setOpenCommentsModal,
	setCommentModalPostID,
	setOpenAddCommentsModal,
	setAddCommentModalPostID,
}) {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<>
			<div className="entirePost">
				<div
					className="postCard bg-[#f5f5f5] dark:bg-teal-600 w-full drop-shadow-2xl rounded-2xl overflow-hidden"
					onClick={() => {
						if (location.pathname !== `/posts/${post._id}`) {
							navigate(`/posts/${post._id}`);
						}
					}}>
					<div className="header flex justify-between items-center m-3 mb-0 pb-3 border-b-2 border-b-gray-400">
						<div className="userData flex gap-3 items-center">
							<img
								className="w-8 rounded-full bg-white"
								src={post.user?.photo}
								alt="user pic"
							/>
							<p className="text-teal-500 dark:text-white">
								{post.user?.name}
							</p>
						</div>
						<p className="text-gray-400">{post.createdAt}</p>
					</div>
					<div className="postContent">
						{post.body && <p className="p-3">{post.body}</p>}
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
			</div>
		</>
	);
}
