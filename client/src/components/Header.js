import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { loginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";

function Header({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(loginContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    goDash();
    handleClose();
  };

  const logOutUser = async () => {
    try {
      let token = localStorage.getItem("usersdatatoken");
      const response = await axios.get("http://localhost:4040/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        withCredentials: true,
      });

      const data = response.data;
      console.log(data);
      if (data.status === 201) {
        console.log("User logged out");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false);
        navigate("/");
      } else {
        navigate("*");
      }
    } catch (error) {
      // Handle any error that occurred during the API request
      console.log("error");
    }
  };

  const goDash = () => {
    navigate("/dashboard");
  };
  const goError = () => {
    navigate("*");
  };

  return (
    <>
      <header>
        <nav>
          <div className="header-container">
            <NavLink to="/">
              <h1>Form Page</h1>
            </NavLink>

            <div className="dark-mode-toggle" onClick={toggleDarkMode}>
              <Brightness2OutlinedIcon
                style={{
                  color: darkMode ? "navy" : "black",
                }}
              />
            </div>
          </div>
          <div className="avtar">
            {loginData.ValidUserOne ? (
              <div className="avatar-container">
                <span className="hello-text">Hello, </span>
                <Avatar
                  style={{
                    background: "salmon",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClick}
                >
                  {loginData.ValidUserOne.name[0].toUpperCase()}
                </Avatar>
              </div>
            ) : (
              <div className="avatar-container">
                <span className="hello-text">Hello, </span>
                <Avatar style={{ background: "blue" }} onClick={handleClick}>
                  H
                </Avatar>
              </div>
            )}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.ValidUserOne ? (
              [
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>,
                <MenuItem
                  key="logout"
                  onClick={() => {
                    logOutUser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>,
              ]
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
}

export default Header;
