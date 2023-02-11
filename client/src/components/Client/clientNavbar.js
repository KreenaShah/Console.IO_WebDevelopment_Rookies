import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Container, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import * as React from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <Paper
      elevation={3}
      style={{ width: "94%", position: "relative", left: "3%", top: "5%" }}
    >
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "white", borderRadius: "4px" }}>
          <Typography variant="h6" style={{ color: "black" }}>
            Client Overview
          </Typography>
          <Box flexGrow={1} />
          {/* <IconButton>
            <AccountCircleOutlinedIcon />
          </IconButton> */}
          {/* <Typography variant="subtitle2" style={{ color: "black" }}>
            Client
          </Typography> */}
          <Button sx={{ color: "", fontSize: 13 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Paper>
  )
};