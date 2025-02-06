import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon, KeyIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserActiveSwitch } from "./user-active-switch";

const userInterface = {
	id: "1",
	name: "John Doe",
	email: "john.doe@example.com",
	role: "admin",
	status: "active",
	isActive: true,
	lastLogin: new Date().toISOString(),
	createdAt: new Date().toISOString(),
};
export const userColumns = (
	handleDeleteUser: (id: string) => void,
): ColumnDef<typeof userInterface>[] => [
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
		cell: ({ row }) => <Badge variant="secondary">{row.getValue("role")}</Badge>,
	},
	{
		accessorKey: "isActive",
		header: "Status",
		cell: ({ row }) => <UserActiveSwitch user={row.original} />,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => (
			<div>
				{row.original.createdAt
					? new Date(row.original.createdAt).toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
					  })
					: ""}
			</div>
		),
	},

	{
		accessorKey: "lastLogin",
		header: "Last Active",
		cell: ({ row }) => {
			return <div>{formatDistance(new Date(row.original?.lastLogin), new Date())}</div>;
		},
	},
	// TODO: Add actions
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => (
			<Button asChild size="icon" variant="ghost">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<EllipsisVerticalIcon className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<PencilIcon className="w-4 h-4 mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<KeyIcon className="w-4 h-4 mr-2" />
							Reset Password
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => handleDeleteUser(row.original.id)}>
							<TrashIcon className="w-4 h-4 mr-2" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Button>
		),
	},
];
