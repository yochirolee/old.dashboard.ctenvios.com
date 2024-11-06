import React from "react";
import { useFetchParcelByHbl } from "@/hooks/parcels/parcels";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Parcel } from "@/types/parcel";
import {
	Plane,
	Ship,
	Truck,
	Package,
	CheckIcon,
	Home,
	Building2,
	Warehouse,
	MessageCircle,
	LucidePrinter,
	LucideIcon,
	Flame,
	TriangleAlert,
	MessageSquareIcon,
} from "lucide-react";
import { IssueModalForm } from "./issue-modal-form";

const getEventIcon = (locationName: string): LucideIcon => {
	const name = locationName.toLowerCase();

	if (name.includes("airport") || name.includes("vuelo")) return Plane;
	if (name.includes("port") || name.includes("puerto")) return Ship;
	if (name.includes("delivery") || name.includes("entrega")) return CheckIcon;
	if (name.includes("warehouse") || name.includes("almacen")) return Warehouse;
	if (name.includes("home") || name.includes("casa")) return Home;
	if (name.includes("agency") || name.includes("agencia")) return Building2;
	if (name.includes("tralado") || name.includes("traslado")) return Truck;
	return Package; // default icon
};
export default function ParcelHistoryDetails({ hbl }: { hbl: string }) {
	if (!hbl) return null;
	const {
		data: parcel,
		isLoading,
		error,
	} = useFetchParcelByHbl(hbl) as {
		data: Parcel | undefined;
		isLoading: boolean;
		error: Error | null;
	};
	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className=" grid mt-6  md:grid-cols-2 gap-4 text-sm  ">
			<ScrollArea className="h-[calc(100vh-10rem)] px-4  ">
				<div className="flex my-2 justify-between items-center">
					<h2 className="text-xl">{parcel?.agency}</h2>
					<Button variant="outline" className="text-xs">
						<LucidePrinter className="h-4 w-4 mr-2" />
						{parcel?.invoiceId}
					</Button>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3 ">
					<ul className="grid gap-3 ">
						<li className="flex flex-col  ">
							<div>
								<h4 className="font-semibold text-xl">{hbl}</h4>
							</div>
							<span className="text-muted-foreground text-sm">{parcel?.description}</span>
							<span className="text-sm">{parcel?.weight} Lbs</span>
						</li>
					</ul>
				</div>
				<Separator className="my-4" />

				<div className="grid gap-3 ">
					<div className="font-semibold">Direccion de Entrega</div>
					<dl className="grid gap-3">
						<div className="flex items-center text-muted-foreground justify-between">
							<dd>{parcel?.shippingAddress}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dd>{parcel?.province + " / " + parcel?.city}</dd>
						</div>
					</dl>
				</div>

				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Envia</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Nombre:</dt>
							<dd>{parcel?.customer?.fullName}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Correo:</dt>
							<dd>
								<a href="mailto:">{parcel?.customer?.email}</a>
							</dd>
						</div>
						<div className="flex items-center justify-between ">
							<dt className="text-muted-foreground">Telefono:</dt>
							<dd className="inline-flex items-center hover:text-green-600">
								<MessageCircle className="h-4 w-4 mr-2" />
								<a target="_blank" href={`https://wa.me/${parcel?.customer?.mobile}`}>
									+1{parcel?.customer?.mobile}
								</a>
							</dd>
						</div>
					</dl>
				</div>

				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Recibe</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Nombre:</dt>
							<dd>{parcel?.receiver?.fullName}</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">CI:</dt>
							<dd>
								<a>{parcel?.receiver?.ci}</a>
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Telefono:</dt>
							<dd>
								<a href="tel:">+53{parcel?.receiver?.mobile}</a>
							</dd>
						</div>
					</dl>
					{parcel?.events?.[parcel?.events?.length - 1].hbl && (
						<IssueModalForm event={parcel?.events?.[parcel?.events?.length - 1]} />
					)}
				</div>
			</ScrollArea>
			<ScrollArea className="h-[calc(100vh-10rem)] pr-4">
				<h3 className="text-xl font-semibold text-center mb-6">Tracking</h3>
				<div className="relative">
					{/* Vertical line that connects all events */}
					<div className="absolute left-4 top-5 bottom-5 w-[1px] bg-gray-200 dark:bg-gray-400" />

					{parcel?.events?.map((event, index) => (
						<div key={index} className="relative flex items-start mb-8 last:mb-0">
							{/* Timeline dot with conditional line */}
							<div className="absolute left-0.5 ">
								{event.type === "ISSUE" ? (
									<Flame className="h-7 border w-7 bg-white dark:bg-slate-800 p-1 rounded-full text-sky-600" />
								) : (
									<div className="relative ">
										{React.createElement(getEventIcon(event?.locationName), {
											className:
												"h-7 border w-7 bg-white dark:bg-slate-800 p-1 rounded-full text-sky-600",
										})}
									</div>
								)}
							</div>
							{/* Event content */}
							<div className="ml-12 flex-grow">
								<div className="flex items-center justify-between my-2">
									<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
										{event?.locationName}
									</h4>
									<time className="text-xs text-gray-500">
										{new Date(event?.updatedAt).toLocaleString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</time>
								</div>

								<div className="mt-2 flex justify-between items-center bg-slate-50/80 p-2 rounded-md">
									<p className="font-semibold">{event?.status}</p>
									<p>{event?.statusDetails}</p>
								</div>
								{event?.issues && event.issues.length > 0 && (
									<>
										{event.issues.map((issue, index) => (
											<div
												key={index}
												className="flex border-y border-dashed my-2 p-1 items-center w-full  gap-2 "
											>
												<TriangleAlert className="w-4 h-4 mr-4 text-red-500 " />
												<div className="flex-1 ">
													<p>{issue.description}</p>
													<time className="text-xs text-gray-500">
														{new Date(issue?.createdAt).toLocaleString("en-US", {
															year: "numeric",
															month: "short",
															day: "numeric",
															hour: "2-digit",
															minute: "2-digit",
														})}
													</time>
												</div>

												<div className="relative text-xs text-gray-500">
													<MessageSquareIcon className="w-5 h-5" />
													<p className="absolute text-center h-4 w-4 rounded-full text-white  bg-red-500  -top-2 left-2">
														{issue?.comments?.length}
													</p>
												</div>
											</div>
										))}
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
