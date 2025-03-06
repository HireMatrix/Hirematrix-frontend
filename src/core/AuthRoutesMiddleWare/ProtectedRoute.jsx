import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';
import Loader from '../../components/Loader';

const ProtectedRoute = () => {

  const { user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();

  const allowedRoutes = PROTECTED_ROUTE_NAMES[user.userType] || {};

  if(isLoading){
    return <Loader/>
  }

  if(!user) {
    return <Navigate to="/candidate-login" replace/>
  }

  const allowedRoutesValues = Object.values(allowedRoutes)

  const isAllowed = allowedRoutesValues.some(route => route.path == location.pathname);
  
  if(!isAllowed) {
    return <Navigate to="/" replace />
  }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute
