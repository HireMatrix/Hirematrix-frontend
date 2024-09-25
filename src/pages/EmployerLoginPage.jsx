import { useState } from "react";

const EmployerLoginPage = () => {
  const [employerNum, setEmployerNum] = useState('');

  return (
    <>
      <div className="employer-login-main-container">
        <div className="employer-login-section">
          <div className="employer-login-section-text">
            <div>
              <h2>Your Gateway to Exceptional Talent!</h2>
              <h2>Effortless Hiring, Maximum Efficiency</h2>
            </div>

            <hr className="employer-login-line-between"/>

            <div className="employer-login-employer-stats">
              <div className="employer-login-stat-item">
                <p className="employer-login-stat-number">5 Crores+</p>
                <p className="employer-login-stat-label">Qualified candidates</p>
              </div>
              <div className="employer-login-stat-item">
                <p className="employer-login-stat-number">7 Lakhs+</p>
                <p className="employer-login-stat-label">Employers use apna</p>
              </div>
              <div className="employer-login-stat-item">
                <p className="employer-login-stat-number">900+</p>
                <p className="employer-login-stat-label">Available cities</p>
              </div>
            </div>
          </div>

          {/* Right Section - Login Card */}
          <div className="employer-login-card">
            <h2>Let's get started</h2>

            <div className="employer-login-mobile-input-container">
              <label htmlFor="mobile-number">Mobile number</label>
              <input
                id="mobile-number"
                type="number"
                placeholder="Enter 10 digit mobile number"
                value={employerNum}
                onChange={(e) => setEmployerNum(e.target.value)}
              />
            </div>
            <button className="employer-login-login-button">Continue</button>
            <div className="employer-login-divider">
              <span>OR</span>
            </div>
            <button className="employer-login-company-email-button">Continue with company email</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerLoginPage;
