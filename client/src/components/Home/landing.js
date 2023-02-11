import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { NavBar } from "./navbar-admin";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Container, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


const LandingComponent = () => {
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

  const response = { responsive: width < 1000 };
  const resp = response.responsive;
  //

  const searchBarStyle = {
    borderRadius: "10rem",
    color: "#eceff1",
    flexShrink: "6",
    display: "inline",
    width: resp ? "40vw" : "35vw",
    border:'2px solid green',

  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white,1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.7),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "green",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const searchStyle = {
    display: "flex",
    justifyContent: resp ? "flex-start" : "center",
    position:'relative',
    top:'38%'
  };

  const LoginButton = styled(Button)({
    // backgroundColor: "white",
    position: "absolute",
    right: resp ? "12vw" : "10vw",
    top: "1.5vh",
    borderRadius: "3rem",
    marginLeft: "1.2rem",
    textDecoration: "none",
    p: "7px",
    color: "#2DBD79",
    fontSize: "1.1rem",
    "&:hover": { backgroundColor: "#5E9387", color: "white" },
  });

  const SignupButton = styled(Button)({
    // backgroundColor: "white",
    position: "absolute",
    right: resp ? "35vw" : "25vw",
    top: "1.5vh",
    borderRadius: "3rem",
    marginLeft: "1.2rem",
    textDecoration: "none",
    p: "7px",
    color: "#2DBD79",
    fontSize: "1.1rem",
    "&:hover": { backgroundColor: "#5E9387", color: "white" },
  });

  const AccountIcon = styled(AccountCircleOutlinedIcon)({
    color: "#2DBD79",
  });

  const imgStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya2VyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=2000&q=60)",
    height: "80vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: "0.9",
  };

  return (
    <Paper style={imgStyle}>
      <Paper
        elevation={3}
        style={{ width: "88%", position: "relative", left: "6%", top: "5%" }}
      >
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "white", borderRadius: "6px", position:'fixed', top:'5%', width:'85%' }}>
            <Typography variant="h6" style={{ color: "black" }}>
              Landing Page
            </Typography>
            <Box flexGrow={1} />
            {/* <IconButton>
              <SearchIcon />
            </IconButton> */}
            {/* <IconButton>
              <NotificationsNoneIcon />
            </IconButton> */}
            <SignupButton>Sign Up as Client</SignupButton>

            <LoginButton>Sign Up as Worker</LoginButton>
            <IconButton>
              <AccountIcon />
            </IconButton>
            <Typography
              variant="subtitle2"
              style={{ color: "#2DBD79", fontSize: "1.1rem" }}
            >
              User
            </Typography>
          </Toolbar>
        </AppBar>
      </Paper>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "13rem",
          color: "white",
        }}
      >
        The one-stop solution for all your local work needs.
      </h1>
      <Toolbar style={searchStyle}>
      <Search style={searchBarStyle}>
              <SearchIconWrapper>
                <SearchIcon style={{ color: "green" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for Services"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "20rem" }}
              />
            </Search>
      </Toolbar>
    </Paper>
  );
};

export default LandingComponent;
