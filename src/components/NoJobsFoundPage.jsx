import { useDispatch } from 'react-redux'
import notFoundImg from '../assets/jobSearchPageImg/poor-man-on-the-street.png'
import { resetFilter } from '../features/filter/filterSlice'

const NoJobsFoundPage = () => {

  const dispatch = useDispatch()

  return (
    <div className='no-jobs-found-container'>
      <img src={notFoundImg} alt='not-found-img'/>
      <h1>Sorry, no jobs found</h1>
      <p>Clear filters to see jobs or explore jobs in other cities</p>
      <button onClick={() => dispatch(resetFilter())}>Clear filters <span>x</span></button>
    </div>
  )
}

export default NoJobsFoundPage
