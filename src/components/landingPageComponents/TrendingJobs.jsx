import studentImg from '../../assets/jobLandingPageImg/studentImg.png'

const TrendingJobDetails = [
    {
        trendingTitle: "TRENDING AT #1",
        ExperienceType: "Jobs For Freshers"
    },
    {
        trendingTitle: "TRENDING AT #1",
        ExperienceType: "Jobs For Freshers"
    },
    {
        trendingTitle: "TRENDING AT #1",
        ExperienceType: "Jobs For Freshers"
    },
    {
        trendingTitle: "TRENDING AT #1",
        ExperienceType: "Jobs For Freshers"
    },
    {
        trendingTitle: "TRENDING AT #1",
        ExperienceType: "Jobs For Freshers"
    }
]

const TrendingJobs = () => {
  return (
    <>
        <h1 className="trending_job_mainhead">
            Popular Searches on Hire-Matrix
        </h1>
        {
            TrendingJobDetails.map((item, index) => (
                <div className="trending_job1 t_j_1" key={index}>
                    <div>
                        <h1 className="trending_job_head1">
                            {item.trendingTitle}
                        </h1>
                        <p className="trending_job_para1">
                            {item.ExperienceType}
                        </p>
                        <p className="trending-job-para2">
                            {item.ExperienceType}
                        </p>
                        <button className="trending_job_btn1">
                            {`View all >`}
                        </button>
                    </div>
                    <div>  
                        <img src={studentImg} className="trending_job_img1" loading='lazy' alt='trending'/>
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default TrendingJobs
