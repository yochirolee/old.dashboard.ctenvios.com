import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
	return (
		<div className=" mx-auto my-6 border broder-gray-50 rounded-md ">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">
							<Skeleton className="h-4 w-4" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-20" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-16" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-24" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-28" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-16" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-24" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-24" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-20" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-4 w-20" />
						</TableHead>
						<TableHead className="w-[100px]">
							<Skeleton className="h-4 w-16" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(10)].map((_, index) => (
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-4" />
							</TableCell>
							<TableCell>
								<div>
									<Skeleton className="h-4 w-24 mb-2" />
								</div>
								<div>
									<Skeleton className="h-3 w-20" />
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-16" />
							</TableCell>
							<TableCell>
								<div>
									<Skeleton className="h-4 w-28 mb-2" />
								</div>
								<div>
									<Skeleton className="h-3 w-24" />
								</div>
							</TableCell>
							<TableCell>
								<div>
									<Skeleton className="h-4 w-20 mb-2" />
								</div>
								<div>
									<Skeleton className="h-3 w-24" />
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-16" />
							</TableCell>
							<TableCell>
								<div>
									<Skeleton className="h-4 w-8 mb-2" />
								</div>
								<div>
									<Skeleton className="h-3 w-24" />
								</div>
							</TableCell>
							<TableCell>
								<div>
									<Skeleton className="h-4 w-8 mb-2" />
								</div>
								<div>
									<Skeleton className="h-3 w-24" />
								</div>
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<div className="flex items-center space-x-2">
									<Skeleton className="h-8 w-8" />
									<Skeleton className="h-8 w-8" />
									<Skeleton className="h-8 w-8" />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
