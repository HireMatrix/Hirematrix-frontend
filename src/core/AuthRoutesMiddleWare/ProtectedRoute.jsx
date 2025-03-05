import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';

const ProtectedRoute = () => {

  const location = useLocation();
  const user = useSelector(state => state.auth);
  const allowedRoutes = PROTECTED_ROUTE_NAMES[user?.user?.userType] || {};

  
  if(!user.user) {
    return <Navigate to="/candidate-login" replace/>
  }

  const isAllowed = Object.values(allowedRoutes).includes(location.pathname);
  
  if(!isAllowed) {
    return <Navigate to="/" replace />
  }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute
