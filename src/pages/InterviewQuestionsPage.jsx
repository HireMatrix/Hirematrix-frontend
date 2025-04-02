import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaVideo, FaMicrophone, FaCog, FaMoon, FaPhoneAlt, FaArrowDown, FaSun } from "react-icons/fa";
// import interviewerVideoRef from '../assets/AiMockInterviewsPage/Interviewer1.mp4';

const MockInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = location.state?.selectedRole || "Customer Service Representative";

 
  const roleQuestions = {
    "Customer Service Representative": [
      "How do you handle a situation where a customer is very upset and dissatisfied with our service?",
      "Can you describe a time when you went above and beyond to help a customer?",
      "What steps do you take to ensure clear communication with customers over the phone?",
      "How do you manage your time when dealing with multiple customer inquiries at once?",
    ],
    "Software Engineer": [
      "Can you Introduce Yourself",
      "Can you explain the difference between a class and an object in object-oriented programming?",
      "What is your experience with React, and how have you used it in past projects?",
      "How do you approach debugging a complex issue in a codebase?",
      "What are the benefits of using version control systems like Git?",
    ],
    "Business Analyst": [
      "How do you gather and document requirements from stakeholders?",
      "Can you describe a time when you had to deal with conflicting stakeholder requirements?",
      "What tools do you use for creating process flow diagrams?",
      "How do you ensure that your analysis aligns with the business goals?",
    ],
    "Product Manager": [
      "How do you prioritize features in a product roadmap?",
      "Can you describe a time when you had to say no to a stakeholder’s request?",
      "What metrics do you use to measure the success of a product launch?",
      "How do you handle a situation where a product is not meeting user expectations?",
    ],
    "Marketing Specialist": [
      "How do you create a marketing campaign that targets a specific audience?",
      "What tools do you use to measure the success of a marketing campaign?",
      "Can you describe a time when a campaign didn’t perform as expected? How did you handle it?",
      "How do you stay updated with the latest marketing trends?",
    ],
    "Sales Representative": [
      "How do you handle objections from a potential customer during a sales pitch?",
      "Can you describe a time when you closed a challenging sale?",
      "What strategies do you use to build rapport with clients?",
      "How do you manage your sales pipeline to ensure consistent performance?",
    ],
    "Human Resources Specialist": [
      "How do you handle a situation where an employee has a conflict with their manager?",
      "What steps do you take to ensure a fair recruitment process?",
      "Can you describe a time when you had to implement a new HR policy?",
      "How do you ensure employee engagement in a remote work environment?",
    ],
    "Data Analyst": [
      "What tools do you use for data visualization, and why?",
      "Can you describe a time when your data analysis led to a significant business decision?",
      "How do you ensure the accuracy of your data analysis?",
      "What steps do you take to clean and preprocess data before analysis?",
    ],
    "UX/UI Designer": [
      "How do you conduct user research to inform your design decisions?",
      "Can you describe a time when you had to redesign a feature based on user feedback?",
      "What tools do you use for prototyping and wireframing?",
      "How do you ensure your designs are accessible to all users?",
    ],
    "QA Engineer": [
      "How do you approach writing test cases for a new feature?",
      "Can you describe a time when you found a critical bug just before a release?",
      "What automation tools have you used for testing?",
      "How do you ensure good collaboration between QA and development teams?",
    ],
    "Custom Job Description": [
      "Tell me about yourself and your experience relevant to this role.",
      "What motivates you to work in this field?",
      "How do you handle pressure and tight deadlines?",
      "What are your strengths and weaknesses?",
    ],
  };

  const questions = roleQuestions[selectedRole] || roleQuestions["Custom Job Description"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVideoAllowed, setIsVideoAllowed] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const userVideoRef = useRef(null);
  const interviewerVideoRef = useRef(null);
  const streamRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const hasSpokenRef = useRef(false);

  // Start user video
  const startUserVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setIsVideoAllowed(true);
      setIsCameraOn(true);
      setIsMicOn(true);
      console.log("Webcam started successfully");
      console.log("Video tracks:", stream.getVideoTracks());
      console.log("Audio tracks:", stream.getAudioTracks());
      speakQuestion();
      hasSpokenRef.current = true;
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access your webcam. Please ensure you have given permission and are running the app in a secure context (e.g., localhost or HTTPS).");
    }
  };

  // Set the video stream after the component renders
  useEffect(() => {
    if (!isVideoAllowed || !streamRef.current) return;

    const setVideoStream = () => {
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = streamRef.current;
        userVideoRef.current.muted = true;
        userVideoRef.current.play().catch((err) => {
          console.error("Error playing user video:", err);
        });
        console.log("Video stream set successfully");
      } else {
        console.log("userVideoRef is still null, retrying...");
        setTimeout(setVideoStream, 100); 
      }
    };

    setVideoStream();
  }, [isVideoAllowed]);

  // Toggle camera
  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        console.log("Camera toggled:", videoTrack.enabled ? "On" : "Off");
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = streamRef.current;
        }
      } else {
        console.error("No video tracks found in stream");
      }
    } else {
      console.error("No stream available to toggle camera");
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
        console.log("Microphone toggled:", audioTrack.enabled ? "On" : "Off");
      } else {
        console.error("No audio tracks found in stream");
      }
    } else {
      console.error("No stream available to toggle microphone");
    }
  };


  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      console.log("Webcam stopped");
    }
    setIsVideoAllowed(false);
    setIsCameraOn(false);
    setIsMicOn(false);
  };

 
  const speakQuestion = () => {
    if (isSpeakingRef.current) {
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
      console.log("Stopped ongoing speech");
    }

    const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      console.log("Speech started for question:", questions[currentQuestionIndex]);
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
      hasSpokenRef.current = true;
      console.log("Speech completed for question:", questions[currentQuestionIndex]);
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      isSpeakingRef.current = false;
      hasSpokenRef.current = true;
    };

    speechSynthesis.speak(utterance);
  };


  useEffect(() => {
    if (!isVideoAllowed || hasSpokenRef.current) return;
    speakQuestion();
  }, [isVideoAllowed]);

 
  useEffect(() => {
    if (!isVideoAllowed || hasSpokenRef.current) return;
    speakQuestion();
  }, [currentQuestionIndex, questions]);

 
  useEffect(() => {
    return () => {
      stopWebcam();
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
      hasSpokenRef.current = false;
      console.log("Component unmounted, cleaned up webcam and speech");
    };
  }, []);


  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      hasSpokenRef.current = false;
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      hasSpokenRef.current = false;
    }
  };


  const handleLeave = () => {
    stopWebcam();
    speechSynthesis.cancel();
    isSpeakingRef.current = false;
    hasSpokenRef.current = false;
    navigate("/ai-mock-interviews/role-selection/InterviewQuestionsPage/InterviewReviewPage");
  };

  return (
    <div className={`interview-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Header Section */}
      <div className="header">
        <div className="header-left">
        <h2 className="hire-matrix-title">Hire-Matrix: </h2> <h2>{selectedRole}</h2>
        </div>
         <div className="header-right">
          <button onClick={toggleCamera}>
        <FaVideo className={`icon orange-icon ${isCameraOn ? "active" : "inactive"}`} />
        </button>
        <button className="leave-btn" onClick={handleLeave}>
        <FaPhoneAlt /> Leave
    </button>
  </div>
</div>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="interviewer-status">
            <p>Job Role <span className="status ready">{selectedRole}</span></p>
            <div className="status-indicator ready"></div>
          </div>
          <div className="room-selection">
            {isVideoAllowed ? (
              <div className="video-container">
                <div className="video-wrapper">
                  <h4>Interviewer</h4>
                  <video
                    // ref={interviewerVideoRef}
                    src="src/assets/AiMockInterviewsPage/Interviewer1.mp4"
                    autoPlay
                    loop
                    muted
                    className="interviewer-video"
                  />
                </div>
                <div className="video-wrapper">
                  <h4>You</h4>
                  <video ref={userVideoRef} autoPlay playsInline className="user-video" />
                  <div className="video-controls">
                  <button onClick={toggleCamera}>
                    <FaVideo className={`icon ${isCameraOn ? "active" : "inactive"}`} />
                  </button>
                  <button onClick={toggleMic}>
                    <FaMicrophone className={`icon ${isMicOn ? "active" : "inactive"}`} />
                  </button>
                </div>
                </div>
              </div>
            ) : (
              <>
                <p>Click below to start the video</p>
                <button className="select-btn" onClick={startUserVideo}>
                  Start
                </button>
              </>
            )}
          </div>
          <div className="transcript-info">
            
          </div>
        </div>

        {/* Middle Panel: Questions */}
        <div className="middle-panel">
          <div className="panel-header">
            <h3>Questions</h3>
            <div className="panel-controls">
              <button className="control-btn" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
              </button>
              <button className="control-btn" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                Next
              </button>
            </div>
          </div>
          <div className="panel-content">
            <p>{questions[currentQuestionIndex]}</p>
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
            <p>Thinking to convert User speech to text here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;