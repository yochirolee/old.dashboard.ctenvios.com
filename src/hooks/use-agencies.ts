//user agencies hooks
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useAgencies = () => {
	return useQuery({ queryKey: ["agencies"], queryFn: api.agencies.getAll });
};
