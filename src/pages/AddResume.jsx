import { useState } from 'react';

const Resumedashboard = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [sections, setSections] = useState([]);
  const [resumeData, setResumeData] = useState({
    personalInformation: {},
    workExperience: {},
    skills: {},
    education: {},
    Internship: {},
    Project: {}
  });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const addSection = (type) => {
    if (!sections.includes(type)) {
      setSections([...sections, type]);
    }
  };

  const handleChange = (section, field, value) => {
    setResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value
      }
    });
  };

  return (
    <div className="resume-dashboard">
      <div className='header'>
        <div className='container'>
          <h1 id='resume' className='h1'>Resume Analysis</h1>
          <h1 id='template' className='h1'>Templates</h1>
          <h1 id='download' className='h1'>Download</h1>
        </div>
      </div>
      <section className='section'>
        <div className='information'>
          <div className='col-1-information'>
            <div className='row' onClick={() => toggleSection('personalInformation')}>
              <h1>Personal Information</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'personalInformation' && (
              <div className='dropdown-content'>
                <label>Full Name: <input type='text' onChange={(e) => handleChange('personalInformation', 'fullName', e.target.value)} /></label>
                <div className='mobile'>
                  <label className='email'>Email: <input type='text' onChange={(e) => handleChange('personalInformation', 'email', e.target.value)} /></label>
                  <label className='number'>Mobile Number: <input type='text' onChange={(e) => handleChange('personalInformation', 'mobileNumber', e.target.value)} /></label>
                </div>
                <label>Current City: <input type='text' onChange={(e) => handleChange('personalInformation', 'currentCity', e.target.value)} /></label>
                <label>Preferred job title/role: <input type='text' onChange={(e) => handleChange('personalInformation', 'role', e.target.value)} /></label>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('workExperience')}>
              <h1>Work Experience</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'workExperience' && (
              <div className='dropdown-content'>
                <label>Company Name: <input type='text' onChange={(e) => handleChange('workExperience', 'companyName', e.target.value)} /></label>
                <label>Job Title: <input type='text' onChange={(e) => handleChange('workExperience', 'jobTitle', e.target.value)} /></label>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('education')}>
              <h1>Education</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'education' && (
              <div className='dropdown-content'>
                <label>College Name: <input type='text' onChange={(e) => handleChange('education', 'collegeName', e.target.value)} /></label>
                <label>Degree: <input type='text' onChange={(e) => handleChange('education', 'degree', e.target.value)} /></label>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('skills')}>
              <h1>Skills</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'skills' && (
              <div className='dropdown-content'>
                <div className='skill'>
                  <label className='skill'>Enter Skill: <input type='text' onChange={(e) => handleChange('skills', 'skill1', e.target.value)} /></label>
                  <label className='level'>Level: <input type='text' onChange={(e) => handleChange('skills', 'skill2', e.target.value)} /></label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='format'>
          <h2>Resume Preview</h2>
          <div className='preview-section'>
            <h3>Personal Information</h3>
            <p>Full Name: {resumeData.personalInformation.fullName}</p>
            <p>Email: {resumeData.personalInformation.email}</p>
            <p>Mobile Number: {resumeData.personalInformation.mobileNumber}</p>
            <p>Current City: {resumeData.personalInformation.currentCity}</p>
            <p>Role: {resumeData.personalInformation.role}</p>
          </div>
          <div className='preview-section'>
            <h3>Work Experience</h3>
            <p>Company Name: {resumeData.workExperience.companyName}</p>
            <p>Job Title: {resumeData.workExperience.jobTitle}</p>
          </div>
          <div className='preview-section'>
            <h3>Education</h3>
            <p>College Name: {resumeData.education.collegeName}</p>
            <p>Degree: {resumeData.education.degree}</p>
          </div>
          <div className='preview-section'>
            <h3>Skills</h3>
            <p>Skill 1: {resumeData.skills.skill1}</p>
            <p>Skill 2: {resumeData.skills.skill2}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resumedashboard;
