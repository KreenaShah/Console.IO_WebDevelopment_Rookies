import React from "react";
import { useState } from "react";
import "../PwReset/ForgotPwMail.css"
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link} from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import { Sidebar } from "./clientSidebar";
import { NavBar } from "./clientNavbar";
import Grid from "@mui/material/Grid";
import axios from 'axios'

const theme = createTheme({
  palette: {
    naigara: {
      main: "#3bb19b",
    },
  },
});

const ClientProf = () => {

  const [error, setError] = useState({});

const [data , setData] = useState({
    name : '',
    email: '',
    address: '',
    contact: '',
    image: '',
  })

  const handleImageUpload = (e) => {
    console.log("Handle Image Upload");
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    setData({...data , image:e.target.files[0]})
  }

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(data);
    console.log(data.image, data.image.name);
    console.log("Handle Submit");
    e.preventDefault();
    let url = "http://localhost:3000/client/addClientProfile";
    const formdata = new FormData();
    formdata.append("file", data.image);
    formdata.append("name", data.name);
    formdata.append("contact", data.contact);
    formdata.append("email", data.email);
    formdata.append("address", data.address);
    console.log("After appending in formData");
    try {
      let response = await axios.post(url, formdata);
      if (response.status === 200) {
        console.log(
          "/client/addClientProfile API successfully called from frontend"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validate = (values) => {
    const errors = {}
    const regex = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;
    if(!values.email) {
      errors.email = "Email required"
    }else if (!regex.test(values.email)) {
      errors.email = "Please enter valid email";
    }
    if(!values.name) {
      errors.name = "Name Required";
    }
    if(!values.address) {
      errors.address = "Address Required";
    }
    if(!values.contact) {
      errors.contact = "Number Required";
    }
    if(!values.upload) {
      errors.upload = "File Required";
    }
    return errors;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="signUp_main_container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: 450,
            width: 550,
            marginTop: -10,
            backgroundColor: "#fff",
            // borderTopLeftRadius: 20,
            // borderBottomLeftRadius: 20,
            borderRadius: 8,
          }}
        >
          <form className="inputBox" onSubmit={handleSubmit}>
            <Typography
              sx={{
                fontSize: 30,
                color: "#3bb19b",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Client Profile
            </Typography>
            {/* <p className="Pwtext">Enter the email adress associated with your account and we'll send you a link to reset your password.</p> */}
            <TextField
                  sx={{ width: "40ch" }}
                  label="Name"
                  // value={user.name}
                  name="name"
                  size="small"
                  onChange={handleChange}
                />
                <p className="error_message">{error.name}</p>
                <TextField
                  sx={{ width: "40ch", marginTop: 2 }}
                  label="Address"
                  name="address"
                  // value={user.address}
                  multiline
                  maxRows={4}
                  size="small"
                  onChange={handleChange}
                />
                <p className="error_message">{error.address}</p>
                <TextField
                  sx={{ width: "40ch", marginTop: 2 }}
                  type='number'
                  label="Contact"
                  // value={user.contact}
                  name="contact"
                  size="small"
                  onChange={handleChange}
                />
                <p className="error_message">{error.contact}</p>
                <TextField
              required
              id="outlined-required"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              // value={user.email}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch"}}
            />
            <p className="error_message">{error.email}</p>
            <TextField
                  name="image"
                  size="small"
                  onChange={handleImageUpload}
                  required
              id="outlined-required"
              type="file"
              // value={user.upload}
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
                />
              <p className="error_message">{error.upload}</p>
            
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#3bb19b",
                borderRadius: 4,
                width: "20ch",
              }}
            >
              <Typography sx={{ color: "#fff", textTransform: "none" }}>
                Create Profile
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function ClientProfile () {
    return ( 
        <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <NavBar />
            <ClientProf/>
          </Grid>
        </Grid>
      </>
     );
}

export default ClientProfile;