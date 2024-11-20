import { columns } from "@/components/common/table/columns";
import { DataTable } from "@/components/common/table/data-table";
import { SearchForm } from "@/components/logistics/search-form";
import TableSkeleton from "@/components/logistics/table-skeleton";
import { Alert } from "@/components/ui/alert";
import { useState, useDeferredValue } from "react";
import { useFetchParcels, useSearchParcels } from "@/hooks/parcels/parcels";

export default function TrackingPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const deferredSearchQuery = useDeferredValue(searchQuery);

	const {
		data: initialData,
		isLoading: isInitialLoading,
		error: isInitialError,
	} = useFetchParcels();

	const { data: searchData, isLoading, error } = useSearchParcels(deferredSearchQuery);

	const data = searchQuery ? searchData?.parcels : initialData?.parcels;

	if (error || isInitialError) {
		return (
			<Alert variant="destructive">
				An error occurred: {error ? error?.message : isInitialError?.message}
			</Alert>
		);
	}

	return (
		<div className="rounded-md space-y-6  py-2 p-2 md:p-4  ">
			<SearchForm setQuerySearch={setSearchQuery} isLoading={isLoading} />

			{isLoading || isInitialLoading ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columns} data={data || []} />
			)}
		</div>
	);
}
