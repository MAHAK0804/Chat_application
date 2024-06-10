import React, { useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assests/MACDOC.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

export default function Register() {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
      },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = Values;
      const { data } = await axios.post(registerRoute, {
        username, email, password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { password, confirm_password, username, email } = Values;
    if (password !== confirm_password) {
      toast.error("password and confirm_passsword should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    }
    return true;
  }
  const handleChange = (event) => {
    setValues({ ...Values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>MacDoc</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
          <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
          <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          <input type="password" placeholder='Confirm Password' name='confirm_password' onChange={(e) => handleChange(e)} />
          <button type='submit'>Create User</button>
          <span>already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
display:flex;
justify-content:center;
gap:1rem;
align-items:center;
img{
  height:5rem;
}
h1{
  color:white;
  text-transform:uppercase;
}
}
form{
  display:flex;
flex-direction:column;
gap:2rem;
background-color:#00000076;
border-radius:2rem;
padding:3rem 5rem;
input{
  background-color:transparent;
  padding:1rem;
  border:0.1rem solid #4e0eff;
  border-radius:0.4rem;
  color:white;
  width:100%;
  font-size:1rem;
  &:focus{
    border:0.1rem solid #997af0;
    outline: none;
  }
}
button{
  background-color:#997af0;
  color:white;
  padding:1rem 2rem;
  border:none;
  font-weight:bold;
  cursor:pointer;
  border-radius:0.4rem;
  font-size:1rem;
  text-transform:uppercase;
  transition:0.5s ease-in-out;
  &:hover{
    background-color:#4e0eff;
  }
}
span{
  color:white;
  text-transform:uppercase;
  a{
    color:#4e0eff;
    text-decoration:none;
    font-weight:bold;
  }
}
}

`;