// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaPhoneAlt, FaArrowLeft } from "react-icons/fa";
// import interviewerVideo from "../assets/AiMockInterviewsPage/Interviewer1.mp4";
// import useRecorder from "../hooks/useRecorder";
// import { useSelector } from "react-redux";


// const MockInterview = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedRole = location.state?.selectedRole || "Customer Service Representative";

//   const roleQuestions = {
//     "Customer Service Representative": [
//       "How do you handle a situation where a customer is very upset and dissatisfied with our service?",
//       "Can you describe a time when you went above and beyond to help a customer?",
//       "What steps do you take to ensure clear communication with customers over the phone?",
//       "How do you manage your time when dealing with multiple customer inquiries at once?",
//     ],
//     "Software Engineer": [
//       "Can you Introduce Yourself",
//       "Can you explain the difference between a class and an object in object-oriented programming?",
//       "What is your experience with React, and how have you used it in past projects?",
//       "How do you approach debugging a complex issue in a codebase?",
//       "What are the benefits of using version control systems like Git?",
//     ],
//     "Business Analyst": [
//       "How do you gather and document requirements from stakeholders?",
//       "Can you describe a time when you had to deal with conflicting stakeholder requirements?",
//       "What tools do you use for creating process flow diagrams?",
//       "How do you ensure that your analysis aligns with the business goals?",
//     ],
//     "Product Manager": [
//       "How do you prioritize features in a product roadmap?",
//       "Can you describe a time when you had to say no to a stakeholder’s request?",
//       "What metrics do you use to measure the success of a product launch?",
//       "How do you handle a situation where a product is not meeting user expectations?",
//     ],
//     "Marketing Specialist": [
//       "How do you create a marketing campaign that targets a specific audience?",
//       "What tools do you use to measure the success of a marketing campaign?",
//       "Can you describe a time when a campaign didn’t perform as expected? How did you handle it?",
//       "How do you stay updated with the latest marketing trends?",
//     ],
//     "Sales Representative": [
//       "How do you handle objections from a potential customer during a sales pitch?",
//       "Can you describe a time when you closed a challenging sale?",
//       "What strategies do you use to build rapport with clients?",
//       "How do you manage your sales pipeline to ensure consistent performance?",
//     ],
//     "Human Resources Specialist": [
//       "How do you handle a situation where an employee has a conflict with their manager?",
//       "What steps do you take to ensure a fair recruitment process?",
//       "Can you describe a time when you had to implement a new HR policy?",
//       "How do you ensure employee engagement in a remote work environment?",
//     ],
//     "Data Analyst": [
//       "What tools do you use for data visualization, and why?",
//       "Can you describe a time when your data analysis led to a significant business decision?",
//       "How do you ensure the accuracy of your data analysis?",
//       "What steps do you take to clean and preprocess data before analysis?",
//     ],
//     "UX/UI Designer": [
//       "How do you conduct user research to inform your design decisions?",
//       "Can you describe a time when you had to redesign a feature based on user feedback?",
//       "What tools do you use for prototyping and wireframing?",
//       "How do you ensure your designs are accessible to all users?",
//     ],
//     "QA Engineer": [
//       "How do you approach writing test cases for a new feature?",
//       "Can you describe a time when you found a critical bug just before a release?",
//       "What automation tools have you used for testing?",
//       "How do you ensure good collaboration between QA and development teams?",
//     ],
//     "Custom Job Description": [
//       "Tell me about yourself and your experience relevant to this role.",
//       "What motivates you to work in this field?",
//       "How do you handle pressure and tight deadlines?",
//       "What are your strengths and weaknesses?",
//     ],
//   };

//   const { startRecording, stopRecording, isRecording } = useRecorder();
//   const { finalText, partialText } = useSelector((state) => state.transcription)

//   const questions = roleQuestions[selectedRole] || roleQuestions["Custom Job Description"];
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isVideoAllowed, setIsVideoAllowed] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [recognitionError, setRecognitionError] = useState("");
//   const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(true);
//   const [isRecognizing, setIsRecognizing] = useState(false);
//   const [shouldRestart, setShouldRestart] = useState(false);
//   const userVideoRef = useRef(null);
//   const interviewerVideoRef = useRef(null);
//   const streamRef = useRef(null);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const actionRef = useRef(null);
//   const isButtonClickedRef = useRef(false);


