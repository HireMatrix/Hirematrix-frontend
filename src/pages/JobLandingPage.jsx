import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setSearchContent, setLocationContent } from '../features/jobSearch/jobSearchSlice'

import {candidatesInfiniteScroll, trendingJobInfiniteScrollList} from '../assets/infiniteScrollData.json'

import searchPng from '../assets/jobLandingPageImg/search.png'
import employerPng from '../assets/jobLandingPageImg/employer.png'
import locationPng from '../assets/jobLandingPageImg/location.png'
import paytmPng from '../assets/jobLandingPageImg/paytm.png'
import profile2Jpg from '../assets/jobLandingPageImg/profile-2.jpg'
import quoteLeftPng from '../assets/jobLandingPageImg/quote-left.png'
import starHalf from '../assets/jobLandingPageImg/star-half-empty.png'
import star from '../assets/jobLandingPageImg/star-rating.png'
import studentImg from '../assets/jobLandingPageImg/studentImg.png'
import tickPng from '../assets/jobLandingPageImg/tick.png'

import CandidateInfiniteSlider from '../components/infinitescroll/CandidateInfiniteSlider'
import TrendingInfiniteSlider_1 from '../components/infinitescroll/TrendingInfiniteSlider_1'
import TrendingInfiniteSlider_2 from '../components/infinitescroll/TrendingInfiniteSlider_2'
import dropDown from '../assets/dropdown.png'

const placeholderTextArray = [
  "'skill'",
  "'title'",
  "'company'",
]

const hoverListDiffColors = [
  'list-hover-1', 'list-hover-2', 'list-hover-3' 
]

