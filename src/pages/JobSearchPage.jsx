import AllJobsPage from '../components/AllJobsPage'
import FilterPage from '../components/FilterPage'
import NoJobsFoundPage from '../components/NoJobsFoundPage'
import SearchAndLocationBar from '../components/SearchAndLocationBar'
import PaginationCore from '../core/paginationCore/PaginationCore';
import { fetchAllJobs } from '../Constants/ApiUrls';
import { useSelector } from 'react-redux';
import JobLoader from '../components/JobLoader';

const jobLoaderNum = 5;

const JobSearchPage = () => {

  const userLoggedIn = false
  
  const filters = useSelector(state => state.filter);
  const user = useSelector(state => state.auth);

  // pagination

  const {
    data,
    page,
    pageSize,
    PageNumberSelection,
    totalItems,
    isLoading,
    isFetching,
    isError,
    error,
    isRefetching,
    refetch,
  } = PaginationCore({
    queryFn: () => fetchAllJobs(filters, user.user._id),
    queryKey: ["all-jobs", filters],
    defaultPageSize: 10,
  });

  // const itemsPerPage = 10;
  // const [itemOffset, setItemOffset] = useState(0);

  // const endOffset = itemOffset + itemsPerPage;

  // const currentItems = jobs.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(jobs.length / itemsPerPage);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % jobs.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  return (
    <div className='jobSearch-section'>
      <SearchAndLocationBar/>
      <div className='jobSearch-filter-jobs-profileUpdate-section'>
        <div className='jobSearch-no-of-jobs-heading'>
          <h1>{`${totalItems} search results`}</h1>
        </div>
        <div>
          <div className='jobSearch-filter-container'>
            <FilterPage/>
          </div>
          <div className='jobSearch-jobs-container'>
            {
              isLoading || isFetching ? (
                [...Array(jobLoaderNum)].map((_, index) => <JobLoader key={index} />)
              ) : (
                data?.length === 0 || !data ? (
                  <NoJobsFoundPage/>
                ) : (
                  data?.map(item => (
                    <AllJobsPage 
                      key={item._id} 
                      jobsdata={item} 
                    />
                  ))
                )
              )
            }
          </div>
          {userLoggedIn ? (
            <div className='jobSearch-profileEdit-card'>
              ProfileUpdateCard
            </div>
          ) : (
            <div className='jobSearch-userLogin-card'>
              userLoginCard
            </div>
          )}
        </div>
      </div>
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="prev"
        renderOnZeroPageCount={null}
      /> */}
      {/* <PaginationCore/> */}
      <PageNumberSelection/>
    </div>
  )
}

export default JobSearchPage
