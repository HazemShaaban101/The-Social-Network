import {
	Avatar,
	Button,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	listTheme,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";
import { theme } from "flowbite-react/plugin/tailwindcss/theme";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import genericProfilePic from "../../assets/generic profile.png";
import logo from "../../assets/logo.png";

export default function NavBar({ isDark, toggleDark }) {
	isDark
		? document.documentElement.classList.add("dark")
		: document.documentElement.classList.remove("dark");

	const navigate = useNavigate();

	let [themeIcon, setThemeIcon] = useState("fa fa-sun");

	function toggleTheme() {
		toggleDark();
		changeIcon();
	}

	function changeIcon() {
		themeIcon === "fa fa-sun"
			? setThemeIcon("fa fa-moon")
			: setThemeIcon("fa fa-sun");
	}

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

	function couldNotFindUser() {
		console.log("error finding user");
		localStorage.removeItem("socializzeUser");
		navigate("/login");
	}
	localStorage.getItem("socializzeUser") && !isLoading && error
		? couldNotFindUser()
		: console.log(data);

	return (
		<Navbar fluid rounded className="bg-teal-800 sticky top-0 w-full z-10">
			<NavbarBrand as={Link} to={"/"}>
				{/* Replace me with the project LOGO */}
				<div className="flex bg-teal-200 dark:bg-teal-800 rounded-lg px-2 items-center">
					<img
						src={logo}
						alt="site logo"
						className=" w-[36px] dark:invert dark:hue-rotate-180"
					/>
					<span className="self-center  text-xl  text-teal-800 font-mono font-bold mask-r-from-0% mask-r-to-[290%] mask-b-from-0% mask-b-to-[290%] dark:hue-rotate-180 dark:invert">
						ocializze
					</span>
				</div>
			</NavbarBrand>
			<div className="flex md:order-2">
				{localStorage.getItem("socializzeUser") ? (
					<>
						<Dropdown
							arrowIcon={false}
							inline
							label={
								<Avatar
									alt="User settings"
									img={
										data?.data?.user?.photo
											? data?.data?.user?.photo
											: genericProfilePic
									}
									rounded
								/>
							}>
							<DropdownHeader>
								<span className="block text-sm">
									{data?.data?.user?.name}
								</span>
								<span className="block truncate text-sm font-medium">
									{data?.data?.user?.email}
								</span>
							</DropdownHeader>
							<DropdownItem as={Link} to={"/profile"}>
								Profile
							</DropdownItem>
							<DropdownItem as={Link} to={"/about"}>
								about
							</DropdownItem>
							<DropdownItem as={Link} to={"/contact"}>
								Contact Us
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem onClick={toggleTheme}>
								<p className="w-full text-xl m-0 p-0">
									<i className={themeIcon}></i>
								</p>
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem
								onClick={() => {
									localStorage.removeItem("socializzeUser");
									navigate("/");
								}}>
								Sign out
							</DropdownItem>
						</Dropdown>
					</>
				) : (
					<>
						<NavbarToggle />
					</>
				)}
			</div>

			{!localStorage.getItem("socializzeUser") && (
				<NavbarCollapse className="ml-auto">
					<Button
						as={NavLink}
						to={"/"}
						className="md:mr-3 my-2  dark:bg-teal-500 active:bg-red-600 dark:hover:bg-teal-600">
						Home
					</Button>
					<Button
						as={Link}
						to={"/about"}
						className="md:mr-3 my-2 dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600">
						About
					</Button>
					<Button
						as={Link}
						to={"/contact"}
						className="md:mr-3 my-2 dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600">
						Contact Us
					</Button>
					<div className="flex gap-3 my-4 md:my-2 w-full md:w-fit">
						<Button
							as={Link}
							to={"/login"}
							className="dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600 w-full">
							Login
						</Button>
						<Button
							as={Link}
							to={"/register"}
							className="dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600 w-full">
							Register
						</Button>
					</div>
					<Button
						className="md:mr-3 my-2 aspect-square dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600"
						onClick={toggleTheme}>
						<i className={themeIcon}></i>
					</Button>
				</NavbarCollapse>
			)}
		</Navbar>
	);
}
