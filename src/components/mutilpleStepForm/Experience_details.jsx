import React, { useEffect, useRef, useState } from 'react'

const currentJobTitleSuggestions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Technical Lead",
  "QA Engineer",
  "Product Manager"
];

const skillSuggestions = [
  "React", "Node.js", "JavaScript", "Python", "Django", "MongoDB", "Express", "HTML", "CSS", "Git",
  "Docker", "Kubernetes", "SQL", "TypeScript", "Java", "C++", "GraphQL", "AWS", "Firebase", "TailwindCSS", "Redux", "Next.js"
];

const suggestionMap = {
  currentJobTitle: currentJobTitleSuggestions,
  skills: skillSuggestions,
}

const Experience_details = ({ formData, handleFormDataChange }) => {

  const [activeField, setActiveField] = useState('');
  const [inputValue, setInputValue] = useState({
    currentJobTitle: '',
    skills: '',
  });
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if(formRef.current && !formRef.current.contains(event.target)) {
        setActiveField('');
      }
    }

    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  }, [])

  const handleInputChange = (section, field, value) => {
    setInputValue({
      ...inputValue,
      [field]: value
    })
    handleFormDataChange(section, field, value);
  }

  const handleSuggestionClick = (sugg) => {
    handleFormDataChange('experience', activeField, sugg);
    setActiveField('');
  }

  const handleSkillAdd = (skill) => {
    if(!formData.experience.skills.includes(skill)) {
      const updatedSkills = [...formData.experience.skills, skill];
      handleFormDataChange('experience', 'skills', updatedSkills);
    }
    setInputValue({
      ...inputValue,
      skills: ''
    })
    setActiveField('');
  }

  const handleSkillRemove = (skill) => {
    const updatedSkills = formData.experience.skills.filter(item => item !== skill);
    handleFormDataChange('experience', 'skills',updatedSkills);
    setInputValue({
      ...inputValue,
      skills: ''
    })
  }

  const filterdSuggestions = activeField 
  ? suggestionMap[activeField].filter(item => item.toLowerCase().includes(inputValue[activeField]?.toLowerCase()) && !formData.experience[activeField]?.includes(item))
  : [];

  return (
    <div className='basic_details_form_container' ref={formRef}>
      <div className='input-container'>
        <input 
          type='number'
          name='number'
          placeholder=" "
          value={formData.experience.totalYears === 0 ? '': formData.experience.totalYears}
          onChange={(e) => handleFormDataChange('experience', 'totalYears', e.target.value)}
        />
        <div className='label-el'>
          Total Years
        </div>
      </div>
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={formData.experience.currentJobTitle}
          onChange={(e) => handleInputChange('experience', 'currentJobTitle', e.target.value)}
          onFocus={() => setActiveField('currentJobTitle')}
        />
        <div className='label-el'>
          Current Job Title
        </div>
        {
          activeField === 'currentJobTitle' && filterdSuggestions.length > 0 && (
            <div className='autoComplete-dropDown'>
              <ul>
                {
                  filterdSuggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(item)}>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={inputValue.skills}
          onChange={(e) => setInputValue({...inputValue, skills: e.target.value})}
          onFocus={() => setActiveField('skills')}
        />
        <div className='label-el'>
          Skills
        </div>
        {
          activeField === 'skills' && filterdSuggestions.length > 0 && (
            <div className='autoComplete-dropDown'>
              <ul>
                {
                  filterdSuggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSkillAdd(item)}>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className='tag-container'>
        {
          formData.experience.skills.length > 0 && formData.experience.skills.map((item, index) => (
            <div className='tag' key={index}>
              {item}
              <span className='tag-remove' onClick={() => handleSkillRemove(item)}>
                x
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Experience_details