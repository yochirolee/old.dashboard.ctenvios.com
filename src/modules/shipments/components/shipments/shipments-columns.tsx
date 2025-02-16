import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toLower, camelCase } from "lodash";
import { FileTextIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import ShipmentSheetDetails from "./shipment-sheet-details";
import { Link } from "react-router-dom";

const shipmentInterface = {
	hbl: "",
	invoiceId: 1,
	containerId: 1,
	agency: {
		name: "",
	},
	location: "",
	timestamp: "",
	status: {
		name: "",
		description: "",
	},
	description: "",
	sender: "",
	receiver: "",
	state: "",
	city: "",
	invoiceDate: "",
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
		accessorKey: "agency",
		header: "Agency",
		cell: ({ row }) => <div className="text-xs text-sky-700">{row.original.agency?.name}</div>,
	},

	{
		accessorKey: "invoiceId",
		header: "Factura",
		cell: ({ row }) => (
			<div className=" ">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${row.original.invoiceId}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 "
							>
								<FileTextIcon size={16} className="h-4 w-4 text-sky-700" />
								{row.original.invoiceId}
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Ver Factura</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "hbl",
		header: "HBL",
		cell: ({ row }) => {
			return (
				<div className=" items-left">
					<div>{row.original.hbl}</div>
					<div className="text-xs text-muted-foreground">{row.original?.description}</div>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ShipmentSheetDetails hbl={row.original?.hbl} />
					</TooltipTrigger>
					<TooltipContent>
						<p>History</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		),
	},

	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex flex-col justify-left items-start">
				<Badge className="text-green-600 bg-green-500/20 hover:bg-green-500/30" variant="secondary">
					{camelCase(row.original?.status?.name)}
				</Badge>
			</div>
		),
	},

	{
		accessorKey: "timestamp",
		header: "Updated At",
		cell: ({ row }) => (
			<div className="text-xs space-y-2 text-muted-foreground">
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
				<div className="text-muted ">
					{row.original.timestamp
						? `${Math.floor(
								(Date.now() - new Date(row.original?.timestamp).getTime()) / (1000 * 60 * 60 * 24),
						  )} days ago`
						: ""}
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
