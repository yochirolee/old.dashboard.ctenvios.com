import { columns } from "@/components/logistics/columns";
import { ContainerSelect } from "@/components/containers/container-select";
import { DataTable } from "@/components/logistics/data-table";
import { useFetchParcelsByContainerId } from "@/hooks/parcels/containers";

import { useState } from "react";
import TableSkeleton from "@/components/logistics/table-skeleton";
import { ContainerStats } from "@/components/containers/container-stats";
import {
	NoContainerSelected,
	ContainerPendingToArrival,
} from "@/components/containers/no-container-selected";

export default function ContainersPage() {
	const [selectedContainer, setSelectedContainer] = useState<number | null>(null);
	const {
		data: parcelsInContainer,
		isLoading,
		error,
	} = useFetchParcelsByContainerId(selectedContainer?.id);

	return (
		<div>
			<div className=" bg-muted/20  rounded-lg py-6 px-4 flex justify-between items-center  p-4 ">
				<ContainerSelect setSelectedContainer={setSelectedContainer} />

				<div className="flex gap-4">
					<p className="text-sm text-muted-foreground">
						Total de paquetes: {parcelsInContainer?.data?.length}
					</p>
					<p className="text-sm text-muted-foreground">Peso: {selectedContainer?.weight} lbs</p>
				</div>
			</div>
			{selectedContainer?.id ? (
				<div>
					{isLoading ? (
						<TableSkeleton />
					) : (
						<div>
							{parcelsInContainer?.inPort ? (
								<ContainerStats parcelsInContainer={parcelsInContainer?.data} />
							) : (
								<>
									<ContainerPendingToArrival selectedContainerId={selectedContainer?.id} />
								</>
							)}
							<DataTable columns={columns} data={parcelsInContainer?.data || []} />
						</div>
					)}
				</div>
			) : (
				<NoContainerSelected />
			)}
		</div>
	);
}
