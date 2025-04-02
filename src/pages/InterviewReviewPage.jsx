import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    alert("Thank you for your feedback!");
    navigate("/ai-mock-interviews/role-selection"); 
  };

  return (
    <div className="review-container">
      <h2>How was your interview experience?</h2>
      <div className="rating">
        <label>Rate your experience (1-5):</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="feedback">
        <label>Tell us more about your experience:</label>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Share your thoughts..."
        />
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default ReviewPage;