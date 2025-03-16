import companyLogo from '../assets/jobSearchPageImg/Company_icon.png'
import locationLogo from '../assets/jobSearchPageImg/icon-location.png'
import salaryLogo from '../assets/jobSearchPageImg/icon-salary.png'
import workFromOffice from '../assets/jobSearchPageImg/Work-from-office.png'
import experience from '../assets/jobSearchPageImg/experience.png'
import fullTime from '../assets/jobSearchPageImg/Full-time.png'
import partTime from '../assets/jobSearchPageImg/Part-time.png'
import english from '../assets/jobSearchPageImg/Advanced-English.png'
import nightShift from '../assets/jobSearchPageImg/Night-shift_xxhdpi.avif'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { IoMdArrowDropright } from "react-icons/io";


const AllJobsPage = ({jobsdata, loading}) => {
  console.log(loading)

  if(loading == 'pending'){
    return <Loader/>
  }
  return(
    <div className='job-card-container'>
        <Link to={`/jobs/${jobsdata._id}`} target='_blank'>
        <div className='job-title-container'>
          <div>
            <img src={companyLogo} loading='lazy' alt='company-logo'/>
            <h1>{jobsdata.title}</h1>
          </div>
          <IoMdArrowDropright/>
        </div>
        <div className='job-location-salary-container'>
          <img src={locationLogo} loading='lazy' alt='location-icon'/>
          <p>{jobsdata.location}</p>
        </div>
        <div className='job-location-salary-container'>
          <img src={salaryLogo} loading='lazy' alt='salary-icon'/>
          <p>{`₹ ${jobsdata.salary} monthly`}</p>
        </div>
        <div className='job-work-type-shift-experience-container'>
          {
            jobsdata.workMode.map(item => (
              <span key={item} className='job-details-box'>
                <img src={workFromOffice} loading='lazy' alt='work-from-office-logo'/>
                {item}
              </span>
            ))
          }
          {
            jobsdata.workType.map(item => (
              <span key={item} className='job-details-box'>
                <img src={item === 'Part time' ? `${partTime}` : `${fullTime}`} alt='job-type' loading='lazy'/>
                {item}
              </span>
            ))
          }
          {
            jobsdata.workShift.map(item => (
              item !== 'Day shift' && (
                <span key={item} className='job-details-box'>
                  <img src={nightShift} loading='lazy' alt='night-icon'/>
                  {item}
                </span>
              )
            ))
          }
          {
            (jobsdata.experience === '0') ? 
              (
                <span className='job-details-box'>
                  <img src={experience} loading='lazy' alt='experience-icon'/>
                  Fresher only</span>
              )
              : 
              (
                <span className='job-details-box'>
                  <img src={experience} loading='lazy' alt='experience-icon'/>
                  {`Min. ${jobsdata.experience} year`}
                </span>
              )
          }
          {
            <span className='job-details-box'>
              <img src={english} loading='lazy' alt='english-level'/>
              {jobsdata.englishLevel}
            </span>
          }
        </div>
      </Link>
    </div>
  )
}

export default AllJobsPage