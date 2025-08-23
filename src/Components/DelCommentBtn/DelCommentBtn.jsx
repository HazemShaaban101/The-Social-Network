import React, { useState } from "react";
import style from "./DelCommentBtn.module.css";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function DelCommentBtn({ commentID, postID }) {
	const [trashPending, setTrashPending] = useState(false);

	const queryClient = useQueryClient();

	return (
		<>
			<Button
				className=" w-9"
				color={"red"}
				onClick={async () => {
					setTrashPending(true);

					axios
						.delete(
							`https://linked-posts.routemisr.com/comments/${commentID}`,
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
								"getPostComments",
								postID,
							]);
							toast.success("Comment deleted successfully");
						})
						.catch((error) => {
							setTrashPending(false);
							toast.error("couldn't delete comment");
						});
				}}>
				{trashPending ? (
					<Spinner
						size="sm"
						aria-label="Info spinner example"
						className="w-10"
						light
					/>
				) : (
					<i className="fa fa-trash text-xs"></i>
				)}
			</Button>
		</>
	);
}
