import React from 'react'
import { fetchAllusersAdmin } from '../Constants/ApiUrls';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';
import Loader from '../components/Loader';

const AdminUsers = () => {

  const {
    data,
    page,
    pageSize,
    PageNumberSelection,
    PageSizeSelection,
    totalItems,
    isLoading,
    isFetching,
    isError,
    error,
    isRefetching,
    refetch,
  } = PaginationCore({
    queryFn: fetchAllusersAdmin,
    queryKey: ["adminUsers"],
  });
    
  console.log(data);

  if(isLoading || isRefetching || isFetching) {
    <Loader/>
  }

  if(isError) {
    <ErrorPage/>
  }

  console.log(data);

  return (
    <div className='admin-users-main-container'>
      <div className='admin-container'>
        {
          data?.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))
        }
      </div>
    </div>
  )
}

export default AdminUsers
