import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { postJobAdmin } from '../../Constants/ApiUrls';

const AddSingleData = ({handleCloseAddJob}) => {

    const [renderSingleData, setRenderSingleData] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [addJob, setAddJob] = useState({
        jobTitle: '',
        experience: '',
        salary: '',
        highestEducation: '',
        workMode: [],
        workType: [],
        workShift: [],
        department: '',
        englishLevel: '',
        gender: '',
        location: ''
    });

    const handleWorkModeChange = (value, key) => {
        setAddJob(prev => ({
            ...prev,
            [key]: Array.isArray(prev[key])
                ? prev[key].includes(value) 
                    ? prev[key].filter(item => item !== value)
                    : [...prev[key], value]
                : [value] 
        }))
    }

    const handleAddSingleData = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(addJob);
        const response = await postJobAdmin(addJob);
        console.log(response);
        setAddJob({
            jobTitle: '',
            experience: '',
            salary: '',
            highestEducation: '',
            workMode: [],
            workType: [],
            workShift: [],
            department: '',
            englishLevel: '',
            gender: '',
            location: ''
        })

        setIsLoading(false);
    }
    
    const handleClose = () => {
        handleCloseAddJob();
    }

    return (
      <div className='add-single-data-main-container'>
        <div className='add-single-data-container'>
            <div className='context-close-button-container'>
              <div className='context-container'>
                  <h1>Add New Job</h1>
                  <p>Create new job here. Click save when you're done.</p>
              </div>
              <div className='clone-button-container'>
                  <IoMdClose onClick={handleClose}/>
              </div>
            </div>
            <div className='data-entry-container'>
              <form onSubmit={handleAddSingleData}>
                {renderSingleData ? (
                <>
                    <div>
                        <label htmlFor='job-title'>Job Title :</label>
                        <input
                            id='job-title'
                            type='text'
                            placeholder='Job Title'
                            value={addJob.jobTitle}
                            onChange={(e) => setAddJob(prev => ({...prev, jobTitle: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label htmlFor='experience'>Experience :</label>
                        <input
                            id='experience'
                            type='text'
                            placeholder='Experience'
                            value={addJob.experience}
                            onChange={(e) => setAddJob(prev => ({...prev, experience: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label htmlFor='salary'>Salary :</label>
                        <input
                            id='salary'
                            type='text'
                            placeholder='₹ Salary'
                            value={addJob.salary}
                            onChange={(e) => setAddJob(prev => ({...prev, salary: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label htmlFor='highest-edu'>Highest Education :</label>
                        <div id='highest-edu'>
                            {["10 or Below 10", "12th Pass", "Diploma", "ITI", "Graduate", "Post Graduate"].map(
                                (level) => (
                                <label 
                                    key={level} 
                                    className='highest-education-label'
                                    htmlFor='high-edu-radio'
                                >
                                  <input
                                    id='high-edu-radio'
                                    type="radio" 
                                    name="highestEducation" 
                                    value={level}
                                    checked={addJob.highestEducation === level}
                                    onChange={(e) => setAddJob(prev => ({...prev, highestEducation: e.target.value}))}
                                  />
                                  {level}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='work-mode'>Work Mode :</label>
                        <div id='work-mode'>
                            {["Work from home", "Work from office", "Work form field"].map((value) => (
                                <label 
                                    key={value} 
                                    className='work-mode-label'
                                    htmlFor='work-mode-checkbox'
                                >
                                    <input
                                        id='work-mode-checkbox'
                                        type='checkbox'
                                        value={value}
                                        onChange={(e) => handleWorkModeChange(e.target.value, 'workMode')}
                                        checked={addJob.workMode?.includes(value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='work-type'>Work Type :</label>
                        <div id='work-type'>
                            {["Full time", "Part time"].map((value) => (
                                <label 
                                    key={value} 
                                    className='work-type-label'
                                    htmlFor='work-type-checkbox'
                                >
                                    <input
                                        id='work-type-checkbox'
                                        type='checkbox'
                                        value={value}
                                        onChange={(e) => handleWorkModeChange(e.target.value, 'workType')}
                                        checked={addJob.workType?.includes(value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='work-shift'>Work Shift :</label>
                        <div id='work-shift'>
                            {["Day shift", "Night shift"].map((value) => (
                                <label
                                    htmlFor='work-shift-checkbox' 
                                    key={value} 
                                    className='work-shift-label'
                                >
                                    <input
                                        id='work-shift-checkbox'
                                        type='checkbox'
                                        value={value}
                                        onChange={(e) => handleWorkModeChange(e.target.value, 'workShift')}
                                        checked={addJob.workShift?.includes(value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='department-text'>Department :</label>
                        <input
                            id='department-text'
                            type='text'
                            placeholder='Job Title'
                            value={addJob.department}
                            onChange={(e) => setAddJob(prev => ({...prev, department: e.target.value}))}
                        />
                    </div>
                    <div>
                        <label htmlFor='english-level'>English Level :</label>
                        <div id='english-level'>
                            {["No English", "Basic English", "Intermediate English", "Advanced English"].map((level) => (
                                <label 
                                    htmlFor='english-level-radio'
                                    key={level} 
                                    className='english-level-label'
                                >
                                    <input
                                        id='english-level-radio'
                                        type='radio'
                                        name='englishLevel'
                                        value={level}
                                        checked={addJob.englishLevel === level}
                                        onChange={(e) => setAddJob(prev => ({...prev, englishLevel: e.target.value}))}
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='gender'>Gender :</label>
                        <div id='gender'>
                            {["Female", "Male"].map((level) => (
                                <label
                                    htmlFor='gender-radio' 
                                    key={level} 
                                    className='gender-level-label'
                                >
                                    <input
                                        id='gender-radio'
                                        type='radio'
                                        name='gender'
                                        value={level}
                                        checked={addJob.gender === level}
                                        onChange={(e) => setAddJob(prev => ({...prev, gender: e.target.value}))}
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='location'>Location :</label>
                        <input
                            id='location'
                            type='text'
                            placeholder='Job Title'
                            value={addJob.location}
                            onChange={(e) => setAddJob(prev => ({...prev, location: e.target.value}))}
                        />
                    </div>
                </>
                ) : (
                    <div>
                        <textarea></textarea>
                    </div>
                )}
                <div>
                    <button 
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Save'}
                    </button>
                    <button 
                        type='button' 
                        onClick={() => setRenderSingleData(!renderSingleData)}
                    >
                        {renderSingleData ? 'Add Multiple Data' : 'Add Single Data' }
                    </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
}

export default AddSingleData
