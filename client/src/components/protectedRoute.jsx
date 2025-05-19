
import { useSelector } from "react-redux"; 
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { user, isLoading } = useSelector((state) => state.auth);

    if(isLoading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;