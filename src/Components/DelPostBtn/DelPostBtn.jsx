import React, { useState } from "react";
import style from "./DelPostBtn.module.css";
import { Button, Spinner } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function DelPostBtn({ postID }) {
	const [trashPending, setTrashPending] = useState(false);
	const queryClient = useQueryClient();
	return (
		<>
			<Button
				color={"red"}
				className="w-[40px] h-[40px] rounded-full"
				onClick={async () => {
					setTrashPending(true);

					axios
						.delete(
							`https://linked-posts.routemisr.com/posts/${postID}`,
							{
								headers: {
									token: localStorage.getItem(
										"socializzeUser"
									),
								},
							}
						)
						.then(() => {
							queryClient.invalidateQueries([
								"getUserPosts",
								localStorage.getItem("socializzeUser"),
							]);
							queryClient.invalidateQueries(["getFeed"]);
							toast.success("post Deleted successfully");
						})
						.catch((error) => {
							setTrashPending(false);
							toast.error("couldn't delete post");
						});
				}}>
				{trashPending ? (
					<div className="flex justify-center items-center">
						<Spinner
							size="sm"
							aria-label="Info spinner example"
							className="mb-1"
							light
						/>
					</div>
				) : (
					<i className="fa fa-trash-alt p-0 m-0"></i>
				)}
			</Button>
		</>
	);
}
