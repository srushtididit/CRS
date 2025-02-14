// Frontend - React Component (src/components/Questionnaire.jsx)
import React, { useState } from "react";

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    partTimeJob: false,
    schoolMissed: "",
    extracurricular: false,
    studyHours: "",
    careerAspiration: "",
    scores: {
      math: "",
      history: "",
      physics: "",
      chemistry: "",
      biology: "",
      english: "",
      geography: ""
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/Questionnaire", {  // Correct API endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(`Recommended Career: ${data.recommendation}`);
};


  return (
    <div>
      <h2>Student Performance & Prediction Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>
          <input type="checkbox" name="partTimeJob" onChange={handleChange} /> Part-Time Job
        </label>
        <input name="schoolMissed" placeholder="Days Missed" onChange={handleChange} />
        <label>
          <input type="checkbox" name="extracurricular" onChange={handleChange} /> Extracurricular Activities
        </label>
        <input name="studyHours" placeholder="Study Hours per Week" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Questionnaire;
