import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useGetShipmentByHbl } from "@/hooks/use-shipments";
import ShipmentTimeline from "./shipment-timeline";

export default function ShipmentDetails({ hbl }: { hbl: string }) {
	if (!hbl) return null;
	const { data, isLoading } = useGetShipmentByHbl(hbl);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div>
			<Card className="overflow-hidden border-none p-0 m-0">
				<CardHeader className="flex flex-row justify-between items-start">
					<div className="grid grid-cols-2 items-center  ">
						<div className="flex flex-col  gap-1">
							<div className="text-lg font-semibold">{hbl}</div>{" "}
							<span className="text-sm text-muted-foreground">{data?.description}</span>
							<time className="text-sm text-muted-foreground">
								{new Date(data?.invoiceDate).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</time>
						</div>
					</div>
					<div className="flex flex-col gap-1 ">
						<div className="text-sm text-sky-700 font-semibold">{data?.agency}</div>
						<div className="ml-auto flex items-center gap-1">
							<Button size="sm" variant="outline" className="h-8 gap-1">
								{data?.invoiceId}
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="outline" className="h-8 w-8">
										<MoreVertical className="h-3.5 w-3.5" />
										<span className="sr-only">More</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>Edit</DropdownMenuItem>
									<DropdownMenuItem>Export</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Trash</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>{" "}
				</CardHeader>
				<div className="px-6 text-sm">
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Envia:</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Nombre</dt>
								<dd>{data?.sender}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Email</dt>
								<dd>
									<a href="mailto:">{data.email}</a>
								</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Phone</dt>
								<dd>
									<a href="tel:">+1{data?.senderMobile}</a>
								</dd>
							</div>
						</dl>
					</div>
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Recibe:</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Nombre</dt>
								<dd>{data?.receiver}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Email</dt>
								<dd>
									<a href="mailto:">{data.receiverEmail}</a>
								</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Phone</dt>
								<dd>
									<a href="tel:">+1{data?.receiverMobile}</a>
								</dd>
							</div>
						</dl>
					</div>
					<Separator className="my-4" />
					<div className="grid  gap-4">
						<div className="grid gap-3">
							<div className="font-semibold">Direccion</div>
							<address className="grid gap-0.5 not-italic text-muted-foreground">
								<span>{data?.shippingAddress}</span>
								<span>
									{data?.state}, {data?.city}
								</span>
							</address>
						</div>
					</div>
				</div>
			</Card>
			<ShipmentTimeline events={data?.events || []} />
		</div>
	);
}
