import { useLoginMutation } from "@/api/auth-api";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
	user: User | null;
	session: Session | null;
	login: (email: string, password: string) => void;
	logout: () => void;
	isLoggingIn: boolean;
	loginError: string | null;
}

interface User {
	id: string;
	email: string;
	agencyId: number;
	role: string;
	roleId: number;
	username: string;

	// Add other user properties as needed
}

interface Session {
	userId: string;
	email: string;
	role: string;
	username: string;
	roleId: number;
	agencyId: number;
	iat: number;
	exp: number;
}

interface JwtToken {
	id: string;
	email: string;
	agencyId: number;
	username: string;
	role: string;
	roleId: number;
	iat: number;
	exp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "user";
const SESSION_KEY = "session";

export function AuthProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem(USER_KEY);
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const [session, setSession] = useState<Session | null>(() => {
		const savedSession = localStorage.getItem(SESSION_KEY);
		return savedSession ? JSON.parse(savedSession) : null;
	});

	const loginMutation = useLoginMutation();

	const login = async (email: string, password: string) => {
		return loginMutation.mutate(
			{ email, password },
			{
				onSuccess: (data) => {
					setSession(data.token);
					const decodedToken = jwtDecode<JwtToken>(data.token);
					const user: User = {
						id: decodedToken.id,
						email: decodedToken.email,
						agencyId: decodedToken.agencyId,
						role: decodedToken.role,
						roleId: decodedToken.roleId,
						username: decodedToken.username,
					};
					setUser(user);
					//save user to local storage
					localStorage.setItem(SESSION_KEY, JSON.stringify(data.token));
					localStorage.setItem(USER_KEY, JSON.stringify(user));
					navigate("/");
				},
				onError: (error) => {
					console.log(error);
				},
			},
		);
	};

	const logout = () => {
		localStorage.removeItem(SESSION_KEY);
		localStorage.removeItem(USER_KEY);
		setSession(null);
		setUser(null);
		navigate("/login");
	};

	// Check token expiration periodically
	useEffect(() => {
		const checkTokenExpiration = () => {
			if (session?.exp) {
				const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
				if (currentTime >= session.exp) {
					logout();
				}
			}
		};

		// Check immediately
		checkTokenExpiration();

		// Set up interval to check every minute
		const interval = setInterval(checkTokenExpiration, 60000);

		// Cleanup interval on unmount
		return () => clearInterval(interval);
	}, [session]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				login,
				logout,
				isLoggingIn: loginMutation.isPending,
				loginError: loginMutation.error ? loginMutation.error.message : null,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
