import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import AllJobsPage from '../components/AllJobsPage'
import FilterPage from '../components/FilterPage'
import NoJobsFoundPage from '../components/NoJobsFoundPage'
import SearchAndLocationBar from '../components/SearchAndLocationBar'
import { useState } from 'react';

const JobSearchPage = () => {

  const userLoggedIn = false
  
  const allJobs = useSelector(state => state.filterFetch)

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = allJobs.jobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allJobs.jobs.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allJobs.jobs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  const searchResults = allJobs.jobs.length

  // console.log(allJobs)

  return (
    <div className='jobSearch-section'>
      <SearchAndLocationBar/>
      <div className='jobSearch-filter-jobs-profileUpdate-section'>
        <div className='jobSearch-no-of-jobs-heading'>
          <h1>{`${searchResults} search results`}</h1>
        </div>
        <div>
          <div className='jobSearch-filter-container'>
            <FilterPage/>
          </div>
          <div className='jobSearch-jobs-container'>
            {
                currentItems.length === 0 ? (
                  <NoJobsFoundPage/>
                ) : (
                  currentItems.map(item => (
                    <AllJobsPage key={item._id} jobsdata={item}/>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount}
        previousLabel="prev"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default JobSearchPage
