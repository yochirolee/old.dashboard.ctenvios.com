import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";

export type Shipment = {
	id: number;
	name: string;
	createdAt: string;
	weight: number;
};

export const useGetShipments = () => {
	return useQuery({
		queryKey: ["getShipments"],
		queryFn: api.shipments.getAll,
	});
};
export const useSearchShipments = (params: { query: string }) => {
	return useQuery({
		queryKey: ["searchShipments", params],
		queryFn: () => api.shipments.search(params),
	});
};
