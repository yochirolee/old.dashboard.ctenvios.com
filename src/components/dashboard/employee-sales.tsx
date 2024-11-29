"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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
import { tracking_api } from "@/api/tracking-api";
import { Skeleton } from "../ui/skeleton";

export const description = "A bar chart with a custom label";

/* const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]; */

const chartConfig = {
	sales: {
		label: "sales",
		color: "hsl(var(--chart-1))",
	},
	employee: {
		label: "employee",
		color: "hsl(var(--chart-2))",
	},
	label: {
		color: "hsl(var(--foreground))",
	},
} satisfies ChartConfig;

export function EmployeeSales() {
	const {
		data: chartData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["employees-sales"],
		queryFn: () => tracking_api.stats.getEmployeesSales(),
	});
	if (isLoading) return <Skeleton className="h-[300px] w-full" />;
	if (isError) return <div>Error</div>;
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Employee Sales</CardTitle>
						<CardDescription>Daily sales by employee</CardDescription>
					</div>
					{/* TODO: Add filter by date */}
					<div className="flex items-center gap-2">
						<span className="text-sm text-foreground/50">Sales:</span>
						<span className=" font-medium">
							{chartData?.reduce((acc, curr) => acc + parseFloat(curr.sales), 0)}
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="employee"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
							hide
						/>
						<XAxis dataKey="sales" type="number" hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Bar dataKey="sales" layout="vertical" fill="var(--color-sales)" radius={4}>
							<LabelList
								dataKey="employee"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
							/>
							<LabelList
								dataKey="sales"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			{/* <CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter> */}
		</Card>
	);
}
