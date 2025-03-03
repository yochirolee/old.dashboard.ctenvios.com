import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

export const getPriorityBadge = (priority: string) => {
	if (priority === "VERY_HIGH") {
		return (
			<Badge variant="outline" className="space-x-2 bg-red-500/20 border-red-700/30 ">
				<Flame className="w-4 h-4 text-red-500" />
				<span className="text-red-500">{priority}</span>
			</Badge>
		);
	}
	if (priority === "HIGH") {
		return (
			<Badge variant="outline" className="space-x-2 bg-orange-500/20 border-orange-700/30 ">
				<Flame className="w-4 h-4 text-orange-500" />
				<span className="text-orange-500">{priority}</span>
			</Badge>
		);
	}
	if (priority === "MEDIUM") {
		return (
			<Badge variant="outline" className="space-x-2 bg-yellow-500/20 border-yellow-700/30 ">
				<Flame className="w-4 h-4 text-yellow-500" />
				<span className="text-yellow-500">{priority}</span>
			</Badge>
		);
	}
	if (priority === "LOW") {
		return (
			<Badge variant="outline" className="space-x-2 bg-green-500/20 border-green-700/30 ">
				<Flame className="w-4 h-4 text-green-500" />
				<span className="text-green-500">{priority}</span>
			</Badge>
		);
	}
};
