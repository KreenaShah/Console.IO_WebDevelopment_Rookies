import Navbar from "../Navbar";
import React, { useState , useEffect } from 'react'
import { Box, TextField , Typography,Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
// import {ToastContainer , toast} from 'react-toastify';
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import '../Listing/Listing.css'
import './clientDetails.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Sidebar } from "./clientSidebar";
import { NavBar } from "./clientNavbar";
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

const ClientDet = () => {
const emailStored = localStorage.getItem("email");
{console.log(emailStored);}

  const [clientProfile, setclientProfile] = useState([]);

  useEffect(() => {
    getClientProfile();
  }, []);

  const getClientProfile = async () => {
    try {
      let response = await axios.get(`${URL}/client/${emailStored}`);
      console.log(response.data);
      setclientProfile(response.data);
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
            Client's Details
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              className="box"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: 500,
                Height: 100,
                backgroundColor: "#3bb19b",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            >
              <p className="Details">Name: {clientProfile.name} </p>
              <p className="Details">Address: {clientProfile.address} </p>
              <p className="Details">Contact: {clientProfile.contact} </p>
              <p className="Details">Email: {clientProfile.email} </p>
              <Button
                sx={{ marginLeft: 3 ,color:"black",backgroundColor:"white"}}
                variant="contained"
              >
                Accept
              </Button>
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
              <img className="workerImg" />
            </Box>
          </Box>
        </ThemeProvider>
      </form>
    </div>
  );
}

function ClientDetails () {
  return ( 
      <>
      <div className="clientBg" style={{height: "105vh"}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          <ClientDet/>
        </Grid>
      </Grid>
      </div>
    </>
   );
}

export default ClientDetails;