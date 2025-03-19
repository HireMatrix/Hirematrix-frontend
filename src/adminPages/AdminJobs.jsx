import { useMemo } from 'react';
import { fetchAllJobsAdmin } from '../Constants/ApiUrls';
import Loader from '../components/Loader';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';
import { useCustomeTable } from '../core/TableCore';
import CustomeTableComp from '../core/TableCore/CustomeTableComp';

const AdminJobs = () => {

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "_id",
    }, 
    {
      Header: "Title",
      accessor: "title",
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
    queryFn: fetchAllJobsAdmin,
    queryKey: ["adminUsers"],
  });
    
  // console.log(paginatedData);

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
    <div className='admin-jobs-main-container'>
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

export default AdminJobs
