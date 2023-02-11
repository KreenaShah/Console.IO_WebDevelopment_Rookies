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
  const [user, setUser] = useState(defaultValue);

  const [error, setError] = useState({});

  const [rule, setrule] = useState("");
const [ammenities, setammenities] = useState("");

const [data , setData] = useState({
    experties : '',
    issue: '',
  })

const handleRule = (val) => {
    console.log(val);
    console.log(rule);
    setrule(val);
    console.log(rule);
    setData({ ...data, rules: val });
  };

const RuleOptions = [
    { label: "Option 1", value: "option_1" },
    { label: "Option 2", value: "option_2" },
    { label: "Option 3", value: "option_3" },
    { label: "Option 4", value: "option_4" },
    ]

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
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
    setError(validate(user));
    console.log("after validate");
    console.log(error);
    console.log("after printing error");
    
    console.log(user);
    console.log("before fetch api ");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
          
        const responseInJSON = await response.json();
        // console.log(responeInJSON.token);
        localStorage.setItem("token" , responseInJSON.token);
        if(responseInJSON.token){
          window.location='/home';
        }
      
    } catch (error) {
      console.log(error);
      // if(error.response && error.response.status >= 400  && error.response.status <= 500) {
      //     setError(error.response.data.message)
      // }
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
                sx={{ backgroundColor: "#fff", marginTop: 3, width: "35ch"  }}
                label="Issue"
                name="issue"
                multiline
                maxRows={4}
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

function ClientQuery () {
    return ( 
        <>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <NavBar />
            <CQUery/>
          </Grid>
        </Grid>
      </>
     );
}

export default ClientQuery;