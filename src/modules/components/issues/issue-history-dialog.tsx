import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlameIcon } from "lucide-react";
export function IssueHistoryDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>

				<FlameIcon className="text-yellow-500 cursor-pointer hover:text-yellow-600" size={16} />
			</DialogTrigger>
			<DialogContent className="sm:max-w-5xl h-[80vh]">
				<DialogHeader>
					<DialogTitle>Issue History</DialogTitle>
					<DialogDescription>
						View the history of issues for this shipment.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input id="username" defaultValue="@peduarte" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
