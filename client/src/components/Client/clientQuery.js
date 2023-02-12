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
import { Link } from "react-router-dom";
import MultiSelect from "react-multiple-select-dropdown-lite";
import { Sidebar } from "./clientSidebar";
import { NavBar } from "./clientNavbar";
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    naigara: {
      main: "#3bb19b",
    },
  },
});

const defaultValue = {
  category: "",
  issue: '',
};


const CQUery = () => {
  const [issue, setIssue] = useState(defaultValue);

  const [error, setError] = useState({});

  const [rule, setrule] = useState("");
  const [ammenities, setammenities] = useState("");

  const [data, setData] = useState({
    category: '',
    issue: '',
  })

  const handleRule = (val) => {
    setrule(val);
    setData({ ...data, category: val });
    console.log(data);
  };

  const RuleOptions = [
    { label: "Cleaning", value: "Cleaning" },
    { label: "Repair", value: "Repair" },
    { label: "Cooking", value: "Cooking" },
    { label: "Barber", value: "Barber" },
    { label: "Electrician", value: "Electrician" },
    { label: "Homecare", value: "Homecare" },
  ]

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    // console.log("Handle submit")
    e.preventDefault();
    // console.log(user)
    console.log("before validate");
    setError(validate(data));
    console.log("after validate");
    console.log(error);
    console.log("after printing error");

    console.log(data);
    console.log("before fetch api ");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("issue", data.issue);
    urlencoded.append("category", data.category);
    urlencoded.append("clientEmail", data.clientEmail);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/clientIssue/addClientIssue", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const validate = (values) => {
    const errors = {}
    if (!values.issue) {
      errors.issue = "Issue toh raise karo sirrrrrrrrrr";
    } else if (!values.category) {
      errors.category = "Category tumhara baap daalega?";
    }
    return errors;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Box
          className="box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: 300,
            width: 550,
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
              Raise Query
            </Typography>
            {/* <p className="Pwtext">Enter the email adress associated with your account and we'll send you a link to reset your password.</p> */}
            <MultiSelect
              sx={{ backgroundColor: "#fff", marginTop: 3, width: "28ch" }}
              name="category"
              placeholder="Category"
              className="multi-select"
              onChange={handleRule}
              options={RuleOptions}
            />
            <TextField
              variant="outlined"
              sx={{ backgroundColor: "#fff", marginTop: 3, width: "35ch" }}
              label="Issue"
              name="issue"
              multiline
              maxRows={4}
              size="small"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              sx={{ backgroundColor: "#fff", marginTop: 3, width: "35ch" }}
              label="Your Email"
              name="clientEmail"
              size="small"
              onChange={handleChange}
            />

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
                Send
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function ClientQuery() {
  return (
    <>
    <div className="clientBg" style={{height: "105vh"}}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          <CQUery />
        </Grid>
      </Grid>
      </div>
    </>
  );
}

export default ClientQuery;