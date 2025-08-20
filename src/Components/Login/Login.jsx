import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginIMG from "../../assets/Sign in.gif";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ForwardToFeed from "../ForwardToFeed/ForwardToFeed";

export default function Login() {
	// if user data is saved, forward user to feed page
	if (localStorage.getItem("socializzeUser")) {
		return <ForwardToFeed />;
	}

	// navigation function
	const navigate = useNavigate();
	// zod schema
	const zodSchema = z.object({
		email: z.email("Invalid email format"),
		password: z.string(),
	});

	// form handling
	const { control, handleSubmit, formState, setError } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(zodSchema),
	});

	function onsubmit(data) {
		console.log(data);
		axios
			.post(`https://linked-posts.routemisr.com/users/signin`, data)
			.then((response) => {
				// console.log(response.data.message);
				if (response.data?.message === "success") {
					localStorage.setItem("socializzeUser", response.data.token);
					toast.success("Welcome to your account!", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
						transition: Bounce,
					});

					navigate("/Feed");
				}
			})
			.catch((error) => {
				console.log(error);

				toast.error("Email or password mismatch", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
					transition: Bounce,
				});
			});
	}

	return (
		<div className="w-full dark:bg-[#06606e] overflow-auto">
			<div className="container mx-auto my-9">
				<div className="w-full flex gap-3">
					<div className="flex-1 hidden md:flex justify-center items-center rounded-3xl overflow-hidden">
						<img
							src={loginIMG}
							alt="sign-up image"
							className="rounded-3xl"
						/>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<form className="flex flex-col h-fit gap-4 w-full my-5 shadow-2xl dark:bg-[#1f2937] shadow-teal-700 dark:shadow-black rounded-2xl p-3 py-5">
							{/* email input */}
							<div>
								<div className="mb-1 ml-1 block">
									<Label htmlFor="email">Email</Label>
								</div>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<TextInput
											id="email"
											type="email"
											placeholder="johndoe@gmail.com"
											required
											shadow
											color={"gray"}
											{...field}
										/>
									)}
								/>
								{formState.errors.email &&
									formState.touchedFields.email && (
										<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
											{formState.errors.email.message}
										</p>
									)}
							</div>

							{/* password input */}
							<div>
								<div className="mb-1 ml-1 block">
									<Label htmlFor="password">Password</Label>
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
											shadow
											color={"gray"}
											{...field}
										/>
									)}
								/>
								{formState.errors.password &&
									formState.touchedFields.password && (
										<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
											{formState.errors.password.message}
										</p>
									)}
							</div>

							{/* submit button */}
							<Button
								type="submit"
								onClick={handleSubmit(onsubmit)}
								className="dark:bg-teal-500 dark:hover:bg-teal-600 dark:shadow">
								Login
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
