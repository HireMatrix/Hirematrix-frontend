import { Route, Routes } from 'react-router-dom'

import PageLayout from './PageLayout/index.jsx';
import ProtectedRoute from './core/AuthRoutesMiddleWare/ProtectedRoute.jsx';
import PublicRoute from './core/AuthRoutesMiddleWare/PublicRoute.jsx';
import { PRIVATE_ROUTES } from './Constants/PrivateRouteNames.jsx';
import { PUBLIC_ROUTES } from './Constants/PublicRouteNames.jsx';
import ErrorPage, { ERROR_MESSAGES, ERROR_PAGE_TYPES } from './core/ErrorHandler/ErrorPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route element={<PageLayout/>}>
        <Route element={<ProtectedRoute />}>
          {
            PRIVATE_ROUTES.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )
            })
          }
        </Route>
        <Route element={<PublicRoute/>}>
          {
            PUBLIC_ROUTES.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )
            })
          }
        </Route>
        <Route
          path='*'
          element={
            <ErrorPage ErrorType={ERROR_PAGE_TYPES.PAGE_NOT_FOUND} ErrorMsg={ERROR_MESSAGES.PAGE_NOT_FOUND}/>
          }
        />
      </Route>
    </Routes>
  )
}

export default App