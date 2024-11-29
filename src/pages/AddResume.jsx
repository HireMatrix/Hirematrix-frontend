import { useState } from 'react';
import './AddResume.css';

const resumedashboard = () => {
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
    <>
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
                <label>Full Name: <input id='name'type='text' onChange={(e) => handleChange('personalInformation', 'fullName', e.target.value)} /></label>
                <div className='mobile'>
                <label className='email'>Email: <input id='email'type='text' onChange={(e) => handleChange('personalInformation', 'email', e.target.value)} /></label>
                <label className='number'>Mobile Number: <input id='number' type='text' onChange={(e) => handleChange('personalInformation', 'mobileNumber', e.target.value)} /></label>
                </div>
                <label>Current City: <input id='city' type='text' onChange={(e) => handleChange('personalInformation', 'currentCity', e.target.value)} /></label>
                <div className='radio-group'>
                  <label>Currently Working Here:</label>
                  <div className='radio-options'>
                    <label className='radio-option'>
                      <input type='radio' name='current' value='yes' onChange={(e) => handleChange('personalInformation', 'currentlyWorking', e.target.value)} /> Yes
                    </label>
                    <label className='radio-option'>
                      <input type='radio' name='current' value='no' onChange={(e) => handleChange('personalInformation', 'currentlyWorking', e.target.value)} /> No
                    </label>
                  </div>
                </div>
                <label>Preferred job title/role: <input id='role' type='text' onChange={(e) => handleChange('personalInformation', 'Preferred job title/role', e.target.value)} /></label>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('workExperience')}>
              <h1>Work Experience</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'workExperience' && (
              <div className='dropdown-content'>
                <label>Company Name: <input id='company' type='text' onChange={(e) => handleChange('workExperience', 'companyName', e.target.value)} /></label>
                <label>Job Title: <input id='job'type='text' onChange={(e) => handleChange('workExperience', 'jobTitle', e.target.value)} /></label>
                <div className='radio-group'>
                  <label>Currently Working Here:</label>
                  <div className='radio-options'>
                    <label className='radio-option'>
                      <input type='radio' name='current' value='yes' onChange={(e) => handleChange('workExperience', 'currentlyWorking', e.target.value)} /> Yes
                    </label>
                    <label className='radio-option'>
                      <input type='radio' name='current' value='no' onChange={(e) => handleChange('workExperience', 'currentlyWorking', e.target.value)} /> No
                    </label>
                  </div>
                </div>
                <div className='radio-group'>
                  <label>Employment Type:</label>
                  <div className='radio-options'>
                    <label className='radio-option'>
                      <input type='radio' name='employmentType' value='full-time' onChange={(e) => handleChange('workExperience', 'employmentType', e.target.value)} /> Full-time
                    </label>
                    <label className='radio-option'>
                      <input type='radio' name='employmentType' value='part-time' onChange={(e) => handleChange('workExperience', 'employmentType', e.target.value)} /> Part-time
                    </label>
                    <label className='radio-option'>
                      <input type='radio' name='employmentType' value='intern' onChange={(e) => handleChange('workExperience', 'employmentType', e.target.value)} /> Intern
                    </label>
                  </div>
                </div>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('education')}>
              <h1>Education</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'education' && (
              <div className='dropdown-content'>
                <div className='education'>
                <label>College Name: <input type='text' onChange={(e) => handleChange('education', 'collegeName', e.target.value)} /></label>
                <label>Degree: <input type='text' onChange={(e) => handleChange('education', 'degree', e.target.value)} /></label>
                <label>Marks: <input type='text' onChange={(e) => handleChange('education', 'marks', e.target.value)} /></label>
                <label>Percentage: <input type='text' onChange={(e) => handleChange('education', 'percentage', e.target.value)} /></label>
                <label>Specialization: <input type='text' onChange={(e) => handleChange('education', 'specialization', e.target.value)} /></label>
                <div className='radio-group'>
                  <label>Currently Studying:</label>
                  <div className='radio-options'>
                    <label className='radio-option'>
                      <input type='radio' name='studying' value='yes' onChange={(e) => handleChange('education', 'currentlyStudying', e.target.value)} /> Yes
                    </label>
                    <label className='radio-option'>
                      <input type='radio' name='studying' value='no' onChange={(e) => handleChange('education', 'currentlyStudying', e.target.value)} /> No
                    </label>
                  </div>
                </div>
                </div>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('skills')}>
              <h1>Skills</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'skills' && (
              <div className='dropdown-content'>
                <div className='skill'>
                <label className='skill'>enter skill: <input id='skill'type='text' onChange={(e) => handleChange('skills', 'skill1', e.target.value)} /></label>
                <label className='level'>level: <input id='level' type='text' onChange={(e) => handleChange('skills', 'skill2', e.target.value)} /></label>
               </div>
              </div>
            )}
            {sections.map((section, index) => (
              <div key={index}>
                <div className='row' onClick={() => toggleSection(section)}>
                  <h1>{section}</h1>
                  <i className="arrow"></i>
                </div>
                {activeSection === section && (
                  <div className='dropdown-content'>
                    <div >
                    <label>Year of Experience: <input type='text' onChange={(e) => handleChange(section, 'yearOfExperience', e.target.value)} /></label>
                    <label>Company Name: <input type='text' onChange={(e) => handleChange(section, 'companyName', e.target.value)} /></label>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className='add-section'>
              {!sections.includes('Internship') && <button id='b1' onClick={() => addSection('Internship')}>+ Add Internship</button>}
              {!sections.includes('Project') && <button id='b2' onClick={() => addSection('Project')}>+ Add Project</button>}
            </div>
          </div>
        </div>
        <div className='format'>
          <h2>Resume Preview</h2>
          <div className='preview-section'>
            <h3>Personal Information</h3>
            <p>Full Name: {resumeData.personalInformation.fullName}</p>
            <p>Mobile Number: {resumeData.personalInformation.mobileNumber}</p>
            <p>Email: {resumeData.personalInformation.email}</p>
            <p>Current City: {resumeData.personalInformation.currentCity}</p>
          </div>
          <div className='preview-section'>
            <h3>Skills</h3>
            <p>Skill 1: {resumeData.skills.skill1}</p>
            <p>Skill 2: {resumeData.skills.skill2}</p>
           
          </div>
          <div className='preview-section'>
            <h3>Work Experience</h3>
            <p>Company Name: {resumeData.workExperience.companyName}</p>
            <p>Job Title: {resumeData.workExperience.jobTitle}</p>
            <p>Currently Working: {resumeData.workExperience.currentlyWorking}</p>
            <p>Employment Type: {resumeData.workExperience.employmentType}</p>
          </div>
          
          {sections.includes('Internship') && (
            <div className='preview-section'>
              <h3>Internship</h3>
              <p>Year of Experience: {resumeData.Internship.yearOfExperience}</p>
              <p>Company Name: {resumeData.Internship.companyName}</p>
            </div>
          )}
          {sections.includes('Project') && (
            <div className='preview-section'>
              <h3>Project</h3>
              <p>Year of Experience: {resumeData.Project.yearOfExperience}</p>
              <p>Company Name: {resumeData.Project.companyName}</p>
            </div>
          )}
          <div className='preview-section'>
            <h3>Education</h3>
            <p>College Name: {resumeData.education.collegeName}</p>
            <p>Degree: {resumeData.education.degree}</p>
            <p>Marks: {resumeData.education.marks}</p>
            <p>Percentage: {resumeData.education.percentage}</p>
            <p>Specialization: {resumeData.education.specialization}</p>
            <p>Currently Studying: {resumeData.education.currentlyStudying}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default resumedashboard;

