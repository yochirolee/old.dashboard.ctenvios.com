import { Button } from "@/components/ui/button";
import { Edit, FileChartColumn } from "lucide-react";

export const ShipmentActionsMenu = () => {
	return (
		<div className="flex gap-2">
			<Button variant="ghost" className="bg-green-500/20 hover:bg-green-500/30">
				<FileChartColumn className="h-4 w-4 text-green-600" />
				<span className="hidden md:block text-xs text-green-600">Reporte</span>
			</Button>
			<Button variant="ghost" size="icon" className="bg-sky-500/20 hover:bg-sky-500/30">
				<FileChartColumn className="h-4 w-4 text-sky-500" />
			</Button>
		</div>
	);
};
