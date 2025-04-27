import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import useResumeReview from '../hooks/useResumeReview';
import socket from '../socket/socket';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeReviewPage = () => {
  const location = useLocation();
  const { file } = location.state || {};
  const { status, sendResumeForAnalysis, resumeResult } = useResumeReview();

  console.log(resumeResult)

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  useEffect(() => {
    if (!file) return;
  
    const sendFile = async () => {
      if (!socket.connected) {
        await new Promise(resolve => socket.once('connect', resolve));
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result.split(',')[1];
        console.log('Sending file to backend...');
        sendResumeForAnalysis(fileData);
      };
      reader.readAsDataURL(file);
    };
  
    sendFile();
  
    return () => {
      socket.off('connect');
    };
  }, [file]);

  return (
    <div className="resume-review-page">
      {!resumeResult ? (
        <div className="loading-container">
          <div className="loading-step">
            <span>{status}</span>
          </div>
        </div>
      ) : (
        <div className="review-container">
          <div className="review-left">
            <div className="score-section">
              <div className="score-circle">
                <span>{resumeResult?.resume_score}</span>
                <span className="score-label">OVERALL</span>
              </div>
              <div className="score-details">
                <p>Resume review.</p>
                <h3>Your resume scored <span>{resumeResult?.resume_score}</span> out of 100.</h3>
                <p>
                  Our detailed review has pinpointed actionable opportunities to strengthen your technical narrative, better align your skills with industry expectations, and refine language for improved clarity and impact.
                </p>
                <p>Experience Level: {resumeResult?.experience_level}</p>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${resumeResult?.resume_score}%` }}></div>
                </div>
              </div>
            </div>
            {
              resumeResult?.grammar_issues.length > 0 && (
                <div className="issues-section">
                  <h3>Top Fixes</h3>
                  <ul>
                    {resumeResult?.grammar_issues.map((detail, index) => (
                      <li key={index}>
                        <p>Sentence: {detail?.sentence}</p>
                        <p>Issue: {detail?.issue}</p>
                        <p>Suggested Update: {detail?.updatedSentence}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              resumeResult?.suggestions.length > 0 && (
                <div className="improvement-section">
                  <h3>Steps to increase your score</h3>
                  <ul>
                    {resumeResult?.suggestions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              resumeResult?.strengths.length > 0 && (
                <div>
                  <h3>Strengths</h3>
                  <ul>
                    {resumeResult?.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              resumeResult?.weaknesses.length > 0 && (
                <div>
                  <h3>Weaknesses</h3>
                  <ul>
                    {resumeResult?.weaknesses.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              resumeResult?.skills_detected.length > 0 && (
                <div>
                  <h3>Detected Skills</h3>
                  <ul>
                    {resumeResult?.skills_detected.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              resumeResult?.job_titles_detected.length > 0 && (
                <div>
                  <h3>Detected Job Titles</h3>
                  <ul>
                    {resumeResult?.job_titles_detected.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )
            }
          </div>
          <div className="review-right">
            <div className="resume-preview">
              <h2>Your Resume</h2>
              {/* Dummy data for the resume preview */}
              <div className="dummy-resume">
                <Document
                  file={URL.createObjectURL(file)}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {
                    Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))
                  }
                </Document>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeReviewPage;

// const loadingSteps = [
  //   'Please wait...',
  //   'Loading your resume...',
  //   'Parsing your resume...',
  //   'Identifying core sections...',
  //   'Identifying your work experiences...',
  //   'Identifying other experiences...',
  //   'Evaluating resume length...',
  //   'Identifying bullet points...'
  // ];

  // useEffect(() => {
  //   if (file) {
  //     let score = 50; 
  //     const details = [];
  //     const improvements = [];

  //     if (file.size > 2 * 1024 * 1024) {
  //       details.push('File size: Your resume is too large. Keep it under 2MB.');
  //       improvements.push('Reduce the file size of your resume to under 2MB.');
  //       score -= 10;
  //     }

  //     if (file.type !== 'application/pdf') {
  //       details.push('File format: PDF is recommended for better ATS compatibility.');
  //       improvements.push('Convert your resume to PDF format.');
  //       score -= 5;
  //     }

  //     if (careerLevel === 'Entry-level' && score > 50) {
  //       score = Math.min(score, 50);
  //     } else if (careerLevel === 'Mid-level' && score > 75) {
  //       score = Math.min(score, 75);
  //     }

  //     setResumeScore(score);
  //     setScoreDetails(details);
  //     setStepsToImprove(improvements);

  //     // Placeholder for user name
  //     setUserName('User');
  //   }

  //   const interval = setInterval(() => {
  //     setCurrentLoadingStep(prev => {
  //       if (prev < loadingSteps.length - 1) {
  //         return prev + 1;
  //       } else {
  //         clearInterval(interval);
  //         setShowLoading(false);
  //         return prev;
  //       }
  //     });
  //   }, 800);

  //   return () => clearInterval(interval);
  // }, [file, careerLevel]);
  
  // ${index === currentLoadingStep ? 'active' : ''} ${
  //   index < currentLoadingStep ? 'completed' : ''
  // }

  // const [showLoading, setShowLoading] = useState(true);
  // const [currentLoadingStep, setCurrentLoadingStep] = useState(0);
  // const [resumeScore, setResumeScore] = useState(0);
  // const [scoreDetails, setScoreDetails] = useState([]);
  // const [stepsToImprove, setStepsToImprove] = useState([]);
  // const [userName, setUserName] = useState('User');