import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toLower, camelCase } from "lodash";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { ShipmentSheetDetails } from "./shipment-sheet-details";

type Location = {
	name: string;
};

const shipmentInterface = {
	hbl: "",
	invoiceId: 1,
	containerId: 1,
	location: "",
	timestamp: "",
	status: "",
	description: "",
	sender: "",
	receiver: "",
	state: "",
	city: "",
	updateMethod: "",
	statusDetails: "",
};
export const ShipmentColumns = (): ColumnDef<typeof shipmentInterface>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "invoiceId",
		header: "Invoice",
		cell: ({ row }) => <Badge variant="secondary">{row.getValue("invoiceId")}</Badge>,
	},
	{
		accessorKey: "hbl",
		header: "HBL",
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2 items-left">
					<div className="flex flex-col gap-2">
						<div>{row.original.hbl}</div>
						<div className="text-xs text-muted-foreground">{row.original?.description}</div>
					</div>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<TooltipProvider>
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<ShipmentSheetDetails />
						</TooltipTrigger>
						<TooltipContent>
							<p>History</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		),
	},

	{
		accessorKey: "location",
		header: "Location",
		cell: ({ row }) => <span>{row.original?.location}</span>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex flex-col justify-center items-center">
				<Badge className="text-green-600 bg-green-500/20 hover:bg-green-500/30" variant="secondary">
					{camelCase(row.original?.status)}
				</Badge>
				{row.original?.statusDetails && (
					<div className="text-xs text-muted-foreground">{row?.original?.statusDetails}</div>
				)}
			</div>
		),
	},
	{
		accessorKey: "timestamp",
		header: "Updated",
		cell: ({ row }) => (
			<div>
				<div className="text-xs text-muted-foreground">
					{row.original.timestamp
						? new Date(row.original?.timestamp).toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
						  })
						: ""}
					{/* days passed from timestamp to now */}
					<div className="mt-2 text-muted ">
						{row.original.timestamp
							? `${Math.floor(
									(Date.now() - new Date(row.original?.timestamp).getTime()) /
										(1000 * 60 * 60 * 24),
							  )} days ago`
							: ""}
					</div>
				</div>
			</div>
		),
	},

	{
		accessorKey: "sender",
		header: "Sender",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 ">
				<Avatar className="h-6  w-6 ">
					<AvatarFallback>{row.original?.sender?.charAt(0)}</AvatarFallback>
				</Avatar>

				<span>{row.original?.sender}</span>
			</div>
		),
	},
	{
		accessorKey: "receiver",
		header: "Receiver",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 ">
				<Avatar className="h-6  w-6 ">
					<AvatarFallback>{row.original?.receiver?.charAt(0)}</AvatarFallback>
				</Avatar>

				<span className="text-sm">{row.original?.receiver}</span>
			</div>
		),
	},
	{
		accessorKey: "state",
		header: "State - City",
		cell: ({ row }) => (
			<div>
				<p>{row.original?.state}</p>
				<p className="text-xs text-muted-foreground">{row.original?.city}</p>
			</div>
		),
	},

	{
		accessorKey: "updateMethod",
		header: "Method",
		cell: ({ row }) => (
			<Badge className="text-xs" variant="outline">
				{toLower(row.original?.updateMethod)}
			</Badge>
		),
	},
];
