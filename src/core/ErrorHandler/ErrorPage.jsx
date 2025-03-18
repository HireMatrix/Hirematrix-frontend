import React from 'react'
import { useSelector } from 'react-redux';
import { PUBLIC_ROUTES_NAMES } from '../../Constants/PublicRouteNames';
import { PROTECTED_ROUTE_NAMES } from '../../Constants/PrivateRouteNames';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

export const ERROR_PAGE_TYPES = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  PAGE_NOT_FOUND: "PAGE_NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  BAD_REQUEST: "BAD_REQUEST",
};

export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Something went wrong! Please try again later.",
  PAGE_NOT_FOUND: "Oops! The page you're looking for does not exist.",
  UNAUTHORIZED: "You are not authorized to access this page.",
  FORBIDDEN: "Access denied! You don't have permission.",
  BAD_REQUEST: "Invalid request. Please check and try again.",
};

const ErrorPage = ({ ErrorType = ERROR_PAGE_TYPES.INTERNAL_SERVER_ERROR, ErrorMsg = ERROR_MESSAGES.INTERNAL_SERVER_ERROR }) => {

  const {user, isLoading} = useSelector(state => state.auth);

  const getRedirectedPath = () => {
    if(!user){
      return PUBLIC_ROUTES_NAMES.LOGIN.path;
    } 

    switch (user.userType) {
      case "admin":
        return PROTECTED_ROUTE_NAMES.admin.DEFAULT?.path;
      case "employer":
        return PROTECTED_ROUTE_NAMES.employer.DEFAULT;
      case "general":
        return PUBLIC_ROUTES_NAMES.HOME.path;
      default:
        return PUBLIC_ROUTES_NAMES.HOME.path;
    }
  }

  if(isLoading) {
    return <Loader/>
  }

  return (
    <div className='error-page-styling'>
      <p>Error Type: {ErrorType}</p>
      <p>Error Message: {ErrorMsg}</p>
      <p>To return to the default page, please click the "Go to Home" button</p>
      <Link to={getRedirectedPath()}>GO TO HOME</Link>
    </div>
  )
}

export default ErrorPage
