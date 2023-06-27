import React ,{useState}from 'react'
import './mix.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from "react-icons/fa";


function Login() {
    const navigate = useNavigate();



const [passShow, setPassShow] = useState(false);

const [inpval, setInpval] = useState({
    email: "",
    password: "",
});

console.log(inpval)


const setVal = (e) => {
    //console.log(e.target.value)

    const { name, value } = e.target;

    setInpval(() => {
        return {
            ...inpval,
            [name]: value
        }
    })
}


const loginUser = async(e)=>{
    e.preventDefault();

    const { email, password } = inpval;
    const validEmailRegex = RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    );

    if (email === "") {
        toast.error("email is required!", {
            position: "top-center"
        });
    } else if (!validEmailRegex.test(email)) {
        toast.warning("Please enter a valid email!", {
            position: "top-center"
        });
    } else if (password === "") {
        toast.error("password is required!", {
            position: "top-center"
        });
    } else if (password.length < 5) {
        toast.error("password must be 5 char!", {
            position: "top-center"
        });
    } else {
        try {
            const res = await axios.post(
              'http://localhost:4040/login',JSON.stringify({email,password }),
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true
              }
            );
            /*toast.success('Login successful', {
                position: 'top-center',
            })
            navigate('/dashboard')*/
            if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.data.result.token);
                toast.success('Login successful', {
                    position: 'top-center',
                })
                navigate('/dashboard')
            }

          } catch (error) {
            console.error(error);
            toast.error("Invalid Details!", {
                position: "top-center"
            });
            navigate('/')
          }
    }
}

return (
    <>
    <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                        <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                        <label htmlFor="password">
              <FaLock /> Password
            </label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)} >
                                {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/registration">Sign Up</NavLink> </p>
                        <p style={{color:"black",fontWeight:"bold"}}>Forgot Password?  <NavLink to="/password-reset">Click Here</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
            </>
)
}

export default Login
