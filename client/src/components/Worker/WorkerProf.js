import Navbar from "../Navbar";
import React, { useState } from 'react'
import { Box, TextField , Typography,Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
// import {ToastContainer , toast} from 'react-toastify';
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import '../Listing/Listing.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

function WorkerProf() {
    const [rule, setrule] = useState("");
    const [ammenities, setammenities] = useState("");

    const handleRule = (val) => {
      console.log(val);
      console.log(rule);
      setrule(val);
      console.log(rule);
      setData({ ...data, rules: val });
    };

    const [gender, setGender] = React.useState('');

    const handleGender = (event) => {
      setGender(event.target.value);
    };

    const RuleOptions = [
      { label: "Option 1", value: "option_1" },
      { label: "Option 2", value: "option_2" },
      { label: "Option 3", value: "option_3" },
      { label: "Option 4", value: "option_4" },
    ]

    const [data , setData] = useState({
      name : '',
      description : '',
      city : '',
      contact : '',
      experties : '',
      experience : '',
      age : '',
      gender : ''
    })

    const handleChange = (e) => {
      console.log("Handle Chnage")
     console.log(e.target.name, e.target.value);
      setData({...data , [e.target.name]:e.target.value})
    }

    const handleImageUpload = (e) => {
      console.log("Handle Image Upload");
      console.log(e.target.files[0]);
      console.log(e.target.files[0].name);
      setData({...data , image:e.target.files[0]})
    }

    const handleSubmit = async (e) => {
      console.log(data);
      console.log(data.image, data.image.name);
      console.log("Handle Submit");
      e.preventDefault();
      let url = "http://localhost:8080/addListing";
      const formdata = new FormData();
      formdata.append("file", data.image);
      formdata.append("name", data.name);
      formdata.append("description", data.description);
      formdata.append("location", data.location);
      formdata.append("startDate", data.startDate);
      formdata.append("endDate", data.endDate);
      formdata.append("expertise", data.expertise);
      formdata.append("price", data.price);
      formdata.append("noOfPeople", data.noOfPeople);
      formdata.append("ammenities", data.ammenities);
      console.log("After appending in formData");
      try {
        let response = await axios.post(url , formdata)
        if(response.status === 200) {
          console.log("addListing API successfully called from frontend");
        }
      } catch(e) {
        console.log(e);
      }
    }

  return (
    <div>
      <Navbar />
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
                paddingTop: 3,
                marginBottom: 2.5,
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
                  label="City"
                  name="city"
                  size="small"
                  color="white"
                  onChange={handleChange}
                />
                <TextField
                  sx={{ width: "28ch", marginTop: 3 }}
                  type='number'
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
                  width: 500,
                  backgroundColor: "#fff",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  color: "#fff",
                }}
              >
                <MultiSelect
                  sx={{ backgroundColor: "#fff", marginTop: 3 }}
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
                  }}
                >
                  <TextField
                    type="number"
                    sx={{ width: "20ch", marginRight: 2, marginTop: 3 }}
                    size="small"
                    label="Experience (Yrs)"
                    name="experience"
                    color="naigara"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number"
                    sx={{ width: "10ch", marginLeft: 2, marginTop: 3 }}
                    size="small"
                    label="Age"
                    name="age"
                    color="naigara"
                    onChange={handleChange}
                  />
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" className="multi-select" sx={{ marginLeft: '6em'}}>Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ width: "35ch", marginLeft: '6em'}}
                    className="multi-select"
                    value={gender}
                    label="Age"
                    onChange={handleGender}
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
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
                    Update Profile
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

export default WorkerProf;

