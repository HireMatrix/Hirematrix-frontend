import React from 'react'
import { useSelector } from 'react-redux'

const AdminHeader = () => {

  const user = useSelector(state => state.user);
  console.log(user);
  
  return (
    <div className='admin-header-contianer'>
      <div></div>
      <div>dashboard</div>
      <div>Users</div>
      <div>Jobs</div>
      <div>webscraping</div>
    </div>
  )
}

export default AdminHeader