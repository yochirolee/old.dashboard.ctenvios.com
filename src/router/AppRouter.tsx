import { Navigate, Route, Routes } from "react-router-dom";

// Import your components here
//import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import CreateOrder from "../pages/CreateOrder";
import DesignEngineering from "../pages/DesignEngineering";
import SalesMarketing from "../pages/SalesMarketing";
import Travel from "../pages/Travel";
import ContainersPage from "@/pages/Logistics/ContainersPage";
import IssuesPage from "@/pages/Logistics/IssuesPage";
import TrackingPage from "@/pages/Logistics/TrackingPage";
import SettingsPage from "@/pages/Settings/SettingsPage";
import UsersPage from "@/pages/Settings/UsersPage";
import { LoginPage } from "@/pages/Logistics/LoginPage";
import Layout from "@/layout/layout";
import { useAuthContext } from "@/context/auth-context";

export default function AppRouter() {
	const { token } = useAuthContext();
	return token ? (
		<Layout>
			<Routes>
				{/* Auth routes */}

				{/* Main navigation routes */}
				<Route path="/" element={<TrackingPage />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/orders/create" element={<CreateOrder />} />
				<Route path="/logistics/containers" element={<ContainersPage />} />
				<Route path="/logistics/tracking" element={<TrackingPage />} />
				<Route path="/logistics/issues" element={<IssuesPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/settings/users" element={<UsersPage />} />
				{/* Project routes */}
				<Route path="/projects/design-engineering" element={<DesignEngineering />} />
				<Route path="/projects/sales-marketing" element={<SalesMarketing />} />
				<Route path="/projects/travel" element={<Travel />} />

				{/* Catch-all route for undefined paths */}
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	) : (
		<LoginPage />
	);
}
