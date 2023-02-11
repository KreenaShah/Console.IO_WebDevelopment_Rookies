import React from "react";
import { useState } from "react";
import "../login/Login.css"
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

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(defaultValue);

  const [errorS, setError] = useState({});

  const handleChange = (e) => {
    // console.log("FK THIS");
    console.log(e.target.name, e.target.value);
    // console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
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
    console.log(errorS);
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
    fetch("http://localhost:3000/login", requestOptions)
      .then(response => {
        localStorage.removeItem("secret_token");
        localStorage.removeItem("isVerified");
        return response.json();
      })
      .then(result => {
        console.log(result);
        localStorage.setItem("secret_token", result.token);
        localStorage.setItem("isVerified", result.isVerified);
        return result;
      })
      .then(r => {
        if (r.token) {
          if (r.access_lvl === "worker") 
            return navigate('/worker/profile');
          else if (r.access_lvl === "client")
            return navigate('/client/profile');
          else if (r.access_lvl === "admin")
            return navigate('/admin/dashboard');
        }
      })
      .catch(err => console.log('error', err));

    // try {
    //   const response = await fetch("localhost:3000/login", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: user,
    //   });
    //   console.log(response);
    //   // console.log(response.json().token);
    //   // window.location = "/home"
    //   // Navigate("/home")

    //   // const responseG = await fetch("http://localhost:8080/home", {
    //     //   method: "GET",        
    //     //   headers: {
    //       //     "Content-Type": "application/json",
    //       //   },
    //       //   body: JSON.stringify(user),
    //       // });

    //     // const responseInJSON = await response.json();
    //     // console.log(responeInJSON.token);
    //     // localStorage.setItem("token" , responseInJSON.token);
    //     // if(responseInJSON.token){
    //       // window.location='/home';
    //     // }

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
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
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
              Login to your Account!
            </Typography>
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
            <p className="error_message">{errorS.email}</p>

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
            <p className="error_message">{errorS.password}</p>
            <Box sx={{
              display: "flex",
              justifyContent: "flex-start",
              // alignItems: "flex-start",
              // backgroundColor: "#f5f5f5",
              fontSize: 1,
              marginTop: 2,
              marginBottom: 0
            }} >
              <Link to="/password-reset">
                <Button
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    width: "20ch",
                    mt: 1.5,
                  }}
                >
                  <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>
                    Forgot Password?
                  </Typography>
                </Button>
              </Link>
            </Box>
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
              <Typography sx={{ color: "#fff", textTransform: "none", fontSize: 22 }}>
                Login
              </Typography>
            </Button>
          </form>
        </Box>
        <Box
          className="box "
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 250,
            backgroundColor: "#3bb19b",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            color: "#fff",
          }}
        >
          <Typography sx={{ fontSize: 28, fontWeight: "bold" }}>
            New here ?
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 4,
                width: "15ch",
                mt: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: "#3bb19b",
                  textTransform: "none",
                  textDecoration: "none",
                }}
              >
                Register
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box >
    </ThemeProvider >
  );
}

export default Login;
