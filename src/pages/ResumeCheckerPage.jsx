// src/components/ResumeCheckerPage.js
import React, { useState } from 'react';


// Import the image file with transparent background
// import ResumeCheckerIcon from '../assets/ResumeChecker/ResumeCheckerIcon-1.gif';
// import ResumeCheckerIcon2 from '../assets/ResumeChecker/ResumeCheckerIcon-2.gif';
// import ResumeCheckerIcon3 from '../assets/ResumeChecker/ResumeCheckerIcon-3.gif'; // Adjust the extension if needed (e.g., .webp)

const ResumeCheckerPage = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (uploadedFile.size <= 2 * 1024 * 1024) { // Max 2MB
        setFile(uploadedFile);
        alert('File uploaded successfully!');
      } else {
        alert('File size exceeds 2MB limit.');
      }
    } else {
      alert('Please upload a PDF or DOCX file.');
    }
  };

  return (
    <div className="resume-checker-page">
      {/* Section 1: Hero Section (Image 1) */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              Is your resume good enough? <span className="highlight">Check now!</span>
            </h1>
            <p>
              A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
            </p>
            <div className="upload-box">
              <p>Drop your resume here or choose a file.<br />PDF & DOCX only. Max 2MB file size.</p>
              <label htmlFor="file-upload-hero" className="btn primary">
                Upload Your Resume
              </label>
              <input
                id="file-upload-hero"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div className="privacy-note">🔒 Privacy guaranteed</div>
            </div>
          </div>
          <div className="hero-right">
            <img
              className="motion-icon"
              // src={}
              alt="Resume Checker Icon"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Sticky Image + Content (Image 2) */}
      <section className="sticky-section">
        <div className="sticky-left">
        <img
              className="motion-icon"
              // src={}
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

      {/* Section 3: Resume Check Categories (Image 3) */}
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

      {/* Section 4: Final Call-to-Action (Image 4) */}
      <section className="cta-section">
        <h2>
          Get your resume score now with <span className="highlight">Hirematrix!</span>
        </h2>
        <p>Upload your resume and you’ll get a personalized email with an actionable tasklist.</p>
        <div className="upload-box">
          <p>Drop your resume here or choose a file.<br />PDF & DOCX only. Max 2MB file size.</p>
          <label htmlFor="file-upload-cta" className="btn primary">
            Upload Your Resume
          </label>
          <input
            id="file-upload-cta"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <div className="privacy-note">🔒 Privacy guaranteed</div>
        </div>
      </section>
    </div>
  );
};

export default ResumeCheckerPage;