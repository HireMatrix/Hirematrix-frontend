import React from "react";


const AiMockInterviewsPage = () => {
  return (
    <div className="ai-mock-interview-container">
      {/* Left Side Content */}
      <div className="left-section">
        <span className="tag">#1 AI Interview Prep</span>
        <h1>
          Boost your confidence,
          <br /> ace the <span>job interview</span>
        </h1>
        <p>
          Practice job interview questions tailored to your job description. Get
          instant AI feedback and suggestions to improve your answers.
        </p>
        <button className="try-now">Try now for free →</button>
        <p className="note">No credit card needed</p>
        <div className="review">
          <div className="avatars">
            <img src="src/assets/AiMockInterviewsPage/TrustedUser-1.png" alt="User 1" loading='lazy'/>
            <img src="src/assets/AiMockInterviewsPage/TrustedUser-2.png" alt="User 2" loading='lazy'/>
            <img src="src/assets/AiMockInterviewsPage/TrustedUser-3.png" alt="User 3" loading='lazy'/>
          </div>
          <p>Trusted by 41,000+ job seekers</p>
        </div>
      </div>

      {/* Right Side Content */}
      <div className="right-section">
        <h3>
          Turn a <span>job description</span> into <span>interview questions</span>
          to practice with:
        </h3>
        <div className="job-tags">
          <button>Custom Job Description</button>
          <button>Business Analyst</button>
          <button>Product Manager</button>
          <button>Software Engineer</button>
          <button>Marketing Specialist</button>
          <button>Customer Service Representative</button>
        </div>
        <div className="interview-box">
          <p>
            Could you describe a coding challenge that pushed your boundaries
            and how you approached it?
          </p>
          <div className="timer">0:00 / 2:00</div>
          <button className="record-btn">🎤</button>
          <div className="feedback-section">
            <div className="feedback"></div>
            <div className="sample-response"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMockInterviewsPage;