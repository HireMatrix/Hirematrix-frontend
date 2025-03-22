import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const MockInterviewPage = () => {
  const navigate = useNavigate(); // ✅ Use useNavigate hook properly

  const jobRoles = [
    "Custom Job Description",
    "Business Analyst",
    "Product Manager",
    "Software Engineer",
    "Marketing Specialist",
    "Customer Service Representative",
    "Sales Representative",
    "Human Resources Specialist",
    "Data Analyst",
    "UX/UI Designer",
    "QA Engineer",
  ];

  const [selectedRole, setSelectedRole] = useState("Customer Service Representative");

  return (
    <div className="job-description-container">
      <h2>Select a job description</h2>
      <div className="job-role-buttons">
        {jobRoles.map((role) => (
          <button
            key={role}
            className={selectedRole === role ? "active" : ""}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="job-description-box">
        <h3>Job Title: {selectedRole}</h3>
        <p>
          <b>Role Summary:</b> We are seeking a dedicated and enthusiastic {selectedRole} to join our team.
          This role offers the opportunity to interact directly with our customers and ensure their
          experience with our company is positive and memorable.
        </p>
        <p>
          Responsibilities:
          <ul>
            <li>Respond to customer inquiries via phone, email, and live chat.</li>
            <li>Resolve product or service problems by clarifying customer complaints.</li>
            <li>Maintain a high level of professionalism with customers.</li>
          </ul>
        </p>
      </div>

      <button
        className="start-interview-btn"
        onClick={() => navigate("/ai-mock-interviews/role-selection/InterviewQuestionsPage")}
      >
        Start Interview →
      </button>
    </div>
  );
};

export default MockInterviewPage;
