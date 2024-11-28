import Cookies from "js-cookie"
import { useState } from "react"

export default function useAuth() {
	const token = Cookies.get("retail-management-app-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

	const userLogin = (token: string) => {
		Cookies.set("retail-management-app-token", token)

		setIsAuthenticated(true)
	}

	const userLogout = () => {
		Cookies.remove("retail-management-app-token")

		setIsAuthenticated(false)
	}

	return { isAuthenticated, userLogin, userLogout }
}
