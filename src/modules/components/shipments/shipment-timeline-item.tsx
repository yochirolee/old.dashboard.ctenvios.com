interface TimelineItemProps {
	icon: React.ReactNode;
	status: {
		code: string;
		description: string;
		name: string;
		id: number;
	};
	user: {
		id: number;
		name: string;
	};
	timestamp: string;
	isCompleted: boolean;
	isLast: boolean;
}

export default function ShipmentTimelineItem({
	icon: Icon,
	status,
	timestamp,
 user,
	isCompleted,
	isLast,
}: TimelineItemProps) {
	return (
		<div className="flex  items-center mb-8 w-full">
			<div className="flex items-center relative">
				<div
					className={`w-6 h-6 rounded-full  flex items-center justify-center z-10
            ${isCompleted ? "bg-green-500 border-green-500" : "bg-gray-200/15 "}`}
				>
					{Icon}
				</div>
				{!isLast && (
					<div
						className={`h-[40px] w-[1px] absolute top-[26px] left-3 -translate-x-1/2
              ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
					></div>
				)}
			</div>
			<div className="flex flex-row justify-between w-full items-center ml-4">
				<div className="flex flex-col items-start">
					<h3
						className={`font-semibold text-xs ${isCompleted ? "text-green-500" : "text-gray-500"}`}
					>
						{status?.name}
					</h3>
					<p className="text-sm text-gray-600">{status?.description}</p>
					<span className="text-xs text-gray-400">
						{new Date(timestamp).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>
				<span className="text-xs text-gray-400">{user?.name}</span>
			</div>
		</div>
	);
}
