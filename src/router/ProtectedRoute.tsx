import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import Layout from "@/layout/layout";
import { roles } from "@/data/data";
interface ProtectedRouteProps {
	allowedRoles?: (typeof roles)[keyof typeof roles][];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps): JSX.Element => {
	const { user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		navigate("/logistics/tracking", { state: { from: location }, replace: true });
	}

	return <Layout>{<Outlet />}</Layout>;
};
