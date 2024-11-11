
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/common/table/data-table-view-option";

import { statuses } from "@/data/data";
import { DataTableFacetedFilter } from "@/components/common/table/data-table-faceted-filters";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex  ">
			<div className="flex flex-1 items-center space-x-2">
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)}

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<X />
					</Button>
				)}
			</div>
			<div className="flex items-center space-x-2 justify-end">
			
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
