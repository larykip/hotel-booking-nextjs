import { useState, useEffect } from "react";
import { checkAuthStatus, logout } from "@/lib/authService";
import { useRouter } from "next/navigation";

/**
 * Custom hook to manage user authentication state.
 * @returns {Object} An object containing authentication state and methods.
 */
export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {
		const { isLoggedIn, user } = await checkAuthStatus();
		setIsLoggedIn(isLoggedIn);
		setUser(user);
		setLoading(false);
	};

	const handleLogout = async () => {
		if (await logout()) {
			setIsLoggedIn(false);
			setUser(null);
			router.push("/");
		}
	};

	return {
		isLoggedIn,
		user,
		loading,
		handleLogout,
		checkLoginStatus,
	};
}
