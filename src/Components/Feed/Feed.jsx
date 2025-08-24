import React, { useEffect, useState } from "react";
import style from "./Feed.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import PostCard from "../PostCard/PostCard";
import { CommentViewerModal } from "../CommentViewerModal/CommentViewerModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import CreatePost from "../CreatePost/CreatePost";
import EditPostModal from "../EditPostModal/EditPostModal";
import { Helmet } from "react-helmet";

export default function Feed() {
	const queryClient = useQueryClient();
	const [commentModalPostID, setCommentModalPostID] = useState("");
	const [openCommentsModal, setOpenCommentsModal] = useState(false);
	const [addCommentModalPostID, setAddCommentModalPostID] = useState("");
	const [openAddCommentsModal, setOpenAddCommentsModal] = useState(false);
	const [editPostModalPost, setEditPostModalPost] = useState("");
	const [openEditPostModal, setOpenEditPostModal] = useState(false);
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Helmet>
				<title>Socializze Feed</title>
			</Helmet>
			<CommentViewerModal
				openModal={openCommentsModal}
				setOpenModal={setOpenCommentsModal}
				postID={commentModalPostID}
			/>
			<AddCommentModal
				openModal={openAddCommentsModal}
				setOpenModal={setOpenAddCommentsModal}
				postID={addCommentModalPostID}
			/>
			<EditPostModal
				openModal={openEditPostModal}
				setOpenModal={setOpenEditPostModal}
				PostToEdit={editPostModalPost}
			/>

			{isLoading ? (
				<div className="h-dvh flex items-center justify-center -translate-y-1/12">
					<Loading />
				</div>
			) : (
				<div className="flex flex-col gap-5 w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto mt-5">
					<CreatePost />
					{data.data.posts.map((post) => {
						// console.log(post);
						return (
							<PostCard
								key={post.id}
								post={post}
								setCommentModalPostID={setCommentModalPostID}
								setOpenCommentsModal={setOpenCommentsModal}
								setAddCommentModalPostID={
									setAddCommentModalPostID
								}
								setOpenAddCommentsModal={
									setOpenAddCommentsModal
								}
								setEditPostModalPost={setEditPostModalPost}
								setOpenEditPostModal={setOpenEditPostModal}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
