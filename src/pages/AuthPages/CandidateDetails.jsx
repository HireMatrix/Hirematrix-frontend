import { useState } from "react"

import Basic_details from "../../components/mutilpleStepForm/Basic_details"
import Education_details from "../../components/mutilpleStepForm/Education_details"
import Experience_details from "../../components/mutilpleStepForm/Experience_details"
import Preference_details from "../../components/mutilpleStepForm/Preference_details"
import ProgressBar from "../../components/mutilpleStepForm/ProgressBar"
import Loader from '../../components/Loader'

import { updateCandidateDetails } from "../../Constants/ApiUrls"

import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux"

/* 
  Todo:
  1. validation's for each input. 
*/
const Page = {
  basic_details: 1,
  Education_details: 2,
  Experience_details: 3,
  Preference_details: 4,
}

const steps = [
  { id: 1, name: 'Basic Details' },
  { id: 2, name: 'Education' },
  { id: 3, name: 'Experience' },
  { id: 4, name: 'Preferences' },
]

const FINAL_STEP = Page.Preference_details;

const CandidateDetails = () => {

  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [currentStep, setCurrentStep] = useState(Page.basic_details);
  const buttonText = currentStep === FINAL_STEP 
    ? 'Save'
    : 'Next';
  const [formData, setFormData] = useState({
    basic_details: {
      fullName: '',
      gender: ''
    },
    education: {
      highestQualification: '',
      fieldOfStudy: '',
      englishLevel: ''
    },
    experience: {
      totalYears: 0,
      currentJobTitle: '',
      skills: [],
    },
    preferences: {
      jobTitle: '',
      workMode: [],
      workType: [],
      workShift: [],
      expectedSalary: 0
    }
  });

  if(user.hasCompletedOnboarding) {
    window.location.href = '/';
  }

  const handleFormDataChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case Page.basic_details:
        return (
          <Basic_details 
            formData={formData} 
            handleFormDataChange={handleFormDataChange}
          />
        );
      case Page.Education_details:
        return (
          <Education_details
            formData={formData} 
            handleFormDataChange={handleFormDataChange}
          />
        )
      case Page.Experience_details:
        return (
          <Experience_details
            formData={formData} 
            handleFormDataChange={handleFormDataChange}
          />
        )
      case Page.Preference_details:
        return (
          <Preference_details
            formData={formData} 
            handleFormDataChange={handleFormDataChange}
          />
        )
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if(currentStep > Page.basic_details) {
      setCurrentStep(currentStep - 1);
    }
  }

  const handleSaveOrNextClick = async(e) => {
    e.preventDefault();
    if(currentStep < FINAL_STEP) {
      setCurrentStep(currentStep + 1);    
    } else {
      setLoading(true);
      const formattedData = {
        fullName: formData.basic_details.fullName,
        gender: formData.basic_details.gender,
        education: {
          highestQualification: formData.education.highestQualification, 
          fieldOfStudy: formData.education.fieldOfStudy,
          englishLevel: formData.education.englishLevel
        },
        experience: {
          totalYears: formData.experience.totalYears,
          currentJobTitle: formData.experience.currentJobTitle,
          skills: formData.experience.skills
        },
        preferences: formData.preferences,
        userEmail: user.email
      };
      const response = await updateCandidateDetails(formattedData);
      setLoading(false);
      window.location.href = "/"
    }
  }

  if(loading) {
    <Loader isfullpage={true}/>
  }

  return (
    <div className='login-page-main-container'>
      <div className='login-page-image'>
        <h3>
          Welcome to 
          <span>
            HireMatrix
          </span>
        </h3>
        <ProgressBar currentStep={currentStep}/>
      </div>
      <div className='auth-form-container'>
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            {
              currentStep > Page.basic_details && (
                <button onClick={handleBackClick}>
                  <IoMdArrowBack/>
                </button>
              )
            }
            <p>{steps.find(step => step.id === currentStep).name}</p>
          </div>
          <form>
            {renderCurrentStep()}
            <div className="saveOrNext-container">
              <button onClick={handleSaveOrNextClick}>
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CandidateDetails
