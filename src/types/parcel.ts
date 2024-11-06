export interface Customer {
	fullName: string;
	email: string;
	mobile: string;
}

export interface Receiver {
	fullName: string;
	ci: string;
	mobile: string;
}

export interface ParcelEvent {
	hbl: string;
	eventId: number;
	locationName: string;
	status: string;
	statusDetails?: string;
	updatedAt: string;
	issues?: Array<{ description: string }>;
	type: string;
}

export interface Parcel {
	agency: string;
	invoiceId: string;
	description: string;
	weight: number;
	shippingAddress: string;
	province: string;
	city: string;
	customer: Customer;
	receiver: Receiver;
	events: ParcelEvent[];
}
