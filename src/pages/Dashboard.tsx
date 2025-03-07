import { EmployeeSales } from "@/components/dashboard/employee-sales";
import { InvoicesCount } from "@/components/dashboard/invoices-count";
import { MonthWeight } from "@/components/dashboard/month-weight";
import { ListContainerStatus } from "@/components/dashboard/container-stats";
import { DayDeliveries } from "@/components/dashboard/day-deliveries";
export default function Dashboard() {
	return (
		<div className="p-4 space-y-4">
			<InvoicesCount />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<EmployeeSales />
				<MonthWeight />
				<div className="lg:col-span-2">
					<DayDeliveries />
				</div>
			</div>

			<ListContainerStatus />
		</div>
	);
}
