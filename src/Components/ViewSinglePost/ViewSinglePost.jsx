import React, { useState } from "react";
import style from "./ViewSinglePost.module.css";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import { CommentViewerModal } from "../CommentViewerModal/CommentViewerModal";

export default function ViewSinglePost() {
	const { postID } = useParams();
	const [openCommentsModal, setOpenCommentsModal] = useState(false);
	const [openAddCommentsModal, setOpenAddCommentsModal] = useState(false);

	// get feed posts
	const singlePost = () => {
		return axios.get(`https://linked-posts.routemisr.com/posts/${postID}`, {
			headers: {
				token: localStorage.getItem("socializzeUser"),
			},
		});
	};
	const { data, isFetching, isLoading, error } = useQuery({
		queryKey: ["getSinglePost", postID],
		queryFn: singlePost,
		staleTime: 200000,
	});

	return (
		<>
			{isLoading ? (
				<div className="h-dvh flex items-center justify-center -translate-y-1/12">
					<Loading />
				</div>
			) : (
				<>
					<div className="flex flex-col gap-5 w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto mt-5">
						<PostCard
							post={data?.data?.post}
							setOpenCommentsModal={setOpenCommentsModal}
							setOpenAddCommentsModal={setOpenAddCommentsModal}
							setAddCommentModalPostID={() => false}
							setCommentModalPostID={() => false}
						/>
						<AddCommentModal
							openModal={openAddCommentsModal}
							setOpenModal={setOpenAddCommentsModal}
							postID={postID}
						/>
						<CommentViewerModal
							openModal={openCommentsModal}
							setOpenModal={setOpenCommentsModal}
							postID={postID}
						/>
					</div>
				</>
			)}
		</>
	);
}
