import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loader from './components/Loader.jsx';
import LandingPageHeader from './components/header/LandingPageHeader.jsx';

import EmployerPageHeader from './components/header/EmployerPageHeader.jsx';
import Basic_1 from './components/basic_details/Basic_1.jsx';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/authSlice.js';

// import ResumeCardsPage from "./pages/resumeBuilder/ResumeCardsPage.jsx"; 



const JobLandingPage = lazy(() => import('./pages/JobLandingPage.jsx'));
const EmployerLoginPage = lazy(() => import('./pages/EmployerLoginPage.jsx'));
const JobSearchPage = lazy(() => import('./pages/JobSearchPage.jsx'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage.jsx'));
const CandidateLoginPage = lazy(() => import('./pages/CandidateLoginPage.jsx'));
const CandidateSignUpPage = lazy(() => import('./pages/CandidateSignUpPage.jsx'));
const JobItem = lazy(() => import('./pages/JobItem.jsx'));
const AddResume = lazy(() => import('./pages/AddResume.jsx'));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(checkAuth())
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
