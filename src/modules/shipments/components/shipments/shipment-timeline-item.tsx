import type { LucideIcon } from "lucide-react";

interface TimelineItemProps {
	icon: LucideIcon;
	status: string;
	description: string;
	date: string;
	isCompleted: boolean;
	isLast: boolean;
}

export default function ShipmentTimelineItem({
	icon: Icon,
	status,
	description,
	date,
	isCompleted,
	isLast,
}: TimelineItemProps) {
	return (
		<div className="flex items-center mb-8 w-full">
			<div className="flex items-center relative">
				<div
					className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10
            ${isCompleted ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"}`}
				>
					<Icon className={`w-4 h-4 ${isCompleted ? "text-white" : "text-gray-500"}`} />
				</div>
				{!isLast && (
					<div
						className={`h-full w-0.5 absolute top-6 left-3 -translate-x-1/2
              ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
					></div>
				)}
			</div>
			<div className="flex flex-col items-start ml-4">
				<h3 className={`font-bold ${isCompleted ? "text-green-500" : "text-gray-500"}`}>
					{status}
				</h3>
				<p className="text-sm text-gray-600">{description}</p>
				<span className="text-xs text-gray-400">
					{new Date(date).toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
		</div>
	);
}
