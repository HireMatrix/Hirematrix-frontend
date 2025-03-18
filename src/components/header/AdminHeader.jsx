import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorPage, { ERROR_MESSAGES, ERROR_PAGE_TYPES } from '../../core/ErrorHandler/ErrorPage';
import hireLogo from '../../assets/hire-favicon.png';

const AdminHeader = () => {

  const { user, isLoading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);

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
            <div onClick={() => setActiveMenu('dashboard')} className={`${activeMenu == 'dashboard' ? 'active-nav' : ''}`}>
              <Link to='/admin-panel/dashboard'>
                Dashboard
              </Link>
            </div>
            <div onClick={() => setActiveMenu('user')} className={`${activeMenu == 'user' ? 'active-nav' : ''}`}>
              <Link to='/admin-panel/users'>
                Users
              </Link>
            </div>
            <div onClick={() => setActiveMenu('jobs')} className={`${activeMenu == 'jobs' ? 'active-nav' : ''}`}>
              <Link to='/admin-panel/jobs'>
                Jobs
              </Link>
            </div>
            <div onClick={() => setActiveMenu('webscraping')} className={`${activeMenu == 'webscraping' ? 'active-nav' : ''}`}>
              <Link to='/admin-panel/web-scraping'>
                webscraping
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