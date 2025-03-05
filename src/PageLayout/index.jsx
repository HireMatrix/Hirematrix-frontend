import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../core/ErrorHandler/ErrorBoundary'
import ChatBotUI from '../components/ChatBotUi'

const PageLayout = () => {
  return (
    <div className='pagelayout-whole-web'>
      <NavBar/>
      <ErrorBoundary>
        <main>
          <Outlet/>
        </main>
      </ErrorBoundary>
      <div className='chat-bot-container'>
        <ChatBotUI/>
      </div>
    </div>
  )
}

export default PageLayout