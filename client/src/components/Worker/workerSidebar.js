import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as React from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import './workerSidebar.css'


export const Sidebar = () => {
    // const classes = useStyles();

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

  const linkStyle = {color:'white', textDecoration:'none', "&:hover":{color:'black'}}

  const UserIcon = (props) => (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#5E9387",
      }}
    >
      <Avatar>{props.name[0]}</Avatar>
      <Typography style={{ marginTop: 8, color: "white" }}>
        {props.name}
      </Typography>
    </div>
  );

  const ShowButton = styled(Button)({
    color: "white",
    fontSize: resp ? "0.8rem" : "1rem",
    p: "10px",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  });

    return (
      <Drawer variant="permanent" anchor="left">
        <List
          style={{
            backgroundColor: "#2D8D79",
            height: "100vh",
            width: "17vw",
            // pl: "2rem",
          }}
        >
          <UserIcon name="Worker" />
          <ListItem>
          <Link to="/" style={linkStyle} className='links'>
            <ShowButton>
            <DashboardOutlinedIcon
                style={{ color: "##9e9e9e", paddingRight: "1rem" }}
              />
                
              Orders
                
            </ShowButton>
            </Link>
          </ListItem>
          <ListItem>
          <Link to="/workers-admin" style={linkStyle} className='links'>
            <ShowButton>
              <GroupOutlinedIcon
                style={{ color: "##9e9e9e", paddingRight: "1rem"}}
              />
              Profile
            </ShowButton>
            </Link>
          </ListItem>
          <ListItem>
          <Link to="/verification-admin" style={linkStyle}>
            <ShowButton>
            <QuestionAnswerOutlinedIcon
                style={{ color: "##9e9e9e", paddingRight: "1rem" }}
              />
              Notifications
            </ShowButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    );
  };