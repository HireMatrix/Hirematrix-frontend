import React, { useEffect, useRef, useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resumedashboard = () => {

  const [activeSection, setActiveSection] = useState(null);
  const [skills, setSkills] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [arraySkills, setArraySkills] = useState([]); 
  const [pj_title,setProjectTitle]=useState('');
  const [pj_description,setProjectDescription]=useState('');
  const [arrayProjects,setArrayProjects]=useState([]);
  const [cer_title,setCertificationTitle]=useState('');
  const [cer_description,setCertificationDescription]=useState('');
  const [arrayCertifications,setArrayCertifications]=useState([]);
  const [resumeData, setResumeData] = useState({
    personalInformation: {},
    workExperience: {},
    skills: {},
    education: {},
    Certifications:{},
    Internship: {},
    Project: {},
   
  });
 

  const uploadimgId=useRef(null)
  const[errors,setErrors] =useState({})
  const printRef=React.useRef(null);

  
  const handleDownloadPdf = () => {
    const element = printRef.current;
  
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("resume.pdf");
    });
  };
  
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

  const handleSkillsChange = (e) => {
    
    if(errors.skills?.skill_x){
      setErrors((prev) => ({...prev, skills: { skill_x: '' }}))
    }
    setSkills(e.target.value)
  }

  const handleSkillLevelChange = (e) => {
    if(skills == '') {
      setErrors((prev) => ({...prev, skills: { skill_x: "*This field is required" }}))
      setSkillLevel('');
      return;
    };

    console.log(e.target.value);
    setSkillLevel(e.target.value);

    const level = e.target.value;
    setArraySkills((prev) => ([...prev, {skill: skills, level: level}]));
    setSkills('');
    setSkillLevel('');
  }

  const handleDeleteSkill = (index) => {
    setArraySkills((prev) => prev.filter((_, i) => i != index))
  }
  const handleDeleteProject = (index) =>{
    setArrayProjects((prev) => prev.filter((_, i) => i != index))
     
  }

  const handleDeleteCertificate = (index) => {
    setArrayCertifications((prev) => prev.filter((_, i) => i != index))
  }

  const handleProjectTitle =(e) => {
    if(errors.projects?.projectTitle) {
      setErrors((prev) => ({...prev, projects: { projectTitle: '' }}))
    }
    setProjectTitle(e.target.value)
  }
  const handleProjectDescription= (e) =>{
    if(errors.projects?.projectDescription) {
      setErrors((prev) => ({...prev, projects: { projectDescription: '' }}))
    }
    setProjectDescription(e.target.value)
  }
  
  const handleProjectArray = () => {

    if(pj_title==""){
      setErrors((prev) => ({...prev, projects: {...prev.projects, projectTitle: "*This field is required" }}))
      if(pj_description==""){
        setErrors((prev) => ({...prev, projects: {...prev.projects, projectDescription: "*This field is required"}}))       
      }
    }
    else if(pj_description == "") {
        setErrors((prev) => ({...prev, projects: {...prev.projects, projectDescription: "*This field is required"}}))
    }
    else{
      setArrayProjects((prev) => ([...prev, { projectTitle: pj_title, projectDescription: pj_description}])) 
    }

  }

const handleCertificationTitle =(e) => {
  if(errors.Certifications?.certificationTitle) {
    setErrors((prev) => ({...prev, Certifications: { certificationTitle: '' }}))
  }
  setCertificationTitle(e.target.value)
  }

const handleCertificationDescription= (e) =>{
  if(errors.Certifications?.certificationDescription) {
    setErrors((prev) => ({...prev, Certifications: { certificationDescription: '' }}))
  }
  setCertificationDescription(e.target.value)
  }

