// Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { loginRoute } from '../Api_routes/route';
import axios from 'axios';

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("chat-user")) {
            setUser(JSON.parse(localStorage.getItem("chat-user")));
            navigate("/chat");
        }
    }, [])

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (handleValidation()) {
                console.log("hi");
                const response= await axios.post(loginRoute, { userEmail, password });
                console.log("printing the data::",response);
                if (response.data.success) {
                    localStorage.setItem("chat-user", JSON.stringify(response.data.data));
                    setUser(JSON.parse(JSON.stringify(response.data.data)));
                    toast.success("login Success");
                    navigate("/chat");
                }
                else {
                    throw new Error(response.data.message);
                }
            }
        } catch (error) {
            console.log("THE ERROR MESSAGE FROM THE BACKEND USER CREATE", error);
            toast.error(error.response.data.message);
        }
        return;
    }

    const validateEmail = () => {
        const mail = document.getElementById("myemail").value;
        var regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
        if (regex.test(mail)) {
            return true;
        }
        else {
            return false;
        }
    }
    const handleValidation = () => {
        if (!validateEmail()) {
            if (userEmail == "") {
                toast.error("User email is empty");
                return false;
            }
            toast.error("Emails is invalid")
            return false;
        }
        else if (password === "") {
            toast.error("password cant be empty")
            return false;
        }
        return true;
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue to your chat app</p>

                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input required id="myemail" placeholder='Email...' value={userEmail} type="email" name="userEmail" onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input required placeholder='password..' value={password} type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={(e) => handleClick(e)} type="submit" className="login-button">Login</button>
                </form>

                <div className="footer-text">
                    <p>Don't have an account? <a href="/register">Register!</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
