import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setSearchContent, setLocationContent } from '../features/jobSearch/jobSearchSlice'

// Data
import {candidatesInfiniteScroll, trendingJobInfiniteScrollList} from '../assets/infiniteScrollData.json'

// assets
import employerPng from '../assets/jobLandingPageImg/employer.png'
import quoteLeftPng from '../assets/jobLandingPageImg/quote-left.png'
import starHalf from '../assets/jobLandingPageImg/star-half-empty.png'
import star from '../assets/jobLandingPageImg/star-rating.png'

// Icons
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

// components
import CandidateInfiniteSlider from '../components/infinitescroll/CandidateInfiniteSlider'
import TrendingInfiniteSlider_1 from '../components/infinitescroll/TrendingInfiniteSlider_1'
import TrendingInfiniteSlider_2 from '../components/infinitescroll/TrendingInfiniteSlider_2'
import RatingCard from '../components/landingPageComponents/ratingCard'
import TrendingJobs from '../components/landingPageComponents/TrendingJobs'
import JobOpening from '../components/landingPageComponents/JobOpening'
import PaginationCore from '../core/paginationCore/PaginationCore'
import PlaceHolderEffect from '../components/landingPageComponents/PlaceHolderEffect'

const hoverListDiffColors = [
  'list-hover', 
]

