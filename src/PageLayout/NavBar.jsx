import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { PUBLIC_ROUTES } from '../Constants/PublicRouteNames';
import { PRIVATE_ROUTES } from '../Constants/PrivateRouteNames';

import LandingPageHeader from '../components/header/LandingPageHeader.jsx';
import EmployerPageHeader from '../components/header/EmployerPageHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../features/auth/authSlice.js';

const NavBar = () => {
    const { pathname } = useLocation();

    const AllRoutes = [
        ...PUBLIC_ROUTES,
        ...PRIVATE_ROUTES
    ]
    
    const matchedRoute = AllRoutes.find(route => route.path === pathname);

    const renderHeader = () => {
        switch (matchedRoute?.header) {
            case "landing":
                return <LandingPageHeader />;
            case "employer":
                return <EmployerPageHeader />;
            case "admin":
                return null;
            default:
                return null;
        }
    };

    return (
      <>{renderHeader()}</>
    )
}

export default NavBar