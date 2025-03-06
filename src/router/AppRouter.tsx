import { Navigate, Route, Routes } from "react-router-dom";

import Orders from "../pages/Orders";
import CreateOrder from "../pages/CreateOrder";
import ContainersPage from "@/pages/Logistics/ContainersPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import Dashboard from "@/pages/Dashboard";
import UsersPage from "@/modules/pages/users/users-page";
import UserLoginPage from "@/modules/pages/users/user-login-page";
import ShipmentsPage from "@/modules/pages/shipments/shipments-page";
import { ProtectedRoute } from "./ProtectedRoute";
import IssuesPage from "@/modules/pages/issues/issues-page";
import { roles } from "@/data/data";


export default function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route element={<ProtectedRoute allowedRoles={[roles.ROOT, roles.ADMINISTRATOR]} />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="settings">
					<Route index element={<SettingsPage />} />
					<Route path="users" element={<UsersPage />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute allowedRoles={[roles.ROOT, roles.ADMINISTRATOR, roles.AGENCY_ADMIN, roles.MESSENGER]} />}>
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
