import profile2Jpg from '../../assets/jobLandingPageImg/profile-2.jpg'
import star from '../../assets/jobLandingPageImg/star-rating.png'
import starHalf from '../../assets/jobLandingPageImg/star-half-empty.png'

/* 
    Todo:
    1. Imrpove these details
*/
const ratingDetails = [
    {
        name: "Jenil Ghevariya",
        details: "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
    },
    {
        name: "Jenil Ghevariya",
        details: "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
    },
    {
        name: "Jenil Ghevariya",
        details: "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
    }
]

const RatingCard = () => {
  return (
    <>
        {
            ratingDetails.map((item, index) => (
                <div className="user-rating-card" key={index}>
                    <img className="user-rating-profile-img" src={profile2Jpg} loading='lazy' alt='profile'/>
                    <div className="users-name-rating">
                        <p className="rating-user-name-text">{item.name} 
                            {/* <span><img src={tickPng} alt="placed"/>Placed</span> */}
                        </p>
                        <div className="rating-stars-container">
                        <p>4.5</p>
                        <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                        <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                        <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                        <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                        <img src={starHalf} alt="mini-star" className="mini-star-img" loading='lazy'/>
                        </div>
                    </div>
                    <p className="user-review-text">{item.details}</p>
                </div>
            ))
        }
    </>
  )
}

export default RatingCard


{/* <div className="user-rating-card">
            <img className="user-rating-profile-img" src={profile2Jpg} alt='user-rating' loading='lazy'/>
            <div className="users-name-rating">
                <p className="rating-user-name-text">Jenil Ghevariya <span><img src={tickPng} alt="placed"/>Placed</span></p>
                <div className="rating-stars-container">
                <p>4.5</p>
                <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                <img src={star} alt="mini-star" className="mini-star-img" loading='lazy'/>
                <img src={starHalf} alt="mini-star" className="mini-star-img" loading='lazy'/>
                </div>
            </div>
            <p className="user-review-text">
                "This app is very helpful if you are looking for a job and the team is also very supportive and friendly. They guided me through every stage. It is very easy to find a job on uptoskills because there are a lot of job options here for everyone. I got a job interview call very quickly after applying."
            </p>
        </div>
        <div className="user-rating-card">
            <img className="user-rating-profile-img" src={profile2Jpg} />
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
        </div> */}