import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage, { ERROR_MESSAGES, ERROR_PAGE_TYPES } from '../../core/ErrorHandler/ErrorPage';
import hireLogo from '../../assets/hire-favicon.png';

const locations = {
  dashboard: '/admin-panel/dashboard',
  users: '/admin-panel/users',
  jobs: '/admin-panel/jobs',
  webscraping: '/admin-panel/web-scraping',
  scrapedData: '/admin-panel/scraped-data'
}

const AdminHeader = () => {

  const { user, isLoading, error } = useSelector(state => state.auth);

  const { pathname } = useLocation()

  const [activeMenu, setActiveMenu] = useState(pathname);

  if(isLoading) {
    return <Loader/>
  }

  if(error) {
    <ErrorPage type={ERROR_PAGE_TYPES.INTERNAL_SERVER_ERROR} ErrorMsg={ERROR_MESSAGES.INTERNAL_SERVER_ERROR}/>
  }

  return (
    <div className='admin-header-main-contianer'>
      <div>
        <div className='admin-sidebar'>
          <div className='logo-header'>
            <img src={hireLogo}  alt='hire-logo'/>
            <p>HireMatrix</p>
          </div>
          <div className='admin-components'>
            <div onClick={() => setActiveMenu(locations.dashboard)} className={`${activeMenu == locations.dashboard ? 'active-nav' : ''}`}>
              <Link to={`${locations.dashboard}`}>
                Dashboard
              </Link>
            </div>
            <div onClick={() => setActiveMenu(locations.users)} className={`${activeMenu == locations.users ? 'active-nav' : ''}`}>
              <Link to={`${locations.users}`}>
                Users
              </Link>
            </div>
            <div onClick={() => setActiveMenu(locations.jobs)} className={`${activeMenu == locations.jobs ? 'active-nav' : ''}`}>
              <Link to={`${locations.jobs}`}>
                Jobs
              </Link>
            </div>
            <div onClick={() => setActiveMenu(locations.webscraping)} className={`${activeMenu == locations.webscraping ? 'active-nav' : ''}`}>
              <Link to={`${locations.webscraping}`}>
                Webscraping
              </Link>
            </div>
            <div onClick={() => setActiveMenu(locations.scrapedData)} className={`${activeMenu == locations.scrapedData ? 'active-nav' : ''}`}>
              <Link to={`${locations.scrapedData}`}>
                Scraped Data
              </Link>
            </div>
          </div>
        </div>
        <div className='admin-details'>
          <p>Admin: {user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader