import Navbar from "../Navbar";
import React, { useState } from "react";
import { Box, TextField, Typography, Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
// import {ToastContainer , toast} from 'react-toastify';
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "../Worker/WorkerProf.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Sidebar } from "./workerSidebar";
import { NavBar } from "./workerNavbar";

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

const WorkerProfile = () => {
  const [expertise, setExpertise] = useState("");
  const [ammenities, setammenities] = useState("");

  const handleRule = (val) => {
    console.log(val);
    console.log(expertise);
    setExpertise(val);
    console.log(expertise);
    setData({ ...data, expertise: val });
  };

  const [gender, setGender] = React.useState("");

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const RuleOptions = [
    { label: "Cleaning", value: "Cleaning" },
    { label: "Repair", value: "Repair" },
    { label: "Cooking", value: "Cooking" },
    { label: "Barber", value: "Barber" },
    { label: "Electrician", value: "Electrician" },
    { label: "Homecare", value: "Homecare" },
  ]
  const [data, setData] = useState({
    name: "",
    description: "",
    city: "",
    contact: "",
    expertise: "",
    experience: "",
    age: "",
    gender: "",
    image: "",
    email:""
  });

  const handleChange = (e) => {
    console.log("Handle Change");
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleImageUpload = (e) => {
    console.log("Handle Image Upload");
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    setData({ ...data, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    console.log(data);
    console.log(data.image, data.image.name);
    console.log("Handle Submit");
    e.preventDefault();
    let url = "http://localhost:3000/worker/addWorkerProfile";
    const formdata = new FormData();
    formdata.append("file", data.image);
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("city", data.city);
    formdata.append("contact", data.contact);
    formdata.append("expertise", data.expertise);
    formdata.append("experience", data.experience);
    formdata.append("age", data.age);
    formdata.append("gender", data.gender);
    formdata.append("email", data.email);
    console.log("After appending in formData");
    try {
      let response = await axios.post(url, formdata);
      if (response.status === 200) {
        console.log("addWorkerProfile API successfully called from frontend");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>

      <form className="inputBox" onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <div
            className="main_container"
            sx={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Typography
              color="#3bb19b"
              sx={{
                fontSize: 40,
                fontWeight: "bold",
                paddingTop: 10,
                marginBottom: 1,
                textAlign: "center",
              }}
            >
              Worker's Profile
            </Typography>
            <Box
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
                  width: 300,
                  backgroundColor: "#3bb19b",
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
              >
                <TextField
                  sx={{ width: "28ch" }}
                  label="Name"
                  name="name"
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "28ch", marginTop: 3 }}
                  label="Description"
                  name="description"
                  multiline
                  maxRows={4}
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "28ch", marginTop: 3 }}
                  label="Location"
                  name="location"
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "28ch", marginTop: 3 }}
                  label="Email"
                  name="email"
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "28ch", marginTop: 3 }}
                  type="number"
                  label="Contact"
                  name="contact"
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
              </Box>
              <Box
                className="box "
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 500,
                  backgroundColor: "#fff",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  color: "#fff",
                }}
              >
                <MultiSelect
                  sx={{ backgroundColor: "#fff", marginTop: 2 }}
                  name="expertise"
                  placeholder="Expertise"
                  className="multi-select"
                  onChange={handleRule}
                  options={RuleOptions}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TextField
                    type="number"
                    sx={{
                      width: "21ch",
                      marginRight: 2,
                      marginTop: 2
                    }}
                    size="small"
                    label="Experience (Yrs)"
                    name="experience"
                    color="naigara"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number"
                    sx={{
                      width: "10ch",
                      marginLeft: 2,
                      marginTop: 2
                    }}
                    size="small"
                    label="Age"
                    name="age"
                    color="naigara"
                    onChange={handleChange}
                  />
                </Box>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    className="multi-select"
                    sx={{ mt: 2 }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{
                      width: "33.5ch"
                    }}
                    className="multi-select"
                    name="gender"
                    // value={gender}
                    label="Age"
                    size="small"
                    placeholder="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{
                    width: "34.5ch",
                    marginTop: 2
                  }}
                  name="image"
                  type="file"
                  size="small"
                  color="white"
                  onChange={handleImageUpload}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#3bb19b",
                    borderRadius: 2,
                    width: "38ch",
                  }}
                >
                  <Typography sx={{ color: "#fff", textTransform: "none" }}>
                    Create Profile
                  </Typography>
                </Button>
              </Box>
            </Box>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
}
function WorkerProf () {
  return ( 
      <>
      <div className="clientBg" style={{height: "105vh"}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          <WorkerProfile/>
        </Grid>
      </Grid>
      </div>
    </>
   );
}

export default WorkerProf;
