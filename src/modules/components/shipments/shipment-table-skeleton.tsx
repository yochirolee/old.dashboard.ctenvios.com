import { Skeleton } from "@/components/ui/skeleton";

export const ShipmentTableSkeleton = () => {
	return (
		<div className="w-full">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						{[...Array(5)].map((_, index) => (
							<th key={index} className="p-4">
								<Skeleton className="w-full h-4" />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{[...Array(10)].map((_, rowIndex) => (
						<tr key={rowIndex}>
							{[...Array(5)].map((_, colIndex) => (
								<td key={colIndex} className="p-4">
									<Skeleton className="w-full h-4" />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
