import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { tracking_api } from "@/api/tracking-api";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
	views: {
		label: "Ventas",
	},
	sales: {
		label: "Sales",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function InvoicesCount() {
	const { data: chartData, isLoading } = useQuery({
		queryKey: ["daily-sales"],
		queryFn: () => tracking_api.stats.getDailySales(),
	});
	const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("sales");

	const total = React.useMemo(
		() => ({
			sales: chartData
				?.reduce((acc, curr) => acc + Number(curr.sales), 0)
				?.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				}),
		}),
		[chartData],
	);

	if (isLoading) return <Skeleton className="w-full h-[250px]" />;
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Agency Sales</CardTitle>
					<CardDescription>Showing total sales for the last 30 days</CardDescription>
				</div>
				<div className="flex">
					{["sales"].map((key) => {
						const chart = key as keyof typeof chartConfig;
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
								<span className="text-lg font-bold leading-none sm:text-3xl">
									{total[chart as keyof typeof total]}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<YAxis
							axisLine={false}
							tickLine={false}
							domain={[
								(dataMin: number) => Math.floor(dataMin * 0),
								(dataMax: number) => Math.ceil(dataMax * 10),
							]}
							padding={{ top: 20, bottom: 20 }}
							tickFormatter={(value) => `$${value.toFixed(2)}`}
						/>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="sales"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
								/>
							}
						/>
						<Line
							dataKey={activeChart}
							type="monotone"
							strokeWidth={1.5}
							fillOpacity={0.1}
							
							dot={true}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
