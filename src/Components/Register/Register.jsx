import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
// import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerImg from "../../assets/Sign up.gif";

export default function Register() {
	// zod schema
	const zodSchema = z
		.object({
			name: z
				.string()
				.max(12, "Name is too long!")
				.min(2, "Name is too short!"),
			email: z.email("Invalid email"),
			password: z
				.string()
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
					"Your password isn't strong enough!"
				),
			rePassword: z.string(),
			gender: z.string().regex(/^(male|female){1}$/),
			dateOfBirth: z
				.string()
				.regex(
					/^[1-2][0-9]{3}-(0[1-9]|1[1-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
					"Invalid Date format"
				),
		})
		.refine((data) => data.rePassword === data.password, {
			message: "Password mismatch!",
			path: ["rePassword"],
		});

	// form handling
	const { control, handleSubmit, formState, setError } = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
			dateOfBirth: "",
			gender: "",
		},
		resolver: zodResolver(zodSchema),
	});

	function onsubmit(data) {
		userAgreement && console.log(data);
	}

	// state handling for userAgreement
	const [userAgreement, setUserAgreement] = useState(false);
	function toggleUserAgreement() {
		userAgreement ? setUserAgreement(false) : setUserAgreement(true);
	}

	return (
		<div className="w-full dark:bg-[#06606e]">
			<div className="container mx-auto">
				<div className="w-full flex">
					<div className="flex-1 flex justify-center items-center rounded-3xl overflow-hidden">
						<img
							src={registerImg}
							alt="sign-up image"
							className="rounded-3xl"
						/>
					</div>
					<div className="flex-1 flex justify-center">
						<form className="flex max-w-md flex-col gap-4 w-full my-5 shadow-2xl shadow-teal-700 dark:shadow-black rounded-2xl p-3">
							{/* name input */}
							<div>
								<div className="mb-1 ml-1 block">
									<Label htmlFor="name">Name</Label>
								</div>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<TextInput
											id="name"
											type="text"
											placeholder="Your name"
											color={
												formState.touchedFields.name &&
												formState.isSubmitted
													? formState.errors.name
															?.message
														? "failure"
														: "success"
													: "gray"
											}
											required
											shadow
											{...field}
										/>
									)}
								/>
								{formState.errors.name &&
									formState.touchedFields.name && (
										<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
											{formState.errors.name.message}
										</p>
									)}
							</div>

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
											color={
												formState.touchedFields.email &&
												formState.isSubmitted
													? formState.errors.email
															?.message
														? "failure"
														: "success"
													: "gray"
											}
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
											color={
												formState.touchedFields
													.password &&
												formState.isSubmitted
													? formState.errors.password
															?.message
														? "failure"
														: "success"
													: "gray"
											}
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

							{/* repassword input */}
							<div>
								<div className="mb-1 ml-1 block">
									<Label htmlFor="rePassword">
										Repeat Password
									</Label>
								</div>
								<Controller
									name="rePassword"
									control={control}
									render={({ field }) => (
										<TextInput
											id="rePassword"
											type="password"
											placeholder="********"
											required
											shadow
											color={
												formState.touchedFields
													.rePassword &&
												formState.isSubmitted
													? formState.errors
															.rePassword?.message
														? "failure"
														: "success"
													: "gray"
											}
											{...field}
										/>
									)}
								/>
								{formState.errors.rePassword && (
									<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
										{formState.errors.rePassword.message}
									</p>
								)}
							</div>

							{/* date of borth input */}
							<div>
								<div className="mb-1 ml-1 block">
									<Label htmlFor="dateOfBirth">
										Date of birth
									</Label>
								</div>
								<Controller
									name="dateOfBirth"
									control={control}
									render={({ field }) => (
										<TextInput
											id="dateOfBirth"
											type="date"
											placeholder="14/12/1999"
											required
											shadow
											color={
												formState.touchedFields
													.dateOfBirth &&
												formState.isSubmitted
													? formState.errors
															.dateOfBirth
															?.message
														? "failure"
														: "success"
													: "gray"
											}
											{...field}
										/>
									)}
								/>
								{formState.errors.dateOfBirth &&
									formState.touchedFields.dateOfBirth && (
										<p className="bg-red-300 border-red-500 text-red-500 rounded-lg p-1.5 mt-1">
											{
												formState.errors.dateOfBirth
													.message
											}
										</p>
									)}
							</div>
							{/* radio buttons */}
							<div className="flex gap-5">
								<div className="flex gap-2 items-center">
									<Controller
										name="gender"
										control={control}
										render={({ field }) => (
											<Radio
												id="male"
												value="male"
												className="accent-teal-500"
												{...field}
												onChange={() =>
													field.onChange("male")
												}
											/>
										)}
									/>
									<div className="mb-0 block">
										<Label htmlFor="male">Male</Label>
									</div>
								</div>
								<div className="flex gap-2 items-center">
									<Controller
										name="gender"
										control={control}
										render={({ field }) => (
											<Radio
												id="female"
												value="female"
												name="gender"
												{...field}
												onChange={() =>
													field.onChange("female")
												}
											/>
										)}
									/>
									<div className="mb-0 block">
										<Label htmlFor="female" className="">
											Female
										</Label>
									</div>
								</div>
							</div>

							{/* user agreement checkbox */}
							<div className="flex items-center gap-2">
								<Checkbox
									id="agree"
									checked={userAgreement}
									onChange={() => toggleUserAgreement()}
									className="dark:accent-teal-500 "
								/>
								<Label htmlFor="agree" className="flex">
									I agree with the&nbsp;
									<Link
										href="#"
										className="text-cyan-600 hover:underline dark:text-cyan-500">
										terms and conditions
									</Link>
								</Label>
							</div>

							{/* submit button */}
							<Button
								type="submit"
								onClick={handleSubmit(onsubmit)}
								className="dark:bg-teal-500 dark:hover:bg-teal-600 dark:shadow">
								Register new account
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
