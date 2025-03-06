import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PUBLIC_ROUTES_NAMES } from '../../Constants/PublicRouteNames';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';
import { Link } from 'react-router-dom';
import { checkAuth } from '../../features/auth/authSlice';

export const ERROR_PAGE_TYPES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  PAGE_NOT_FOUND: "PAGE_NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  BAD_REQUEST: "BAD_REQUEST",
};

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Something went wrong! Please try again later.",
  PAGE_NOT_FOUND: "Oops! The page you're looking for does not exist.",
  UNAUTHORIZED: "You are not authorized to access this page.",
  FORBIDDEN: "Access denied! You don't have permission.",
  BAD_REQUEST: "Invalid request. Please check and try again.",
};

const ErrorPage = ({ ErrorType = ERROR_PAGE_TYPES.INTERNAL_SERVER_ERROR }) => {

  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
  async function authCheck() {
    try {
      const response = await dispatch(checkAuth()).unwrap()
      setUser(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  authCheck();

  }, []);

  const getRedirectedPath = () => {
    if(!user?.success){
      return PUBLIC_ROUTES_NAMES.LOGIN.path;
    } 

    switch (user.user.userType) {
      case "admin":
        return PROTECTED_ROUTE_NAMES.admin.DEFAULT?.path;
      case "employer":
        return PROTECTED_ROUTE_NAMES.employer.DEFAULT;
      case "general":
        return PUBLIC_ROUTES_NAMES.general.HOME.path;
      default:
        return PUBLIC_ROUTES_NAMES.general.HOME.path;
    }
  }


  return (
    <div>
      <p>{ErrorType}</p>
      <Link to={getRedirectedPath()}>GO TO HOME</Link>
    </div>
  )
}

export default ErrorPage
