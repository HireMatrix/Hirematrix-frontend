import { useSelector } from 'react-redux';
import hireLogo from '../../assets/hire-favicon.png';

const AdminHeader = () => {

  const { user, isLoading } = useSelector(state => state.auth);

  if(isLoading) {
    return <Loader/>
  }

  return (
    <div className='admin-header-main-contianer'>
      <div>
        <div className='logo-header'>
          <img src={hireLogo} loading='lazy' alt='hire-logo'/>
        </div>
        <div className='admin-components'>
          <div>dashboard</div>
          <div>Users</div>
          <div>Jobs</div>
          <div>webscraping</div>
        </div>
      </div>
      <div className='admin-details'>
        <p>{user.name}</p>
      </div>
    </div>
  )
}

export default AdminHeader