import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { NavBar } from "../Admin/NavbarAdmin";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Container, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Unstable_Grid2";
import { CenterFocusStrong } from "@mui/icons-material";

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
    border: "2px solid green",
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
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
    position: "relative",
    top: "30%",
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


  const categoryImgStyle = { width: '8rem', height: '7.5rem', margin: '1rem', padding: '1rem', borderRadius: "10px" }

  const CategoryComponent = () => (
    <div
      style={{ width: "60%", position: "relative", left: "20%", top: "30%" }}
    >
      <Grid container spacing={0}>
        <Grid xs={3} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_6b1f5250.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Cleaning and Pest Control</h3>
          </Paper>
        </Grid>
        <Grid xs={3} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_72d18950.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Appliance Repair</h3>
          </Paper>
        </Grid>
        <Grid xs={3} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1631679515206-a69389.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Home Painting</h3>
          </Paper>
        </Grid>
        <Grid xs={3} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757629780-2b2187.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Hair cut</h3>
          </Paper>
        </Grid>
        <Grid xs={3} style={{ visibility: 'hidden' }}>
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1629973621437-ce5af9.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Special Service for women</h3>
          </Paper>
        </Grid>
        <Grid xs={3} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div style={{ position: 'relative', left: '0%' }}>
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1629973621437-ce5af9.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Special Service for women</h3>
          </Paper>
        </Grid>
        <Grid xs={6} >
          <Paper elevation={5} style={categoryImgStyle}>
            <div >
              <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_6fbad370.png" alt="Appliance-repair" itemScope itemProp="image"
                style={{ objectFit: 'cover', width: '2.5rem', height: '2.5rem' }} />
            </div>
            <h3 >Plumbers and Carpenters</h3>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );


  return (
    <Paper style={imgStyle}>
      <Paper
        elevation={3}
        style={{ width: "88%", position: "relative", left: "6%", top: "5%" }}
      >
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor: "white",
              borderRadius: "6px"
            }}
          >
            <Typography variant="h6" style={{ color: "black" }}>
              Work-Connect
            </Typography>
            <Box flexGrow={1} />
            <Link to="/register/client">
              <SignupButton>
                Sign Up as Client
              </SignupButton>
            </Link>
            <Link to="/register/worker">
              <LoginButton>
                Sign Up as Worker
              </LoginButton>
            </Link>
          </Toolbar>
        </AppBar>
      </Paper>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "11rem",
          color: "white",
        }}
      >
        The one-stop solution for all your local work needs.
      </h1>
      {/* <Toolbar style={searchStyle}>
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
      </Toolbar> */}
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "11rem",
          color: "white ",
          textShadow: '2px 2px 2px #333'
        }}
      >
        Categories
      </h1>
      <CategoryComponent />
      <div style={{ position: "absolute", bottom:"1%",left:"40%" }}>Photo by <a href="https://unsplash.com/@jeriden94?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeriden Villegas</a> on <a href="https://unsplash.com/photos/VLPUm5wP5Z0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>


    </Paper>
  );
};

export default LandingComponent;