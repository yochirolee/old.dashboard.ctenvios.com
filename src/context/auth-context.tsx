import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/use-users";
import { User } from "@/types/user";

interface AuthContextType {
	user: User | null;

	login: (email: string, password: string) => void;
	logout: () => void;
	isLoggingIn: boolean;
	loginError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "user";
export function AuthProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(
		localStorage.getItem(USER_KEY) ? JSON.parse(localStorage.getItem(USER_KEY) || "") : null,
	);

	const loginMutation = useLogin();

	useEffect(() => {
		if (!user || isUserExpired(user?.exp)) {
			logout();
		}
	}, [navigate, user]);

	const isUserExpired = (exp: number): boolean => {
		try {
			const currentTime = Date.now() / 1000;

			return exp < currentTime;
		} catch (error) {
			return true;
		}
	};
	const login = async (email: string, password: string) => {
		return loginMutation.mutate(
			{ email, password },
			{
				onSuccess: (data) => {
					const decodedToken = jwtDecode<User>(data.token);
					const user: User = {
						id: decodedToken.id,
						email: decodedToken.email,
						agencyId: decodedToken.agencyId,
						role: decodedToken.role,
						exp: decodedToken.exp,
					};
					setUser(user);
					//save user to local storage
					localStorage.setItem(USER_KEY, JSON.stringify(user));
					localStorage.setItem("token", data.token);
					setUser(user);
					navigate("/");
				},
			},
		);
	};

	const logout = () => {
		localStorage.removeItem(USER_KEY);
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
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

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
