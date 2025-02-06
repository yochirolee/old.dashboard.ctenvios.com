import { ContainerSelect }	 from "@/modules/shipments/components/containers/container-select";
import { useState, useDeferredValue, useMemo } from "react";
import TableSkeleton from "@/components/logistics/table-skeleton";
import { ContainerStats } from "@/components/containers/container-stats";
import {
	NoContainerSelected,
	ContainerPendingToArrival,
} from "@/components/containers/no-container-selected";
import { ContainerUpdateModalForm } from "@/components/containers/container-update-modal-form";
import ExcelUploadDialog from "@/components/logistics/excel-upload-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFetchParcelsByContainerId } from "@/hooks/parcels/containers";

export default function ContainersPage() {
	const [selectedContainer, setSelectedContainer] = useState<{ id: number } | null>(null);
	const [agencyFilter, setAgencyFilter] = useState<string>("");
	const [locationFilter, setLocationFilter] = useState<string>("");

	const {
		data: parcelsInContainer,
		isLoading,
		error,
	} = useFetchParcelsByContainerId(selectedContainer?.id);

	const filteredData = useMemo(() => {
		if (!parcelsInContainer?.data) return [];
		return parcelsInContainer.data.filter(({ agency, location }) => {
			const matchesAgency =
				!agencyFilter || agency?.toLowerCase().includes(agencyFilter.toLowerCase());
			const matchesLocation =
				!locationFilter || location?.toLowerCase().includes(locationFilter.toLowerCase());
			return matchesAgency && matchesLocation;
		});
	}, [parcelsInContainer?.data, agencyFilter, locationFilter]);

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
					<ContainerUpdateModalForm
						selectedContainerId={selectedContainer?.id}
						inPort={parcelsInContainer?.inPort}
					/>
					<ExcelUploadDialog isLoading={isLoading} />
				</div>
			</div>

			{selectedContainer?.id ? (
				isLoading ? (
					<TableSkeleton />
				) : (
					<div>
						{parcelsInContainer?.inPort ? (
							<ContainerStats parcelsInContainer={filteredData} />
						) : (
							<ContainerPendingToArrival selectedContainerId={selectedContainer.id} />
						)}

						{filteredData.length > 0 ? (
							<>
								{/* <DataTableFacetedFilter
									column={filteredData.filter((parcel: any) => parcel.agency)}
									title="Agencias"
									options={Array.from(
										new Set(filteredData.map((parcel: any) => {
											const agency = parcel.agency;
											console.log(agency);
											return {
												label: agency || "Unknown",
												value: agency || "",
											};
										}))
									)}
									
								/> */}
								<DataTable columns={columns} data={filteredData} />
							</>
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
