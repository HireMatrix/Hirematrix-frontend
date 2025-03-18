import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchAllJobsAdmin } from '../Constants/ApiUrls';

const AdminJobs = () => {

  const {
      data
  } = useQuery({
    queryFn: fetchAllJobsAdmin,
    queryKey: ["adminJobs"]
  })
  
  console.log(data);

  return (
    <div>
      admin jobs
    </div>
  )
}

export default AdminJobs
