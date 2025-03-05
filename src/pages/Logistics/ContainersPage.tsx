import { ContainerSelect } from "@/modules/components/containers/container-select";
import { useState } from "react";
import TableSkeleton from "@/components/logistics/table-skeleton";
import { ContainerStats } from "@/components/containers/container-stats";
import {
	NoContainerSelected,
	ContainerPendingToArrival,
} from "@/components/containers/no-container-selected";
import { ContainerUpdateModalForm } from "@/components/containers/container-update-modal-form";
import ExcelUploadDialog from "@/components/logistics/excel-upload-dialog";
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
			<div className="bg-muted/20 rounded-md my-2 md:py-6 md:px-4 gap-4 grid md:flex justify-center md:justify-between items-center">
				<ContainerSelect setSelectedContainer={setSelectedContainer} />
				<div className="grid grid-cols-2 lg:flex items-center gap-4">
					<ContainerUpdateModalForm selectedContainer={selectedContainer} />
					<ExcelUploadDialog isLoading={isLoading} />
				</div>
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

						{container?.shipments.length > 0 ? (
							<ShipmentsTable columns={ShipmentColumns()} data={container?.shipments} />
						) : (
							<div className="text-center text-gray-500">
								No hay resultados que coincidan con los filtros.
							</div>
						)}
					</div>
				)
			) : (
				<NoContainerSelected />
			)}
		</div>
	);
}
