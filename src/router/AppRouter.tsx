import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Import your components here
//import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import CreateOrder from "../pages/CreateOrder";

import ContainersPage from "@/pages/Logistics/ContainersPage";
import IssuesPage from "@/pages/Logistics/IssuesPage";
import TrackingPage from "@/pages/Logistics/TrackingPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import Layout from "@/layout/layout";
import { useAuthContext } from "@/context/auth-context";
import Dashboard from "@/pages/Dashboard";
import { UsersPage } from "@/modules/users/pages/users-page";
import { UserLoginPage } from "@/modules/users/pages/user-login-page";
import ShipmentsPage from "@/modules/shipments/pages/shipments-page";

// Define a protected route component
const ProtectedRoute = ({
	children,
	allowedRoles,
}: {
	children: JSX.Element;
	allowedRoles: string[];
}) => {
	const { user } = useAuthContext();
	const location = useLocation();
	const userRole = user?.role;

	if (!allowedRoles.includes(userRole || "")) {
		// Redirect to dashboard if user doesn't have required role
		return <Navigate to="/logistics/tracking" state={{ from: location }} replace />;
	}

	return children;
};

export default function AppRouter() {
	const { token } = useAuthContext();
	return token ? (
		<Layout>
			<Routes>
				{/* Auth routes */}

				{/* Main navigation routes */}
				<Route
					path="/"
					element={
						<ProtectedRoute allowedRoles={["ROOT", "ADMINISTRATOR"]}>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route path="/orders" element={<Orders />} />
				<Route
					path="/orders/create"
					element={
						<ProtectedRoute allowedRoles={["ROOT", "ADMINISTRATOR"]}>
							<CreateOrder />
						</ProtectedRoute>
					}
				/>
				<Route path="/logistics/containers" element={<ContainersPage />} />
				<Route path="/logistics/tracking" element={<ShipmentsPage />} />
				<Route path="/logistics/issues" element={<IssuesPage />} />
				<Route path="/logistics/shipments" element={<ShipmentsPage />} />
				<Route
					path="/settings"
					element={
						<ProtectedRoute allowedRoles={["ROOT", "ADMINISTRATOR"]}>
							<SettingsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/settings/users"
					element={
						<ProtectedRoute allowedRoles={["ROOT", "ADMINISTRATOR"]}>
							<UsersPage />
						</ProtectedRoute>
					}
				/>

				{/* Catch-all route for undefined paths */}
				<Route path="/*" element={<Navigate to="/logistics/shipments" />} />
			</Routes>
		</Layout>
	) : (
		<UserLoginPage />
	);
}
