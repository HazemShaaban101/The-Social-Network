import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
	Button,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Spinner,
	TextInput,
} from "flowbite-react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddCommentModal({ openModal, setOpenModal, postID }) {
	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			content: "",
			post: "",
		},
	});

	const queryClient = useQueryClient();

	useEffect(() => {
		if (postID) {
			reset({ content: "", post: postID });
		}
	}, [postID, reset]);

	function handleAddComment(data) {
		return axios.post(`https://linked-posts.routemisr.com/comments`, data, {
			headers: {
				token: localStorage.getItem("socializzeUser"),
			},
		});
	}

	const { mutate: mutateComment, isPending } = useMutation({
		mutationFn: handleAddComment,
		onSuccess: () => {
			// add toasty notification
			toast.success("Comment added successfully!");
			// invalidate comment section
			queryClient.invalidateQueries(["getPostComments", postID]);
			// clear the form
			reset();
			// close the modal
			setOpenModal(false);
		},
		onError: (error) => {
			toast.error("Error adding comment: ", error);
		},
	});

	function addComment(data) {
		mutateComment(data);
	}

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Add comment</ModalHeader>
				<ModalBody>
					<form className="flex w-full flex-col gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="comment"></Label>
							</div>
							<Controller
								name="content"
								control={control}
								render={({ field }) => (
									<TextInput
										id="comment"
										type="text"
										placeholder="Your comment..."
										required
										{...field}
										className="w-full"
									/>
								)}
							/>
						</div>
						<div className="hidden">
							<div className="mb-2 block">
								<Label htmlFor="postID">post ID</Label>
							</div>
							<Controller
								name="post"
								control={control}
								render={({ field }) => (
									<TextInput
										id="postID"
										type="text"
										value={postID}
										required
										{...field}
									/>
								)}
							/>
						</div>
						<Button
							type="submit"
							className="w-3/12 mr-auto bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-800 hover:"
							onClick={handleSubmit(addComment)}>
							{isPending ? (
								<Spinner
									size="sm"
									aria-label="Info spinner example"
									className="w-10"
									light
								/>
							) : (
								"Submit"
							)}
						</Button>
					</form>
				</ModalBody>
				{/* <ModalFooter></ModalFooter> */}
			</Modal>
		</>
	);
}
