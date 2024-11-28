import Cookies from "js-cookie"
import { useState } from "react"
import {jwtDecode} from "jwt-decode";

export default function useAuth() {
	const token = Cookies.get("retail-management-app-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)
	const [isAdmin, setIsAdmin] = useState<string>("")

	const userLogin = (token: string) => {
		Cookies.set("retail-management-app-token", token)
		setIsAuthenticated(true)
		const userRole = getRoleFromToken(token);
		setIsAdmin(userRole)
	}

	const userLogout = () => {
		Cookies.remove("retail-management-app-token")

		setIsAuthenticated(false)
	}

	const getRoleFromToken = (token: string) => {
		try {
		  const decodedToken = jwtDecode(token);
		  const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
		  return role || "No role found";
		} catch (error) {
		  console.error("Invalid token", error);
		  return null;
		}
	  };

	return { isAuthenticated, userLogin, userLogout, isAdmin }
}
