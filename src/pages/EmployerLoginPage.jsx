import { useState } from "react"

const EmployerLoginPage = () => {

  const [employerNum, setEmployerNum] = useState('')

  console.log(employerNum)

  return (
    <>
      <div className='employer-login-section'>
        <div className='employer-login-section-text'>
          <h1>INDIA'S #1 HIRING PLATFORM</h1>
          <h1>Find the right candidate. Fast.</h1>
          <p>Trusted by 5Cr+ Candidates | 7 Lakh+ Employers</p>
        </div>
        <div className="employer-login-card">
          <h1>Employer Login/Sign Up</h1>
          <div className="employer-login-mobile-input-container">
            <h1>+91</h1>
            <input type="number" placeholder="Mobile number" value={employerNum} onChange={(e) => setEmployerNum(e.target.value)}/>
          </div>
          <button>Login</button>
          <p>Click here for Enterprise login</p>
        </div>
      </div>
      <div className="employer-companiesthathire-section">
        <div className="employer-companies-images-container-1">
          
        </div>
        <div className="employer-companies-images-container-2"></div>
      </div>
      <div></div>
    </>
  )
}

export default EmployerLoginPage
