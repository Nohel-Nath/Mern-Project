import React, { useState } from "react";
import "./mix.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Registration() {
  const navigate = useNavigate();

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCpassShow] = useState(false);

  /*const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")*/

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  //console.log(inpval)

  const setVal = (e) => {
    //console.log(e.target.value)

    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpval;
    const validEmailRegex = RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    );

    if (name === "") {
      toast.warning("Name is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!validEmailRegex.test(email)) {
      toast.warning("Please enter a valid email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password must be 5 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.error("Your password is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 5) {
      toast.error("confirm password must be 5 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      //console.log("user registration successfully done");
      //toast.success("Registered Successfully",{
      //position: "top-center"
      //});
      /*const data = await fetch("http://localhost:4040/registration",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            })
            const res = await data.json();
            console.log(res);*/
      try {
        await axios.post(
          "http://localhost:4040/registration",
          JSON.stringify({ name, email, password, cpassword }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //const res = await response.json();
        //console.log(response.data);
        /*toast.success('Registration successful', {
                    position: 'top-center'
                });*/
        toast.success("Registration successful", {
          position: "top-center",
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Check email and password!", {
          position: "top-center",
        });
        navigate("/registration");
      }
    }
  };
  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome , Open Your Account</h1>
          <p>Hope, you are doing well</p>
        </div>

        <form>
          <div className="form_input">
            <label htmlFor="name">
              <FaUser /> Name
            </label>
            <input
              type="text"
              onChange={setVal}
              value={inpval.name}
              name="name"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              onChange={setVal}
              value={inpval.email}
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                onChange={setVal}
                value={inpval.password}
                name="password"
                id="password"
                placeholder="Enter Your password"
              />
              <div className="showpass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <div className="form_input">
            <label htmlFor="password">
              <FaLock />
              Confirm Password
            </label>
            <div className="two">
              <input
                type={!cpassShow ? "password" : "text"}
                onChange={setVal}
                value={inpval.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Enter Your password"
              />
            </div>
          </div>

          <button className="btn" onClick={addUserData}>
            SignUp
          </button>
          <p>
            Already have an Account?<NavLink to="/"> Log In </NavLink>
          </p>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}

export default Registration;
