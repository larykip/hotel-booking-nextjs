"use client";

import Logo from "./Logo";
import SignUp from "./SignUp";
import SignInDropDown from "./SignInDropDown";
import { useAuth } from "@/hooks/useAuth";

/**
 * Navbar component that displays the application logo and user authentication options.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
	const { isLoggedIn, user, handleLogout } = useAuth();

	return (
		<div className="flex items-center justify-between px-8">
			<Logo />
			{isLoggedIn && user ? (
				<div className="flex items-center">
					{/* Dropdown menu for logged in users */}
					{/* Handles signout and all dashboard routes */}
					<SignInDropDown handleLogout={handleLogout} user={user} />
				</div>
			) : (
				<SignUp />
			)}
		</div>
	);
};

export default Navbar;
