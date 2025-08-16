import React, { useState } from "react";
import style from "./Feed.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import PostCard from "../PostCard/PostCard";
import { CommentViewerModal } from "../CommentViewerModal/CommentViewerModal";

export default function Feed() {
	const queryClient = useQueryClient();
	const [commentModalPostID, setCommentModalPostID] = useState("");
	const [openCommentsModal, setOpenCommentsModal] = useState(false);
	// get feed posts
	const feed = () => {
		return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
			headers: {
				token: localStorage.getItem("socializzeUser"),
			},
		});
	};
	const { data, isFetching, isLoading, error } = useQuery({
		queryKey: ["getFeed"],
		queryFn: feed,
		staleTime: 200000,
	});

	return (
		<>
			<CommentViewerModal
				openModal={openCommentsModal}
				setOpenModal={setOpenCommentsModal}
				postID={commentModalPostID}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<div className="flex flex-col gap-5 w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto mt-5">
					{data.data.posts.map((post) => {
						// console.log(post);
						return (
							<PostCard
								key={post.id}
								post={post}
								setCommentModalPostID={setCommentModalPostID}
								setOpenCommentsModal={setOpenCommentsModal}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
