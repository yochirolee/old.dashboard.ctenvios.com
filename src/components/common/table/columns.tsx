import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format, differenceInDays } from "date-fns";
import {
	ArrowUpDown,
	CheckCircle2,
	FileTextIcon,
	Tag,
	TimerIcon,
	Package,
	ArrowLeftRight,
	FileSearch,
	Building2,
	Box,
	Shield,
	ShieldAlert,
	Truck,
	TruckIcon,
	CheckIcon,
	ContainerIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ParcelInterface } from "@/interfaces/parcel";
import { Link } from "react-router-dom";
import ParcelHistorySheet from "@/components/logistics/parcel-history-sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ParcelInterface>[] = [
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
		header: "Agencia",
		cell: ({ row }) => (
			<div className="space-y-1">
				<p className="font-medium text-sm text-sky-800">{row.original?.agency}</p>
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "invoiceId",
		header: "Factura",
		cell: ({ row }) => (
			<div className="w-40 space-y-1">
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

				<p className="text-xs text-muted-foreground ">
					{row.original?.invoiceDate &&
						format(new Date(row.original?.invoiceDate), "dd/MM/yyyy h:mm a")}
				</p>
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "hbl",
		header: "Hbl",
		cell: ({ row }) => (
			<div className="space-y-1">
				<div className="flex items-center gap-3">
					<span>{row.original?.hbl}</span>{" "}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									to={`https://systemcaribetravel.com/ordenes/etiqueta_print_transcargo.php?id=${row.original?.invoiceId}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 "
								>
									<Tag size={16} className="h-4 w-4 text-sky-700" />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Ver Etiquetas</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<p className="text-xs text-muted-foreground">{row.original?.description}</p>
			</div>
		),
		enableSorting: true,
	},
	{
		id: "actions",
		cell: ({ row }) => (
			<TooltipProvider>
				<div className="flex items-center gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<ParcelHistorySheet hbl={row.original?.hbl} />
							</div>
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
		accessorKey: "locationName",
		header: "Location",
		cell: ({ row }) => {
			return (
				<div className="flex flex-col space-y-2">
					<span className="text-xs text-nowrap">
						{row?.original?.container
							? row.original?.locationName + " - " + row?.original?.container
							: row.original?.locationName}
					</span>
					{row.original?.statusDetails && (
						<span className="text-xs text-muted-foreground">{row.original.statusDetails}</span>
					)}
				</div>
			);
		},
		enableSorting: true,
	},

	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const status = row.original?.status ? row.original?.status : row.original?.statusName;
			const formattedStatus =
				{
					FACTURADO: "Facturado",
					EN_PALLET: "Pallet",
					EN_DESPACHO: "Despacho",
					EN_CONTENEDOR: "Contenedor",
					EN_ESPERA_DE_AFORO: "Pendiente Aforo",
					AFORADO: "Aforado",
					EN_TRASLADO: "Traslado",
					ENTREGADO: "Entregado",
					NO_DECLARADO: "No Declarado",
					ROTO: "Roto",
					MOJADO: "Mojado",
					DERRAME: "Derrame",
					CON_FALTANTE: "Faltante",
					PERDIDO: "Perdido",
					ENTREGA_FALLIDA: "Entrega Fallida",
					RETRASADO: "Retrasado",
					OTRO: "Otro",
				}[status] || status;

			const iconColors =
				{
					FACTURADO: "text-gray-600",
					EN_PALLET: "text-purple-600",
					EN_DESPACHO: "text-indigo-600",
					EN_CONTENEDOR: "text-blue-600",
					EN_ESPERA_DE_AFORO: "text-yellow-600",
					AFORADO: "text-green-600",
					EN_TRASLADO: "text-sky-600",
					ENTREGADO: "text-emerald-600",
					NO_DECLARADO: "text-orange-600",
					ROTO: "text-red-600",
					MOJADO: "text-red-600",
					DERRAME: "text-red-600",
					CON_FALTANTE: "text-red-600",
					PERDIDO: "text-red-600",
					ENTREGA_FALLIDA: "text-red-600",
					RETRASADO: "text-amber-600",
					OTRO: "text-gray-600",
				}[status] || "text-gray-600";

			const StatusIcon =
				{
					FACTURADO: FileTextIcon,
					EN_PALLET: Box,
					EN_DESPACHO: Building2,
					EN_CONTENEDOR: ContainerIcon,
					EN_ESPERA_DE_AFORO: ShieldAlert,
					AFORADO: Shield,
					EN_TRASLADO: Truck,
					ENTREGADO: CheckIcon,
					NO_DECLARADO: FileSearch,
					ROTO: Package,
					MOJADO: Package,
					DERRAME: Package,
					CON_FALTANTE: Package,
					PERDIDO: Package,
					ENTREGA_FALLIDA: ArrowLeftRight,
					RETRASADO: TimerIcon,
					OTRO: Package,
				}[status] || Package;

			return (
				<div className="flex flex-col text-nowrap items-center gap-2">
					<Badge
						variant="outline"
						className={`px-3 py-1 text-nowrap rounded-full text-xs font-medium inline-flex items-center gap-1`}
					>
						<StatusIcon className={`h-4 w-4 mr-1 ${iconColors}`} />
						{row.original?.statusName ? row.original?.statusName : row.original?.status}
					</Badge>
					<p className="text-xs flex items-center  text-muted-foreground  ">
						{row.original?.updatedAt &&
							format(new Date(row.original?.updatedAt), "dd/MM/yyyy h:mm a")}
					</p>
				</div>
			);
		},
		enableSorting: true,
	},

	{
		accessorKey: "updatedAt",
		header: "Days",
		cell: ({ row }) => {
			const daysDifference = differenceInDays(
				row.original?.status === "ENTREGADO" ? new Date(row.original?.updatedAt) : new Date(), // Use current date if not ENTREGADO
				new Date(row.original?.invoiceDate),
			);
			const daysDifferenceFromLastStatus = differenceInDays(
				new Date(),
				new Date(row.original?.updatedAt),
			);
			return (
				<div className="w-40 flex flex-col items-center gap-1">
					{row.original?.locationName == "Entregado" ? (
						<div className="inline-flex justify-center items-center gap-1 mt-1">
							<CheckCircle2 className="h-4 w-4 col-span-1 text-green-500" />
							<p className=" col-span-2">Entregado en {daysDifference} días </p>
						</div>
					) : (
						<div className="flex flex-col items-center gap-1">
							<div className="inline-flex  justify-center items-center gap-1 mt-1">
								<TimerIcon
									className={`h-4 w-4 col-span-1 ${
										daysDifference < 10
											? "text-blue-500"
											: daysDifference < 20
											? "text-yellow-500"
											: "text-red-500"
									}`}
								/>
								<p className="col-span-2">Total: {daysDifference} días </p>
							</div>
							<div className="inline-flex  justify-center items-center gap-1 mt-1">
								<p className=" text-xs text-muted-foreground">
									{daysDifferenceFromLastStatus} días {row.original?.status}
								</p>
							</div>
						</div>
					)}
				</div>
			);
		},
	},

	{
		accessorKey: "sender",
		header: "Envia",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2">
				<Avatar className="h-8  w-8">
					<AvatarFallback>{row.original?.sender?.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{row.original?.sender}</span>
			</div>
		),
	},
	{
		accessorKey: "receiver",
		header: "Recibe",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2">
				<Avatar className="h-8 w-8">
					<AvatarFallback>{row.original?.receiver?.charAt(0)}</AvatarFallback>
				</Avatar>
				<span>{row.original?.receiver}</span>
			</div>
		),
	},
	{
		accessorKey: "province",
		header: "Provincia",
		cell: ({ row }) => <span className="text-slate-600">{row.original?.province}</span>,
	},
	{
		accessorKey: "city",
		header: "Municipio",
		cell: ({ row }) => <span className="text-slate-600">{row.original?.city}</span>,
	},
];