//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       setIsSpeechRecognitionSupported(true);
//     } else {
//       setIsSpeechRecognitionSupported(false);
//       setRecognitionError("Speech recognition is not supported in this browser.");
//     }

//     return () => {
//       stopSpeechRecog();
//       stopWebcam();
//     };
//   }, []);

//   const runSpeechRecog = () => {
//     if (isButtonClickedRef.current) return; 
//     isButtonClickedRef.current = true;
//     setTimeout(() => { isButtonClickedRef.current = false; }, 500);

//     setUserAnswer((prev) => prev || "Loading text...");
//     setIsRecognizing(true);
//     setRecognitionError("");
//     setShouldRestart(true);

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognization = new SpeechRecognition();
//     recognization.continuous = true;
//     recognization.interimResults = true;
//     recognization.lang = "en-US";

//     recognization.onstart = () => {
//       if (actionRef.current) {
//         actionRef.current.innerHTML = "Listening...";
//       }
//       console.log("Speech recognition started");
//     };

//     recognization.onresult = (e) => {
//       let interimTranscript = "";
//       let finalTranscript = userAnswer.replace("Loading text...", "");

//       for (let i = e.resultIndex; i < e.results.length; i++) {
//         const transcript = e.results[i][0].transcript;
//         if (e.results[i].isFinal) {
//           finalTranscript += transcript + " ";
//         } else {
//           interimTranscript += transcript;
//         }
//       }

//       console.log("Final:", finalTranscript, "Interim:", interimTranscript);
//       setUserAnswer(finalTranscript + interimTranscript);
//       if (actionRef.current && !interimTranscript) {
//         actionRef.current.innerHTML = "";
//       }
//     };

//     recognization.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       let errorMessage = "Sorry, I could not understand.";
//       if (event.error === "no-speech" || event.error === "aborted") {
//         errorMessage = "Please speak to provide your answer.";
//         setRecognitionError(errorMessage);
//         if (isVideoAllowed && shouldRestart && !isSpeakingRef.current) {
//           setTimeout(runSpeechRecog, 1000);
//         }
//       } else if (event.error === "not-allowed") {
//         errorMessage = "Microphone permission denied. Please allow microphone access and type your answer below.";
//         setRecognitionError(errorMessage);
//         recognization.stop();
//         setIsRecognizing(false);
//         setShouldRestart(false);
//       } else {
//         setRecognitionError(errorMessage);
//         recognization.stop();
//         setIsRecognizing(false);
//         setShouldRestart(false);
//       }
//     };

//     recognization.onend = () => {
//       console.log("Speech recognition stopped");
//       setIsRecognizing(false);
//       if (actionRef.current) {
//         actionRef.current.innerHTML = "";
//       }
//       if (isVideoAllowed && shouldRestart && !isSpeakingRef.current) {
//         setTimeout(runSpeechRecog, 1000);
//       }
//     };

//     recognitionRef.current = recognization;
//     try {
//       recognization.start();
//     } catch (err) {
//       console.error("Error starting speech recognition:", err);
//       setRecognitionError("Failed to start speech recognition. Please check microphone permissions.");
//       setIsRecognizing(false);
//       setShouldRestart(false);
//       isButtonClickedRef.current = false;
//     }
//   };

//   const stopSpeechRecog = () => {
//     if (isButtonClickedRef.current) return; 
//     isButtonClickedRef.current = true;
//     setTimeout(() => { isButtonClickedRef.current = false; }, 500);

//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null; 
//       setIsRecognizing(false);
//       setShouldRestart(false);
//       if (actionRef.current) {
//         actionRef.current.innerHTML = "";
//       }
//       console.log("Speech recognition stopped manually");
//     }
//   };

