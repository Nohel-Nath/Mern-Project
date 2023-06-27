import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginContext } from "./ContextProvider/Context";
import "./dashboard.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const [data, setData] = useState(false);
  const { loginData, setLoginData } = useContext(loginContext);
  const navigate = useNavigate();

  //console.log(loginData.ValidUserOne.email)

  const DashValid = async () => {
    /*let token = localStorage.getItem("usersdatatoken");
    //console.log(token);
    const res = await fetch("http://localhost:4040/validUser", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token
      }
  });

  const data = await res.json();
  if (data.status === 401 || !data) {
    navigate("*");
    
}
else{
  console.log("user verify")
  setLoginData(data)
  navigate("/dashboard");
}*/
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

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "281px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <div className="dashboard-container">
            <h2 className="dashboard-title">User Information</h2>
            <div className="user-info">
              <div className="user-info-item">
                <span className="user-info-label"> UserName:</span>
                <span className="user-info-value">
                  {loginData.ValidUserOne
                    ? loginData.ValidUserOne.name
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : ""}
                </span>
              </div>
              <div className="user-info-item">
                <span className="user-info-label">Email:</span>
                <span className="user-info-value">
                  {loginData.ValidUserOne ? loginData.ValidUserOne.email : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default Dashboard;
