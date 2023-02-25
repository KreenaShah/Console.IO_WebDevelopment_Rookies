import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Container, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import './Components.css'
import { useState, useEffect } from "react";

export const NavBar = () => {
  const navigate=useNavigate();
  const handleLogout = () => {
    console.log("Logout");
    navigate('/login');
    localStorage.removeItem("secret_token");
    console.log("Logout successfully");
    // window.location.reload();
    // window.location.reload();
  };

   // adding event listener for responsiveness
   const [width, setWindowWidth] = useState(0);

   useEffect(() => {
     updateDimensions();
     window.addEventListener("resize", updateDimensions);
     return () => window.removeEventListener("resize", updateDimensions);
   }, []);
 
   const updateDimensions = () => {
     const width = window.innerWidth;
     setWindowWidth(width);
   };
 
   const response = { responsive: width < 1036 };
   const resp = response.responsive;
   const response2 = { responsive: width < 700 };
   const resp2 = response2.responsive;
   //

  return(
    <Paper
    className='WebsiteUserData'
      elevation={3}
      style={{ width: resp? "50vw" : "70vw", position: "relative", left: resp ? "17%" :"3%", top: "10%" }}
    >
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "white", borderRadius: "4px" }}>
          <Typography variant="h6" style={{ color: "black" }}>
            Admin Overview
          </Typography>
          <Box flexGrow={1} />
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
          {/* <IconButton>
            <AccountCircleOutlinedIcon />
          </IconButton> */}
          <Button sx={{ color: "", fontSize: 13 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Paper>
  )
};