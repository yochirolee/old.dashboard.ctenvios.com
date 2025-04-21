import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileTextIcon, MessageCircleIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import ShipmentSheetDetails from "../shipments/shipment-sheet-details";
import { Issue } from "@/data/data";
import { Button } from "@/components/ui/button";
import { getPriorityBadge } from "../common/get-priority-badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./issues-table-row-actions";

export const IssuesColumns = (): ColumnDef<Issue>[] => [
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
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
		cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: "agency",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Agency" />,
		cell: ({ row }) => (
			<div className="flex flex-col gap-1">
				<div className="text-sky-500">{row.original?.agency?.name}</div>
				<div className="text-xs text-muted-foreground">{row.original?.invoiceId}</div>
			</div>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{
		accessorKey: "hbl",
		header: "HBL",
		cell: ({ row }) => {
			return (
				<div>
					<div className="flex flex-col gap-2 max-w-[150px]">
						<div>{row.original?.hbl}</div>
						<div className="text-xs text-muted-foreground">
							{row.original?.shipmentDescription}
						</div>
					</div>
				</div>
			);
		},
	},
	{
		id: "history",
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
	/* 	{
		id: "actions",
		cell: ({ row }) => (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger >
						<ShipmentSheetDetails hbl={row.original?.shipment?.hbl} />
					</TooltipTrigger>
					<TooltipContent>
						<p>History</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		),
	}, */

	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<div className=" space-y-1 ">
				<p className="text-xs text-muted-foreground">{row.original.description}</p>
			</div>
		),
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => (
			<div className="space-x-2 flex items-center ">
				<FileTextIcon className="w-4 h-4 text-blue-500" />
				<span className="text-blue-500">{row.original.type}</span>
			</div>
		),
	},

	{
		accessorKey: "priority",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
		cell: ({ row }) => {
			return getPriorityBadge(row.original.priority);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},

	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => (
			<div className="text-xs space-y-2 text-muted-foreground">
				{row.original.updatedAt
					? new Date(row.original?.updatedAt).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
					  })
					: ""}
				{/* days passed from timestamp to now */}
				<div className="text-muted ">
					{row.original.createdAt
						? `${Math.floor(
								(Date.now() - new Date(row.original?.createdAt).getTime()) / (1000 * 60 * 60 * 24),
						  )} days ago`
						: ""}
				</div>
			</div>
		),
	},

	{
		accessorKey: "comments",
		header: "Comments",
		cell: ({ row }) => (
			<div className="flex items-center gap-2  text-muted-foreground">
				<span>{row.original.comments}</span>
				<Button variant="ghost" size="icon">
					<MessageCircleIcon className="w-4 h-4" />
				</Button>
			</div>
		),
	},

	{
		accessorKey: "createdBy",
		header: "Created By",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 ">
				<Avatar className="h-6  w-6 ">
					<AvatarFallback>{row.original?.user?.name?.charAt(0)}</AvatarFallback>
				</Avatar>

				<span>{row.original?.user?.name}</span>
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
