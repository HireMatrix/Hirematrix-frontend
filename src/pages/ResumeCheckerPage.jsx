import React from 'react'

const ResumeCheckerPage = () => {
  return (
    <div>
      <div className="resumechecker-container">
        <div>
          <h1>
            Optimize your resume with <span className="highlight">Resume Checker.</span>
          </h1>
          <p>
            Instantly elevate your resume! Upload now to identify potential improvements and enhance your resume.
          </p>
          <div className="cta-buttons">
            <button className="btn primary">Check your resume score</button>
            <button className="btn secondary">Resume examples</button>
          </div>
          
        </div>
        <div>
          <img 
            className="img1" 
            src="https://res.cloudinary.com/da17s0k5a/image/upload/v1738873174/openart-image_UKJj0kCv_1738873022106_raw_ztxhhv.jpg" alt="Resume Checker"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="steps-container">
        <div className="container">
          <div className="step-card">
            <h3>Upload your resume</h3>
            <p>Get your resume reviewed in an instant.</p>
            <button className="btn upload">Upload a file</button>
          </div>
          <div className="step-card">
            <h3>Get detailed analysis</h3>
            <p>Our AI tool provides expert feedback and improvement suggestions.</p>
            <button className="btn-checkresume">Check your resume score</button>
          </div>
          <div className="step-card">
            <h3>Enhance your resume</h3>
            <p>Receive expert guidance to make your resume stand out.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeCheckerPage