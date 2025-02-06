import { userColumns } from "@/components/settings/user-columns";
import { useFetchUsers } from "@/hooks/parcels/parcels";
import { UsersDataTable } from "@/components/settings/user-data-table";
import { UserRegisterForm } from "@/components/settings/user-register-form";

export default function UsersPage() {
	const { data, isLoading } = useFetchUsers();
	console.log(data);

	return (
		<div className="p-2 md:p-4">
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-bold">Usuarios</h1>
						<UserRegisterForm />
					</div>
					<UsersDataTable columns={userColumns} data={data || []} />
				</div>
			)}
		</div>
	);
}
