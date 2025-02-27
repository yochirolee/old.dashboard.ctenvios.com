import { api } from "@/api/api";
import {  useQuery } from "@tanstack/react-query";

export const useFetchIssues = () => {
	return useQuery<any[], Error>({
		queryKey: ["issues"],
		queryFn: () => api.agencies.getAll(),
	});
};

/* export const useCreateIssue = () => {
	return useMutation({
		mutationFn: (values: any) => tracking_api.issues.create(values),
	});
};
 */		