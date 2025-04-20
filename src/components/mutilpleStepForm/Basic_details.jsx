import React from 'react'

const Basic_details = ({formData, handleFormDataChange}) => {

  return (
    <div className='basic_details_form_container'>
      <div className='input-container'>
        <input 
          type='text'
          name='text'
          placeholder=" "
          value={formData.basic_details.fullName}
          onChange={(e) => handleFormDataChange('basic_details', 'fullName', e.target.value)}
        />
        <div className='label-el'>
          First Name
        </div>
      </div>
      <div className='gender-wrapper'>
        <p>Gender:</p>
        <div className='gender-input-container'>
          <p 
            onClick={() => handleFormDataChange('basic_details', 'gender', 'male')}
            className={formData.basic_details.gender === 'male' ? 'active' : ''}
          >
            Male
          </p>
          <p 
            onClick={() => handleFormDataChange('basic_details', 'gender', 'female')}
            className={formData.basic_details.gender === 'female' ? 'active' : ''}
          >
            Female
          </p>
        </div>
      </div>
    </div>
  )
}

export default Basic_details
