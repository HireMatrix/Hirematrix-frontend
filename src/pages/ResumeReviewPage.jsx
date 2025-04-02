import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ResumeReviewPage = () => {
  const location = useLocation();
  const { file, careerLevel } = location.state || {};
  const [showLoading, setShowLoading] = useState(true);
  const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);
  const [scoreDetails, setScoreDetails] = useState([]);
  const [stepsToImprove, setStepsToImprove] = useState([]);
  const [userName, setUserName] = useState('User'); 
  const loadingSteps = [
    'Please wait...',
    'Loading your resume...',
    'Parsing your resume...',
    'Identifying core sections...',
    'Identifying your work experiences...',
    'Identifying other experiences...',
    'Evaluating resume length...',
    'Identifying bullet points...'
  ];

  useEffect(() => {
    if (file) {
      let score = 50; 
      const details = [];
      const improvements = [];

      if (file.size > 2 * 1024 * 1024) {
        details.push('File size: Your resume is too large. Keep it under 2MB.');
        improvements.push('Reduce the file size of your resume to under 2MB.');
        score -= 10;
      }

      if (file.type !== 'application/pdf') {
        details.push('File format: PDF is recommended for better ATS compatibility.');
        improvements.push('Convert your resume to PDF format.');
        score -= 5;
      }

      if (careerLevel === 'Entry-level' && score > 50) {
        score = Math.min(score, 50);
      } else if (careerLevel === 'Mid-level' && score > 75) {
        score = Math.min(score, 75);
      }

      setResumeScore(score);
      setScoreDetails(details);
      setStepsToImprove(improvements);

      // Placeholder for user name
      setUserName('User');
    }

    const interval = setInterval(() => {
      setCurrentLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setShowLoading(false);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [file, careerLevel]);

  return (
    <div className="resume-review-page">
      {showLoading ? (
        <div className="loading-container">
          {loadingSteps.map((step, index) => (
            <div
              key={index}
              className={`loading-step ${index === currentLoadingStep ? 'active' : ''} ${
                index < currentLoadingStep ? 'completed' : ''
              }`}
            >
              <span className="checkmark">✔</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="review-container">
          <div className="review-left">
            <div className="score-section">
              <div className="score-circle">
                <span>{resumeScore}</span>
                <span className="score-label">OVERALL</span>
              </div>
              <div className="score-details">
                <h2>Good evening, {userName}.</h2>
                <p>Welcome to your resume review.</p>
                <h3>Your resume scored {resumeScore} out of 100.</h3>
                <p>
                  This is a decent start, but there’s clear room for improvement. It scored low on some key criteria hiring managers and resume screening software look for, but they can be easily improved. Let’s dive into what we checked your resume for, and how you can improve your score by 30+ points.
                </p>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${resumeScore}%` }}></div>
                </div>
              </div>
            </div>
            <div className="issues-section">
              <h3>Top Fixes</h3>
              <ul>
                {scoreDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="improvement-section">
              <h3>Steps to increase your score</h3>
              <ul>
                {stepsToImprove.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="review-right">
            <div className="resume-preview">
              <h2>Your Resume</h2>
              {/* Dummy data for the resume preview */}
              <div className="dummy-resume">
                <h3>John Doe</h3>
                <p>Email: john.doe@example.com | Phone: (123) 456-7890</p>
                <h4>Summary</h4>
                <p>
                  A motivated software engineer with 5 years of experience in web development, specializing in React and Node.js.
                </p>
                <h4>Experience</h4>
                <p>
                  <strong>Software Engineer at Tech Corp</strong> (2020 - Present)<br />
                  - Developed scalable web applications using React and Node.js.<br />
                  - Improved application performance by 20% through optimization techniques.
                </p>
                <h4>Education</h4>
                <p>
                  B.S. in Computer Science, University of Example (2016 - 2020)
                </p>
                <h4>Skills</h4>
                <p>React, Node.js, JavaScript, HTML, CSS, Git</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeReviewPage;