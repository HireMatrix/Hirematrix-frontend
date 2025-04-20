import { useEffect, useRef, useState } from "react";

const jobTitleSuggestions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "QA Engineer",
  "Technical Lead",
  "Product Manager",
  "Business Analyst",
  "Cloud Engineer",
  "Cybersecurity Analyst"
];

const workModeSuggestions = [
  "Work from home",
  "Work from office",
  "Work from field"
]

const workTypeSuggestions = [
  "Full time",
  "Part time"
]

const workShiftSuggestions = [
  "Day shift",
  "Night shift"
]

const suggestionMap = {
  jobTitle: jobTitleSuggestions,
  workMode: workModeSuggestions,
  workType: workTypeSuggestions,
  workShift: workShiftSuggestions
}

const Preference_details = ({ formData, handleFormDataChange }) => {

  const [activeField, setActiveField] = useState('');
  const [inputValue, setInputValue] = useState({
    jobTitle: '',
    workMode: '',
    workType: '',
    workShift: ''
  });
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if(formRef.current && !formRef.current.contains(e.target)) {
        setActiveField('');
      }
    }

    document.addEventListener('mousedown', handleClickOutSide);

    return() => {
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
    handleFormDataChange('preferences', activeField, sugg);
    setActiveField('');
  };

  const handleAdd = (field, item) => {
    if(!formData.preferences[field]?.includes(item)) {
      const updatedData = [...formData.preferences[field], item];
      handleFormDataChange('preferences', field, updatedData);
      setInputValue({
        ...inputValue,
        [field]: ''
      })
      setActiveField('')
    }
  };

  const handleRemove = (field, data) => {
    const updatedData = formData.preferences[field].filter(item => item !== data);
    handleFormDataChange('preferences', field, updatedData);
    setInputValue({
      ...inputValue,
      [field]: ''
    })
  }

  const filterdSuggestions = activeField ? suggestionMap[activeField].filter(item => item.toLowerCase().includes(inputValue[activeField]?.toLowerCase()) && !formData.preferences[activeField]?.includes(item)) : [];

  return (
    <div className='basic_details_form_container' ref={formRef}>
      <div className="preference-input-wrapper">
        <div className='input-container'>
          <input 
            type='text'
            name='text'
            placeholder=" "
            value={formData.preferences.jobTitle}
            onChange={(e) => handleInputChange('preferences', 'jobTitle', e.target.value)}
            onFocus={() => setActiveField('jobTitle')}
          />
          <div className='label-el'>
            Job Title
          </div>
          {
            activeField === 'jobTitle' && filterdSuggestions.length > 0 && (
              <div className="autoComplete-dropDown">
                <ul>
                  {
                    filterdSuggestions.map((item, index) => (
                      <li 
                        key={index} 
                        onClick={() => handleSuggestionClick(item)}
                      >
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
            type='number'
            name='salary'
            placeholder=" "
            value={formData.preferences.expectedSalary === 0 ? '' : formData.preferences.expectedSalary}
            onChange={(e) => handleFormDataChange('preferences', 'expectedSalary', e.target.value)}
          />
          <div className='label-el'>
            Expected Salary
          </div>
        </div>
      </div>
      {/* work mode */}
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={inputValue.workMode}
          onChange={(e) => setInputValue({...inputValue, workMode: e.target.value})}
          onFocus={() => setActiveField('workMode')}
        />
        <div className='label-el'>
          Work Mode
        </div>
        {
          activeField === 'workMode' && filterdSuggestions.length > 0 && (
            <div className='autoComplete-dropDown'>
              <ul>
                {
                  filterdSuggestions.map((item, index) => (
                    <li key={index} onClick={() => handleAdd(activeField, item)}>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className="tag-container">
        {
          formData.preferences.workMode.length > 0 && (
            formData.preferences.workMode.map((item, index) => (
              <div className="tag" key={index}>
                {item}
                <span onClick={() => handleRemove('workMode', item)}>
                  x
                </span>
              </div>
            ))
          )
        }
      </div>
      {/* work type */}
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={inputValue.workType}
          onChange={(e) => setInputValue({...inputValue, workType: e.target.value})}
          onFocus={() => setActiveField('workType')}
        />
        <div className='label-el'>
          Work Type
        </div>
        {
          activeField === 'workType' && filterdSuggestions.length > 0 && (
            <div className='autoComplete-dropDown'>
              <ul>
                {
                  filterdSuggestions.map((item, index) => (
                    <li key={index} onClick={() => handleAdd(activeField, item)}>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className="tag-container">
        {
          formData.preferences.workType.length > 0 && (
            formData.preferences.workType.map((item, index) => (
              <div className="tag" key={index}>
                {item}
                <span onClick={() => handleRemove('workType', item)}>
                  x
                </span>
              </div>
            ))
          )
        }
      </div>
      {/* work shift */}
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={inputValue.workShift}
          onChange={(e) => setInputValue({...inputValue, workShift: e.target.value})}
          onFocus={() => setActiveField('workShift')}
        />
        <div className='label-el'>
          Work Shift
        </div>
        {
          activeField === 'workShift' && filterdSuggestions.length > 0 && (
            <div className='autoComplete-dropDown'>
              <ul>
                {
                  filterdSuggestions.map((item, index) => (
                    <li key={index} onClick={() => handleAdd(activeField, item)}>
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div className="tag-container">
        {
          formData.preferences.workShift.length > 0 && (
            formData.preferences.workShift.map((item, index) => (
              <div className="tag" key={index}>
                {item}
                <span onClick={() => handleRemove('workShift', item)}>
                  x
                </span>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default Preference_details
