import { ParcelInterface } from "../interfaces/parcel";
const baseUrl = process.env.NODE_ENV === 'production'
	? "https://apiv1trackingctenvioscom.vercel.app/api"
	: "http://localhost:3001/api";

// Parcels API

export const tracking_api = {
	parcels: {
		getAll: async (): Promise<ParcelInterface[]> => {
			const response = await fetch(`${baseUrl}/parcels`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},

		search: async (searchQuery: string): Promise<ParcelInterface[]> => {
			const response = await fetch(`${baseUrl}/parcels/search?q=${searchQuery}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
		getByHbl: async (hbl: string): Promise<any[]> => {
			const response = await fetch(`${baseUrl}/parcels/hbl/${hbl}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
	},
	containers: {
		fetchContainers: async (): Promise<any[]> => {
			const response = await fetch(`${baseUrl}/containers`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
		fetchParcelsByContainerId: async (containerId: number): Promise<any[]> => {
			const response = await fetch(`${baseUrl}/containers/${containerId}/parcels`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
	},
	issues: {
		getAll: async (): Promise<any[]> => {
			const response = await fetch(`${baseUrl}/issues`);
			return response.json();
		},
	},
};
