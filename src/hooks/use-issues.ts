import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export const useGetIssues = () => {
	return useQuery({
		queryKey: ["issues"],
		queryFn: api.issues.getAll,
	});
};
