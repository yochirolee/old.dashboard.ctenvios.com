import { Navigate, Route, Routes } from "react-router-dom";

import Orders from "../pages/Orders";
import CreateOrder from "../pages/CreateOrder";
import ContainersPage from "@/pages/Logistics/ContainersPage";
import IssuesPage from "@/pages/Logistics/IssuesPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/modules/pages/users/users-page";
import UserLoginPage from "@/modules/pages/users/user-login-page";
import ShipmentsPage from "@/modules/pages/shipments/shipments-page";
import { ProtectedRoute } from "./ProtectedRoute";
/* // Define a protected route component
const ProtectedRoute = ({
	children,
	allowedRoles,
}: {
	children: JSX.Element;
	allowedRoles: string[];
}) => {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (!allowedRoles.includes(user.role || "")) {
		// Redirect to dashboard if user doesn't have required role
		return <Navigate to="/logistics/shipments" state={{ from: location }} replace />;
	}

	return children;
}; */

export default function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route element={<ProtectedRoute allowedRoles={["ROOT", "ADMINISTRATOR"]} />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="settings">
					<Route index element={<SettingsPage />} />
					<Route path="users" element={<UsersPage />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="orders">
					<Route index element={<Orders />} />
					<Route path="create" element={<CreateOrder />} />
				</Route>
				<Route path="logistics">
					<Route path="containers" element={<ContainersPage />} />
					<Route path="tracking" element={<ShipmentsPage />} />
					<Route path="issues" element={<IssuesPage />} />
				</Route>
			</Route>

			<Route path="login" element={<UserLoginPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
