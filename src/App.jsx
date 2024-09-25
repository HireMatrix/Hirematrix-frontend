import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loader from './components/Loader.jsx';
import LandingPageHeader from './components/header/LandingPageHeader.jsx';
import EmployerPageHeader from './components/header/EmployerPageHeader.jsx';
import JobItem from './pages/JobItem.jsx';

const JobLandingPage = lazy(() => import('./pages/JobLandingPage.jsx'));
const EmployerLoginPage = lazy(() => import('./pages/EmployerLoginPage.jsx'));
const JobSearchPage = lazy(() => import('./pages/JobSearchPage.jsx'));
const ResumeBuilderPage = lazy(() => import('./pages/ResumeBuilderPage.jsx'));

const App = () => {
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