//   const startUserVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       streamRef.current = stream;
//       setIsVideoAllowed(true);
//       console.log("Webcam started successfully");
//       console.log("Video tracks:", stream.getVideoTracks());
//       console.log("Audio tracks:", stream.getAudioTracks());
//     } catch (err) {
//       console.error("Error accessing webcam:", err);
//       alert("Could not access your webcam or microphone. Please ensure you have given permission and are running the app in a secure context (e.g., localhost or HTTPS).");
//     }
//   };

//   useEffect(() => {
//     if (!isVideoAllowed || !streamRef.current) return;

//     const setVideoStream = () => {
//       if (userVideoRef.current) {
//         userVideoRef.current.srcObject = streamRef.current;
//         userVideoRef.current.muted = true;
//         userVideoRef.current.play().catch((err) => {
//           console.error("Error playing user video:", err);
//         });
//         console.log("Video stream set successfully");
//       } else {
//         console.log("userVideoRef is still null, retrying...");
//         setTimeout(setVideoStream, 100);
//       }
//     };

//     setVideoStream();
//   }, [isVideoAllowed]);

//   const stopWebcam = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => {
//         track.stop();
//         console.log(`Stopped track: ${track.kind}`);
//       });
//       streamRef.current = null;
//       console.log("Webcam and microphone stopped");
//     }
//     setIsVideoAllowed(false);
//   };

//   const playVideo = () => {
//     // if (interviewerVideoRef.current) {
//     //   interviewerVideoRef.current.play().catch((err) => {
//     //     console.error("Error playing interviewer video:", err);
//     //   });
//     //   console.log("Interviewer video started");
//     // }
//   };

//   const pauseVideo = () => {
//     // if (interviewerVideoRef.current) {
//     //   interviewerVideoRef.current.pause();
//     //   console.log("Interviewer video paused");
//     // }
//   };

//   const speakQuestion = async () => {
//     if (isSpeakingRef.current) {
//       speechSynthesis.cancel();
//       isSpeakingRef.current = false;
//       console.log("Stopped ongoing speech");
//     }

//     pauseVideo();
//     stopSpeechRecog();
//     setUserAnswer("");

//     await new Promise((resolve) => setTimeout(resolve, 100));

//     const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
//     utterance.lang = "en-US";
//     utterance.rate = 1;
//     utterance.pitch = 1;

//     utterance.onstart = () => {
//       isSpeakingRef.current = true;
//       playVideo();
//       console.log("Speech started for question:", questions[currentQuestionIndex]);
//     };

//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       pauseVideo();
//       console.log("Speech completed for question:", questions[currentQuestionIndex]);
//     };

//     utterance.onerror = (event) => {
//       console.error("Speech error:", event.error);
//       isSpeakingRef.current = false;
//       pauseVideo();
//       console.log("Interviewer video paused due to speech error");
//     };

//     speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (isVideoAllowed) {
//       speakQuestion();
//     }
//   }, [isVideoAllowed, currentQuestionIndex]);

