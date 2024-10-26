// Login.js
import React from 'react';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue to your chat app</p>
                
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="footer-text">
                    <p>Don't have an account? <a href="/register">Register!</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
