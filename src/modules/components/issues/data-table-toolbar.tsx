"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses, agencies } from "@/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

interface AgencyOption {
	label: string;
	value: string;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	/* const agencies: AgencyOption[] = Array.from(
		new Set(
			table.getCoreRowModel().rows.map((row) =>
				JSON.stringify({
					label: row.original.shipment?.agency?.name ?? "Unknown",
					value: row.original.shipment?.agency?.name?.toString() ?? "",
				}),
			),
		),
	).map((str) => JSON.parse(str));
 */
	
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Filter tasks..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("agency") && (
					<DataTableFacetedFilter
						column={table.getColumn("agency")}
						title="Agency"
						options={agencies}
					/>
				)}
				{table.getColumn("priority") && (
					<DataTableFacetedFilter
						column={table.getColumn("priority")}
						title="Priority"
						options={priorities}
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
			<DataTableViewOptions table={table} />
		</div>
	);
}
