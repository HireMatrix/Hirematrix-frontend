import { useRef, useState } from "react";

import paytmPng from '../../assets/jobLandingPageImg/paytm.png'

const jobOpeningDetails = [
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    },
    {
        jobTitle: "Paytm Service Pvt. Ltd.",
        jobDesc: "Digital payment and e-commerce facilitator."
    }
]


const JobOpening = () => {

    const [scrollValue, setScrollValue] = useState('')

    const scrollProgressContainer = useRef()
    const scroll = useRef()
    const jobOpeningCardsContainer = useRef()

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

    return (
        <>
            <h1 className="job-opening-heading">
                Job Openings in Top companies
            </h1>
            <div
                className="job-opening-company-cards-container"
                onScroll={onScrollingJobOpeningCards}
                ref={jobOpeningCardsContainer}
            >
            {
                jobOpeningDetails.map((item, index) => (
                    <div 
                        className="job-opening-company-card"
                        key={index}
                    >
                        <img 
                            src={paytmPng} 
                            alt="company-logo"
                            loading='lazy'
                        />
                        <h1 className="job-opening-company-name">
                            {item.jobTitle}
                        </h1>
                        <p className="job-opening-company-desc">
                            {item.jobDesc}
                        </p>
                        <button className="job-opening-company-button">
                            View jobs
                        </button>
                    </div>
                ))
            }
            </div>
            <div className="job-opening-scroll-progress-container" ref={scrollProgressContainer}>
                <div className="job-opening-scroll" ref={scroll} style={{left: `${scrollValue}`}}></div>
            </div>
            <button className="job-opening-viewallBtn">
                View all
            </button>
        </>
    )
}

export default JobOpening
