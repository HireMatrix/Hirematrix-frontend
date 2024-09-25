import React from 'react'
import { Link } from 'react-router-dom'

const EmployerPageHeader = () => {
  return (
    <nav className='employer-page-nav-bar'>
      <div className='employer-page-header-continer'>
        <div className='employer-page-header-navigation-section'>
            <img src='https://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png' alt='main-logo'/>
            <ul>
                <li>Jobs</li>
                <li>Database</li>
                <li>Sales Enquiry</li>
            </ul>
        </div>
        <div className='employer-page-header-button-section'>
            <Link to='/' target='_blank'>
                <button>
                    Looking for a job?
                </button>
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default EmployerPageHeader
