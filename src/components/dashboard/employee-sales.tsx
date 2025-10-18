import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { Skeleton } from "../ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "../ui/select";
import { useState } from "react";
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
                     {chartData?.map((_, index) => (
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
      </Card>
   );
}

export function EmployeeSalesByMonth() {
   const currentDate = new Date();
   const currentMonth = currentDate.getMonth() + 1;
   const currentYear = currentDate.getFullYear();

   const [month, setMonth] = useState(currentMonth);
   const [year, setYear] = useState(currentYear);

   const handleMonthChange = (value: string): void => {
      const selectedMonth = parseInt(value);
      setMonth(selectedMonth);
   };

   const handleYearChange = (value: string): void => {
      const selectedYear = parseInt(value);
      setYear(selectedYear);

      // If selected year is current year and month is in the future, adjust to current month
      if (selectedYear === currentYear && month > currentMonth) {
         setMonth(currentMonth);
      }
   };

   const {
      data: chartData,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["employees-sales-by-month", month, year],
      queryFn: () => api.stats.getEmployeesSalesByMonth(month, year),
      enabled: !!month && !!year,
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

   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2 mb-4 flex-col md:flex-row md:justify-between  ">
               <MonthSelector
                  month={month}
                  handleMonthChange={handleMonthChange}
                  selectedYear={year}
                  currentMonth={currentMonth}
                  currentYear={currentYear}
               />
               <YearSelector year={year} handleYearChange={handleYearChange} />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg lg:text-xl">
                     Employee Sales - {monthNames[month - 1]} {year}
                  </CardTitle>
               </div>
               
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
                     {chartData?.map((_, index) => (
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
      </Card>
   );
}

interface MonthSelectorProps {
   month: number;
   handleMonthChange: (value: string) => void;
   selectedYear: number;
   currentMonth: number;
   currentYear: number;
}

export const MonthSelector = ({
   month,
   handleMonthChange,
   selectedYear,
   currentMonth,
   currentYear,
}: MonthSelectorProps): JSX.Element => {
   const months = [
      { value: 1, label: "January" },
      { value: 2, label: "February" },
      { value: 3, label: "March" },
      { value: 4, label: "April" },
      { value: 5, label: "May" },
      { value: 6, label: "June" },
      { value: 7, label: "July" },
      { value: 8, label: "August" },
      { value: 9, label: "September" },
      { value: 10, label: "October" },
      { value: 11, label: "November" },
      { value: 12, label: "December" },
   ];

   const isMonthDisabled = (monthValue: number): boolean => {
      if (selectedYear > currentYear) return true;
      if (selectedYear === currentYear && monthValue > currentMonth) return true;
      return false;
   };

   return (
      <Select value={month.toString()} onValueChange={handleMonthChange}>
         <SelectTrigger>
            <SelectValue placeholder="Select a month" />
         </SelectTrigger>
         <SelectContent>
            {months.map((m) => (
               <SelectItem key={m.value} value={m.value.toString()} disabled={isMonthDisabled(m.value)}>
                  {m.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};

interface YearSelectorProps {
   year: number;
   handleYearChange: (value: string) => void;
}

export const YearSelector = ({ year, handleYearChange }: YearSelectorProps): JSX.Element => {
   const currentYear = new Date().getFullYear();
   const startYear = 2020;
   const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

   return (
      <Select value={year.toString()} onValueChange={handleYearChange}>
         <SelectTrigger>
            <SelectValue placeholder="Select a year" />
         </SelectTrigger>
         <SelectContent>
            {years.map((y) => (
               <SelectItem key={y} value={y.toString()}>
                  {y}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};
