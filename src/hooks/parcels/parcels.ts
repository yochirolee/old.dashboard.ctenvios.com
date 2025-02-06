import { ParcelInterface } from "@/interfaces/parcel";
import { UserInterface } from "@/types/parcel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://apiv1trackingctenvioscom.vercel.app/api/v1"
		: "http://localhost:3001/api/v1";

const checkTokenValidity = (token: string) => {
	const decodedToken = jwtDecode(token || "");
	if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
		return false;
	}
	return true;
};

const  authFetcher = async (url: string) => {
	try {
		const token = localStorage.getItem("token");
		//check if token is valid or expired
		checkTokenValidity(token || "");

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

export const authPostFetcher = async (url: string, data: any) => {
	try {
		console.log("authPostFetcher", url, data);
		const token = localStorage.getItem("token");
		checkTokenValidity(token || "");
		const axiosInstance = axios.create({
			baseURL: baseUrl,
		});
		const response = await axiosInstance.post(url, data.file, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("authPostFetcher response", response.data);
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

export const useFetchUsers = () => {
	return useQuery<UserInterface[], Error>({
		queryKey: ["users"],
		queryFn: () => authFetcher("/users"),
	});
};

export const useFetchIssues = () => {
	return useQuery<any[], Error>({
		queryKey: ["issues"],
		queryFn: () => authFetcher("/issues"),
	});
};
