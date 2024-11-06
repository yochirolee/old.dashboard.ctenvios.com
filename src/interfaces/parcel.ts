//parcel interface
export interface ParcelInterface {
	hbl: string;
	invoiceId: number;
	invoiceDate: Date;
	agency: string;
	sender: string;
	receiver: string;
	description: string;
	city: string;
	province: string;
	weight: string;
	locationName: string;
	status: string;
	currentLocation: string;
	updatedAt: Date;
	container?: string; // Add this line
	statusDetails?: string;  // Added with optional modifier
}
