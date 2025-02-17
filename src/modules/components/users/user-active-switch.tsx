import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, useUpdateUser } from "@/hooks/use-users";

export const UserActiveSwitch = ({ user }: { user: Partial<User> }) => {
	const { mutate: updateUser } = useUpdateUser();

	const handleChange = () => {
		if (!user.id) return;
		updateUser({
			userId: user.id,
			user: { ...user, isActive: !user.isActive },
		});
	};

	return (
		<div className="flex items-center space-x-2">
			<Switch disabled={user.role === "ROOT"} id="active-user" checked={user.isActive} onCheckedChange={handleChange} />
			<Label htmlFor="active-user">Active User</Label>
		</div>
	);
};
