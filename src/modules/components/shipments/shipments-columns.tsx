import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toLower } from "lodash";
import { FileTextIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import ShipmentSheetDetails from "./shipment-sheet-details";
import { getIcon } from "../common/getIcon";
import { Shipment } from "@/data/data";
import { DataTableColumnHeader } from "./shipments-data-table-column-header";

export const ShipmentColumns = (): ColumnDef<Shipment>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "agency",
		header: "Agency",

		cell: ({ row }) => (
			<div className="flex flex-col items-start gap-2">
				<div className="text-xs text-sky-700">{row.original.agency}</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								to={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${row.original.invoiceId}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2  group-hover:text-white "
							>
								<FileTextIcon size={16} className="h-4 w-4 text-muted hover:text-white " />
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
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{
		accessorKey: "hbl",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Hbl" />,
		cell: ({ row }) => {
			return (
				<div className="flex flex-col gap-2">
					<div>{row.original.hbl}</div>
					<div className="text-xs text-muted-foreground">{row.original?.description}</div>
				</div>
			);
		},
	},
	{
		id: "details",
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
		cell: ({ row }) => (
			<div>
				<Badge className="shrink-0" variant="secondary">
					{getIcon(row.original?.status_code)}
					<div className="ml-2">{row.original?.status}</div>
				</Badge>

				<span className=" block  text-xs text-muted-foreground">
					{row.original?.status_description}
				</span>
			</div>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Sender" />,
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="Receiver" />,
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
		header: ({ column }) => <DataTableColumnHeader column={column} title="State - City" />,
		cell: ({ row }) => (
			<div>
				<p>{row.original?.state}</p>
				<p className="text-xs text-muted-foreground">{row.original?.city}</p>
			</div>
		),
	},

	{
		accessorKey: "weight",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Weight" />,
		cell: ({ row }) => (
			<div className="flex flex-col gap-2 text-xs text-muted-foreground">
				<span className="font-light">{parseFloat(row.original?.weight).toFixed(2)} Lbs</span>
				<span className="font-light">
					{parseFloat(row.original?.weight / 2.205).toFixed(2)} Kgs
				</span>
			</div>
		),
	},
];
