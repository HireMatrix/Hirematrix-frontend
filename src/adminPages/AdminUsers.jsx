import React from 'react'
import { fetchAllusersAdmin } from '../Constants/ApiUrls';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';
import Loader from '../components/Loader';
import { useMemo } from 'react';
import { useCustomeTable } from '../core/TableCore';
import CustomeTableComp from '../core/TableCore/CustomeTableComp';

const AdminUsers = () => {

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "_id"
    },
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "User Type",
      accessor: "userType"
    }
  ], [])

  const {
    data: paginatedData = [],
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

  const tableInstances = useCustomeTable({
    columns: columns,
    data: paginatedData
  })

  if(isLoading || isRefetching || isFetching) {
    <Loader/>
  }

  if(isError) {
    <ErrorPage/>
  }

  return (
    <div className='admin-users-main-container'>
      <div className='admin-container'>
        <div className='admin-table-wrap-main-container'>
          <CustomeTableComp
            {...tableInstances}
          />
          <div>
            <PageSizeSelection/>
            <PageNumberSelection/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
