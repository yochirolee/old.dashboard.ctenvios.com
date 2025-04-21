import { ContainerSelect } from "@/modules/components/containers/container-select";
import { useState } from "react";
import TableSkeleton from "@/components/logistics/table-skeleton";
import { ContainerStats } from "@/components/containers/container-stats";
import {
	NoContainerSelected,
	ContainerPendingToArrival,
} from "@/components/containers/no-container-selected";
import { ContainerUpdateModalForm } from "@/components/containers/container-update-modal-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetContainerById } from "@/hooks/use-containers";
import { ShipmentsTable } from "@/modules/components/shipments/shipments-table";
import { ShipmentColumns } from "@/modules/components/shipments/shipments-columns";

export default function ContainersPage() {
	const [selectedContainer, setSelectedContainer] = useState<{ id: number } | null>(null);

	const { data: container, isLoading, error } = useGetContainerById(selectedContainer?.id);

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Alert>
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<div className="p-2 md:p-4">
			<div className="bg-muted/20 p-4 rounded-md flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:justify-between md:flex-row  items-center">
				<ContainerSelect setSelectedContainer={setSelectedContainer} />
				<ContainerUpdateModalForm selectedContainer={selectedContainer} />
			</div>

			{selectedContainer?.id ? (
				isLoading ? (
					<TableSkeleton />
				) : (
					<div>
						{container ? (
							<ContainerStats shipments={container.shipments} />
						) : (
							<ContainerPendingToArrival selectedContainerId={selectedContainer.id} />
						)}

						{container?.shipments.length > 0 && (
							<ShipmentsTable columns={ShipmentColumns()} data={container?.shipments} />
						)}
					</div>
				)
			) : (
				<NoContainerSelected />
			)}
		</div>
	);
}
