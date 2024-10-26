import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { registerRoute } from '../Api_routes/route';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      console.log("Register  ", user);
      setUser(JSON.parse(localStorage.getItem("chat-user")));
      console.log("Register  ", user);
      navigate("/chat");
    }
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      if (handleValidation()) {
        const { data } = await axios.post(registerRoute, { userEmail, userName, password });
        if (data.success) {
          setIsRegistered(true);
          setRegisterError(false);
          toast.success("Registered successfully!")
          navigate("/");
        }
        else {
          setRegisterError(true);
          setRegisterMessage(data.message);
          throw new Error(data.message);
        }
      }
    }catch(error){
      console.log("THE ERROR MESSAGE FROM THE BACKEND USER CREATE",error);
      toast.error(error.response.data.message);
    }
    return;
  }
  const validateEmail = () => {
    const mail = document.getElementById("myemail").value;
    var regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
    if (regex.test(mail)) {
      console.log("i am here email");
      return true;
    }
    else {
      return false;
    }
  }
  const handleValidation = () => {
    if (userName === '') {
      toast.error('Username is empty')
      setRegisterError(true);
      setRegisterMessage("please fill the username");
      return false;
    }
    else if (!validateEmail()) {
      if(userEmail==""){
        toast.error("useremail is empty");
        return;
      }
      toast.error('Invalid email');
      setRegisterError(true);
      setRegisterMessage("Enter a valid  email ")
      return false;
    }
    else if (password === "") {
      toast.error("password is empty")
      setRegisterError(true);
      setRegisterMessage("password cant be empty")
      return false;
    }
    return true;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Create an Account</h2>
        <p>Join our chat community</p>

        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input required placeholder='username...' value={userName} type="text" name="username" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="myemail">Email</label>
            <input required id="myemail" placeholder='Email...' value={userEmail} type="email" name="useremail" onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input required placeholder='password..' value={password} type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" onClick={(e) => handleClick(e)} className="login-button">Register</button>
        </form>

        <div className="footer-text">
          <p>Already have an account? <a href="/login">Login!</a></p>
        </div>
      </div>
    </div>
  )
}

