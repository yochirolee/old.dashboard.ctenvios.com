import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
	SheetHeader,
} from "../ui/sheet";
import { ChevronRight, X } from "lucide-react";
import ParcelHistoryDetails from "./parcel-history-details";
import { Button } from "../ui/button";

export default function ParcelHistorySheet({ hbl }: { hbl: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<ChevronRight className="h-6 w-6 text-sky-600" />
				</Button>
			</SheetTrigger>

			<SheetContent side="right" className="min-w-full md:min-w-[550px] ">
				<SheetHeader>
					<SheetTitle>Parcel History</SheetTitle>
					<SheetDescription>
						View detailed history and tracking information for this parcel.
					</SheetDescription>
				</SheetHeader>
				<ParcelHistoryDetails hbl={hbl} />
			</SheetContent>
		</Sheet>
	);
}
