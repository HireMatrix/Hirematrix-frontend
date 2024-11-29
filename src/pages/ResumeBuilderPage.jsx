import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const ResumeBuilderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="resume-builder-page-main-container">
      {/* ----------Hero Section ------------------ */}
<<<<<<< HEAD
      <header className = "resumeBHead">
        <h1 className = "resume-builder-h1">JobReady Toolkit</h1>
        <nav id= "resume-builder-navbar">
            <ul>
                <li className = "resume-builder-list"><a href="#" className="active">Resumes</a></li>
                {/* <li className = "resume-builder-list"><a href="#">Cover Letters</a></li> */}
            </ul>
=======
      <header className="resumeBHead">
        <h1 className="resume-builder-h1">JobReady Toolkit</h1>
        <nav id="resume-builder-navbar">
          <ul>
            <li className="resume-builder-list">
              <a href="#" className="active">
                Resumes
              </a>
            </li>
          </ul>
>>>>>>> 772ebd8e175ae3c7851d7047ed68ea3d7dbe9d37
        </nav>
      </header>
      {/* --------------- Main Section ------------------ */}
      <main>
        <div className="content">
<<<<<<< HEAD
            <img className = "resume-builder-MainIcon" src="/src/assets/resumeBuilderPage/resume-builder-icon1.png" alt="Resume Icon"/>
            <h2>Create your best resume to advance career</h2>
            <p>Build from scratch or pre-fill it with LinkedIn, or Apna profile</p>
            <button className="resume-builder-btn">+ Create new resume</button>
=======
          <img
            className="resume-builder-MainIcon"
            src="/src/assets/resumeBuilderPage/resume-builder-icon1.png"
            alt="Resume Icon"
          />
          <h2>Create your best resume to advance career</h2>
          <p>Build from scratch or pre-fill it with LinkedIn, or Apna profile</p>
          {/* Button to navigate to the Resume Cards page */}
          <button
            className="resume-builder-btn"
            onClick={() => navigate("/resume-dashboard")} // Navigate to the cards page
          >
            + Create new resume
          </button>
>>>>>>> 772ebd8e175ae3c7851d7047ed68ea3d7dbe9d37
        </div>
      </main>
      <div className="cards-container">
        <div className="card">
          <img
            src="/src/assets/resumeBuilderPage/resume-builder-icon3.png"
            alt="Resume Icon"
          />
          <h3>Your Resumes</h3>
          <p>Where your skills and experiences truly shine through!</p>
          <button>Explore Resumes</button>
        </div>

        <div className="card">
          <img
            src="/src/assets/resumeBuilderPage/resume-builder-icon2.png"
            alt="Analysis Icon"
          />
          <h3>ATPC Score</h3>
          <p>
            Review your resume for errors and unlock expert insights to elevate
            your application!
          </p>
          <button>Check your resume score</button>
        </div>

        <div className="card">
          <img
            src="/src/assets/resumeBuilderPage/resume-builder-icon4.png"
            alt="Share Icon"
          />
          <h3>Job-Specific Resume</h3>
          <p>
            Explore customized resumes that align with your career path!
          </p>
          <button>Find Your Fit</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
