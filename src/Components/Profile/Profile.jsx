import React, { useState } from "react";
import style from "./Profile.module.css";
import RouteProtector from "../RouteProtector/RouteProtector";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StandardUserAvatar from "../../assets/generic profile.png";
import { Button } from "flowbite-react";
import Loading from "../Loading/Loading";
import PostCard from "../PostCard/PostCard";
import { CommentViewerModal } from "../CommentViewerModal/CommentViewerModal";
import AddCommentModal from "../AddCommentModal/AddCommentModal";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

export default function Profile() {
	// modal states
	const [commentModalPostID, setCommentModalPostID] = useState("");
	const [openCommentsModal, setOpenCommentsModal] = useState(false);
	const [addCommentModalPostID, setAddCommentModalPostID] = useState("");
	const [openAddCommentsModal, setOpenAddCommentsModal] = useState(false);
	const [openChangePasswordsModal, setOpenAChangePasswordModal] =
		useState(false);

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

	const { data, isLoading, error } = useQuery({
		queryKey: ["getUserData", localStorage.getItem("socializzeUser")],
		queryFn: getUserData,
		staleTime: 200000,
		retry: false,
	});

	// get user data
	function getUserPosts() {
		return axios.get(
			`https://linked-posts.routemisr.com/users/${data.data.user._id}/posts`,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
					// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRiY2YzZTMzZGEyMTdjNGFmMjFmMDAiLCJpYXQiOjE3MTYyNDYyNzJ9.OQe7MoFR8-z4zqJQjSkJxn37guZeKxUSJgMZLSliuVQ",
				},
			}
		);
	}

	const posts = useQuery({
		queryKey: ["getUserPosts", localStorage.getItem("socializzeUser")],
		queryFn: getUserPosts,
		staleTime: 200000,
		enabled: !!data?.data?.user?._id,
	});
	console.log(data);
	return (
		<>
			<RouteProtector />

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
			<ChangePasswordModal
				openModal={openChangePasswordsModal}
				setOpenModal={setOpenAChangePasswordModal}
			/>

			<div className="userData rounded-b-2xl py-10 bg-gradient-to-br from-teal-600 via-cyan-400 to-teal-800 text-white flex flex-col items-center">
				<img
					src={
						data?.data.user.photo
							? data?.data.user.photo
							: StandardUserAvatar
					}
					alt="user profile pic"
					width={"150px"}
					className="rounded-full mb-5"
				/>
				<p>
					<span className="font-bold">Name:</span>{" "}
					{data?.data.user.name}
				</p>
				<p>
					<span className="font-bold">Email:</span>{" "}
					{data?.data.user.email}
				</p>
				<p>
					<span className="font-bold">Gender:</span>{" "}
					{data?.data.user.gender}
				</p>
				<p>
					<span className="font-bold">Birthday:</span>{" "}
					{data?.data.user.dateOfBirth}
				</p>

				<div className="flex gap-5 mt-5">
					<Button className="bg-slate-600 hover:bg-slate-700 focus:bg-slate-800">
						Upload profile pic
					</Button>
					<Button
						className="bg-slate-600 hover:bg-slate-700 focus:bg-slate-800"
						onClick={() => {
							setOpenAChangePasswordModal(true);
						}}>
						Update password
					</Button>
				</div>
			</div>

			<div className="userPosts">
				<div className="flex flex-col gap-5 w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto mt-5">
					<h1 className="text-center text-4xl font-mono from-teal-700 to-teal-400 rounded-2xl p-5 text-white bg-gradient-to-br">
						User posts
					</h1>
					{!posts.isLoading ? (
						posts?.data?.data.posts.map((post) => {
							return (
								<PostCard
									key={post.id}
									post={post}
									setCommentModalPostID={
										setCommentModalPostID
									}
									setOpenCommentsModal={setOpenCommentsModal}
									setAddCommentModalPostID={
										setAddCommentModalPostID
									}
									setOpenAddCommentsModal={
										setOpenAddCommentsModal
									}
								/>
							);
						})
					) : (
						<div className="h-dvh flex items-center justify-center -translate-y-1/12">
							<Loading />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
