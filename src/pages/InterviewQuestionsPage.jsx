import React from "react";
import { FaVideo, FaMicrophone, FaCog, FaMoon, FaPhoneAlt, FaArrowDown } from "react-icons/fa";


const MockInterview = () => {
  return (
    <div className="interview-container">
      {/* Header Section */}
      <div className="header">
        <div className="header-left">
          <h2>Software Engineer @ Cognizant</h2>
          <span className="badge">PREMIUM</span>
          <span className="timer">00:00</span>
        </div>
        <div className="header-right">
          <FaMoon className="icon" />
          <FaCog className="icon" />
          <FaVideo className="icon orange-icon" />
          <FaArrowDown className="icon" />
          <button className="leave-btn">
            <FaPhoneAlt /> Leave
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="interviewer-status">
            <p>Job Role <span className="status ready">Here</span></p>
            <div className="status-indicator ready"></div>
          </div>
          <div className="room-selection">
            <p>User Video Appear Here</p>
            <button className="select-btn">Select</button>
          </div>
          <div className="transcript-info">
            <p>User Cam Allow chesina taruwata ikkada video display avutundi</p>
          </div>
        </div>

        {/* Middle Panel: Questions here*/}
        <div className="middle-panel">
          <div className="panel-header">
            <h3>Questions</h3>
            <div className="panel-controls">
              <button className="control-btn">Previous</button>
              <button className="control-btn">Next</button>
            </div>
          </div>
          <div className="panel-content">
            <p>Questions will display here according to roles .</p>
          </div>
        </div>

        {/* Right Panel: Thinking to convert User speech to text here */}
        <div className="right-panel">
          <div className="panel-header">
            <h3>Your Answer</h3>
            <div className="status-indicator ready"></div>
            <p className="status ready">Speech to Text</p>
          </div>
          <div className="panel-content">
            <p>Thinking to convert User speech to text here </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;