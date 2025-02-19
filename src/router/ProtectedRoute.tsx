import { Navigate,useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import Layout from "@/layout/layout";

interface ProtectedRouteProps {
	allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
	const { user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role || "")) {
		navigate("/logistics/tracking", { state: { from: location }, replace: true});
	}

	return <Layout>{<Outlet />}</Layout>;
};
