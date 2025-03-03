import { useGetIssues } from "@/hooks/use-issues";
import { DataTable } from "@/modules/components/issues/data-table";
import { IssuesColumns } from "@/modules/components/issues/issues-columns";

export default function IssuesPage() {
	const { data, isLoading, error } = useGetIssues();

	
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="flex flex-col gap-4">
			<DataTable data={data} columns={IssuesColumns()} />
		</div>
	);
}
