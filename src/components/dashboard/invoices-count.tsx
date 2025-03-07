import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { api } from "@/api/api";

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
		queryFn: () => api.stats.getDailySales(),
	});

	
	const { total, maxSalesValue } = useMemo(
		() => ({
			total: chartData
				?.reduce((acc, curr) => acc + Number(curr.sales), 0)
				?.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				}),
			maxSalesValue: chartData ? Math.max(...chartData.map((item) => Number(item.sales))) : 0,
		}),
		[chartData],
	);

	if (isLoading) return <Skeleton className="w-full h-[250px]" />;
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Agency Sales</CardTitle>
					<CardDescription>Showing total sales for the current month</CardDescription>
				</div>

				<div className="flex">
					{["sales"].map((key) => {
						const chart = key as keyof typeof chartConfig;
						return (
							<div
								key={chart}
								className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
							>
								<span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
								<span className="text-lg font-bold leading-none sm:text-3xl">{total}</span>
							</div>
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
							domain={[0, Math.ceil(maxSalesValue * 1.2)]}
							padding={{ top: 20, bottom: 20 }}
							tickFormatter={(value) => `$${value?.toFixed(2) ?? 0}`}
						/>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								// Create date from UTC string and adjust to NY timezone
								const utcDate = new Date(value);
								const nyDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);

								return new Intl.DateTimeFormat("en-US", {
									month: "short",
									day: "numeric",
									timeZone: "America/New_York",
								}).format(nyDate);
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="sales"
									labelFormatter={(value) => {
										// Create date from UTC string and adjust to NY timezone
										const utcDate = new Date(value);
										const nyDate = new Date(
											utcDate.getTime() + utcDate.getTimezoneOffset() * 60000,
										);

										return new Intl.DateTimeFormat("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
											timeZone: "America/New_York",
										}).format(nyDate);
									}}
								/>
							}
						/>
						<Line dataKey="sales" type="monotone" strokeWidth={1.5} fillOpacity={0.1} dot={true} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
