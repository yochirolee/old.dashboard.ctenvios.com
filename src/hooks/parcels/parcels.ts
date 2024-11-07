import { tracking_api } from "@/api/tracking-api";
import { ParcelInterface } from "@/interfaces/parcel";
import { useQuery } from "@tanstack/react-query";

export const useFetchParcels = () => {
	return useQuery<ParcelInterface[], Error>({
		queryKey: ["parcels"],
		queryFn: tracking_api.parcels.getAll,
	});
};

export const useSearchParcels = (searchQuery: string) => {
	return useQuery<ParcelInterface[], Error>({
		queryKey: ["searchParcels", searchQuery],
		queryFn: () => tracking_api.parcels.search(searchQuery),
		enabled: searchQuery.length > 2,
	});
};

export const useFetchParcelByHbl = (hbl: string) => {
	return useQuery<any[], Error>({
		queryKey: ["fetchParcelByHbl", hbl],
		queryFn: () => tracking_api.parcels.getByHbl(hbl),
		enabled: !!hbl,
	});
};
