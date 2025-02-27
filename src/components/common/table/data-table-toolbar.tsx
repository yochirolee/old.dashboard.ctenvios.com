import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/common/table/data-table-view-option";

import { DataTableFacetedFilter } from "@/components/common/table/data-table-faceted-filters";

interface TableData {
	agency?: {
		id: number;
		name: string;
	};
	status?: {
		code: string;
		name: string;
	};
}

interface DataTableToolbarProps<TData extends TableData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData extends TableData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	const agencies = table.getCoreRowModel().rows.map((row) => row?.original?.agency?.id.toString());
	const statuses = table.getCoreRowModel().rows.map((row) => row?.original?.status?.code);
	console.log(agencies, statuses, isFiltered);

	return (
		<div className="flex">
			<div className="flex flex-1 items-center space-x-2">
				{table.getColumn("agency") && (
					<DataTableFacetedFilter
						column={table.getColumn("agency")}
						title="Agencias"
						options={Array.from(new Set(agencies)).map((agencyId) => {
							const agency = table
								.getCoreRowModel()
								.rows.find((row) => row.original.agency?.id.toString() === agencyId)
								?.original.agency;
							return {
								label: agency?.name || "Unknown",
								value: agency?.id.toString() || "",
							};
						})}
					/>
				)}
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={Array.from(new Set(statuses)).map((statusCode) => {
							const status = table
								.getCoreRowModel()
								.rows.find((row) => row.original.status?.code === statusCode)?.original.status;
							return {
								label: status?.name || "Unknown",
								value: statusCode + " " + status?.name,
							};
						})}
					/>
				)}

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<div className="flex items-center space-x-2 justify-end">
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
