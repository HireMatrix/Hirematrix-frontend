import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';
import { useEffect, useState } from 'react';
import { checkAuth } from '../../features/auth/authSlice';
import Loader from '../../components/Loader';

const ProtectedRoute = () => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    setLoading(true);
    async function authCheck() {
      try {
        const response = await dispatch(checkAuth()).unwrap()
        setUser(response)
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        setUser(null);
      }
    }
    authCheck();
  }, []);

  const allowedRoutes = PROTECTED_ROUTE_NAMES[user?.user.userType] || {};

  if(loading){
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
