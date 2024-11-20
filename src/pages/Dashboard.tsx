import { InvoicesCount } from "@/components/dashboard/invoices-count";
import { MonthWeight } from "@/components/dashboard/month-weight";

export default function Dashboard() {
	return (
		<div className="p-4 space-y-4">
			<InvoicesCount />
			<div className="grid grid-cols-1 md:grid-cols-3">
				<MonthWeight />
			</div>
		</div>
	);
}
