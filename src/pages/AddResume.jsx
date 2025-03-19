import { useRef, useState } from 'react';

const Resumedashboard = () => {

  const [activeSection, setActiveSection] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInformation: {},
    workExperience: {},
    skills: {},
    education: {},
    Internship: {},
    Project: {}
  });

  const uploadimgId=useRef(null)

  const[errors,setErrors] =useState({})

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (section, field, value) => {
    if (errors[section]?.[field]){
      setErrors({
        ...errors,
        [section]:{
          ...errors[section],
          [field]:'',
        },
      });
    }
    if (field === 'profileImg') {
      const file = value;
      const reader = new FileReader();

      reader.onload = (e) => {
        setResumeData({
          ...resumeData,
          [section]: {
              ...resumeData[section],
              [field]: e.target.result
          }
        });
      };

      if (file) {
          reader.readAsDataURL(file);
      }
    } else {
      setResumeData({
        ...resumeData,
        [section]: {
            ...resumeData[section],
            [field]: value
        }
      });
    }
  };

  const handleImgChange =(e) =>{
    handleChange('personalInformation', 'profileImg', e.target.files[0])
  }

  const imageUpload =()=>{
    if (uploadimgId.current){
      uploadimgId.current.value=""
      uploadimgId.current.click()
      uploadimgId.current.focus()
    }
  }

  const validateFields =(section, fields) =>{
    const newErrors = {};
    fields.forEach((field) => {
      if(!resumeData[section]?.[field]){
        if(!newErrors[section]) newErrors[section]={};
        newErrors[section][field]='*This field is required';
      }
    });
    setErrors((prevErrors) =>({...prevErrors, ...newErrors}));
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
                <label>Full Name:
                   <input value={resumeData.personalInformation.fullName}
                   type='text' 
                   onBlur={() => validateFields('personalInformation', ['fullName'])}
                   onChange={(e) => handleChange('personalInformation', 'fullName', e.target.value)} 
                   />
                   {errors.personalInformation?.fullName && <p className="error">{errors.personalInformation.fullName}</p>}
                </label>
                <div>
                  <label>
                   <input id="uploadimgId" ref={uploadimgId} style={{display:"none"}}
                   type='file'  accept='image/jpeg, image/png'
                   onBlur={() => validateFields('personalInformation', ['profileImg'])}
                   onChange={handleImgChange}
                   />
                   {errors.personalInformation?.profileImg && <p className="error">{errors.personalInformation.profileImg}</p>}
                  </label>
                </div>
                <div onClick={imageUpload}> 
                  <p>Upload Photo</p>
                </div>
                <div className='mobile'>
                  <label className='email'>Email: 
                    <input type='text' 
                    onBlur={() => validateFields('personalInformation',['email'])}
                    onChange={(e) => handleChange('personalInformation', 'email', e.target.value)}
                     />
                     {errors.personalInformation?.email && <p className="error" >{errors.personalInformation.email}</p>}
                  </label>
                  <label className='number'>Mobile Number: 
                    <input type='text'
                    onBlur={() => validateFields('personalInformation', ['mobileNumber'])}
                    onChange={(e) => handleChange('personalInformation', 'mobileNumber', e.target.value)}
                     />
                    {errors.personalInformation?.mobileNumber && <p className="error">{errors.personalInformation.mobileNumber}</p>} 
                  </label>
                </div>
                <label>Address<input type='text' onChange={(e) => handleChange('personalInformation', 'address', e.target.value)} /></label>
                <label>Professional Summary:
                  <br/> 
                  <textarea style={{height:"100px",width:"100%"}} onChange={(e) => handleChange('personalInformation', 'professionalSummary', e.target.value)}></textarea>
                </label>
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
                <label>Are you currently working in this company:
                  <br/>
                  <div className="currentWorking">
                    <spam className="option">yes</spam>
                    <spam className="option">No</spam>
                  </div>
                </label>
                <div className='mobile'>
                  <label className='email'>Start Date
                    <input type='date' 
                    onBlur={() => validateFields('workExperience',['workexpstDate'])}
                    onChange={(e) => handleChange('workExperience', 'workexpstDate', e.target.value)}
                     />
                     {errors.workExperience?.workexpstDate && <p className="error" >{errors.workExperience.workexpstDate}</p>}
                  </label>
                  <label className='number'>End Date
                    <input type='date'
                    onBlur={() => validateFields('workExperience', ['workexpendDate'])}
                    onChange={(e) => handleChange('workExperience', 'workexpendDate', e.target.value)}
                     />
                    {errors.workExperience?.workexpendDate && <p className="error">{errors.workExperience.workexpendDate}</p>} 
                  </label>
                </div>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('education')}>
              <h1>Education</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'education' && (
              <div className='dropdown-content'>
                <label>10th
                  <br/>
                  CollegeName
                  <input
                   type='text'
                   onBlur={() => validateFields('education', ['clgName10th'])}
                   onChange={(e) => handleChange('education', 'clgName10th', e.target.value)}
                    />
                     {errors.education?.clgName10th && <p className='error'>{errors.education.clgName10th}</p>}
                </label>
                   
                <label>GPA:
                    <input 
                    type='text'
                    onBlur={() => validateFields('education',['gpa10th'])}
                    onChange={(e) => handleChange('education', 'gpa10th', e.target.value)}
                    />
                    {errors.education?.gpa10th && <p className="error">{errors.education.gpa10th}</p>}
                </label>
                <label>12th
                  <br/>
                  CollegeName
                  <input
                   type='text'
                   onBlur={() => validateFields('education', ['clgName12th'])}
                   onChange={(e) => handleChange('education', 'clgName12th', e.target.value)}
                    />
                     {errors.education?.clgName12th && <p className='error'>{errors.education.clgName12th}</p>}
                </label>
                   
                <label>GPA:
                    <input 
                    type='text'
                    onBlur={() => validateFields('education',['gpa12th'])}
                    onChange={(e) => handleChange('education', 'gpa12th', e.target.value)}
                    />
                    {errors.education?.gpa12th && <p className="error">{errors.education.gpa12th}</p>}
                </label>
                <label>Graduate
                  <br/>
                  CollegeName
                  <input
                   type='text'
                   onBlur={() => validateFields('education', ['clgNameGraduate'])}
                   onChange={(e) => handleChange('education', 'clgNameGraduate', e.target.value)}
                    />
                    {errors.education?.clgNameGraduate && <p className='error'>{errors.education.clgNameGraduate}</p>}
                </label>
                    
                <label>GPA:
                    <input 
                    type='text'
                    onBlur={() => validateFields('education',['gpaGraduateh'])}
                    onChange={(e) => handleChange('education', 'gpaGraduate', e.target.value)}
                    />
                    {errors.education?.gpaGraduateh && <p className="error">{errors.education.gpaGraduateh}</p>}
                </label>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('skills')}>
              <h1>Skills</h1>
              <i className="arrow"></i>
            </div>
            {activeSection === 'skills' && (
              <div className='dropdown-content'>
                <div className='skill'>
                  <label className='skill'>
                    Enter Skill: 
                    <input 
                    type='text' 
                    onBlur={() => validateFields('skills',['skills1'])}
                    onChange={(e) => handleChange('skills', 'skill1', e.target.value)} 
                    />
                    {errors.skills?.skills1 && <p className='error'>{errors.skills.skills1}</p>}
                    </label>
                  <label className='level'>
                    Level:
                    <input 
                    type='text' 
                    onBlur={() => validateFields('skills',['skill2'])}
                    onChange={(e) => handleChange('skills', 'skill2', e.target.value)} 
                    />
                    {errors.skills?.skill2 && <p className='error'>{errors.skills.skill2}</p>}
                  </label>
                </div>
              </div>
            )}

            <div className='row' onClick={() => toggleSection('Internship')}>
                        <h1>Internship</h1>
                        <i className="arrow"></i>
            </div>
            {activeSection === 'Internship' && (
              <div className='dropdown-content'>
                <label>Company Name
                   <input
                   type='text' 
                   onBlur={() => validateFields('Internship', ['internCompanyname'])}
                   onChange={(e) => handleChange('Internship', 'internCompanyname', e.target.value)} 
                   />
                   {errors.Internship?.internCompanyname && <p className="error">{errors.Internship.internCompanyname}</p>}
                </label>
                <label>Job Title:
                  <input
                  type='text'
                  onBlur={() => validateFields('Internship', ['internJobtitle'])}
                  onChange={(e) => handleChange('Internship','internJobtitle',e.target.value)}
                  />
                  {errors.Internship?.internJobtitle && <p className="error">{errors.Internship.internJobtitle}</p>}
                </label>
                <label>Employement Type :
                  <input
                  type='text'
                  onBlur={() => validateFields('Internship', ['internEmployementtype'])}
                  onChange={(e) => handleChange('Internship','internEmployementtype',e.target.value)}
                  />
                  {errors.Internship?.internEmployementtype && <p className="error">{errors.Internship.internEmployementtype}</p>}
                </label>


                <div className='mobile'>
                  <label className='email'>Start Date 
                    <input type='date' 
                    onBlur={() => validateFields('Internship',['internStartdate'])}
                    onChange={(e) => handleChange('Internship', 'internStartdate', e.target.value)}
                     />
                     {errors.Internship?.internStartdate && <p className="error" >{errors.Internship.internStartdate}</p>}
                  </label>
                  <label className='number'>End Date 
                    <input type='date'
                    onBlur={() => validateFields('Internship', ['internEnddate'])}
                    onChange={(e) => handleChange('Internship', 'internEnddate', e.target.value)}
                     />
                    {errors.Internship?.internEnddate && <p className="error">{errors.Internship.internEnddate}</p>} 
                  </label>
                </div>
              </div>
            )}     
          </div>
        </div>
        <div className='format'>
          <div className="top-column">
            {resumeData.personalInformation.profileImg && (
              <img 
                src={resumeData.personalInformation.profileImg} 
                alt="Profile" 
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
            )}
            <p>Full Name: {resumeData.personalInformation.fullName}</p>
          </div>
          <div className='preview-section'>
            <div>
              <div>
                <h2>Contact</h2>
                <p>Address: {resumeData.personalInformation.address}</p>
                <p>Mobile: {resumeData.personalInformation.mobileNumber}</p>
                <p>Email: {resumeData.personalInformation.email}</p>
              </div>
              <div>
                <h2>Education</h2>
                <p>10th College Name: {resumeData.education.clgName10th}</p>
                <p>GPA: {resumeData.education.gpa10th}</p>
                <p>12th College Name: {resumeData.education.clgName12th}</p>
                <p>GPA: {resumeData.education.gpa12th}</p>
                <p>Grauate College Name: {resumeData.education.clgNameGraduate}</p>
                <p>GPA: {resumeData.education.gpaGraduate}</p>
              </div>
              <div>
                <h2>CERTIFICATIONS</h2>
                <p>Certification Name: </p>
                <p>discription:</p>                
              </div>
            </div>
            <div>
              <div>
                <h2>PROFESSIONAL SUMMARY</h2>
                <p> Summary: {resumeData.personalInformation.professionalSummary} </p>
              </div>
              <div>
                <h2>SKILLS</h2>
                <p>Skill 1: {resumeData.skills.skill1}</p>
                <p>Skill 2: {resumeData.skills.skill2}</p>
              </div>
              <div>
                <h2>WORK HISTORY</h2>
                <p>Company Name: {resumeData.workExperience.companyName}</p>
                <p>Job Title: {resumeData.workExperience.jobTitle}</p>
              </div>
              <div>
                <h2>INTERNSHIP</h2>
                <p>CompanyName:{resumeData.Internship.internCompanyname}</p>
                <p>jobTitle: {resumeData.Internship.internJobtitle} </p>
                <p>Duration: {resumeData.Internship.internStartdate} to {resumeData.Internship.internEnddate}</p>
              </div>
              <div>
                <h2>PROJECTS</h2>
              </div>
              <div>
                <h2>REFERENCES</h2>
                <p>Role: {resumeData.personalInformation.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resumedashboard;
