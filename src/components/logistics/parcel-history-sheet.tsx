import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet";
import { ChevronRight } from "lucide-react";
import ParcelHistoryDetails from "./parcel-history-details";

export default function ParcelHistorySheet({ hbl }: { hbl: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="relative cursor-pointer">
					<ChevronRight className="h-5 w-5 text-sky-600" />
				</div>
			</SheetTrigger>

			<SheetContent side="right"  className="min-w-full md:min-w-[950px] px-8">
				<SheetTitle>Parcel History</SheetTitle>
				<SheetDescription>
					View detailed history and tracking information for this parcel.
				</SheetDescription>
				<ParcelHistoryDetails hbl={hbl} />
			</SheetContent>
		</Sheet>
	);
}
