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

//Ai-Mock
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

//Interview Questions
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

//Interview Reveiw Page
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
        <Suspense>
            <AdminDashboard/>
        </Suspense>
    )
}

const ADMIN_JOBS_ROUTE = {
    path: '/admin-panel/jobs',
    pageTitle: 'Admin Jobs',
    header: 'admin',
    component: (
        <Suspense>
            <AdminJobs/>
        </Suspense>
    )
}

const ADMIN_USERS_ROUTE = {
    path: '/admin-panel/users',
    pageTitle: 'Admin users',
    header: 'admin',
    component: (
        <Suspense>
            <AdminUsers/>
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
    ADMIN_USERS_ROUTE
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
        ADMIN_USERS_ROUTE: ADMIN_USERS_ROUTE
    }
}