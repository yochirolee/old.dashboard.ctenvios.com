import { Anchor, CheckCircle, Clock, File, LayoutPanelLeft, Package, Truck } from "lucide-react";
import ShipmentTimelineItem from "./shipment-timeline-item";

export interface TrackingEvent {
	id: string;
	status: {
		code: string;
		description: string;
		name: string;
		id: number;
	};
	timestamp: string;
	isCompleted: boolean;
}

export interface ShipmentEvents {
	events: TrackingEvent[];
}

const getStatusConfig = (code: string) => {
	switch (code) {
		case "IN_PORT":
			return {
				icon: Anchor,
				color: "text-violet-500",
			};
		case "CUSTOMS_PENDING":
			return {
				icon: File,
				color: "text-yellow-500",
			};
		case "READY_FOR_PICKUP":
			return {
				icon: LayoutPanelLeft,
				color: "text-sky-500",
			};
		case "IN_TRANSIT":
			return {
				icon: Truck,
				color: "text-purple-500",
			};
		case "DELIVERED":
			return {
				icon: CheckCircle,
				color: "text-green-500",
			};
		default:
			return {
				icon: Clock,
				color: "text-gray-500",
			};
	}
};

export default function ShipmentTimeline({ events }: ShipmentEvents) {
	console.log(events);

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h2 className=" font-bold mb-4">Tracking Timeline</h2>

			<div className="relative">
				{events.map((event: TrackingEvent, index: number) => {
					const config = getStatusConfig(event?.status?.code);
					return (
						<ShipmentTimelineItem
							key={index}
							icon={config.icon}
							color={config.color}
							status={event.status}
							timestamp={event.timestamp}
							isCompleted={event.isCompleted}
							isLast={index === events.length - 1}
						/>
					);
				})}
			</div>
		</div>
	);
}
