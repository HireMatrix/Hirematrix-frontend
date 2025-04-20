import React, { useEffect, useRef, useState } from 'react'

const qualificationSuggestions = [
  '10 or Below 10th',
  '12th Pass',
  'Diploma',
  'ITI',
  'Graduate',
  'Post Graduate'
]

const englishLevelSuggestions = [
  'No English',
  'Basic English',
  'Intermediate English',
  'Advanced English'
]

const fieldOfStudySuggestions = [
  'Computer Science',
  'Electronics and Communication Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Mechanical Engineering',
]

const suggestionMap = {
  highestQualification: qualificationSuggestions,
  englishLevel: englishLevelSuggestions,
  fieldOfStudy: fieldOfStudySuggestions
}

const Education_details = ({ formData, handleFormDataChange }) => {

  const [activeField, setActiveField] = useState(false);
  const [inputValue, setInputValue] = useState({
    highestQualification: '',
    englishLevel: '',
    fieldOfStudy: '', 
  });
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(formRef.current && !formRef.current.contains(event.target)) {
        setActiveField('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleInputChange = (section, field, value) => {
    setInputValue({
      ...inputValue,
      [field]: value
    })
    handleFormDataChange(section, field, value)
  }

  const handleSuggestionClick = (sugg) => {
    handleFormDataChange('education', activeField, sugg);
    setActiveField('');
  }

  const filterdSuggestions = activeField 
  ? suggestionMap[activeField].filter(item => item.toLowerCase().includes(inputValue[activeField]?.toLowerCase()) && !formData.education[activeField]?.includes(item))
  : [];

  return (
    <div className='basic_details_form_container' ref={formRef}>
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={formData.education.highestQualification}
          onChange={(e) => handleInputChange('education', 'highestQualification', e.target.value)}
          onFocus={() => setActiveField('highestQualification')}
        />
        <div className='label-el'>
          Highest Qualification
        </div>
        {
          activeField === 'highestQualification' && filterdSuggestions.length > 0 && (
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
          value={formData.education.fieldOfStudy}
          onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value)}
          onFocus={() => setActiveField('fieldOfStudy')}
        />
        <div className='label-el'>
          Field of Study
        </div>
        {
          activeField === 'fieldOfStudy' && filterdSuggestions.length > 0 && (
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
          value={formData.education.englishLevel}
          onChange={(e) => handleInputChange('education', 'englishLevel', e.target.value)}
          onFocus={() => setActiveField('englishLevel')}
        />
        <div className='label-el'>
          English Level
        </div>
        {
          activeField === 'englishLevel' && filterdSuggestions.length > 0 && (
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
    </div>
  )
}

export default Education_details
