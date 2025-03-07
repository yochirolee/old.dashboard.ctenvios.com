import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { Skeleton } from "../ui/skeleton";

/* const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
];
 */
const chartConfig = {
	visitors: {
		label: "Packages",
	},
	IN_PORT: {
		label: "In Port",
		color: "hsl(var(--chart-1))",
	},
	DELIVERED: {
		label: "Delivered",
		color: "hsl(var(--chart-2))",
	},
	READY_FOR_PICKUP: {
		label: "Ready for Pickup",
		color: "hsl(var(--chart-3))",
	},
	IN_TRANSIT: {
		label: "In Transit",
		color: "hsl(var(--chart-4))",
	},
	CUSTOMS_PENDING: {
		label: "Customs Pending",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export const ListContainerStatus = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["container-stats"],
		queryFn: () => api.stats.getContainerStats(),
	});

	if (isLoading)
		return (
			<div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
				<Skeleton className="h-60 w-full" />
				<Skeleton className="h-60 w-full" />
				<Skeleton className="h-60 w-full" />
				<Skeleton className="h-60 w-full" />
			</div>
		);

	return (
		<Card>
			<CardHeader className="bg-gray-800/10">
				<CardTitle className="text-xl">Ultimos Contenedores</CardTitle>
			</CardHeader>
			<CardContent className="mt-6">
				<div className="grid md:grid-cols-2 gap-2 lg:grid-cols-6">
					{data?.map((item) => (
						<ContainerStats key={item.id} data={item} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export function ContainerStats({ data }: { data: any }) {
	if (!data) return null;
	console.log(data);
	const chartData = Object.entries(data.status).map(([status, count]) => ({
		status: status, // using 'browser' to match existing chart config
		visitors: count, // using 'visitors' to match existing chart config
		fill: chartConfig[status as keyof typeof chartConfig]?.color || chartConfig.IN_PORT.color,
	}));

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle className="text-center text-md">{data.containerNumber}</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="status"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-2xl font-bold"
												>
													{data.count?.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Packages
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center text-xs gap-2 font-medium leading-none">
					<span>Delivery percentage: </span>
					{(() => {
						const delivered = data.status.DELIVERED || 0;
						const total = data.count;
						const percentage = (total as number) > 0 ? Math.round((delivered / total) * 100) : 0;
						return (
							<span className="flex items-center gap-1">
								{percentage}% <TrendingUp className="h-4 w-4" />
							</span>
						);
					})()}
				</div>
				<div className="leading-none text-xs text-muted-foreground">
					Showing total packages in container
				</div>
			</CardFooter>
		</Card>
	);
}
