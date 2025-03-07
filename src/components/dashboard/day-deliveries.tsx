"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
]; */

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	state: {
		label: "Estado",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function DayDeliveries() {
	const { data, isLoading } = useQuery({
		queryKey: ["day-deliveries"],
		queryFn: () => api.stats.getDayDeliveries(),
	});
	if (isLoading) return <Skeleton className="h-60 w-full" />;
	const chartData = data?.map((item) => ({
		state: item.name,
		entregados: item.count,
	}));

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-lg lg:text-xl">Entregados Hoy</CardTitle>
						<CardDescription>Estado de los paquetes entregados hoy</CardDescription>
					</div>
					{/* TODO: Add filter by date */}
					<div className="flex items-center gap-2">
						<span className="text-sm text-foreground/50">Entregados:</span>
						<span className=" font-medium">
							{chartData?.reduce((acc, curr) => acc + parseFloat(curr.entregados), 0) ?? "0"}
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="state"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Bar dataKey="entregados" fill="var(--color-desktop)" radius={8}>
							<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
