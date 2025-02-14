import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "Male",
        location: "",
        educationLevel: "High School",
        fieldOfStudy: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/register", { // Change this URL if your backend runs elsewhere
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert("Registration failed: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="body-register">
            <div className="container-register">
                <h2 className="heading">Registration</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="name" placeholder="Name" className="input" required onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email Address" className="input" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" className="input" required onChange={handleChange} />
                    <input type="number" name="age" placeholder="Age" className="input" min="1" required onChange={handleChange} />
                    <select name="gender" className="input" required onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="location" placeholder="Location" className="input" required onChange={handleChange} />
                    <select name="educationLevel" className="input" required onChange={handleChange}>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" name="fieldOfStudy" placeholder="Field of Study/Interest" className="input" required onChange={handleChange} />
                    <button type="submit" className="button">Register</button>
                </form>
                <p className="text">
                    Already have an account?{" "}
                    <Link to="/login" className="link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;
