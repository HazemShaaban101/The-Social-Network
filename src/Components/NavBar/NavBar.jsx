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
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<Navbar fluid rounded className="dark:bg-teal-800">
			<NavbarBrand as={Link} to={"/"}>
				{/* Replace me with the project LOGO */}
				<i className="fa fa-error text-4xl text-red-600"></i>{" "}
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-teal-300">
					Socializze
				</span>
			</NavbarBrand>
			<div className="flex md:order-2">
				{localStorage.getItem("socializzeUser") ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt="User settings"
								img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
								rounded
							/>
						}>
						<DropdownHeader>
							<span className="block text-sm">Bonnie Green</span>
							<span className="block truncate text-sm font-medium">
								name@flowbite.com
							</span>
						</DropdownHeader>
						<DropdownItem>
							<Link to={"/profile"}>Profile</Link>
						</DropdownItem>
						<DropdownItem>
							<Link to={"/about"}>about</Link>
						</DropdownItem>
						<DropdownItem>
							<Link to={"/contact"}>Contact Us</Link>
						</DropdownItem>
						<DropdownDivider />
						<DropdownItem>Sign out</DropdownItem>
					</Dropdown>
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
						<Button className="dark:bg-teal-500 dark:active:bg-teal-600 dark:hover:bg-teal-600 w-full">
							Register
						</Button>
					</div>
				</NavbarCollapse>
			)}
		</Navbar>
	);
}
