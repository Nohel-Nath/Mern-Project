import React ,{useState}from "react";
import { ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const setVal = (e) => {
        setEmail(e.target.value)
    }
    const sendLink = async (e) => {
        e.preventDefault();

       try{
        const res = await axios.post(
            'http://localhost:4040/passwordLink',JSON.stringify({email}),
            {
              headers: {
                'Content-Type': 'application/json'
              },
             
            }
          );
          const data = res.data;
          if (data.status === 201) {
            setEmail("");
            setMessage(true)
        } else {
            toast.error("Invalid User",{
                position: "top-center"
            })
        }
    } catch(error)
    {
        console.error(error);
    }
    }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Enter Your Email</h1>
          </div>
          {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password reset link send successfully in Your Email</p> : ""}
          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
           

            <button className="btn" onClick={sendLink}>
              Send
            </button>
            
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
