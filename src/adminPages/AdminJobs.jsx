import { fetchAllJobsAdmin } from '../Constants/ApiUrls';
import Loader from '../components/Loader';
import ErrorPage from '../core/ErrorHandler/ErrorPage';
import PaginationCore from '../core/paginationCore/PaginationCore';

const AdminJobs = () => {

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
    queryFn: fetchAllJobsAdmin,
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
    <div className='admin-jobs-main-container'>
      <div className='admin-container'>
        {
          data?.map((item, index) => (
            <p key={index}>{item.title}</p>
          ))
        }
      </div>
    </div>
  )
}

export default AdminJobs
