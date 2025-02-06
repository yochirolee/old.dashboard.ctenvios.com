import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export type Container = {
	id: number;
	name: string;
	createdAt: string;
	weight: number;
};

export const useGetContainers = () => {
	return useQuery({
		queryKey: ["getContainers"],
		queryFn: api.containers.getContainers,
	});
};
