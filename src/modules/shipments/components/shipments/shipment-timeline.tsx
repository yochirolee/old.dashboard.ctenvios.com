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

export interface ShipmentEvents {
	events: TrackingEvent[];
}

export default function ShipmentTimeline({ events }: ShipmentEvents) {
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

			<div className="relative">
				{events.map((event: TrackingEvent, index: number) => (
					<ShipmentTimelineItem
						key={index}
						icon={getIcon(event.status)}
						status={event.status}
						description={event.description}
						date={event.timestamp}
						isCompleted={event.isCompleted}
						isLast={index === events.length - 1}
					/>
				))}
			</div>
		</div>
	);
}
