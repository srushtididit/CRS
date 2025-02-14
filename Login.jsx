import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = () => {
    return (
        <div className="body-login">
            <div className="container-login">
                <h2 className="heading">Login</h2>
                <form action="LoginServlet" method="post" className="form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input"
                        required
                    />
                    <input type="submit" value="Login" className="button" />
                    <input type="reset" value="Reset" className="button" />
                </form>
                <p className="text">
                    Don't have an account?{' '}
                    <Link to="/register" className="link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
