import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { Skeleton } from "../ui/skeleton";

export const description = "A bar chart with a custom label";

const chartConfig = {
	sales: {
		label: "sales",
		color: "hsl(var(--chart-2))",
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
		queryFn: () => api.stats.getEmployeesSales(),
	});
	if (isLoading) return <Skeleton className="h-[300px] w-full" />;
	if (isError) return <div>Error</div>;

	const maxSalesValue = chartData ? Math.max(...chartData.map((item) => Number(item.sales))) : 0;

	// Define colors for employee bars
	const employeeColors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
		"hsl(var(--chart-5))",
		"hsl(var(--chart-6))",
		"hsl(var(--chart-7))",
		"hsl(var(--chart-8))",
	];

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-lg lg:text-xl">Employee Sales</CardTitle>
						<CardDescription>Daily sales by employee</CardDescription>
					</div>
					{/* TODO: Add filter by date */}
					<div className="flex items-center gap-2">
						<span className="text-sm text-foreground/50">Sales:</span>
						<span className=" font-medium">
							{chartData?.reduce((acc, curr) => acc + parseFloat(curr.sales), 0)?.toFixed(2) ?? "0"}
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
							right: 20,
							left: 40,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis dataKey="employee" type="category" axisLine={false} tickLine={false} />
						<XAxis dataKey="sales" type="number" domain={[0, maxSalesValue * 1.2]} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Bar dataKey="sales" layout="vertical" radius={8}>
							{chartData?.map(( _,index) => (
								<Cell key={`cell-${index}`} fill={employeeColors[index % employeeColors.length]} />
							))}
							<LabelList
								dataKey="sales"
								position="right"
								offset={12}
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