const handleCertificationArray = () => {

  if(cer_title==""){
    setErrors((prev) => ({...prev, Certifications: {...prev.Certifications, certificationTitle: "*This field is required" }}))
    if(cer_description==""){
      setErrors((prev) => ({...prev, Certifications: {...prev.Certifications, certificationDescription: "*This field is required"}}))       
    }
  }
  else if(cer_description == "") {
      setErrors((prev) => ({...prev, Certifications: {...prev.Certifications, certificationDescription: "*This field is required"}}))
  }
  else{
    setArrayCertifications((prev) => ([...prev, { certificationTitle: cer_title, certificationDescription: cer_description}]))
  }

  }

  const handleImgChange = (e) =>{
    handleChange('personalInformation', 'profileImg', e.target.files[0])
  }
  
  const imageUpload = ()=>{
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
          <h1 id='resume'  className='h1'>Resume Analysis</h1>
          <h1 id='template' className='h1'>Templates</h1>
          <h1 id='download' onClick={handleDownloadPdf} className='h1'>Download</h1>
        </div>
      </div>
      <section className='section'>
        <div className='information'>
          <div className='col-1-information'>
            <div className='row' onClick={() => toggleSection('personalInformation')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/pi-icon.png'/>
                <h1>Personal Information</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'personalInformation' && (
              <div className='dropdown-content'>
                <label>Full Name:
                   <input 
                    value={resumeData.personalInformation.fullName}
                    type='text' 
                    onBlur={() => validateFields('personalInformation', ['fullName'])}
                    onChange={(e) => handleChange('personalInformation', 'fullName', e.target.value)} 
                  />
                  {errors.personalInformation?.fullName && <p className="error">{errors.personalInformation.fullName}</p>}
                </label>
                
                <div className='input-subrows'>
                  <label className='email'>Email: 
                    <input 
                    value={resumeData.personalInformation.email}
                      type='text' 
                      onBlur={() => validateFields('personalInformation',['email'])}
                      onChange={(e) => handleChange('personalInformation', 'email', e.target.value)}
                    />
                    {errors.personalInformation?.email && <p className="error" >{errors.personalInformation.email}</p>}
                  </label>
                  <label className='number'>Mobile Number: 
                    <input 
                     value={resumeData.personalInformation.mobileNumber}
                      type='text'
                      onBlur={() => validateFields('personalInformation', ['mobileNumber'])}
                      onChange={(e) => handleChange('personalInformation', 'mobileNumber', e.target.value)}
                    />
                    {errors.personalInformation?.mobileNumber && <p className="error">{errors.personalInformation.mobileNumber}</p>} 
                  </label>
                  <div>
                  <label>
                   <input 
                    id="uploadimgId" 
                    ref={uploadimgId} 
                    style={{display:"none"}}
                    type='file'  accept='image/jpeg, image/png'
                    onBlur={() => validateFields('personalInformation', ['profileImg'])}
                    onChange={handleImgChange}
                  />
                  {errors.personalInformation?.profileImg && <p className="error">{errors.personalInformation.profileImg}</p>}
                  </label>
                </div>
                <div onClick={imageUpload} className='upload-profile-pic'> 
                  <div>
                    <img src='src\assets\addResumePage\upload-profilepic.png'/>
                  </div>
                  <div>
                    <p>Upload Photo</p>
                    <p>Allowed jpeg/png</p>
                  </div>
                </div>
                </div>
                <label>Address
                  <input
                    value={resumeData.personalInformation.address}  
                    type='text' onChange={(e) => handleChange('personalInformation', 'address', e.target.value)}
                     />
                </label>
                <label>Professional Summary:        
                  <br/> 
                  <textarea 
                     value={resumeData.personalInformation.professionalSummary}
                    
                    onChange={(e) => handleChange('personalInformation', 'professionalSummary', e.target.value)}
                  ></textarea>
                </label>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('workExperience')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/work-experience-icon.png'/>
                <h1>Work Experience</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'workExperience' && (
              <div className='dropdown-content'>
                <label>Company Name: 
                  <input 
                    value={resumeData.workExperience.companyName}
                    type='text' 
                    onChange={(e) => handleChange('workExperience', 'companyName', e.target.value)} 
                  />
                </label>
                <label>Job Title: 
                  <input 
                    value={resumeData.workExperience.jobTitle}
                    type='text'
                    onChange={(e) => handleChange('workExperience', 'jobTitle', e.target.value)} 
                  />
                </label>
                <label>Location:
                  <input 
                    value={resumeData.workExperience.workLocation}
                    type='text' 
                    onChange={(e) => handleChange('workExperience', 'workLocation', e.target.value)} 
                  />
                </label>
               
                <div className='input-subrows'>
                  <label >Start Date
                    <input 
                      value={resumeData.workExperience.workexpstDate}
                      type='date'  
                      onBlur={() => validateFields('workExperience',['workexpstDate'])}
                      onChange={(e) => handleChange('workExperience', 'workexpstDate', e.target.value)}
                    />
                    {errors.workExperience?.workexpstDate && <p className="error" >{errors.workExperience.workexpstDate}</p>}
                  </label>
                  <label>End Date
                    <input 
                      value={resumeData.workExperience.workexpendDate}
                      type='date'
                      onBlur={() => validateFields('workExperience', ['workexpendDate'])}
                      onChange={(e) => handleChange('workExperience', 'workexpendDate', e.target.value)}
                    />
                    {errors.workExperience?.workexpendDate && <p className="error">{errors.workExperience.workexpendDate}</p>} 
                  </label>
                </div>
                <label>Work Description
                  <br/>
                  <textarea 
                    value={resumeData.workExperience.WorkDescription}
                    onBlur={() => validateFields('workExperience', ['WorkDescription'])}
                    onChange={(e) => handleChange('workExperience', 'WorkDescription', e.target.value)}
                  ></textarea>
                  {errors.workExperience?.WorkDescription && <p className="error">{errors.workExperience.WorkDescription}</p>}
                </label>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('education')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/education-icon.png'/>
                <h1>Education</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'education' && (
              <div className='dropdown-content'>
                <div className='input-subrows'>
                  <label>10th CollegeName
                      <input
                      value={resumeData.education.clgName10th}
                    type='text'
                    onBlur={() => validateFields('education', ['clgName10th'])}
                    onChange={(e) => handleChange('education', 'clgName10th', e.target.value)}
                    />
                    {errors.education?.clgName10th && <p className='error'>{errors.education.clgName10th}</p>}
                  </label>
                    
                  <label>GPA:
                      <input 
                        value={resumeData.education.gpa10th}
                        type='text'
                        onBlur={() => validateFields('education',['gpa10th'])}
                        onChange={(e) => handleChange('education', 'gpa10th', e.target.value)}
                      />
                      {errors.education?.gpa10th && <p className="error">{errors.education.gpa10th}</p>}
                  </label>
                  <label >Start Date
                    <input 
                      value={resumeData.education.stDate10th}
                      type='date' 
                      onBlur={() => validateFields('education',['stDate10th'])}
                      onChange={(e) => handleChange('education', 'stDate10th', e.target.value)}
                    />
                    {errors.education?.stDate10th && <p className="error" >{errors.education.stDate10th}</p>}
                  </label>
                  <label>End Date
                    <input 
                      value={resumeData.education.endDate10th}
                      type='date'
                      onBlur={() => validateFields('education', ['endDate10th'])}
                      onChange={(e) => handleChange('education', 'endDate10th', e.target.value)}
                    />
                    {errors.education?.endDate10th && <p className="error">{errors.education.endDate10th}</p>} 
                  </label>
                </div> 
                <div className='input-subrows'>
                  <label>12th CollegeName
                    <input
                      value={resumeData.education.clgName12th}
                      type='text'
                      onBlur={() => validateFields('education', ['clgName12th'])}
                      onChange={(e) => handleChange('education', 'clgName12th', e.target.value)}
                    />
                    {errors.education?.clgName12th && <p className='error'>{errors.education.clgName12th}</p>}
                  </label>
                  <label>GPA:
                    <input 
                       value={resumeData.education.gpa12th}
                      type='text'
                      onBlur={() => validateFields('education',['gpa12th'])}
                      onChange={(e) => handleChange('education', 'gpa12th', e.target.value)}
                    />
                    {errors.education?.gpa12th && <p className="error">{errors.education.gpa12th}</p>}
                  </label>
                  <label >Start Date
                    <input 
                       value={resumeData.education.stDate12th}
                      type='date' 
                      onBlur={() => validateFields('education',['stDate12th'])}
                      onChange={(e) => handleChange('education', 'stDate12th', e.target.value)}
                    />
                    {errors.education?.stDate10th && <p className="error" >{errors.education.stDate12th}</p>}
                  </label>
                  <label>End Date
                    <input 
                       value={resumeData.education.endDate12th}
                      type='date'
                      onBlur={() => validateFields('education', ['endDate12th'])}
                      onChange={(e) => handleChange('education', 'endDate12th', e.target.value)}
                    />
                    {errors.education?.endDate10th && <p className="error">{errors.education.endDate12th}</p>} 
                  </label>
                </div>
                <div className='input-subrows'>
                  <label>Graduate CollegeName
                    <input
                     value={resumeData.education.clgNameGraduate}
                    type='text'
                    onBlur={() => validateFields('education', ['clgNameGraduate'])}
                    onChange={(e) => handleChange('education', 'clgNameGraduate', e.target.value)}
                    />
                    {errors.education?.clgNameGraduate && <p className='error'>{errors.education.clgNameGraduate}</p>}
                  </label>
                      
                  <label>GPA:
                    <input 
                       value={resumeData.education.gpaGraduate}
                      type='text'
                      onBlur={() => validateFields('education',['gpaGraduate'])}
                      onChange={(e) => handleChange('education', 'gpaGraduate', e.target.value)}
                    />
                    {errors.education?.gpaGraduateh && <p className="error">{errors.education.gpaGraduateh}</p>}
                  </label>
                  <label >Start Date
                    <input 
                       value={resumeData.education.stDateGraduate}
                      type='date' 
                      onBlur={() => validateFields('education',['stDateGraduate'])}
                      onChange={(e) => handleChange('education', 'stDateGraduate', e.target.value)}
                    />
                    {errors.education?.stDate10th && <p className="error" >{errors.education.stDateGraduate}</p>}
                  </label>
                  <label>End Date
                    <input 
                       value={resumeData.education.endDateGraduate}
                      type='date'
                      onBlur={() => validateFields('education', ['endDateGraduate'])}
                      onChange={(e) => handleChange('education', 'endDateGraduate', e.target.value)}
                    />
                    {errors.education?.endDate10th && <p className="error">{errors.education.endDateGraduate}</p>} 
                  </label>
                 </div> 
              </div>
            )}
            <div className='row' onClick={() => toggleSection('skills')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/skills-icon.png'/>
                <h1>Skills</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'skills' && (
              <div className='dropdown-content'>
                <div className='skill'>
                  <label >
                    Enter Skill: 
                    <input 
                      value={skills}
                      type='text' 
                      // onBlur={() => validateFields('skills', ['skill1'])}
                      onChange={handleSkillsChange} 
                    />
                    {/* handleChange('skills', 'skill1', e.target.value) */}
                    {errors?.skills?.skill_x && <p className='error'>{errors?.skills?.skill_x}</p>}
                  </label>
                  <label className='level'>
                    Level:
                    <select
                      onChange={handleSkillLevelChange}
                      value={skillLevel}
                    >
                      <option value="">Select an option</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </label>
                </div>
                <div className='skills_edit_container' >{
                  arraySkills.map((item, index)=> (
                    <div className='Skills' key={index}>
                      <div className='skillpart'>
                        <p>{item.skill} </p>
                        <span className='skill_level' >{item.level}</span>
                      </div>
                      <img className='remove_itemicon' onClick={() => handleDeleteSkill(index)} src='src\assets\addResumePage\remove-skill.png' />
                    </div>
                  ))
                }</div>
              </div>
            )}
            <div className='row' onClick={() => toggleSection('Certifications')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/certification-icon.png'/>
                <h1>Certifications</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'Certifications' && (
              <div className='dropdown-content'>
                <label>Certification Name
                  <input
                    type='text' 
                    
                   onChange={handleCertificationTitle} 
                  />
                  {errors.Certifications?.certificationTitle && <p className="error">{errors.Certifications.certificationTitle}</p>}
                </label>
                
                <label>CertificationDescription
                  <br/>
                  <textarea
                    onChange={handleCertificationDescription}
                  ></textarea>
                  {errors.Certifications?.certificationDescription && <p className="error">{errors.Certifications.certificationDescription}</p>}
                </label>
                <button 
                  onClick={handleCertificationArray}
                  >Add
                </button>
                <div className='CandP-container' >
                  {
                    arrayCertifications.map((item, index) => (
                      <div className='CandD-subcontainer'  key={index} >
                        <p>{item.certificationTitle}</p>
                        <img className='remove_itemicon' onClick={() => handleDeleteCertificate(index)} src='src\assets\addResumePage\remove-skill.png' />
                        </div>))
                    }
                </div>
              </div>
            )} 
            <div className='row' onClick={() => toggleSection('Internship')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/internship-icon.png'/>
                <h1>Internship Experience</h1>
              </div>
              <i className="arrow"></i>
            </div>
            {activeSection === 'Internship' && (
              <div className='dropdown-content'>
                <label>Company Name
                  <input
                    value={resumeData.Internship.internCompanyname}
                    type='text' 
                    onBlur={() => validateFields('Internship', ['internCompanyname'])}
                    onChange={(e) => handleChange('Internship', 'internCompanyname', e.target.value)} 
                  />
                  {errors.Internship?.internCompanyname && <p className="error">{errors.Internship.internCompanyname}</p>}
                </label>
                <label>Job Title:
                  <input
                    value={resumeData.Internship.internJobtitle}
                    type='text'
                    onBlur={() => validateFields('Internship', ['internJobtitle'])}
                    onChange={(e) => handleChange('Internship','internJobtitle',e.target.value)}
                  />
                  {errors.Internship?.internJobtitle && <p className="error">{errors.Internship.internJobtitle}</p>}
                </label>
                <label>Location:
                  <input 
                    value={resumeData.Internship.internLocation}
                    type='text' 
                    onChange={(e) => handleChange('Internship', 'internLocation', e.target.value)} 
                  />
                </label>
                
                <div className='input-subrows'>
                  <label className='email'>Start Date 
                    <input 
                      value={resumeData.Internship.internStartdate}
                      type='date' 
                      onBlur={() => validateFields('Internship',['internStartdate'])}
                      onChange={(e) => handleChange('Internship', 'internStartdate', e.target.value)}
                    />
                    {errors.Internship?.internStartdate && <p className="error" >{errors.Internship.internStartdate}</p>}
                  </label>
                  <label className='number'>End Date 
                    <input 
                      value={resumeData.Internship.internEnddate}
                      type='date'
                      onBlur={() => validateFields('Internship', ['internEnddate'])}
                      onChange={(e) => handleChange('Internship', 'internEnddate', e.target.value)}
                    />
                    {errors.Internship?.internEnddate && <p className="error">{errors.Internship.internEnddate}</p>} 
                  </label>
                </div>
                <label>intern Description
                  <br/>
                  <textarea 
                    value={resumeData.Internship.internDescription}
                    onBlur={() => validateFields('Internship', ['internDescription'])}
                    onChange={(e) => handleChange('Internship', 'internDescription', e.target.value)}
                  ></textarea>
                  {errors.Internship?.internDescription && <p className="error">{errors.Internship.internDescription}</p>}
                </label>
              </div>
            )}     
            <div className='row' onClick={() => toggleSection('Projects')}>
              <div className='row-info'>
                <img src='src/assets/addResumePage/projects-icon.png'/>
                <h1>Projects</h1>
                </div>
              <i className="arrow"></i>
              
            </div>
            {activeSection === 'Projects' && (
              <div className='dropdown-content'>
                <label>Project Title
                  <input
                    type='text' 
                    // onBlur={() => validateFields('Projects', ['projectTitle'])}
                    // onChange={(e) => handleChange('Projects', 'projectTitle', e.target.value)}
                    onChange={handleProjectTitle}  
                  />
                  {errors?.projects?.projectTitle && <p className="error">{errors.projects.projectTitle}</p>}
                </label>
                <label>Project Description
                  <br/>
                  <textarea
                  // onBlur={() => validateFields('Projects', ['projectDescription'])}
                    // onChange={(e) => handleChange('Projects','projectDescription',e.target.value)}
                    onChange={handleProjectDescription}>
                  </textarea>
                  {errors.projects?.projectDescription && <p className="error">{errors.projects.projectDescription}</p>}
                </label>
                
                <button 
                  onClick={handleProjectArray}
                  >Add
                </button>
                <div className='CandP-container'  >
                {
                    arrayProjects.map((item, index) => (
                      <div  className='CandD-subcontainer'  key={index}>
                        <p className='pr-project-name' >{item.projectTitle}</p>
                        <img className='remove_itemicon' onClick={() => handleDeleteProject(index)} src='src\assets\addResumePage\remove-skill.png' />
                      </div>))
                   }
              </div>
              </div>
            )}     
          </div>
        </div>
        
        <div className='format'>
          <div  ref={printRef}  className='preview-section'>
            <div className='sub-preview-section1'>
              {
                resumeData.personalInformation.profileImg && (
                  <img 
                    src={resumeData.personalInformation.profileImg} 
                    alt="Profile"
                  />
                )
              }
              <p>Dandamudi Satya Nikith{resumeData.personalInformation.fullName}</p>
            </div>
            <div className='sub-preview-section2'>
                <div className="sub2-sec1">
                  <div className="pr-contact-sec">
                    <h1>CONTACT</h1>
                    <p>Address: {resumeData.personalInformation.address}</p>
                    <p><span>Mobile:</span>{resumeData.personalInformation.mobileNumber}</p>
                    <p>Email: {resumeData.personalInformation.email}</p>
                  </div>
                  <div className="pr-education-sec">
                    <h1>EDUCATION</h1>
                    <p>{resumeData.education.stDate10th}  to {resumeData.education.endDate10th}
                      <br/> 
                      <span>{resumeData.education.clgName10th}</span><br/>10th
                      <br/>
                      GPA: {resumeData.education.gpa10th}
                    </p>
                    <p>{resumeData.education.stDate12th} to {resumeData.education.endDate12th}
                      <br/>
                      <span>{resumeData.education.clgName12th}
                        </span><br/>12th
                      <br/>
                      GPA: {resumeData.education.gpa12th}
                    </p>
                    <p>{resumeData.education.stDateGraduate} to {resumeData.education.endDateGraduate}
                      <br/>
                      <span>{resumeData.education.clgNameGraduate}</span><br/>
                      Graduation
                      <br/>
                      GPA: {resumeData.education.gpaGraduate}
                    </p>
                  </div>
                  <div className="pr-certification-sec" >
                    <h1>CERTIFICATIONS</h1>
                    {
                    arrayCertifications.map((item, index) => (
                      <div key={index}>
                        <li><span> {item.certificationTitle} - </span>{item.certificationDescription}
                        </li>
                      </div>))
                    }          
                  </div>
                </div>
                <div className="sub2-sec2">
                  <div className='pr-ps-sec' >
                    <h1>PROFESSIONAL SUMMARY</h1>
                    <p>{resumeData.personalInformation.professionalSummary} </p>
                  </div>
                  <div className='skill_card' >
                  <h1>SKILLS</h1>
                  <div  className='skill_priview'>
                    
                    {
                      arraySkills.map((item, index) => (
                        <div className='skill_items'  key={index}>
                          <li className='sk_item' >{item.skill}</li> 
                          <p className='sk_lvl' >   {item.level}Level</p>
                        </div>
                      ))
                    }
                  </div> 
                  </div> 
                  <div className='pr-workexp-sec' >
                    <h1>WORK EXPERIENCE</h1>
                    <p>Duration: {resumeData.workExperience.workexpstDate}  to  {resumeData.workExperience.workexpendDate}</p>
                    <p className='pr-workexp-details'>{resumeData.workExperience.jobTitle},
                       <span className='workexp-title'> {resumeData.workExperience.companyName}</span>,<span> {resumeData.workExperience.workLocation}</span> 
                       </p>
                    <p>{resumeData.workExperience.WorkDescription}</p>
                  </div>
                  <div className='pr-intern-sec'>
                    <h1>INTERNSHIP EXPERIENCE</h1>
                    <p >Duration :{resumeData.Internship.internStartdate}  to  {resumeData.Internship.internEnddate}</p>
                    <p className='pr-intern-details'>{resumeData.Internship.internJobtitle},
                      <span className='intern-title' > {resumeData.Internship.internCompanyname}</span>,
                      <span > {resumeData.Internship.internLocation}</span></p>
                    <p>{resumeData.Internship.internDescription}</p>
                  </div>
                  <div className='pr-project-sec'>
                    <h1>PROJECTS</h1>
                   {
                    arrayProjects.map((item, index) => (
                      <div key={index}>
                        <p className='pr-project-name' >Project Name: {item.projectTitle}</p>
                        <p> {item.projectDescription}</p>
                        </div>))
                   }
                  </div>
                  <div style={{padding:15}}>
                    <h1>REFERENCES</h1>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resumedashboard;
