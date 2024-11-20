import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { Switch } from "../ui/switch";

const userInterface = {
	name: "John Doe",
	email: "john.doe@example.com",
	role: "admin",
	status: "active",
	lastLogin: new Date(),
};
export const userColumns: ColumnDef<typeof userInterface>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback>{row.original?.name?.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{user.name}</div>
						<div className="text-sm text-muted-foreground">{user.email}</div>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: "Role",
		cell: ({ row }) => <Badge variant="secondary">{row.getValue("role")?.name}</Badge>,
	},
	{
		accessorKey: "isActive",
		header: "Status",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="inline-flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-green-500" />
					{row.getValue("isActive") ? "Activo" : "Inactivo"}
				</div>
			</div>
		),
	},

	{
		accessorKey: "lastLogin",
		header: "Last Active",
		cell: ({ row }) => {
			return <div>{formatDistance(new Date(row.original.lastLogin), new Date())}</div>;
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<Button variant="ghost" size="icon">
					<PencilIcon className="w-4 h-4" />
				</Button>
			);
		},
	},
];
