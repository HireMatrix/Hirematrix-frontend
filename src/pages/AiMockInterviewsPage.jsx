import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AiMockInterviewsPage = () => {
  const navigate = useNavigate();
  
  const jobQuestions = {
    "Custom Job Description": "Describe a time when you faced a challenging project and how you managed it.",
    "Business Analyst": "How have you successfully utilized data analytics to address a specific business challenge, and what was the outcome?",
    "Product Manager": "Can you walk us through how you prioritize features in a product roadmap?",
    "Software Engineer": "Could you describe a coding challenge that pushed your boundaries and how you approached it?",
    "Marketing Specialist": "Tell us about a marketing campaign you designed and how you measured its success.",
    "Customer Service Representative": "How do you handle an upset customer while maintaining professionalism?"
  };

  const [selectedRole, setSelectedRole] = useState("Software Engineer");

  return (
    <div className="ai-mock-interview-container">
      <div className="left-section">
        <span className="tag"> AI Interview Prep</span>
        <h1>
        Be Confident <br /> And Nail Your <span>Job Interview</span>
        </h1>
        <p>
          Get ready with practice questions customized to your job role. Enjoy instant AI feedback and tips to polish your answers and shine!
        </p>
        <button className="try-now" onClick={() => navigate("/ai-mock-interviews/role-selection")}>Start Now →</button>
        <p className="note">What are you waiting for? <br/>start now</p>
      </div>
      <div className="right-section">
        <h3>
          Turn a <span>job description</span> into <span>interview questions</span> to practice with:
        </h3>
        <div className="job-tags">
          {Object.keys(jobQuestions).map((role) => (
            <button key={role} onClick={() => setSelectedRole(role)}>
              {role}
            </button>
          ))}
        </div>
        <div className="interview-box">
          <p>{jobQuestions[selectedRole]}</p>
          <div className="timer">0:00 / 2:00</div>
          <button className="record-btn" onClick={() => navigate("/ai-mock-interviews/role-selection")}>🎤</button>
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
