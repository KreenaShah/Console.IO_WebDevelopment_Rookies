import { Table, TableHead, TableBody, TableRow, Button } from "@mui/material";
// import {getUsers , deleteUser} from '../service/api.js';
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
// import { Sidebar } from "./sidebar-admin";
import { Sidebar } from "./SidebarAdmin";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import { createTheme } from "@mui/material/styles";
// import { NavBar } from "./navbar-admin";
import Navbar from "../Navbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";


// import changePg from './index';
import {
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

import { NavBar } from "./NavbarAdmin";

const AddAdminComponent = () => {
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

    const response = { responsive: width < 1100 };
    const resp = response.responsive;
    const response2 = { responsive: width < 700 };
    const resp2 = response2.responsive;
    //

    const paperStyle = {
        padding: "20",
        height: "70vh",
        width: resp ? "20rem" : "25rem",
        margin: " 1rem ",
        position: "relative",
        bottom: resp ? "" : "6rem",
        top: resp ? "3rem" : "",
        right: resp ? "-1rem" : "4rem",
        justifyContent: resp2 ? "center" : "normal",
    };
    // backgroundImage: 'linear-gradient(227deg, #40c057 5%, #4dabf7 95%)'
    const avatarStyle = {
        backgroundImage: "linear-gradient(227deg, #40c057 5%, #4dabf7 95%)",
    };
    const textFieldStyle = { margin: "10px" };

    const AddBtn = styled(Button)({
        position: "relative",
        left: "0.5rem",
        backgroundColor: "#8FC79A",
        "&:hover": {
            backgroundColor: "white",
            color: "#5E9387",
            border: '2px solid #5E9387'
        },
    });

    const defaultValue = {
        email: "",
        password: "",
    };

    const AddAdminForm = () => {
        const [user, setUser] = useState(defaultValue);

        const handleChange = (e) => {
            // console.log("FK THIS");
            console.log(e.target.name, e.target.value);
            // console.log(user);
            setUser({ ...user, [e.target.name]: e.target.value });
            console.log(user);
            // console.log(user);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // setError(validate(user));
            console.log("Submitting");
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("fname", user.fname);
            urlencoded.append("lname", user.lname);
            urlencoded.append("email", user.email);
            urlencoded.append("password", user.password);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            fetch("http://localhost:3000/admin/addNewAdmin", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(err => console.log('error', err));
        }
        return (
            <div style={{ height: "320px", position: "relative", top: "12rem" }}>
                <form onSubmit={handleSubmit} style={{ display: resp2 ? "flex" : "inline-block" }}>
                    <Grid item align="center" style={paperStyle}>
                        <Avatar style={avatarStyle}>
                            <LockIcon />
                        </Avatar>
                        <h2>Add Admin</h2>

                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            placeholder="Enter First Name"
                            variant="outlined"
                            fullWidth
                            required
                            style={textFieldStyle}
                            onChange={handleChange}
                            name="fname"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Last Name"
                            placeholder="Enter Lastname"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleChange}
                            style={textFieldStyle}
                            name="lname"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            placeholder="Enter Email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleChange}
                            style={textFieldStyle}
                            name="email"
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={handleChange}
                            style={textFieldStyle}
                            name="password"
                        />

                        <Button type="submit" onSubmit={handleSubmit} variant="contained" fullWidth>
                            ADD
                        </Button>
                    </Grid>
                </form>
            </div>
        );
    }

    const PresentAdmins = () => {
        const [listings, setListings] = useState([]);
        useEffect(() => {
            getAllAdmins();
          }, []);
        
        const getAllAdmins = async () => {
            try {
                let response = await axios.get("http://localhost:3000/getAdmins");
                setListings(response.data);
            } catch (error) {
                console.log("Error while calling getUsers API");
            }
        };
        return (
            <Paper elevation={3} style={{ position: "relative", right: "15%", top: '30%', padding: '0.5rem', maxWidth: 300, borderRadius: "10px" }}>
                <h2 style={{ textAlign: 'left', paddingLeft: '1rem', paddingTop: '1rem' }}>Present Admins</h2>
                <List
                    sx={{
                        width: "90%",
                        maxWidth: 300,
                        bgcolor: "background.paper",
                        height: "230px",
                        overflowY: 'scroll'
                    }}
                >
                    {listings.map((listing) => {return(

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757629780-2b2187.png" alt="haircut"
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={listing.fname} secondary={listing.email} />
                        </ListItem>)
                    })}

                </List>
            </Paper>
        );
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <NavBar />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AddAdminForm />
                        </Grid>
                        <Grid item xs={6}>
                            <PresentAdmins />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AddAdminComponent;