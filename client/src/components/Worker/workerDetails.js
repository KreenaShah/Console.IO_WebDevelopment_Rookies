import Navbar from "../Navbar";
import React, { useState,useEffect } from 'react'
import { Box, TextField , Typography,Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
// import {ToastContainer , toast} from 'react-toastify';
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import '../Listing/Listing.css'
import './workerDetails.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Sidebar } from "./workerSidebar";
import { NavBar } from "./workerNavbar";
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    white: {
      main: "#fff",
    },
    naigara: {
      main: "#3bb19b",
    },
  },
});

const defaultValues={
  name:"",
  description:"",
  location:"",
  contact:0
}

const WorkerDet = () => {
  const emailStored = localStorage.getItem("email");

  const [workerProfile, setworkerProfile] = useState(defaultValues);

  useEffect(() => {
    getWorkerProfile();
  }, []);

  const getWorkerProfile = async () => {
    try {
      let response = await axios.get(`http://localhost:3000/worker/${emailStored}`);
      console.log(response.data);
      setworkerProfile(response.data);
    } catch (error) {
      console.log("Error while calling getUsers API");
    }
  };
  return (
    <div>
      <form className="inputBox">
        <ThemeProvider theme={theme}>
            <Typography
              color="#3bb19b"
              sx={{
                fontSize: 40,
                fontWeight: "bold",
                paddingTop: 8,
                marginBottom: 2.5,
                textAlign: "center",
              }}
            >
                Worker's Details
            </Typography>
            <Box sx={{display: 'flex'}}>
              <Box
                className="box"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 500,
                  backgroundColor: "#3bb19b",
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              >
                <p className="Details">Name: {workerProfile.name}</p>
                <p className="Details">Description: {workerProfile.description}</p>
                <p className="Details">City: {workerProfile.city}</p>
                <p className="Details">Contact: {workerProfile.contact}</p>
              </Box>
              <Box
                className="box"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 400,
                  backgroundColor: "#fff",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <img className="workerImg"/>
              </Box>
            </Box>
        </ThemeProvider>
      </form>
    </div>
  );
}

function WorkerDetails () {
  return ( 
      <>
      <div className="clientBg" style={{height: "105vh"}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          <WorkerDet/>
        </Grid>
      </Grid>
      </div>
    </>
   );
}

export default WorkerDetails;