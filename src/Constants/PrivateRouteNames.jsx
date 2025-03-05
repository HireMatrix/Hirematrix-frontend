import { lazy, Suspense } from "react"
import Loader from "../components/Loader"
import { USER_TYPES } from "../core/UserTypes";

const AddResume = lazy(() => import('../pages/AddResume'));
const AdminPage = lazy(() => import('../adminPages/AdminPage'));

const RESUME_BUILDER_PAGE = {
    path: '/resume-dashboard',
    pageTitle: 'Add Resume',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AddResume/>
        </Suspense>
    )
}

// ADMIN ROUTES
const ADMIN_DASHBOARD_HOME_ROUTE = {
    path: '/admin-panel',
    pageTitle: 'Admin Page',
    header: 'admin',
    component: (
        <Suspense>
            <AdminPage/>
        </Suspense>
    )
}

export const PRIVATE_ROUTES = [
    RESUME_BUILDER_PAGE,
    ADMIN_DASHBOARD_HOME_ROUTE
]

export const PROTECTED_ROUTE_NAMES = {
    [USER_TYPES.GENERAL]: {
        RESUME_BUILDER_PAGE: RESUME_BUILDER_PAGE
    }, 
    [USER_TYPES.EMPLOYER]: {},
    [USER_TYPES.ADMIN]: {
        DEFAULT: ADMIN_DASHBOARD_HOME_ROUTE, 
        RESUME_BUILDER_PAGE: RESUME_BUILDER_PAGE,
    }
}