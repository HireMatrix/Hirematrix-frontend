import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import ErrorBoundary from '../core/ErrorHandler/ErrorBoundary'
import ChatBotUI from '../components/ChatBotUi'
import { PUBLIC_ROUTES } from '../Constants/PublicRouteNames'
import { PRIVATE_ROUTES } from '../Constants/PrivateRouteNames'
import AdminHeader from '../components/header/AdminHeader.jsx';
import { useDispatch } from 'react-redux'
import { checkAuth } from '../features/auth/authSlice.js'
import Loader from '../components/Loader.jsx'

const PageLayout = () => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function authCheck() {
      try {
        await dispatch(checkAuth()).unwrap();
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        return <ErrorPage ErrorType={ERROR_PAGE_TYPES.UNAUTHORIZED}/>
      }
    }

    authCheck();

  }, [])

  if(loading) {
    return <Loader/>
  }

  const AllRoutes = [
    ...PUBLIC_ROUTES,
    ...PRIVATE_ROUTES
  ]

  const isAllowed = AllRoutes.find(route => route.path == pathname);
  const matchedRoute = AllRoutes.find(route => route.path === pathname).header == 'admin';

  return (
    <div className={`${matchedRoute ? 'admin-pagelayout-whole-web' : 'pagelayout-whole-web'}`}>
      {
        matchedRoute ? (
          <AdminHeader/>
        ) : (
          <NavBar/>
        )
      }
      <ErrorBoundary>
        <main>
          <Outlet/>
        </main>
      </ErrorBoundary>
      {
        isAllowed && (
          <div className='chat-bot-container'>
            <ChatBotUI/>
          </div>
        )
      }
    </div>
  )
}

export default PageLayout