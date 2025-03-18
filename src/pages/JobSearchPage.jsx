import AllJobsPage from '../components/AllJobsPage'
import FilterPage from '../components/FilterPage'
import NoJobsFoundPage from '../components/NoJobsFoundPage'
import SearchAndLocationBar from '../components/SearchAndLocationBar'
import PaginationCore from '../core/paginationCore/PaginationCore';
import { fetchAllJobs } from '../Constants/ApiUrls';
import { useSelector } from 'react-redux';
import JobLoader from '../components/JobLoader';

const JobSearchPage = () => {

  const userLoggedIn = false
  
  const filters = useSelector(state => state.filter)

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
    queryFn: () => fetchAllJobs(filters),
    queryKey: ["all-jobs", filters]
  });

  console.log(isLoading);

  if(isLoading || isFetching){
    <JobLoader/>
  }

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

  // console.log(allJobs)

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
              data?.length === 0 ? (
                <NoJobsFoundPage/>
              ) : (
                data?.map(item => (
                  <AllJobsPage key={item._id} jobsdata={item} loading={status}/>
                ))
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
