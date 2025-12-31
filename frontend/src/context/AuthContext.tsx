import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react"

interface AuthContextType {
	token: string | null
	isAuthenticated: boolean
	login: (token: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		async function getAndSetToken() {
			const storedToken = localStorage.getItem("token")
			if (storedToken) {
				setToken(storedToken)
			}
		}

		getAndSetToken()
	}, [])

	const login = (newToken: string) => {
		localStorage.setItem("token", newToken)
		setToken(newToken)
	}

	const logout = () => {
		localStorage.removeItem("token")
		setToken(null)
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				isAuthenticated: !!token,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

// eslint-disable-next-line
export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) throw new Error("useAuth must be used within an AuthProvider")
	return context
}
