import { lazy, Suspense } from "react";

import Loader from "../components/Loader";
import { USER_TYPES } from "../core/UserTypes.jsx";

const CandidateLoginPage = lazy(() => import('../pages/AuthPages/CandidateLoginPage.jsx'));
const CandidateSignUpPage = lazy(() => import('../pages/AuthPages/CandidateSignUpPage.jsx'));
const EmployerLoginPage = lazy(() => import('../pages/AuthPages/EmployerLoginPage.jsx'));
const JobLandingPage = lazy(() => import('../pages/JobLandingPage.jsx'));
const ResetPasswordPage = lazy(() => import('../pages/AuthPages/ResetPasswordPage.jsx'));
const VerifyEmailPage = lazy(() => import('../pages/AuthPages/VerifyEmailPage.jsx'));
const JobSearchPage = lazy(() => import('../pages/JobSearchPage.jsx'));
const JobItem = lazy(() => import('../pages/JobItem.jsx'));
const ResumeBuilderPage = lazy(() => import('../pages/ResumeBuilderPage.jsx'));
const ResumeCheckerPage = lazy(() => import('../pages/ResumeCheckerPage.jsx'));
const ResumeReviewPage = lazy(() => import('../pages/ResumeReviewPage.jsx'));
const AiMockInterviewsPage = lazy(() => import('../pages/AiMockInterviewsPage.jsx'));
const InterviewReviewPage = lazy(() => import('../pages/InterviewReviewPage.jsx'));
const BlogPage = lazy(() => import('../pages/BlogPages/BlogPage.jsx')); 
const BlogDetail = lazy(() => import('../pages/BlogPages/BlogDetail.jsx'));

// CANDIDATE AUTH ROUTES
const CANDIDATE_LOGIN_ROUTE = {
    path: '/candidate-login',
    pageTitle: "Candidate Login",
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <CandidateLoginPage/>
        </Suspense>
    )
};

const CANDIDATE_SIGNUP_PAGE = {
    path: '/candidate-signup',
    pageTitle: "Candidate Signup",
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <CandidateSignUpPage/>
        </Suspense>
    ) 
};

const RESET_PASSWORD_ROUTE = {
    path: '/reset-password/:token',
    pageTitle: 'Reset password',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <ResetPasswordPage/>
        </Suspense>
    )
};

const VERIFY_EMAIL_ROUTE = {
    path: '/verify-email/:token',
    pageTitle: 'Verify email',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <VerifyEmailPage/>
        </Suspense>
    )
};

// CANDIDATE ROUTES
const JOB_LANDING_PAGE_ROUTE = {
    path: '/',
    pageTitle: 'Job Landing Page',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <JobLandingPage/>
        </Suspense>
    )
};

const ALL_JOBS_ROUTE = {
    path: '/jobs',
    pageTitle: 'All Jobs',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <JobSearchPage/>
        </Suspense>
    )
};

const JOB_ITEM = {
    path: '/jobs/:id',
    pageTitle: 'Job Item',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <JobItem/>
        </Suspense>
    )
};

const RESUME_BUILDER_LANDING_PAGE = {
    path: '/resume-builder',
    pageTitle: 'Resume Builder',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <ResumeBuilderPage/>
        </Suspense>
    )
};


//Resume-Checker-Landing Page
const RESUME_CHECKER_LANDING_PAGE = {
    path: '/resume-checker',
    pageTitle: 'Resume checker',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <ResumeCheckerPage/>
        </Suspense>
    )
};


//Resume Review Page
const RESUME_REVIEW_PAGE = {
    path: '/ResumeReviewPage',
    pageTitle: 'Resume Review',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <ResumeReviewPage/>
        </Suspense>
    )
};

const AI_MOCK_INTERVIEW_LANDING_PAGE = {
    path: '/ai-mock-interviews',
    pageTitle: 'Interview Review Page',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <AiMockInterviewsPage/>
        </Suspense>
    )
};

const INTERVIEW_REVIEW_PAGE = {
    path: '/ai-mock-interviews/role-selection/InterviewQuestionsPage/InterviewReviewPage',
    pageTitle: 'Ai Mock Interviews',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <InterviewReviewPage/>
        </Suspense>
    )
};



const BLOGS_LANDING_PAGE = {
    path: '/blogs',
    pageTitle: 'Blogs',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <BlogPage/>
        </Suspense>
    )
};

const BLOG_DETAIL_PAGE = {
    path: '/blogs/:id',
    pageTitle: 'Blog Detail',
    header: 'landing',
    component: (
        <Suspense fallback={<Loader isFullpage={true}/>}>
            <BlogDetail/>
        </Suspense>
    )
};

export const PUBLIC_ROUTES = [
    CANDIDATE_LOGIN_ROUTE,
    CANDIDATE_SIGNUP_PAGE,
    JOB_LANDING_PAGE_ROUTE,
    RESET_PASSWORD_ROUTE,
    VERIFY_EMAIL_ROUTE,
    ALL_JOBS_ROUTE,
    JOB_ITEM,
    RESUME_BUILDER_LANDING_PAGE,
    RESUME_CHECKER_LANDING_PAGE,
    RESUME_REVIEW_PAGE,
    AI_MOCK_INTERVIEW_LANDING_PAGE,
    INTERVIEW_REVIEW_PAGE,
    BLOGS_LANDING_PAGE,
    BLOG_DETAIL_PAGE
];

export const PUBLIC_ROUTES_NAMES = {
    LOGIN: CANDIDATE_LOGIN_ROUTE,
    SIGNUP: CANDIDATE_SIGNUP_PAGE,
    HOME: JOB_LANDING_PAGE_ROUTE,
    RESET_PASSWORD: RESET_PASSWORD_ROUTE,
    VERIFY_EMAIL: VERIFY_EMAIL_ROUTE,
    ALL_JOBS: ALL_JOBS_ROUTE,
    JOB_ITEM: JOB_ITEM,
    RESUME_BUILDER_LANDING: RESUME_BUILDER_LANDING_PAGE,
    RESUME_CHECKER_LANDING: RESUME_CHECKER_LANDING_PAGE,
    RESUME_REVIEW_PAGE: RESUME_REVIEW_PAGE,
    AI_MOCK_INTERVIEW_LANDING: AI_MOCK_INTERVIEW_LANDING_PAGE,
    INTERVIEW_REVIEW_PAGE: INTERVIEW_REVIEW_PAGE,
    BLOGS_LANDING: BLOGS_LANDING_PAGE,
    BLOG_DETAIL: BLOG_DETAIL_PAGE
};