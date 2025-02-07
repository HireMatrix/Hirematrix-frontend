import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loader from './components/Loader.jsx';
import LandingPageHeader from './components/header/LandingPageHeader.jsx';

import EmployerPageHeader from './components/header/EmployerPageHeader.jsx';
import Basic_1 from './components/basic_details/Basic_1.jsx';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/authSlice.js';

const JobLandingPage = lazy(() => import('./pages/JobLandingPage.jsx'));
const EmployerLoginPage = lazy(() => import('./pages/EmployerLoginPage.jsx'));
const JobSearchPage = lazy(() => import('./pages/JobSearchPage.jsx'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage.jsx'));
const CandidateLoginPage = lazy(() => import('./pages/CandidateLoginPage.jsx'));
const CandidateSignUpPage = lazy(() => import('./pages/CandidateSignUpPage.jsx'));
const JobItem = lazy(() => import('./pages/JobItem.jsx'));
const AddResume = lazy(() => import('./pages/AddResume.jsx'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage.jsx'))
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage.jsx'))
const ResumeCheckerPage = lazy(() => import('./pages/ResumeCheckerPage.jsx'))
const AiMockInterviewsPage = lazy(() => import('./pages/AiMockInterviewsPage.jsx'))
const Blogs = lazy(() => import('./pages/Blogs.jsx'))

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
  async function authCheck() {
    try {
      const response = await dispatch(checkAuth()).unwrap()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  authCheck();

  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={
            <>
              <LandingPageHeader/>
              <JobLandingPage/>
            </>
          }/>
          <Route path='/employer-login' element={
            <>
              <EmployerPageHeader/>
              <EmployerLoginPage/>
            </>
          }/>
          <Route path='/candidate-login' element={
            <>
              <CandidateLoginPage/>
            </>
          }/>
          <Route path='/candidate-signup' element={
            <>
              <CandidateSignUpPage/>
            </>
          }/>
          <Route path='/reset-password/:token' element={
            <ResetPasswordPage/>
          }/>
          <Route path='/verify-email/:token' element={
            <VerifyEmailPage/>
          }/>
          <Route path='/basic_details/basic_1' element={
            <>
              <Basic_1/>
            </>
          }/>
          <Route path='/jobs' element={
            <>
              <LandingPageHeader/>
              <JobSearchPage/>
            </>
          }/>
          <Route path='/jobs/:id' element={
            <>
              <LandingPageHeader/>
              <JobItem/>
            </>
          }/>
          <Route path='/resume-builder' element={
            <>
              <LandingPageHeader/>
              <ResumeBuilderPage/>
            </>
          }/>
          <Route path='/resume-checker' element={
            <>
              <LandingPageHeader/>
              <ResumeCheckerPage/>
            </>
          }/>
          <Route path='/ai-mock-interviews' element={
            <>
              <LandingPageHeader/>
              <AiMockInterviewsPage/>
            </>
          }/>
          <Route path='/blogs' element={
            <>
              <LandingPageHeader/>
              <Blogs/>
            </>
          }/>
          {/* <Route path="/resume-cards" element={
            <>
              <LandingPageHeader/>
              <ResumeCardsPage />
            </>
          } /> */}
          <Route path="/resume-dashboard" element={
            <>
              <LandingPageHeader/>
              <AddResume />
            </>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App