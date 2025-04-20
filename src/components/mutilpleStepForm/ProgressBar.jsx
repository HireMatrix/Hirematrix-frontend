import { FaRegCircle } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";

const steps = [
    { id: 1, name: 'Basic Details' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Experience' },
    { id: 4, name: 'Preferences' },
]

const ProgressBar = ({ currentStep }) => {
  return (
    <div className='progress-container'>
        {steps.map((step, index) => (
            <div className="step-wrapper" key={index}>
                <div className='step-container'>
                    <div className={`step-icon ${currentStep > step.id ? 'done' : ''}`}>
                        {
                            currentStep > step.id 
                                ? <FaRegCircleCheck/> 
                                : <FaRegCircle/>
                        }
                    </div>
                    <p>{step.name}</p>
                </div>
                {index !== steps.length - 1 && (
                    <div className={`step-line ${currentStep > step.id ? 'filled' : ''}`}></div>
                )}
            </div>
        ))}
    </div>
  )
}

export default ProgressBar
