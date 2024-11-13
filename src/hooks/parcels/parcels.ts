import { ParcelInterface } from "@/interfaces/parcel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://apiv1trackingctenvioscom.vercel.app/api"
		: "http://localhost:3001/api";

const authFetcher = async (url: string) => {
	try {
		const token = localStorage.getItem("token");
		//check if token is valid or expired
		const decodedToken = jwtDecode(token || "");
		if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
			console.log("token expired redirecting to login");
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			window.location.href = "/login";
			return [];
		}

		const axiosInstance = axios.create({
			baseURL: baseUrl,
		});
		const response = await axiosInstance.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const useFetchParcels = () => {
	return useQuery<ParcelInterface[], Error>({
		queryKey: ["parcels"],
		queryFn: () => authFetcher("/parcels"),
	});
};

export const useSearchParcels = (searchQuery: string) => {
	return useQuery<ParcelInterface[], Error>({
		queryKey: ["searchParcels", searchQuery],
		queryFn: () => authFetcher(`/parcels/search?q=${searchQuery}`),
		enabled: searchQuery.length > 2,
	});
};

export const useFetchParcelByHbl = (hbl: string) => {
	return useQuery<any[], Error>({
		queryKey: ["fetchParcelByHbl", hbl],
		queryFn: () => authFetcher(`/parcels/hbl/${hbl}`),
		enabled: !!hbl,
	});
};
