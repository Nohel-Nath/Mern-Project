import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Registration from "./components/Registration";
import Footer_file from "./components/Footer_file";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { loginContext } from "./components/ContextProvider/Context";
import axios from "axios";
import PasswordReset from "./components/PasswordReset";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const [data, setData] = useState(false);
  const location = useLocation();

  const { loginData, setLoginData } = useContext(loginContext);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const DashValid = async () => {
    try {
      let token = localStorage.getItem("usersdatatoken");
      const response = await axios.get("http://localhost:4040/validUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = response.data;
      if (data.status === 401 || !data) {
        navigate("*");
      } else {
        console.log("user verified");
        setLoginData(data);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle any error that occurred during the API request
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashValid();
      setData(true);
    }, 1000);
  }, []);

  const showFooter = !["/registration", "/password-reset"].includes(
    location.pathname
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <div className={darkMode ? "dark" : ""}>
        {data ? (
          <>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route
                path="/forget-password/:id/:token"
                element={<ForgetPassword />}
              />
              <Route path="*" element={<Error />} />
            </Routes>
            {showFooter && <Footer_file />}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  );
}

export default App;
