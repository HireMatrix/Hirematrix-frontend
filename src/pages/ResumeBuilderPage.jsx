import React from "react";
import { useNavigate } from "react-router-dom";

/* SATYA: 
  Todo: 
  ** I don't know why are you using the header tag and main tag (which is i have removed), these kind of things are managed globally
  you should not use them agian here and write styles for them it would create a impact on global structuring please try to figure out this thing and
   remove those kind of tags from here and please improve the css..

  **** don't use header and nav tags here while designing a page...!!!!!!!!
*/
const ResumeBuilderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="resume-builder-page-main-container">
      <header className="resumeBHead">
        <h1 className="resume-builder-h1">JobReady Toolkit</h1>
      </header>
        <div className="content">
          <img
            className="resume-builder-MainIcon"
            src="/src/assets/resumeBuilderPage/resume-builder-icon1.png"
            alt="Resume Icon"
            loading="lazy"
          />
          <h2>Create your best resume to advance career</h2>
          <p>Build from scratch </p>
          <button
            className="resume-builder-btn"
            onClick={() => navigate("/resume-dashboard")}
          >
            + Create new resume
          </button>
        </div>
      <div className="cards-container">
        <div className="card">
          <img
            src="/src/assets/resumeBuilderPage/resume-builder-icon3.png"
            alt="Resume Icon"
            loading="lazy"
          />
          <h3>Your Resumes</h3>
          <p>Where your unique talents, skills, and extensive expertise truly shine and stand out.</p>
          <button>Explore Resumes</button>
        </div>

        <div className="card">
          <img
            src="/src/assets/resumeBuilderPage/resume-builder-icon2.png"
            alt="Analysis Icon"
            loading="lazy"
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
            loading="lazy"
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
