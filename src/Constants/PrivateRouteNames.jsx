import { lazy, Suspense } from "react"
import Loader from "../components/Loader"
import { USER_TYPES } from "../core/UserTypes";

const AddResume = lazy(() => import('../pages/AddResume'));
const RoleSelectionPage = lazy(() => import('../pages/RoleSelectionPage'));
const InterviewQuestionsPage = lazy(() => import('../pages/InterviewQuestionsPage'));
const InterviewReviewPage = lazy(() => import('../pages/InterviewReviewPage'));
const AdminDashboard = lazy(() => import('../adminPages/AdminDashboard'));
const AdminJobs = lazy(() => import('../adminPages/AdminJobs'))
const AdminUsers = lazy(() => import('../adminPages/AdminUsers'))
const AdminWebScraping = lazy(() => import('../adminPages/AdminWebScraping'))
const AdminScrapedData = lazy(() => import('../adminPages/AdminScrapedData'))


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

//Ai-Mock Interview Routes
const ROLE_SELECTION_PAGE = {
    path: '/ai-mock-interviews/role-selection',
    pageTitle: 'Role-Selection',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <RoleSelectionPage/>
        </Suspense>
    )
}

const INTERVIEW_QUESTIONS_PAGE = {
    path: '/ai-mock-interviews/role-selection/InterviewQuestionsPage',
    pageTitle: 'InterviewQuestionsPage',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <InterviewQuestionsPage/>
        </Suspense>
    )
}

const INTERVIEW_REVIEW_PAGE = {
    path: '/ai-mock-interviews/role-selection/InterviewQuestionsPage/InterviewReviewPage',
    pageTitle: 'InterviewReviewPage',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <InterviewReviewPage/>
        </Suspense>
    )
}

// ADMIN ROUTES
const ADMIN_DASHBOARD_HOME_ROUTE = {
    path: '/admin-panel/dashboard',
    pageTitle: 'Admin Dasboard',
    header: 'admin',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AdminDashboard/>
        </Suspense>
    )
}

const ADMIN_JOBS_ROUTE = {
    path: '/admin-panel/jobs',
    pageTitle: 'Admin Jobs',
    header: 'admin',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AdminJobs/>
        </Suspense>
    )
}

const ADMIN_USERS_ROUTE = {
    path: '/admin-panel/users',
    pageTitle: 'Admin users',
    header: 'admin',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AdminUsers/>
        </Suspense>
    )
}

const ADMIN_WEBSCRAPING_ROUTE = {
    path: '/admin-panel/web-scraping',
    pageTitle: 'Admin WebScraping',
    header: 'admin',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AdminWebScraping/>
        </Suspense>
    )
}

const ADMIN_SCRAPEDDATA_ROUTE = {
    path: '/admin-panel/scraped-data',
    pageTitle: 'Admin ScrapedData',
    header: 'admin',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AdminScrapedData/>
        </Suspense>
    )
}

export const PRIVATE_ROUTES = [
    ROLE_SELECTION_PAGE,
    INTERVIEW_QUESTIONS_PAGE,
    RESUME_BUILDER_PAGE,
    INTERVIEW_QUESTIONS_PAGE,
    INTERVIEW_REVIEW_PAGE,
    ADMIN_DASHBOARD_HOME_ROUTE,
    ADMIN_JOBS_ROUTE,
    ADMIN_USERS_ROUTE,
    ADMIN_WEBSCRAPING_ROUTE,
    ADMIN_SCRAPEDDATA_ROUTE
]

export const PROTECTED_ROUTE_NAMES = {
    [USER_TYPES.GENERAL]: {
        RESUME_BUILDER_PAGE: RESUME_BUILDER_PAGE,
        ROLE_SELECTION_PAGE: ROLE_SELECTION_PAGE,
        INTERVIEW_QUESTIONS_PAGE: INTERVIEW_QUESTIONS_PAGE,
        INTERVIEW_REVIEW_PAGE: INTERVIEW_REVIEW_PAGE
    }, 
    [USER_TYPES.EMPLOYER]: {},
    [USER_TYPES.ADMIN]: {
        DEFAULT: ADMIN_DASHBOARD_HOME_ROUTE, 
        RESUME_BUILDER_PAGE: RESUME_BUILDER_PAGE,
        ROLE_SELECTION_PAGE: ROLE_SELECTION_PAGE,
        INTERVIEW_QUESTIONS_PAGE: INTERVIEW_QUESTIONS_PAGE,
        INTERVIEW_REVIEW_PAGE: INTERVIEW_REVIEW_PAGE,
        ADMIN_JOBS_ROUTE: ADMIN_JOBS_ROUTE,
        ADMIN_USERS_ROUTE: ADMIN_USERS_ROUTE,
        ADMIN_WEBSCRAPING_ROUTE: ADMIN_WEBSCRAPING_ROUTE,
        ADMIN_SCRAPEDDATA_ROUTE: ADMIN_SCRAPEDDATA_ROUTE
    }
}