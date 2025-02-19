import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { tracking_api } from "@/api/tracking-api";
/* const chartData = [
	{ agency: "Agency 1", weight: 186 },
	{ agency: "Agency 2", weight: 305 },
	{ agency: "Agency 3", weight: 237 },
	{ agency: "Agency 4", weight: 73 },
	{ agency: "Agency 5", weight: 209 },
	{ agency: "Agency 6", weight: 214 },
]; */

const chartConfig = {
	weight: {
		label: "weight",
		color: "hsl(var(--chart-1))",
	},
	agency: {
		label: "agency",
		color: "hsl(var(--chart-2))",
	},
	label: {
		color: "hsl(var(--background))",
	},
} satisfies ChartConfig;

export function MonthWeight() {
	const { data: chartData, isLoading } = useQuery({
		queryKey: ["month-weight"],
		queryFn: () => tracking_api.stats.getStats(),
	});

	console.log(chartData);

	const totalWeight = chartData?.reduce(
		(acc: number, curr: { weight: number }) => acc + parseFloat(curr?.weight?.toString()),
		0,
	);

	if (isLoading) return <Skeleton className="h-40 w-full" />;
	return (
		<Card>
			<CardHeader>
				<CardTitle>Month Weight for Sending</CardTitle>
				<CardDescription>
					Total Weight: {parseFloat(totalWeight?.toFixed(2) ?? "0")} Lbs
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col text-sm gap-2">
					{chartData?.map((agency: { agency: string; weight: number }) => (
						<div key={agency?.agency} className="flex justify-between">
							<span className="font-medium ">{agency?.agency}</span>{" "}
							<span className="text-muted-foreground">{agency?.weight} Lbs</span>
						</div>
					))}
				</div>

				{/* <ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							right: 450,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="agency"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 2)}
							hide
						/>
						<XAxis dataKey="weight" type="number" hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Bar dataKey="weight" layout="vertical" fill="var(--color-weight)" radius={4}>
							<LabelList
								dataKey="agency"
								position="insideLeft"
								offset={2}
								className="fill-[--color-label]"
								fontSize={10}
							/>
							<LabelList
								dataKey="weight"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer> */}
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
