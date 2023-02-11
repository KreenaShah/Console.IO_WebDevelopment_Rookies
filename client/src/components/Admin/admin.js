import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Container, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Sidebar } from "./SidebarAdmin";
import { NavBar } from "./NavbarAdmin";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ListItemAvatar from "@mui/material/ListItemAvatar";


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.2.1/chart.min.js"></script>

const Admin = () => {
  // for responsiveness
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

  const response = { responsive: width < 670 };
  const resp = response.responsive;
  //

  const userDataStyle = {width:'8rem', height:'7.5rem', margin:'1rem', padding:'1rem', borderRadius: "6px" }


  // const [data, setData] = useState({});

  // ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

  // useEffect(() => {
  //   setData({
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         labels: 'Line 1',
  //         fill: true,
  //         tension: 0.5,
  //         backgroundColor: 'rgba(75,192,192,1)',
  //         borderColor: 'rgba(0,0,0,1)',
  //         borderWidth: 2,
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         pointBordercolor:'aqua'
  //       },
  //       {
  //         labels: 'Line 2',
  //         fill: true,
  //         tension: 0.5,
  //         backgroundColor: 'rgba(255,99,132,1)',
  //         borderColor: 'rgba(0,0,0,1)',
  //         borderWidth: 2,
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         pointBordercolor:'aqua'
  //       },
  //     ],
  //   });
  // }, []);


  // const options = {
    // title: {
    //   display: true,
    //   text: 'Line Graph',
    //   fontSize: 20,
    // },
    // legend: {
    //   display: true,
    //   position: 'right',
    // },
  // }

  // const options = {
  //   plugins:{
  //     legend: true
  //   },
  //   scales:{
  //     y:{
  //       min:3,
  //     max:6
  //     }
  //   }
  // }

  // const ChartComponent = (props) => (
  //   <Paper style={{width:'500px', height:'300px', position:'relative', left:'2rem', top:'10rem'}}>
  //     <Line data={props.data} ></Line>
  //     <canvas id="myChart"></canvas>
  //   </Paper>
  // );

  const TopServices = () => (
    <Paper elevation={3} style={{position: "relative", left: "8%", padding:'0.5rem',maxWidth: 300 , borderRadius: "6px" }}>
    <h2 style={{ textAlign:'left', paddingLeft:'1rem', paddingTop:'1rem' }}>Top Services</h2>
    <List
      sx={{
        width: "90%",
        maxWidth: 300,
        bgcolor: "background.paper",
        height:"230px",
        overflowY:'scroll'
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757629780-2b2187.png" alt="haircut"
            style={{objectFit:'cover', width:'100%', height:'100%'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Hair Cut" secondary="100" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_72d18950.png" alt="Appliance-repair" itemScope itemProp="image"
            style={{objectFit:'cover', width:'100%', height:'100%'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Appliance-repair" secondary="80" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1631679515206-a69389.png" alt="home-painting"
            style={{objectFit:'cover', width:'100%', height:'100%'}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Home Painting" secondary="60" />
      </ListItem>
    </List>
    </Paper>
  );

  const RecentOrders = () => (
    <Paper elevation={3} style={{position: "relative", padding:'0.5rem' ,maxWidth: 350, right:'2rem', borderRadius: "6px" }}>
    <h2 style={{ textAlign:'left', paddingLeft:'1rem', paddingTop:'1rem' }}>Recent Orders</h2>
    <List
      sx={{
        width: "93%",
        maxWidth: 355,
        bgcolor: "background.paper",
        height:"230px",
        overflowY:'scroll'
      }}
    >
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#4C7972' }}>S</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sophie May" secondary="Haircut" style={{marginRight:'5px'}}/>
        <p >$64672</p>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#4C7972' }}>K</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Kiara Thompson" secondary="Haircut" />
        <p >$43603</p>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: '#4C7972' }}>M</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mark Wilson" secondary="Haircut" />
        <p >$35664</p>
      </ListItem>
    </List>
    </Paper>
  );

  const WebsiteUserData = () => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Paper elevation={3} style={userDataStyle}>
      <Grid xs={6} >
        <PersonIcon style={{position:'relative', right:'1rem'}}/>
        <h1 style={{marginTop:'1em', marginBottom:'0'}}>180</h1>
        <span>Clients</span>
        <p style={{color:'#4caf50', margin:'0', position:'relative', left:'5rem', bottom:'1.2rem'}}>50%</p>
      </Grid>
      </Paper>
    <Paper elevation={3} style={userDataStyle}>
      <Grid xs={6}>
        <EngineeringIcon style={{position:'relative', right:'1rem'}}/>
        <h1 style={{marginTop:'1em', marginBottom:'0'}}>1200</h1>
        <span>Workers</span>
        <p style={{color:'#4caf50', margin:'0', position:'relative', left:'5rem', bottom:'1.2rem'}}>70%</p>
      </Grid>
      </Paper>
    <Paper elevation={3} style={userDataStyle}>
      <Grid xs={6}>
        <ShoppingCartIcon style={{position:'relative', right:'1rem'}}/>
        <h1 style={{marginTop:'1em', marginBottom:'0'}}>150</h1>
        <span>Deals</span>
        <p style={{color:'#4caf50', margin:'0', position:'relative', left:'5rem', bottom:'1.2rem'}}>30%</p>
      </Grid>
      </Paper>
    <Paper elevation={3} style={userDataStyle}>
      <Grid xs={6}>
        <PersonIcon style={{position:'relative', right:'1rem'}}/>
        <h1 style={{marginTop:'1em', marginBottom:'0'}}>1800</h1>
        <span>Visitors</span>
        <p style={{color:'#4caf50', margin:'0', position:'relative', left:'5rem', bottom:'1.2rem'}}>20%</p>
      </Grid>
      </Paper>
    </Grid>
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          <Grid container spacing={2} style={{position: "relative", top: "20%"}}>
            <Grid item xs={4}>
              <TopServices />
            </Grid>
            <Grid item xs={4}>
              <RecentOrders/>
            </Grid>
            <Grid item xs={4}>
              <WebsiteUserData/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