const JobLandingPage = () => {

  const [searchInputValue, setSearchInputValue] = useState('')
  const [clearInputBtnVisible, setClearInputBtnVisible] = useState(false)
  const [searchInputErrMsg, setSearchInputErrMsg] = useState(false)
  const [locationInput, setLocationInput] = useState('Anywhere in india')
  const [locationInputErrMsg, setLocationInputErrMsg] = useState(false)
  // const [searchPlaceholder, setSearchPlaceholder] = useState('')
  const [clearBtnVisible, setClearBtnVisible] = useState(false)
  
  const [hoverdIndex_1, setHoverdIndex_1] = useState(null)
  const [hoverdIndex_2, setHoverdIndex_2] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const clearSearchInput = () => {
    setSearchInputValue('');
    setClearInputBtnVisible(false);
  }

  const clearTextLocationInput = () => {
    setLocationInput('');
    setClearBtnVisible(false);
  }

  const onChaningSearchInput = (e) => {
    setSearchInputValue(e.target.value); setClearInputBtnVisible(true)
  }

  const onChangingLocationInput = (e) => {
    setLocationInput(e.target.value)
    setClearBtnVisible(true)
  }

  const onFocusingLocationInput = () => {
    setClearBtnVisible(true)
  }

  // place holder text changer
  const searchPlaceholder = PlaceHolderEffect();


  const mouseEnter_1 = (index) => {
    setHoverdIndex_1(index)
  }

  const mouseLeave_1 = () => {
    setHoverdIndex_1(null)
  }

  const mouseEnter_2 = (index) => {
    setHoverdIndex_2(index)
  }

  const mouseLeave_2 = () => {
    setHoverdIndex_2(null)
  }

  const onClickingSearchJob = () => {
    if(searchInputValue === '') {
      setSearchInputErrMsg(true)
      setLocationInputErrMsg(false)
    }
    else if(locationInput === '') {
      setLocationInputErrMsg(true)
      setSearchInputErrMsg(false)
    }
    else{
      navigate('/jobs')
      setSearchInputErrMsg(false)
      setLocationInputErrMsg(false)
      dispatch(setSearchContent(searchInputValue))
      dispatch(setLocationContent(locationInput))
    }
  }

  const handleKeyDown = (e) => {
    setClearInputBtnVisible(true);
    if(e.key === 'Enter'){
      if(searchInputValue === '') {
        setSearchInputErrMsg(true)
        setLocationInputErrMsg(false)
      }
      else if(locationInput === '') {
        setLocationInputErrMsg(true)
        setSearchInputErrMsg(false)
      }
      else{
        navigate('/jobs')
        setSearchInputErrMsg(false)
        setLocationInputErrMsg(false)
        dispatch(setSearchContent(searchInputValue))
        dispatch(setLocationContent(locationInput))
      }
    }
  }

  return (
    <>
      <div className="home-section">

        {/* <!-- search section --> */}

        <div className="search-jobs-container">
          <h1>Your Gateway to Exceptional Talent!</h1>
          <h1>Effortless Hiring, Maximum Efficiency</h1>
          <p>Discover 50 lakh+ career opportunities</p>
          <div className={`search-input-container ${searchInputErrMsg ? 'error-search-input-el' : ''} ${locationInputErrMsg ? 'error-search-input-el' : ''}`}>
            <CiSearch/>
            <input 
              type="text" 
              className={`search-input-el`}
              placeholder={searchPlaceholder}
              value={searchInputValue}
              onChange={onChaningSearchInput}
              onKeyDown={handleKeyDown}
            />
            <button className={`clear-text-locationIn-btn ${clearInputBtnVisible ? "clear-btn-loc-visible" : ""}`} onClick={clearSearchInput}>x</button>
            <hr className='hr-tag-jobLandingPage'/>
            <CiLocationOn/>
            <input 
              type="text" 
              className="options-input-el" 
              placeholder="Search for an area or city" 
              value={locationInput} 
              onChange={onChangingLocationInput} 
              onFocus={onFocusingLocationInput}
            />
            <button className={`clear-text-locationIn-btn ${clearBtnVisible ? "clear-btn-loc-visible" : ""}`} onClick={clearTextLocationInput}>x</button>
            {/* <select className="location-options-dropdown">
              <option>abc</option>
              <option>gfsg</option>
              <option>sdfsd</option>
              <option>dsfasdg</option>
              <option>fdgfsd</option>
              <option>rreyhdf</option>
            </select> */}
            <button className="search-jobs-btn" onClick={onClickingSearchJob}>
                Search Job
            </button>
          </div>
          {searchInputErrMsg ? 
            <p className='error-msg'>
              Please enter a keyword to search jobs
            </p> : ''
          }
          {locationInputErrMsg ? 
            <p className='error-msg'>
              Please enter a keyword and select a location to search jobs
            </p> : ''}
        </div>

        {/* <!-- infinite scroll --> */}

        <div className="infinite-scroll">
          <ul className="infinite-scroll-list-items">
            {
              candidatesInfiniteScroll.map((item, index) => (
                <CandidateInfiniteSlider key={index} candidateList={item}/>
              ))
            }
          </ul>
          <ul aria-hidden="true" className="infinite-scroll-list-items">
            {
              candidatesInfiniteScroll.map((item, index) => (
                <CandidateInfiniteSlider key={index} candidateList={item}/>
              ))
            }
          </ul>
        </div>

        {/* <!-- trending section --> */}

        <div className="trending_job_container">
            <TrendingJobs/>
        </div>
      </div>

      {/* <!-- job opening section --> */}

      <div className="job-opening-container">
          <JobOpening/>
      </div>

      {/* <!-- trending job roles section --> */}

      <div className="trending-job-roles-container">
        <h1 className="job-opening-heading">
            Trending job roles on Hire-Matrix
        </h1>
        <div className="trending-job-roles-infinite-scroll-container infi-1">
            <ul className="trending-job-roles-infinite-scroll-list-items">
              {
                trendingJobInfiniteScrollList.map((item, index) => (
                  <TrendingInfiniteSlider_1 
                  key={index} 
                  trendingList={item} 
                  mouseEnter={() => mouseEnter_1(index)} 
                  mouseLeave={mouseLeave_1}
                  isHoverd={hoverdIndex_1 === index}
                  randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}/>
                ))
              }
            </ul>
            <ul aria-hidden="true" className="trending-job-roles-infinite-scroll-list-items">
              {
                trendingJobInfiniteScrollList.map((item, index) => (
                  <TrendingInfiniteSlider_1 
                  key={index} 
                  trendingList={item} 
                  mouseEnter={() => mouseEnter_1(index)} 
                  mouseLeave={mouseLeave_1}
                  isHoverd={hoverdIndex_1 === index}
                  randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}/>
                ))
              }
            </ul>
        </div>
        <div className="trending-job-roles-infinite-scroll-container infi-2">
            <ul className="trending-job-roles-infinite-scroll-list-items second-infinite-scroll">
              {
                trendingJobInfiniteScrollList.map((item, index) => (
                  <TrendingInfiniteSlider_2 
                  key={index} 
                  trendingList={item} 
                  mouseEnter={() => mouseEnter_2(index)} 
                  mouseLeave={mouseLeave_2}
                  isHoverd={hoverdIndex_2 === index}
                  // randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}
                  randomclass={hoverListDiffColors[0]}
                  />
                ))
              }
            </ul>
            <ul aria-hidden="true" className="trending-job-roles-infinite-scroll-list-items second-infinite-scroll">
              {
                trendingJobInfiniteScrollList.map((item, index) => (
                  <TrendingInfiniteSlider_2 
                  key={index} 
                  trendingList={item} 
                  mouseEnter={() => mouseEnter_2(index)} 
                  mouseLeave={mouseLeave_2}
                  isHoverd={hoverdIndex_2 === index}
                  // randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}
                  randomclass={hoverListDiffColors[0]}
                  />
                ))
              }
            </ul>
        </div>
        <button className="job-opening-viewallBtn">View all</button>
      </div>

      {/* <!-- rating section --> */}

      <div className="rating-section">
        <div className="join-community-card">
          <h1 className="join-community-text">
            <img 
              src={quoteLeftPng} 
              className="quotes-img"
              loading='lazy'
            />
            Join the community of 5 crore satisfied job seekers...
          </h1>
          <div>
              <p>Play Store Ratings</p>
              <img src={star} alt="star" loading='lazy'/>
              <img src={star} alt="star" loading='lazy'/>
              <img src={star} alt="star" loading='lazy'/>
              <img src={star} alt="star" loading='lazy'/>
              <img src={starHalf} alt="star" loading='lazy'/>
          </div>
        </div>
        <div className="user-rating-container">
          <RatingCard/>
        </div>
      </div>

      {/* <!-- employer section --> */}

      <div className="employer-section">
        <div className="employer-card">
            <img src={employerPng} alt="employe" className="employer-img"/>
            <div className="employer-card-details">
                <h1 className="employer-theme">HireMatrix For EMPLOYER</h1>
                <h1 className="employer-want-text">Want to hire?</h1>
                <p className="employer-para">Find the best candidate from 5 crore+ active job seekers!</p>
                <button className="post-btn">Post job</button>
            </div>
        </div>
      </div>

      {/* <PaginationCore/> */}
    </>
  )
}

export default JobLandingPage
