import React from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Parcel } from "@/types/parcel";
import { MessageCircle, Flame, FileDown, IdCardIcon } from "lucide-react";
import { locations, statuses } from "@/data/data";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useGetShipmentByHbl } from "@/hooks/use-shipments";
import { Shipment } from "@/types/shipment";
export default function ParcelHistoryDetails({ hbl }: { hbl: string }) {
	if (!hbl) return null;
	const {
		data: parcel,
		isLoading,
		error,
	} = useGetShipmentByHbl(hbl);
	console.log(parcel);
	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;
	return (
		<div>
			<ScrollArea className="h-[calc(100vh-8rem)] p-4  mb-6  ">
				<div className=" grid mt-6 pb-6   gap-4  text-sm  ">
					<div>
						<div className="flex my-2 justify-between items-center">
							<h2 className="text-base">{parcel?.agency}</h2>
							<div className="flex items-center border p-2 rounded-lg gap-2">
								<p>{parcel?.invoiceId}</p>
								<FileDown className="h-4 cursor-pointer w-4 text-sky-600" />
							</div>
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

						<div className="my-4 ">
							<h3 className=" font-semibold text-muted-foreground px-2 dark:bg-muted/20 p-1 rounded-md">
								Sender
							</h3>
							<div className="grid gap-3">
								<div className="flex my-2 items-center space-x-4 py-2">
									<Avatar>
										<AvatarFallback>{parcel?.customer?.fullName?.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col space-y-1">
										<p>{parcel?.customer?.fullName}</p>
										<div className="flex items-center text-muted-foreground space-x-2 hover:text-green-600">
											<a target="_blank" href={`https://wa.me/${parcel?.customer?.mobile}`}>
												+1{parcel?.customer?.mobile}
											</a>
											<MessageCircle className="h-4 w-4 mr-2" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="my-4 ">
							<h3 className=" font-semibold text-muted-foreground px-2 dark:bg-muted/20 p-1 rounded-md">
								Receiver
							</h3>
							<div className="grid gap-3">
								<div className="flex my-2 items-center space-x-4 py-2">
									<Avatar>
										<AvatarFallback>{parcel?.receiver?.fullName?.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col space-y-1">
										<p>{parcel?.receiver?.fullName}</p>
										<div className="flex justify-between items-center space-x-2">
											<div className="flex  items-center text-muted-foreground space-x-2 hover:text-green-600">
												<a target="_blank" href={`https://wa.me/${+53 + parcel?.receiver?.mobile}`}>
													+53{parcel?.receiver?.mobile}
												</a>
												<MessageCircle className="h-4 w-4 mr-2" />
											</div>
											<Separator orientation="vertical" className="h-4" />
											<div className="flex items-center text-muted-foreground space-x-2">
												<p>{parcel?.receiver?.ci}</p>

												<IdCardIcon className="h-5 w-5 mr-2" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="my-4 ">
							<h3 className=" font-semibold text-muted-foreground px-2 dark:bg-muted/20 p-1 rounded-md">
								Shipping Address
							</h3>

							<div className=" flex-col flex space-y-1 my-2 mx-2 py-2 ">
								<dd>{parcel?.shippingAddress}</dd>
								<dd className="text-muted-foreground ">
									{parcel?.province + " / " + parcel?.city}
								</dd>
							</div>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold text-center ">Timeline</h3>
						<Separator className="my-4 " />
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
											<div className="relative top-1.5 ">
												{locations.find((location) => location.value === event.location)?.icon &&
													React.createElement(
														locations.find((location) => location.value === event.location)!.icon!,
														{
															className:
																"h-6 w-6 bg-white dark:bg-slate-800 p-1 rounded-full text-sky-600",
														},
													)}
											</div>
										)}
									</div>
									{/* Event content */}
									<div className="ml-12 flex-grow">
										<div className="flex md:flex-row flex-col items-left md:items-center justify-between my-2">
											<h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
												{locations.find((location) => location.value === event.location)?.label}
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

										<div className="mt-2 grid md:flex justify-between items-center bg-slate-50/80 dark:bg-muted/20 p-2 rounded-md">
											<p className="font-semibold">
												{statuses.find((status) => status.value === event.status)?.label}
											</p>
											<p>{event?.statusDetails}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
}
