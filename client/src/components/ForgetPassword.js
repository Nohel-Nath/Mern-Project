import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams , NavLink} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import "./mix.css";

const ForgetPassword = () => {



  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [data2, setData] = useState(false);
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();


  const userValid = async () => {
    try {
      const response = await axios.get(`http://localhost:4040/forget-password/${id}/${token}`, {
        headers: {
          "Content-Type": "application/json",
          //'Authorization': token,
        },
      });

      const data = response.data
      if(data.status === 201){
        console.log("user valid",)
      }else{
        navigate("*")
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const setVal =(e)=>{
    setPassword(e.target.value)
  }

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
          position: "top-center"
      });
  }
  else if (password.length < 5) {
    toast.error("password must be 6 char!", {
        position: "top-center"
    });
} 
else{

    try {
      const response = await axios.post(`http://localhost:4040/${id}/${token}`,JSON.stringify({password}), {
        headers: {
          "Content-Type": "application/json",
          //'Authorization': token,
        },
      });
      const data = response.data
      if(data.status === 201){
        setPassword("")
        setMessage(true)
        toast.success("Password changed", {
          position:"top-center"
        })
        navigate("/")
      }else{
        toast.error("! Token Expired generate new LInk",{
          position: "top-center"
      })
      navigate("*")
      }
      
    } catch (error) {
      console.error(error);
      
    }
  }

  }

  useEffect(() => {
    userValid()
    setTimeout(() => {
        setData(true)
    }, 1000)
}, [])

  return (
    <>
    {
      data2 ? (
        <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your New Password</h1>
          </div>
          <form>
          {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Successfully Updated</p> : ""}
            <div className="form_input">
              <label htmlFor="email">New Password</label>
              <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                onChange={setVal}
                value={password}
                name="password"
                id="password"
                placeholder="Enter Your New Password"
              />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
            </div>
            <button className="btn" onClick={sendpassword}>
              Send
            </button>
            
          </form>
          <p><NavLink to="/">Home</NavLink></p>
          <ToastContainer position="top-center" />
        </div>
      </section>
      </>
      ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
    }
    </>
  )
}

export default ForgetPassword
