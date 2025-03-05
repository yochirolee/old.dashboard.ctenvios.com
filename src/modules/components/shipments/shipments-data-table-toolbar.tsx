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
	// Get all visible columns except details and select
	let headers = table
		.getHeaderGroups()
		.flatMap((headerGroup) => headerGroup.headers)
		.filter((header) => !["details", "select"].includes(header.column.id))
		.map((header) => {
			const headerValue = header.column.columnDef.header;
			if (typeof headerValue === "string") return headerValue;
			if (typeof headerValue === "function") return header.column.id;
			return header.column.id;
		});

	// Remove duplicate columns that we'll reposition
	headers = headers.filter(
		(header) => !["hbl", "agency", "invoiceId", "description"].includes(header),
	);

	// Define the desired column order
	const orderedHeaders = [
		"HBL", // First
		"Invoice ID", // Second
		"Agency", // Third
		"Description", // Fourth
		"Status",
		"Timestamp",
		"Sender",
		"Receiver",
		"State - City",
		"Weight",
	];

	const hasFilters = table.getState().columnFilters.length > 0;
	const rowModel = hasFilters ? table.getFilteredRowModel() : table.getCoreRowModel();

	// Transform rows to match the new column order
	const rows = rowModel.rows.map((row) => {
		// Get all other cells except the ones we're manually positioning
		const otherCells = row
			.getVisibleCells()
			.filter(
				(cell) =>
					!["details", "select", "hbl", "agency", "invoiceId", "description"].includes(
						cell.column.id,
					),
			)
			.map((cell) => {
				const column = cell.column.id;
				const value = cell.getValue();

				switch (column) {
					case "weight":
						const weight = row.original.weight;
						return `${parseFloat(weight).toFixed(2)} Lbs / ${parseFloat(weight / 2.205  ).toFixed(
							2,
						)} Kgs`;
					case "status":
						return `${row.original.status} - ${row.original.status_description}`;
					case "state":
						return `${row.original.state} - ${row.original.city}`;
					case "timestamp":
						const date = new Date(row.original.timestamp);
						const formattedDate = date.toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						});
						const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
						return `${formattedDate} (${daysAgo} days ago)`;
					default:
						if (value === null || value === undefined) return "";
						if (Array.isArray(value)) {
							return value
								.map((item) => (typeof item === "object" ? Object.values(item).join(", ") : item))
								.join(" | ");
						}
						if (typeof value === "object") {
							return Object.entries(value)
								.map(([key, val]) => `${key}: ${val}`)
								.join(" | ");
						}
						return value;
				}
			});

		// Create array with desired order
		return [
			row.original.hbl || "", // HBL
			row.original.invoiceId || "", // Invoice ID
			row.original.agency || "", // Agency
			row.original.description || "", // Description
			...otherCells,
		];
	});

	// Create worksheet with styling options
	const ws = XLSX.utils.aoa_to_sheet([orderedHeaders, ...rows]);

	// Adjust cell formatting for better readability
	ws["!rows"] = rows.map(() => ({ hpt: 25 })); // Set row height
	ws["!cols"] = orderedHeaders.map(() => ({ wch: 30 })); // Increase column width

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
