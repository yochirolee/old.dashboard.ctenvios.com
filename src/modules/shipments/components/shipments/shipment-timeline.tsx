import { CheckCircle, Clock, File, LayoutPanelLeft, Package, Truck } from "lucide-react";
import ShipmentTimelineItem from "./shipment-timeline-item";
import { useGetShipmentByHbl } from "@/hooks/use-shipments";

export interface TrackingEvent {
	id: string;
	status: string;
	description: string;
	timestamp: string;
	isCompleted: boolean;
}



export default function ShipmentTimeline({ hbl }: { hbl: string }) {
	if (!hbl) return null;
	const { data, isLoading } = useGetShipmentByHbl(hbl);
	console.log(data);
	const getIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "created":
				return Package;
			case "dispatch":
				return File;
			case "in_pallet":
				return LayoutPanelLeft;
			case "in_transit":
				return Truck;
			case "delivered":
				return CheckCircle;
			default:
				return Clock;
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h2 className=" font-bold mb-4">Tracking Timeline</h2>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="relative">
					{data?.events.map((event: TrackingEvent, index: number) => (
						<ShipmentTimelineItem
							key={index}
							icon={getIcon(event.status)}
							status={event.status}
							description={event.description}
							date={event.timestamp}
							isCompleted={event.isCompleted}
							isLast={index === data?.events.length - 1}
						/>
					))}
				</div>
			)}
		</div>
	);
}
