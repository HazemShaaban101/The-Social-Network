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

export default function CommentEditorModal({
	openModal,
	setOpenModal,
	comment,
}) {
	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			content: "",
		},
	});

	useEffect(() => {
		reset({ content: comment.comment });
	}, [comment]);

	const queryClient = useQueryClient();

	function handleEditComment(data) {
		return axios.put(
			`https://linked-posts.routemisr.com/comments/${comment.id}`,
			data,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
				},
			}
		);
	}

	const { mutate: mutateEditComment, isPending } = useMutation({
		mutationFn: handleEditComment,
		onSuccess: () => {
			// add toasty notification
			toast.success("Comment edited successfully!");
			// invalidate comment section
			queryClient.invalidateQueries(["getPostComments"]);
			// clear the form
			reset();
			// close the modal
			setOpenModal(false);
		},
		onError: (error) => {
			toast.error("Error editing comment :(");
		},
	});

	function editComment(data) {
		mutateEditComment(data);
	}

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Edit comment</ModalHeader>
				<ModalBody>
					<form className="flex w-full flex-col gap-4">
						<div>
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
						<Button
							type="submit"
							className="w-3/12 mr-auto bg-yellow-600 text-white hover:bg-yellow-700 focus:bg-yellow-800 hover:"
							onClick={handleSubmit(editComment)}>
							{isPending ? (
								<Spinner
									size="sm"
									aria-label="Info spinner example"
									className="w-10"
									light
								/>
							) : (
								"Edit comment"
							)}
						</Button>
					</form>
				</ModalBody>
				{/* <ModalFooter></ModalFooter> */}
			</Modal>
		</>
	);
}