const JobLandingPage = () => {

  const [searchInputValue, setSearchInputValue] = useState('')
  const [searchInputErrMsg, setSearchInputErrMsg] = useState(false)
  const [locationInput, setLocationInput] = useState('Anywhere in india')
  const [locationInputErrMsg, setLocationInputErrMsg] = useState(false)
  const [searchPlaceholder, setSearchPlaceholder] = useState('')
  const [clearBtnVisible, setClearBtnVisible] = useState(false)
  
  const [hoverdIndex_1, setHoverdIndex_1] = useState(null)
  const [hoverdIndex_2, setHoverdIndex_2] = useState(null)

  const [scrollValue, setScrollValue] = useState('')

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const scrollProgressContainer = useRef()

  const scroll = useRef()

  const jobOpeningCardsContainer = useRef()

  const clearTextLocationInput = () => {
    setLocationInput('')
    setClearBtnVisible(false)
  }

  const onChangingLocationInput = (e) => {
    setLocationInput(e.target.value)
    setClearBtnVisible(true)
  }

  const onFocusingLocationInput = () => {
    setClearBtnVisible(true)
  }

  // place holder text changer

  const constantText = 'Search jobs by '
  let index = 0;

  useEffect(() => {
    setInterval(() => {
      setSearchPlaceholder(constantText+placeholderTextArray[index]);
      index = (index + 1) % placeholderTextArray.length;
    }, 2000)
  }, [])

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

  // scroll progress

  const onScrollingJobOpeningCards = () => {
    const scrollLeft = jobOpeningCardsContainer.current.scrollLeft;
    // console.log(scrollLeft)
    const scrollWidth = jobOpeningCardsContainer.current.scrollWidth - jobOpeningCardsContainer.current.clientWidth;
    const scrollPercentage = (scrollLeft / scrollWidth) * 100;
    const maxLeft = scrollProgressContainer.current.clientWidth - scroll.current.clientWidth;
    const leftPosition = (scrollPercentage/100) * maxLeft;
    setScrollValue(leftPosition + 'px');
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
          <h1>INDIA'S #1 JOB PLATFORM</h1>
          <h1 className='search-job-heading-details'>Your job search ends here</h1>
          <p>Discover 50 lakh+ career opportunities</p>
          <div className={`search-input-container ${searchInputErrMsg ? 'error-search-input-el' : ''} ${locationInputErrMsg ? 'error-search-input-el' : ''}`}>
            <img src={searchPng} alt='search-icon'/>
            <input 
              type="search" 
              className={`search-input-el`}
              placeholder={searchPlaceholder}
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <hr className='hr-tag-jobLandingPage'/>
            <img src={locationPng} className="location-img" alt='location-icon'/> 
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
            <h1 className="trending_job_mainhead">
              Popular Searches on UptoSkills
            </h1>
            <div className="trending_job1 t_j_1">
                <div>
                    <h1 className="trending_job_head1">
                        TRENDING AT #1
                    </h1>
                    <p className="trending_job_para1">
                        Jobs For Freshers
                    </p>
                    <p className="trending-job-para2">
                        Jobs For Freshers
                    </p>
                    <button className="trending_job_btn1">
                        {`View all >`}
                    </button>
                </div>
                <div>  
                  <img src={studentImg} className="trending_job_img1"/>
                </div>
            </div>
            <div className="trending_job1 t_j_2 shadow mt-3 mb-3 d-flex flex-column position-relative">
                <div>
                    <h1 className="trending_job_head1">
                        TRENDING AT #1
                    </h1>
                    <p className="trending_job_para1">
                        Jobs For Freshers
                    </p>
                    <p className="trending-job-para2">
                        Jobs For Freshers
                    </p>
                    <button className="trending_job_btn1">
                      {`View all >`}
                    </button>
                </div>
                <div>  
                  <img src={studentImg} className="trending_job_img1"/>
                </div>
            </div>
            <div className="trending_job1 t_j_1 shadow mt-3 mb-3 d-flex flex-column position-relative">
                <div>
                    <h1 className="trending_job_head1">
                        TRENDING AT #1
                    </h1>
                    <p className="trending_job_para1">
                        Jobs For Freshers
                    </p>
                    <p className="trending-job-para2">
                        Jobs For Freshers
                    </p>
                    <button className="trending_job_btn1">
                      {`View all >`}
                    </button>
                </div>
                <div>  
                  <img src={studentImg} className="trending_job_img1" />
                </div>
            </div>
            <div className="trending_job1 t_j_3 shadow mt-3 mb-3 d-flex flex-column position-relative">
                <div>
                    <h1 className="trending_job_head1">
                        TRENDING AT #1
                    </h1>
                    <p className="trending_job_para1">
                        Jobs For Freshers
                    </p>
                    <p className="trending-job-para2">
                        Jobs For Freshers
                    </p>
                    <button className="trending_job_btn1">
                      {`View all >`}
                    </button>
                </div>
                <div>  
                  <img src={studentImg} className="trending_job_img1" />
                </div>
            </div>
            <div className="trending_job1 t_j_4 shadow mt-3 mb-3 d-flex flex-column position-relative">
                <div>
                    <h1 className="trending_job_head1">
                        TRENDING AT #1
                    </h1>
                    <p className="trending_job_para1">
                        Jobs For Freshers
                    </p>
                    <p className="trending-job-para2">
                        Jobs For Freshers
                    </p>
                    <button className="trending_job_btn1">
                      {`View all >`}
                    </button>
                </div>
                <div>  
                  <img src={studentImg} className="trending_job_img1"/>
                </div>
            </div>
        </div>
      </div>
      {/* <!-- job opening section --> */}

      <div className="job-opening-container">
          <h1 className="job-opening-heading">Job Openings in Top companies</h1>
          <div className="job-opening-company-cards-container" onScroll={onScrollingJobOpeningCards} ref={jobOpeningCardsContainer}>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
              <div className="job-opening-company-card">
                  <img src={paytmPng} alt="company-logo"/>
                  <h1 className="job-opening-company-name">
                      Paytm Service Pvt. Ltd.
                  </h1>
                  <p className="job-opening-company-desc">Digital payment and e-commerce facilitator.</p>
                  <button className="job-opening-company-button">View jobs</button>
              </div>
          </div>
          <div className="job-opening-scroll-progress-container" ref={scrollProgressContainer}>
              <div className="job-opening-scroll" ref={scroll} style={{left: `${scrollValue}`}}></div>
          </div>
          <button className="job-opening-viewallBtn">View all</button>
      </div>

      {/* <!-- trending job roles section --> */}

      <div className="trending-job-roles-container">
        <h1 className="job-opening-heading">
            Trending job roles on UptoSkills
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
                  randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}/>
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
                  randomclass={hoverListDiffColors[index % hoverListDiffColors.length]}/>
                ))
              }
            </ul>
        </div>
        <button className="job-opening-viewallBtn">View all</button>
      </div>

      {/* <!-- rating section --> */}

      <div className="rating-section">
        <div className="join-community-card">
          <img src={quoteLeftPng} className="quotes-img"/>
          <h1 className="join-community-text">Join the community of 5 crore satisfied job seekers...</h1>
          <div>
              <p>Play Store Ratings</p>
              <img src={star} alt="star"/>
              <img src={star} alt="star"/>
              <img src={star} alt="star"/>
              <img src={star} alt="star"/>
              <img src={starHalf} alt="star"/>
          </div>
        </div>
        <div className="user-rating-container">
          <div className="user-rating-card">
            <img className="user-rating-profile-img" src={profile2Jpg}/>
            <div className="users-name-rating">
              <p className="rating-user-name-text">Jenil Ghevariya <span><img src={tickPng} alt="placed"/>Placed</span></p>
              <div className="rating-stars-container">
                <p>4.5</p>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={starHalf} alt="mini-star" className="mini-star-img"/>
              </div>
            </div>
            <p className="user-review-text">
              "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
            </p>
          </div>
          <div className="user-rating-card">
            <img className="user-rating-profile-img" src={profile2Jpg}/>
            <div className="users-name-rating">
              <p className="rating-user-name-text">Jenil Ghevariya <span><img src={tickPng} alt="placed"/>Placed</span></p>
              <div className="rating-stars-container">
                <p>4.5</p>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={starHalf} alt="mini-star" className="mini-star-img"/>
              </div>
            </div>
            <p className="user-review-text">
              "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
            </p>
          </div>
          <div className="user-rating-card">
            <img className="user-rating-profile-img" src={profile2Jpg}/>
            <div className="users-name-rating">
              <p className="rating-user-name-text">Jenil Ghevariya <span><img src={tickPng} alt="placed"/>Placed</span></p>
              <div className="rating-stars-container">
                <p>4.5</p>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={star} alt="mini-star" className="mini-star-img"/>
                <img src={starHalf} alt="mini-star" className="mini-star-img"/>
              </div>
            </div>
            <p className="user-review-text">
              "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
            </p>
          </div>
        </div>
      </div>

      {/* <!-- employer section --> */}

      <div className="employer-section">
        <div className="employer-card">
            <img src={employerPng} alt="employe" className="employer-img"/>
            <div className="employer-card-details">
                <h1 className="employer-theme">UPTOSKILLS For EMPLOYER</h1>
                <h1 className="employer-want-text">Want to hire?</h1>
                <p className="employer-para">Find the best candidate from 5 crore+ active job seekers!</p>
                <button className="post-btn">Post job</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default JobLandingPage
