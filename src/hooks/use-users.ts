import { api } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";

export const useGetUsers = () => {
	return useQuery({
		queryKey: ["getUsers"],
		queryFn: api.users.getUsers,
	});
};

export const useGetUser = (userId: string) => {
	return useQuery({
		queryKey: ["getUser", userId],
		queryFn: () => api.users.getUser(userId),
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation({
		mutationFn: (userId: string) => api.users.deleteUser(userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
			toast.toast({
				title: "Usuario eliminado correctamente",
				description: "El usuario ha sido eliminado correctamente",
			});
		},
	});
};

export const useRegister = () => {
	const queryClient = useQueryClient();
	const toast = useToast();
	return useMutation({
		mutationFn: (userData: Pick<User, "email" | "password" | "name" | "agencyId" | "role">) =>
			api.users.createUser({
				...userData,
				isActive: true,
				lastLogin: new Date().toISOString(),
				createdAt: new Date().toISOString(),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
			toast.toast({
				title: "Usuario registrado correctamente",
				description: "El usuario ha sido registrado correctamente",
			});
		},
		onError: (error) => {
			console.error("Error al registrar usuario:", error);
			toast.toast({
				title: "Error al registrar usuario",
				description: "El usuario no ha sido registrado correctamente",
				variant: "destructive",
			});
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: { userId: string; user: Partial<User> }) =>
			api.users.updateUser(params.userId, params.user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUsers"] });
		},
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: (params: { email: string; password: string }) => api.users.login(params),
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});
};
