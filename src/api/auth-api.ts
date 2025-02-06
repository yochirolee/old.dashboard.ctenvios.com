import { useMutation, useQuery } from "@tanstack/react-query";
import { api, baseUrl } from "./api";
import axios from "axios";
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

/* // Login mutation
export const useLoginMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, "email" | "password">>({
		mutationFn: async ({ email, password }) => {
			const response = await axios.post(`${baseUrl}/users/login`, { email, password });
			return response.data;
		},
	});
}; */

// Register mutation
export const useRegisterMutation = () => {
	return useMutation<
		any,
		Error,
		Pick<UserInterface, "email" | "password" | "name" | "agencyId" | "role">
	>({
		mutationFn: async ({ email, password, name, agencyId, role }) => {
			const response = await axios.post(`${baseUrl}/users/register`, {
				email,
				password,
				name,
				agencyId,
				role,
			});
			return response.data;
		},
	});
};

// Logout mutation
export const useLogoutMutation = () => {
	return useMutation<any, Error, void>({
		mutationFn: () => authApi.logout(),
	});
};

// Refresh token mutation
export const useRefreshTokenMutation = () => {
	return useMutation<any, Error, void>({
		mutationFn: () => authApi.refreshToken(),
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
	return useMutation<any, Error, { token: string; newPassword: string }>({
		mutationFn: ({ token, newPassword }) => authApi.resetPassword(token, newPassword),
	});
};

// Example of a query (if needed for any GET requests)
export const useGetUser = (userId: string) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => api.get(`/users/${userId}`),
		enabled: !!userId,
	});
};
// Query to get all users
export const useGetAllUsers = () => {
	return useQuery({
		queryKey: ["allUsers"],
		queryFn: () => api.get(`/users`),
	});
};

// Delete user mutation
export const useDeleteUserMutation = () => {
	return useMutation<any, Error, Pick<UserInterface, "userId">>({
		mutationFn: ({ userId }) => authApi.deleteUser(userId),
	});
};

const authApi = {


	

	logout: async () => {
		try {
			const response = await axiosClient.post(`/logout`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	getUser: async (userId: string) => {
		try {
			const response = await axiosClient.get(`/users/${userId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	getAllUsers: async () => {
		try {
			const response = await axios.get(`${baseUrl}/users`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	deleteUser: async (userId: string) => {
		try {
			const response = await axiosClient.delete(`/users/${userId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default authApi;