//   useEffect(() => {
//     return () => {
//       stopWebcam();
//       speechSynthesis.cancel();
//       stopSpeechRecog();
//       isSpeakingRef.current = false;
//       pauseVideo();
//       console.log("Component unmounted, cleaned up webcam, microphone, speech, and recognition");
//     };
//   }, []);

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       stopSpeechRecog();
//       setUserAnswer("");
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       stopSpeechRecog();
//       setUserAnswer("");
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handleLeave = () => {
//     stopWebcam();
//     speechSynthesis.cancel();
//     stopSpeechRecog();
//     isSpeakingRef.current = false;
//     pauseVideo();
//     navigate("/ai-mock-interviews/role-selection/InterviewQuestionsPage/InterviewReviewPage");
//   };

//   const handleBack = () => {
//     stopWebcam();
//     speechSynthesis.cancel();
//     stopSpeechRecog();
//     isSpeakingRef.current = false;
//     pauseVideo();
//     navigate("/ai-mock-interviews/role-selection");
//   };

//   return (
//     <div className={`interview-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
//       <div className="header">
//         <div className="header-left">
//           <button className="back-btn" onClick={handleBack}>
//             <FaArrowLeft /> Back
//           </button>
//           <h2 className="hire-matrix-title">Hire-Matrix: </h2> <h2>{selectedRole}</h2>
//         </div>
//         <div className="header-right">
//           <button className="leave-btn" onClick={handleLeave}>
//             <FaPhoneAlt /> Leave
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="left-panel">
//           <div className="interviewer-status">
//             <p>Job Role <span className="status ready">{selectedRole}</span></p>
//             <div className="status-indicator ready"></div>
//           </div>
//           <div className="room-selection">
//             {isVideoAllowed ? (
//               <div className="video-container">
//                 <div className="video-wrapper">
//                   <h4>Interviewer</h4>
//                   <video
//                     ref={interviewerVideoRef}
//                     src={interviewerVideo}
//                     loop
//                     muted
//                     className="interviewer-video"
//                     onError={(e) => console.error("Video failed to load:", e)}
//                   />
//                 </div>
//                 <div className="video-wrapper">
//                   <h4>You</h4>
//                   <video ref={userVideoRef} autoPlay playsInline className="user-video" />
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <p>Click below to start the video</p>
//                 <button className="select-btn" onClick={startUserVideo}>
//                   Start
//                 </button>
//               </>
//             )}
//           </div>
//           <div className="transcript-info"></div>
//         </div>
//         <div className="middle-panel">
//           <div className="panel-header">
//             <h3>Questions</h3>
//             <div className="panel-controls">
//               <button className="control-btn" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
//                 Previous
//               </button>
//               <button className="control-btn" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
//                 Next
//               </button>
//             </div>
//           </div>
//           <div className="panel-content">
//             <p>{questions[currentQuestionIndex]}</p>
//           </div>
//         </div>
//         <div className="right-panel">
//           <div className="panel-header">
//             <h3>Your Answer</h3>
//             <div className="status-indicator ready"></div>
//             <p className="status ready">Speech to Text</p>
//           </div>
//           <div className="panel-content">
//             {isVideoAllowed && (
//               <div className="speaker">
//                 <p ref={actionRef} className="action"></p>
//                 <div>
//                   {/* <button onClick={runSpeechRecog} disabled={isRecognizing}> */}
//                     {/* Start Speaking */}
//                   {/* </button> */}
//                   {/* <button onClick={stopSpeechRecog} disabled={!isRecognizing}> */}
//                     {/* Stop Speaking */}
//                   {/* </button> */}
//                   <button onClick={startRecording} disabled={isRecording}>
//                     Start Speaking
//                   </button>
//                   <button onClick={stopRecording} disabled={!isRecording}>
//                     Stop Speaking
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* {!isSpeechRecognitionSupported || recognitionError.includes("not-allowed") ? (
//               <>
//                 <p className="error">{recognitionError}</p>
//                 <textarea
//                   value={userAnswer}
//                   onChange={(e) => setUserAnswer(e.target.value)}
//                   placeholder="Type your answer here..."
//                   className="answer-textarea"
//                 />
//               </>
//             ) : recognitionError.includes("Please speak") ? (
//               <p className="alert">{recognitionError}</p>
//             ) : userAnswer ? (
//               <p>{userAnswer}</p>
//             ) : (
//               <p>Speak your answer, and it will appear here...</p>
//             )} */}
//             <p>Text: </p>
//             <p>{finalText + partialText}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MockInterview;




import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaArrowLeft } from "react-icons/fa";
import interviewerVideo from "../assets/AiMockInterviewsPage/Interviewer1.mp4";
import useRecorder from "../hooks/useRecorder";
import { useSelector } from "react-redux";

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
      "Can you describe a time when you had to say no to a stakeholder's request?",
      "What metrics do you use to measure the success of a product launch?",
      "How do you handle a situation where a product is not meeting user expectations?",
    ],
    "Marketing Specialist": [
      "How do you create a marketing campaign that targets a specific audience?",
      "What tools do you use to measure the success of a marketing campaign?",
      "Can you describe a time when a campaign didn't perform as expected? How did you handle it?",
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

  const { startRecording, stopRecording, isRecording } = useRecorder();
  const { finalText, partialText } = useSelector((state) => state.transcription);

  const questions = roleQuestions[selectedRole] || roleQuestions["Custom Job Description"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVideoAllowed, setIsVideoAllowed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const userVideoRef = useRef(null);
  const interviewerVideoRef = useRef(null);
  const streamRef = useRef(null);
  const isSpeakingRef = useRef(false);

  const startUserVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setIsVideoAllowed(true);
      console.log("Webcam started successfully");
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert("Could not access your webcam or microphone. Please ensure you have given permission and are running the app in a secure context (e.g., localhost or HTTPS).");
    }
  };

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

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log(`Stopped track: ${track.kind}`);
      });
      streamRef.current = null;
      console.log("Webcam and microphone stopped");
    }
    setIsVideoAllowed(false);
  };

  const playVideo = () => {
    // Uncomment if you want to control interviewer video
    // if (interviewerVideoRef.current) {
    //   interviewerVideoRef.current.play().catch((err) => {
    //     console.error("Error playing interviewer video:", err);
    //   });
    //   console.log("Interviewer video started");
    // }
  };

  const pauseVideo = () => {
    // Uncomment if you want to control interviewer video
    // if (interviewerVideoRef.current) {
    //   interviewerVideoRef.current.pause();
    //   console.log("Interviewer video paused");
    // }
  };

  const speakQuestion = async () => {
    if (isSpeakingRef.current) {
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
      console.log("Stopped ongoing speech");
    }

    pauseVideo();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      playVideo();
      console.log("Speech started for question:", questions[currentQuestionIndex]);
    };

    utterance.onend = () => {
      isSpeakingRef.current = false;
      pauseVideo();
      console.log("Speech completed for question:", questions[currentQuestionIndex]);
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      isSpeakingRef.current = false;
      pauseVideo();
      console.log("Interviewer video paused due to speech error");
    };

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isVideoAllowed) {
      speakQuestion();
    }
  }, [isVideoAllowed, currentQuestionIndex]);

  useEffect(() => {
    return () => {
      stopWebcam();
      speechSynthesis.cancel();
      isSpeakingRef.current = false;
      pauseVideo();
      console.log("Component unmounted, cleaned up webcam, microphone, and speech");
    };
  }, []);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleLeave = () => {
    stopWebcam();
    speechSynthesis.cancel();
    isSpeakingRef.current = false;
    pauseVideo();
    navigate("/ai-mock-interviews/role-selection/InterviewQuestionsPage/InterviewReviewPage");
  };

  const handleBack = () => {
    stopWebcam();
    speechSynthesis.cancel();
    isSpeakingRef.current = false;
    pauseVideo();
    navigate("/ai-mock-interviews/role-selection");
  };

  return (
    <div className={`interview-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <div className="header-left">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h2 className="hire-matrix-title">Hire-Matrix: </h2> <h2>{selectedRole}</h2>
        </div>
        <div className="header-right">
          <button className="leave-btn" onClick={handleLeave}>
            <FaPhoneAlt /> Leave
          </button>
        </div>
      </div>

      <div className="main-content">
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
                    ref={interviewerVideoRef}
                    src={interviewerVideo}
                    loop
                    muted
                    className="interviewer-video"
                    onError={(e) => console.error("Video failed to load:", e)}
                  />
                </div>
                <div className="video-wrapper">
                  <h4>You</h4>
                  <video ref={userVideoRef} autoPlay playsInline className="user-video" />
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
          <div className="transcript-info"></div>
        </div>
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
        <div className="right-panel">
          <div className="panel-header">
            <h3>Your Answer</h3>
            <div className="status-indicator ready"></div>
            <p className="status ready">Speech to Text</p>
          </div>
          <div className="panel-content">
            {isVideoAllowed && (
              <div className="speaker">
                <div>
                  <button onClick={startRecording} disabled={isRecording}>
                    Start Speaking
                  </button>
                  <button onClick={stopRecording} disabled={!isRecording}>
                    Stop Speaking
                  </button>
                </div>
              </div>
            )}
            <p>Text: </p>
            <p>{finalText + partialText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;