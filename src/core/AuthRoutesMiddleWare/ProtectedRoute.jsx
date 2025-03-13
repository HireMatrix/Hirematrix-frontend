import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';
import Loader from '../../components/Loader';
import ErrorPage, { ERROR_MESSAGES, ERROR_PAGE_TYPES } from '../ErrorHandler/ErrorPage';

const ProtectedRoute = () => {

  const { user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();
  console.log(user);
  if(!user || user == null) {
    return <Navigate to="/candidate-login" replace/>
  }

  const allowedRoutes = PROTECTED_ROUTE_NAMES[user.userType] || {};

  if(isLoading){
    return <Loader/>
  }

  const allowedRoutesValues = Object.values(allowedRoutes)

  const isAllowed = allowedRoutesValues.some(route => route.path == location.pathname);
  
  if(!isAllowed) {
    return <ErrorPage ErrorType={ERROR_PAGE_TYPES.UNAUTHORIZED} ErrorMsg={ERROR_MESSAGES.UNAUTHORIZED}/>
  }

  return (
    <Outlet/>
  )
}

export default ProtectedRoute
