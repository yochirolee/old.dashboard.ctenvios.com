import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function IssueForm() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Open</Button>
			</DialogTrigger>
		</Dialog>
	);
}
