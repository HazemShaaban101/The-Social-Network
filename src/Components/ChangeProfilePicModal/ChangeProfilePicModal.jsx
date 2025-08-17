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

export default function ChangeProfilePicModal({
	openModal,
	setOpenModal,
	oldPic,
}) {
	const [image, setImage] = useState("");

	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			photo: "",
		},
	});

	const queryClient = useQueryClient();

	function handleChangePic(formData) {
		return axios.put(
			`https://linked-posts.routemisr.com/users/upload-photo`,
			formData,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
				},
			}
		);
	}

	const { mutate: mutateProfilePic, isPending } = useMutation({
		mutationFn: handleChangePic,
		onSuccess: () => {
			// add toasty notification
			toast.success("Profile pic changed successfully!");
			// invalidate comment section
			queryClient.invalidateQueries([
				"getUserData",
				localStorage.getItem("socializzeUser"),
			]);
			// clear the form
			reset();
			// close the modal
			setOpenModal(false);
		},
		onError: (error) => {
			toast.error("Error changing pic");
		},
	});

	function changePic(data) {
		console.log(data.photo);
		let formData = new FormData();
		formData.set("photo", data.photo);
		for (let pair of formData.entries()) {
			console.log(pair[0] + ", " + pair[1]);
		}
		mutateProfilePic(formData);
	}

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Change profile pic</ModalHeader>
				<ModalBody>
					<img
						src={image ? URL.createObjectURL(image) : oldPic}
						alt="Old user pic"
						className="mx-auto w-75"
					/>

					<form className="flex w-full flex-col gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="file"></Label>
							</div>
							<Controller
								name="photo"
								control={control}
								render={({ field }) => (
									<FileInput
										id="file"
										onChange={(e) => {
											field.onChange(e.target.files[0]);
											console.log(control._formValues);
											setImage(control._formValues.photo);
										}}
										accept="image/jpeg, image/png"
									/>
								)}
							/>
							<HelperText>
								uploaded image must be png, jpeg, or jpg.
							</HelperText>
						</div>

						<Button
							type="submit"
							className="w-3/12 mr-auto bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-800 hover:"
							onClick={handleSubmit(changePic)}>
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
