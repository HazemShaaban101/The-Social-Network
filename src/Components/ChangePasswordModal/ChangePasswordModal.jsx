import { zodResolver } from "@hookform/resolvers/zod";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
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
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

export default function ChangePasswordModal({ openModal, setOpenModal }) {
	const zodSchema = z
		.object({
			password: z.string(),
			newPassword: z
				.string()
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
					"your password isn't strong enough!"
				),
		})
		.refine((data) => data.newPassword !== data.password, {
			message: "password cannot be the same as old password",
			path: ["newPassword"],
		});

	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: {
			password: "",
			newPassword: "",
		},
		resolver: zodResolver(zodSchema),
	});

	// const queryClient = useQueryClient();

	// useEffect(() => {
	// 	if (postID) {
	// 		reset({ content: "", post: postID });
	// 	}
	// }, [postID, reset]);

	function handleChangePassword(data) {
		return axios.patch(
			`https://linked-posts.routemisr.com/users/change-password`,
			data,
			{
				headers: {
					token: localStorage.getItem("socializzeUser"),
				},
			}
		);
	}

	const { mutate: mutatePassword, isPending } = useMutation({
		mutationFn: handleChangePassword,
		onSuccess: (response) => {
			localStorage.setItem("socializzeUser", response?.data?.token);
			// add toasty notification
			toast.success("Password changed successfully!");

			// clear the form
			reset();
			// close the modal
			setOpenModal(false);
		},
		onError: (error) => {
			toast.error("Cannot change password");
		},
	});

	function changePassword(data) {
		mutatePassword(data);
	}

	return (
		<>
			<Modal
				show={openModal}
				onClose={() => setOpenModal(false)}
				dismissible
				position="center">
				<ModalHeader>Change password</ModalHeader>
				<ModalBody>
					<form className="flex w-full flex-col gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password">Old password</Label>
							</div>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextInput
										id="password"
										type="password"
										placeholder="********"
										required
										{...field}
										className="w-full"
									/>
								)}
							/>
						</div>
						<div className="">
							<div className="mb-2 block">
								<Label htmlFor="newPassword">
									New password
								</Label>
							</div>
							<Controller
								name="newPassword"
								control={control}
								render={({ field }) => (
									<TextInput
										id="newPassword"
										type="password"
										placeholder="********"
										required
										{...field}
									/>
								)}
							/>
							{formState.errors.newPassword &&
								formState.touchedFields.newPassword && (
									<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
										{formState.errors.newPassword.message}
									</p>
								)}
						</div>
						<Button
							type="submit"
							className="w-3/12 mr-auto bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-800 hover:"
							onClick={handleSubmit(changePassword)}>
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
