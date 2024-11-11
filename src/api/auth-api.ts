import axios from "axios";
const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://apiv1trackingctenvioscom.vercel.app/api"
		: "http://localhost:3001/api";

// Auth API

interface UserInterface {
	userId: string;
	email: string;
	password: string;
	name: string;
	agencyId: number;
	role: string;
	token?: string;
	newPassword?: string;
}

import { useMutation, useQuery } from "@tanstack/react-query";

// Login mutation
export const useLoginMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, 'email' | 'password'>>({
		mutationFn: ({ email, password }) => authApi.login(email, password)
	});
};

// Register mutation
export const useRegisterMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, 'email' | 'password' | 'name' | 'agencyId' | 'role'>>({
		mutationFn: ({ email, password, name, agencyId, role }) =>
		authApi.register(email, password, name, agencyId, role),
	});
};

// Logout mutation
export const useLogoutMutation = () => {
	return useMutation<any, Error, void>({
		mutationFn: () => authApi.logout()
	});
};

// Refresh token mutation
export const useRefreshTokenMutation = () => {
	return useMutation<any, Error, void>({
		mutationFn: () => authApi.refreshToken()
	});
};

// Forgot password mutation
export const useForgotPasswordMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, "email">>({
		mutationFn: ({ email }) => authApi.forgotPassword(email),
	});
};

// Reset password mutation
export const useResetPasswordMutation = () => {
	return useMutation<any, Error, { token: string, newPassword: string }>({
		mutationFn: ({ token, newPassword }) => authApi.resetPassword(token, newPassword),
	});
};

// Example of a query (if needed for any GET requests)
export const useGetUser = (userId: string) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => authApi.getUser(userId),
		enabled: !!userId,
	});
};
// Query to get all users
export const useGetAllUsers = () => {
	return useQuery({
		queryKey: ["allUsers"],
		queryFn: () => authApi.getAllUsers(),
	});
};

// Delete user mutation
export const useDeleteUserMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, "userId">>({
		mutationFn: ({ userId }) => authApi.deleteUser(userId),
	});
};

const authApi = {
	login: async (email: string, password: string) => {
		try {
			const response = await axios.post("users/login", { email, password });
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	register: async (email: string, password: string, name: string, agencyId: number, role: string) => {
		try {
			const response = await axios.post("/users/register", {
				email,
				password,
				name,
				agencyId,
				role,
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	logout: async () => {
		try {
			const response = await axios.post("/logout");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	refreshToken: async () => {
		try {
			const response = await axios.post("/refresh-token");
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	forgotPassword: async (email: string) => {
		try {
			const response = await axios.post("/forgot-password", { email });
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	resetPassword: async (token: string, newPassword: string) => {
		try {
			const response = await axios.post("/reset-password", { token, newPassword });
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getUser: async (userId: string) => {
		try {
			const response = await axios.get(`/users/${userId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getAllUsers: async () => {
		try {
			const response = await axios.get("/users");
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	deleteUser: async (userId: string   ) => {
		try {
			const response = await axios.delete(`/users/${userId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default authApi;
