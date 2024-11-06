import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableHeader,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import { useFetchIssues } from "@/hooks/parcels/issues";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function IssuesPage() {
	const { data: issues, isLoading, error } = useFetchIssues();

	return (
		<div className="hidden flex-col md:flex">
			<div className="flex h-[calc(100vh-4rem)]">
				{/* Sidebar */}
				<div className="w-[340px] border-r px-4 py-6">
					{issues?.map((issue) => (
						<Button key={issue.id} variant="ghost" className="w-full justify-start">
							<CardHeader>
								<CardTitle>{issue?.hbl} </CardTitle>
							</CardHeader>
						</Button>
					))}
				</div>
				{/* Main Content */}
				<div className="flex-1 flex-col">
					<div className="p-4 border-b">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search issues..." className="pl-8" />
						</div>
					</div>
					<div className="p-4">
						{error ? (
							<div className="p-4 text-red-500">Error loading issues: {error.message}</div>
						) : isLoading ? (
							<div className="space-y-2">
								<Skeleton className="h-12 w-full" />
								<Skeleton className="h-12 w-full" />
								<Skeleton className="h-12 w-full" />
							</div>
						) : (
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Description</TableHead>
											<TableHead>Created At</TableHead>
											<TableHead>Status</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{issues?.map((issue) => (
											<TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50">
												<TableCell className="font-medium">{issue.id}</TableCell>
												<TableCell>{issue.description || "No description"}</TableCell>
												<TableCell>{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
												<TableCell></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
