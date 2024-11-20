import { useQuery } from "@tanstack/react-query";



export const useUsers = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => getUsers(),
	});
};  


