import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import ShipmentTimeline from "./shipment-timeline";
import { useGetShipmentByHbl } from "@/hooks/use-shipments";

const sampleEvents: TrackingEvent[] = [
	{
		id: "1",
		status: "Ordered",
		description: "Your order has been placed",
		date: "2023-04-01 10:00 AM",
		isCompleted: true,
	},
	{
		id: "2",
		status: "Processing",
		description: "Your order is being processed",
		date: "2023-04-01 2:30 PM",
		isCompleted: true,
	},
	{
		id: "3",
		status: "Shipped",
		description: "Your order has been shipped",
		date: "2023-04-02 9:15 AM",
		isCompleted: true,
	},
	{
		id: "4",
		status: "In Transit",
		description: "Your order is on its way",
		date: "2023-04-03 11:45 AM",
		isCompleted: false,
	},
	{
		id: "5",
		status: "Delivered",
		description: "Your order has been delivered",
		date: "Estimated: 2023-04-05",
		isCompleted: false,
	},
];

export function ShipmentSheetDetails({ hbl }: { hbl: string }) {
		return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<ChevronRight className="h-4 w-4 text-sky-600" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>{hbl}</SheetDescription>
				</SheetHeader>
				<ShipmentTimeline hbl={hbl} />
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
