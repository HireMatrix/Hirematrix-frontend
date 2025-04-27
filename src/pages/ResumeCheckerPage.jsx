import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeCheckerIcon3 from '../assets/ResumeChecker/ResumeCheckerIcon-3.gif';
import ResumeCheckerIcon4 from '../assets/ResumeChecker/ResumeCheckerIcon-4.gif';
import '../styles/ResumePagesStyles/resumeChecker.scss';

/*
  TODO: 

  ** Improve the desing of the components here..
*/

const ResumeCheckerPage = () => {
  // const [showCareerLevel, setShowCareerLevel] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showUploadSection, setShowUploadSection] = useState(false);
  const navigate = useNavigate();

  // const handleLevelSelect = (level) => {
  //   setSelectedLevel(level);
  //   setShowCareerLevel(false); 
  //   setShowUploadSection(true);
  // };

  const handleFinalUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (uploadedFile.size <= 2 * 1024 * 1024) {
        console.log('File uploaded successfully:', uploadedFile)
        navigate("/ResumeReviewPage", { state: { file: uploadedFile } });
      } else {
        alert('File size exceeds 2MB limit.');
      }
    } else {
      alert('Please upload a PDF or DOCX file.');
    }
  };

  const handleCloseModal = () => {
    // setShowCareerLevel(false);
    setShowUploadSection(false);
    // setSelectedLevel('');
  };

  // const handleBackToLevelSelection = () => {
  //   setShowUploadSection(false);
  //   setShowCareerLevel(true);
  // };

  return (
    <div className="resume-checker-page">
      {/* Main Landing Page Content */}
      <div className={`landing-content ${showUploadSection ? 'blurred' : ''}`}>
        {/* Section 1: Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-left">
              <h1>
                Is your resume good enough? <span className="highlight">Check now!</span>
              </h1>
              <p>
                A free and fast AI resume checker doing crucial checks to ensure your resume is ready to perform and get you interview callbacks.
              </p>
              <div className="upload-box">
                <p>Drop your resume here or choose a file.<br />PDF & DOCX only. Max 2MB file size.</p>
                <button className="btn primary" onClick={() => setShowUploadSection(true)}>
                  Upload Your Resume
                </button>
              </div>
            </div>
            <div className="hero-right">
              <img
                className="motion-icon"
                src={ResumeCheckerIcon4}
                alt="Resume Checker Icon"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Sticky Section */}
        <section className="sticky-section">
          <div className="sticky-left">
            <img
              className="motion-icon"
              src={ResumeCheckerIcon3}
              alt="Resume Checker Icon"
              loading="lazy"
            />
          </div>
          <div className="sticky-right">
            <h2>Hirematrix Resume Checker forms its ATS score with a two-tier system</h2>
            <p>
              When you’re applying for a job, there’s a high chance your resume will be screened through an applicant tracking system way before it finds its way on a recruiter’s screen. ATS helps hiring managers find the right candidates by searching for keywords and adding the resume to a database.
            </p>
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <h3>The proportion of content we can interpret</h3>
                <p>
                  Similar to an ATS, we analyze and attempt to comprehend your resume. The greater our understanding of your resume, the more effectively it aligns with a company’s ATS.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div>
                <h3>What our checker identifies</h3>
                <p>
                  Although an ATS doesn’t look for spelling mistakes and poorly crafted content, recruitment managers certainly do. The second part of our score is based on the quantifiable achievements you have in your resume and the quality of the written content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Resume Check Categories */}
        <section className="categories-section">
          <h3 className="section-title">Wanna Check Your Resume Manually?</h3>
          <h4 className="section-subtitle">Follow Our Expert-Suggested Guidelines or Use Our AI Checker</h4>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Resume Optimization Checklist</h3>
              <ul>
                <li>Include essential sections: Contact Info, Summary, Work Experience, Education, and Skills.</li>
                <li>Use standard headings (e.g., "Work Experience" instead of "Career Journey") for ATS recognition.</li>
                <li>Incorporate 5-10 job-specific keywords from the job description throughout your resume.</li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Format</h3>
              <ul>
                <li>Save as PDF or DOCX, keeping file size under 2MB for ATS compatibility.</li>
                <li>Limit to 1-2 pages—ATS systems prefer concise resumes.</li>
                <li>Write short, impactful bullet points (1-2 lines) starting with action verbs (e.g., "Managed," "Developed").</li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Resume Sections</h3>
              <ul>
                <li><strong>Contact Info:</strong> Full name, professional email (e.g., firstname.lastname@gmail.com), phone number, and LinkedIn (optional).</li>
                <li><strong>Summary:</strong> 2-3 sentences with key skills and experience tailored to the job.</li>
                <li><strong>Experience:</strong> List jobs in reverse chronological order with quantifiable results (e.g., "Increased sales by 15%").</li>
                <li><strong>Education:</strong> Degree, institution, and graduation year (omit if over 10 years of experience).</li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Content</h3>
              <ul>
                <li>Use keywords from the job posting naturally in your experience and summary (e.g., "project management" for a PM role).</li>
                <li>Avoid repetition—vary action verbs (e.g., "Led," "Executed," "Improved") for each bullet.</li>
                <li>Eliminate spelling/grammar errors—ATS may flag poorly written resumes.</li>
                <li>Quantify achievements (e.g., "Trained 10 team members" instead of "Trained team").</li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Skills</h3>
              <ul>
                <li><strong>Hard Skills:</strong> Add technical skills from the job ad (e.g., "Python," "Excel," "SEO" for relevant roles).</li>
                <li><strong>Soft Skills:</strong> Include universal traits like "Communication," "Teamwork," or "Problem-Solving" if mentioned in the job.</li>
                <li>Match skills to company needs—e.g., "Salesforce" for a sales role or "Agile Methodology" for tech jobs.</li>
                <li>List 5-10 skills in a dedicated section for ATS to easily parse.</li>
              </ul>
            </div>
            <div className="category-card">
              <h3>Style</h3>
              <ul>
                <li>Use a simple, ATS-friendly font (e.g., Arial, Calibri, 11-12pt) and avoid graphics or tables.</li>
                <li>Ensure a professional email address—no nicknames or outdated domains (e.g., avoid @yahoo.com).</li>
                <li>Write in active voice (e.g., "Designed a website" vs. "Website was designed").</li>
                <li>Avoid overused buzzwords (e.g., "ninja," "rockstar")—focus on specific, measurable terms.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Final Call-to-Action */}
        <section className="cta-section">
          <h2>
            Get your resume score now with <span className="highlight">Hirematrix!</span>
          </h2>
          <p>Upload your resume and you’ll get a personalized email with an actionable tasklist.</p>
          <div className="upload-box">
            <p>Drop your resume here or choose a file.<br />PDF & DOCX only. Max 2MB file size.</p>
            <button className="btn primary" onClick={() => setShowUploadSection(true)}>
              Upload Your Resume
            </button>
          </div>
        </section>
      </div>

      {/* Career Level Selection Modal  */}
      {/* {showCareerLevel && (
        <div className="modal-overlay">
          <div className="modal-content career-level-section">
            <button className="close-btn" onClick={handleCloseModal}>✖</button>
            <h1>What best describes you?</h1>
            <p>Our AI will use this to personalize your resume review to you.</p>
            <div className="level-options">
              <div className="level-card">
                <div className="level-header">
                  <span className="icon">🎓</span>
                  <h3>Entry-level</h3>
                </div>
                <p>Students & recent graduates. Less than 2 years of work experience.</p>
                <button className="choose-btn" onClick={() => handleLevelSelect('Entry-level')}>
                  Choose
                </button>
              </div>
              <div className="level-card">
                <div className="level-header">
                  <span className="icon">👤</span>
                  <h3>Mid-level</h3>
                </div>
                <p>You have between 2 and 10 years of relevant work experience.</p>
                <button className="choose-btn" onClick={() => handleLevelSelect('Mid-level')}>
                  Choose
                </button>
              </div>
              <div className="level-card">
                <div className="level-header">
                  <span className="icon">👨‍💼</span>
                  <h3>Senior-level</h3>
                </div>
                <p>You have more than 10 years of relevant work experience.</p>
                <button className="choose-btn" onClick={() => handleLevelSelect('Senior-level')}>
                  Choose
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Resume Upload Modal */}
      {showUploadSection && (
        <div className="modal-overlay">
          <div className="modal-content resume-upload-section">
            <div className="modal-header">
              {/* <button className="back-btn" onClick={handleBackToLevelSelection}>←</button> */}
              <button className="close-btn" onClick={handleCloseModal}>✖</button>
            </div>
            {/* Upload Resume */}
            <div className="upload-section">
              <h1>Upload Your Resume</h1>
              {/* <p>Career Level: {selectedLevel}</p> */}
              <div className="upload-box">
                <div className="upload-area">
                  <span className="cloud-icon">☁️</span>
                  <p>Click the button above or drop your resume in here.</p>
                  <p className="file-requirements">English resumes in PDF (or DOCX) only. Max 2MB file size.</p>
                </div>
                <label htmlFor="file-upload-final" className="btn primary">
                  Upload Your Resume
                </label>
                <input
                  id="file-upload-final"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFinalUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Privacy Note */}
            <div className="privacy-section">
              <p>
                <span className="lock-icon">🔒</span> We’re committed to your privacy. Your resume is processed securely on our servers and is private to you.
              </p>
            </div>

            {/* Guidelines */}
            <div className="guidelines-section">
              <h2>Guidelines for uploading your resume</h2>
              <p>
                To make sure we analyze your resume correctly and generate the right recommendations, please ensure that the resume you upload meets the following guidelines:
              </p>
              <ul className="guidelines-list">
                <li>is in PDF or DOCX</li>
                <li>is in English</li>
                <li>contains readable text & is not an image</li>
                <li>is a maximum of 2 MB in filesize</li>
                <li>is a resume and not any other file</li>
                <li>is not password protected</li>
                <li>contains only your resume and no other additional documents</li>
              </ul>
              <p className="help-link">
                Need help? <a href="/help">See our help article.</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCheckerPage;