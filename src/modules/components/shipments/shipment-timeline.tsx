import ShipmentTimelineItem from "./shipment-timeline-item";
import { getIcon } from "@/modules/components/common/getIcon";

export type ShipmentEvent = {
	 timestamp: string;
	 statusCode: string;
	 statusName: string;
	 statusDescription: string;
	 updateMethod: string;
	 userName: string;
	 source: string;
};
export default function ShipmentTimeline({ events }: { events: ShipmentEvent[] }) {
	return (
		<div className="max-w-2xl mx-auto p-6">
			<h2 className=" font-bold mb-4">Tracking Timeline</h2>

			<div className="relative">
				{events.map((event: ShipmentEvent, index: number) => {
					return (
						<ShipmentTimelineItem
							key={index}
							icon={getIcon(event?.statusCode)}
							status={{
								code: event?.statusCode,
								description: event?.statusDescription,
								name: event?.statusName,
								id: 0,
							}}
							timestamp={event?.timestamp}
							user={{
								id: 0,
								name: event?.userName,
							}}
							location={{
								id: 0,
								state: event?.source,
								country_code: "",
								city: "",
							}}
							images={[]}
							isCompleted={event?.statusCode === "completed"}
							isLast={index === events.length - 1}
						/>
					);
				})}
			</div>
		</div>
	);
}
