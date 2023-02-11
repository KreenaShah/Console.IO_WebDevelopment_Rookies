import React from "react";
import { useState } from "react";
import "../PwReset/ResetPw.css"
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
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    naigara: {
      main: "#3bb19b",
    },
  },
});

const defaultValue = {
  email: "",
  password: "",
};

function ResetPw() {
  const navigate=useNavigate();
  const [user, setUser] = useState(defaultValue);

  const [error, setError] = useState({});

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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", user.email);
    urlencoded.append("password", user.password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/pwReset", requestOptions)
      .then(response => response.json())
      .then(result => {if(result.reset==="success"){
        navigate('/login');
      }})
      .catch(error => console.log('error', error));

    // try {
    //   const response = await fetch("http://localhost:3000/pwReset", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    //   });

    //     const responseInJSON = await response.json();
    //     // console.log(responeInJSON.token);
    //     localStorage.setItem("token" , responseInJSON.token);
    //     if(responseInJSON.token){
    //       window.location='/home';
    //     }

    // } catch (error) {
    //   console.log(error);
    //   // if(error.response && error.response.status >= 400  && error.response.status <= 500) {
    //   //     setError(error.response.data.message)
    //   // }
    // }
  };

  const validate = (values) => {
    const errors = {}
    const regex = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;
    if (!values.vcode) {
      errors.vcode = "Verification Code Required";
    }
    if (!values.email) {
      errors.email = "Email required"
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter valid email";
    }
    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be of more than 4 characters";
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
            width: 550,
            backgroundColor: "#fff",
            // borderTopLeftRadius: 20,
            // borderBottomLeftRadius: 20,
            borderRadius: 8
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
              Reset Password
            </Typography>
            {/* <TextField
              required
              id="outlined-required"
              type="text"
              label="Verification Code"
              placeholder="Verification Code"
              name="vcode"
              value={user.email}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
            />
            <p className="error_message">{error.vcode}</p> */}

            <TextField
              required
              id="outlined-required"
              type="email"
              label="Email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              size="small"
              color="naigara"
              sx={{ mt: 2, width: "40ch" }}
            />
            <p className="error_message">{error.email}</p>

            <FormControl
              sx={{ mt: 2, width: "40ch" }}
              variant="outlined"
              size="small"
              color="naigara"
              value={user.password}
              onChange={handleChange}
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className="error_message">{error.password}</p>

            {/* <FormControl
              sx={{ mt: 2, width: "40ch" }}
              variant="outlined"
              size="small"
              color="naigara"
              value={user.password}
              onChange={handleChange}
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p className="error_message">{error.password}</p> */}

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
                Confirm
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ResetPw;