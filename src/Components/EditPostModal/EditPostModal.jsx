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
	FileInput,
	HelperText,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditPostModal({ openModal, setOpenModal, PostToEdit }) {
	const [image, setImage] = useState("");

	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			body: "",
			image: "",
		},
	});

	useEffect(() => {
		setImage("");
		reset({ body: PostToEdit.body, image: PostToEdit.image });

		setImage(PostToEdit.image);
	}, [openModal]);

	useEffect(() => {});

	const queryClient = useQueryClient();

	function handleEditPost(formData) {
		console.log("1- ", PostToEdit);
		console.log("2- ", formData);

		return axios.put(
			`https://linked-posts.routemisr.com/posts/${PostToEdit._id}`,
			formData,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
				},
			}
		);
	}

	const { mutate: mutateEditPost, isPending } = useMutation({
		mutationFn: handleEditPost,
		onSuccess: () => {
			// add toasty notification
			toast.success("Post edited successfully!");
			// invalidate comment section
			queryClient.invalidateQueries([
				"getUserPosts",
				localStorage.getItem("socializzeUser"),
			]);
			// clear the form
			reset();
			// close the modal
			setOpenModal(false);
		},
		onError: (error) => {
			toast.error("Error editing post");
		},
	});

	function editPost(data) {
		// console.log(data.photo);
		let formData = new FormData();
		formData.append("body", data.body);
		formData.append("image", data.image);
		// for (let pair of formData.entries()) {
		// 	console.log(pair[0] + ", " + pair[1]);
		// }
		console.log("hello from editPost", data);
		mutateEditPost(formData);
	}

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Edit post</ModalHeader>
				<ModalBody>
					<form className="flex w-full flex-col gap-4">
						{/* post body */}
						<div>
							<div className="mb-2 block">
								<Label htmlFor="postBody"></Label>
							</div>
							<Controller
								name="body"
								control={control}
								render={({ field }) => (
									<TextInput
										id="postBody"
										type="text"
										placeholder="Write something"
										{...field}
										className="w-full"
									/>
								)}
							/>
						</div>
						{/* post pic */}
						<div>
							<div className="mb-2 block">
								<Label htmlFor="file"></Label>
							</div>
							<Controller
								name="image"
								control={control}
								render={({ field }) => (
									<FileInput
										id="file"
										onChange={(e) => {
											field.onChange(e.target.files[0]);
											console.log(control._formValues);
											setImage(control._formValues.image);
										}}
										accept="image/jpeg, image/png"
									/>
								)}
							/>
							<HelperText>
								uploaded image must be png, jpeg, or jpg.
							</HelperText>
						</div>

						{image ? (
							<img
								src={
									typeof image === "string"
										? image
										: URL.createObjectURL(image)
								}
								alt="Post pic"
								className="mx-auto w-75"
							/>
						) : (
							""
						)}

						<Button
							type="submit"
							className="w-3/12 mr-auto bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-800 hover:"
							onClick={handleSubmit(editPost)}>
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
