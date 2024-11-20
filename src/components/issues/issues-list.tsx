import { ComponentProps, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/data/data";

interface IssuesListProps {
	hbl: string;
	invoiceId: number;
	agency: string;
	description: string;
}

export function IssuesList({ items }: { items: IssuesListProps[] }) {
	console.log(items);
	const [selectedItem, setSelectedItem] = useState<IssuesListProps>(items[0]);

	return (
		<ScrollArea className="h-screen">
			<div className="flex flex-col gap-2 p-4 pt-0">
				{items.map((item) => (
					<button
						key={item.hbl}
						className={cn(
							"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
							selectedItem.hbl === item.hbl && "bg-muted",
						)}
						onClick={() =>
							setSelectedItem({
								...selectedItem,
								hbl: item.hbl,
							})
						}
					>
						<div className="flex w-full flex-col gap-1">
							<div className="flex items-center">
								<div className="flex items-center gap-2">
									<div className="font-semibold">{item?.hbl}</div>
									{/* {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />} */}
								</div>
								<div
									className={cn(
										"ml-auto text-xs",
										selectedItem.hbl === item.hbl ? "text-foreground" : "text-muted-foreground",
									)}
								>
									{/* 	{formatDistanceToNow(new Date(item.date), {
										addSuffix: true,
									})} */}
								</div>
							</div>
							<div className="text-xs font-medium">{item.sender}</div>
						</div>
						<div className="line-clamp-2 text-xs text-muted-foreground">
							{item.description.substring(0, 300)}
						</div>
						{/* {item.labels.length ? (
							<div className="flex items-center gap-2">
								{item.labels.map((label) => (
									<Badge key={label} variant={getBadgeVariantFromLabel(label)}>
										{label}
									</Badge>
								))}
							</div>
						) : null} */}
					</button>
				))}
			</div>
		</ScrollArea>
	);
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
	if (["work"].includes(label.toLowerCase())) {
		return "default";
	}

	if (["personal"].includes(label.toLowerCase())) {
		return "outline";
	}

	return "secondary";
}
