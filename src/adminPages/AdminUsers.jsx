import React from 'react'
import { fetchAllusersAdmin } from '../Constants/ApiUrls';
import { useQuery } from '@tanstack/react-query';

const AdminUsers = () => {

    const {
        data
    } = useQuery({
      queryFn: fetchAllusersAdmin,
      queryKey: ["adminUsers"]
    })
    
    console.log(data);

    return (
      <div>
        admin users
      </div>
    )
}

export default AdminUsers
