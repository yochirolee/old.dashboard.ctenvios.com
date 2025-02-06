import { useGetUsers } from "@/hooks/use-users";
import { userColumns } from "../components/users-columns";
import { UsersTable } from "../components/users-table";
import { UserRegisterForm } from "../components/user-register-form";
import { UserDeleteDialog } from "../components/user-delete-dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function UsersPage() {
	const { data, isLoading } = useGetUsers();
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState<string | null>(null);

	const handleDeleteUser = (id: string) => {
		setId(id);
		setIsOpen(true);
	};
	// TODO: Add user delete dialog
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div className="flex flex-col">
					<h1 className="text-xl font-bold">Usuarios</h1>
					<p className="text-sm text-muted-foreground">Listado de usuarios registrados en la plataforma</p>
				</div>
				<UserRegisterForm />
				<UserDeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
			</div>
			{isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
			) : (
				<UsersTable columns={userColumns(handleDeleteUser)} data={data || []} />
			)}
		</div>
	);
}
