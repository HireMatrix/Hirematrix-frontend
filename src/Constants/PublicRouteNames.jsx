import { lazy } from "react";
import CandidateSignUpPage from "../pages/CandidateSignUpPage";

const CandidateLoginPage = lazy(() => import('../pages/CandidateLoginPage'))
const CandidateSignUpPage = lazy(() => import('../pages/CandidateSignUpPage'))


const CANDIDATE_LOGIN_ROUTE = {
    path: '/candidate-login',
    pageTitle: "Candidate Login",
    component: <CandidateLoginPage/>
};

const CANDIDATE_SIGNUP_PAGE = {
    path: '/candidate-signup',
    pageTitle: "Candidate Signup",
    component: <CandidateSignUpPage/>
}