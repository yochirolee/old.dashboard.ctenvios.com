import { Table } from "@tanstack/react-table";
import { FileChartColumn, FileTextIcon, X } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

// Export to Excel function
export const exportTableToExcel = (table: Table<any>): void => {
	// Get visible columns for headers with proper type handling
	const headers = table
		.getHeaderGroups()
		.flatMap((headerGroup) => headerGroup.headers)
		.map((header) => {
			const headerValue = header.column.columnDef.header;
			if (typeof headerValue === "string") return headerValue;
			if (typeof headerValue === "function") return header.column.id;
			return header.column.id; // Fallback to column ID if header is a complex element
		});

	// Get rows based on whether filters are applied
	const hasFilters = table.getState().columnFilters.length > 0;
	const rowModel = hasFilters ? table.getFilteredRowModel() : table.getCoreRowModel();

	// Transform cell values to handle special cases
	const rows = rowModel.rows.map((row) => {
		return row.getVisibleCells().map((cell) => {
			const value = cell.getValue();
			if (value === null || value === undefined) return "";
			if (typeof value === "object") return JSON.stringify(value);
			return value;
		});
	});

	// Create worksheet with styling options
	const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

	// Add column width specifications
	const colWidths = headers.map(() => ({ wch: 15 }));
	ws["!cols"] = colWidths;

	// Create workbook
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Shipments");

	// Generate timestamp for filename
	const timestamp = new Date().toISOString().split("T")[0];
	const filenameSuffix = hasFilters ? "filtered" : "all";

	// Save file with appropriate name
	XLSX.writeFile(wb, `shipments-${filenameSuffix}-${timestamp}.xlsx`);
};

export function ShipmentsDataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const agencies = new Set(table.getCoreRowModel().rows.map((row) => row.original?.agency));
	const uniqueAgencies = Array.from(agencies).map((agency) => ({
		label: agency,
		value: agency,
	}));
	const statuses = new Set(table.getCoreRowModel().rows.map((row) => row.original?.status));
	const uniqueStatuses = Array.from(statuses).map((status) => ({
		label: status,
		value: status,
	}));

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{table.getColumn("agency") && (
					<DataTableFacetedFilter
						column={table.getColumn("agency")}
						title="Agency"
						options={uniqueAgencies}
					/>
				)}
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={uniqueStatuses}
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
			<div className="flex items-center space-x-2">
				<Button
					onClick={() => exportTableToExcel(table)}
					variant="ghost"
					className="h-9 px-2 lg:px-3 bg-green-500/10 hover:bg-green-500/30"
				>
					<FileChartColumn className="h-4 w-4 text-green-600" />
					<span className="hidden md:block text-xs text-green-600">Exportar a Excel</span>
				</Button>
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
