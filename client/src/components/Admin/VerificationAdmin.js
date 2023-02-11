import { Table, TableHead, TableBody, TableRow, Button } from "@mui/material";
// import {getUsers , deleteUser} from '../service/api.js';
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Sidebar } from "./SidebarAdmin";
import { NavBar } from "./NavbarAdmin";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import { createTheme } from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

export const mytheme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#8FC79A',
      darker: '#2D8D79',
    },
    neutral: {
      main: '#CEE9B6',
      contrastText: '#5E9387',
    },
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: mytheme.palette.primary.darker,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const URL = "http://localhost:3000";
const imageURL = "http://localhost:3000/workerDocImages/";

const AcceptBtn = styled(Button)({
  color: "white",
  backgroundColor: "green",
  // fontSize: resp ? "0.8rem" : "1rem",
  p: "10px",
  "&:hover": {
    backgroundColor: "white",
    color: "green",
    border: "2px solid green",
  },
});

const RejectBtn = styled(Button)({
  color: "white",
  backgroundColor: "red",
  // fontSize: resp ? "0.8rem" : "1rem",
  p: "10px",
  "&:hover": {
    backgroundColor: "white",
    color: "red",
    border: "2px solid red",
  },
});

const VerificationAdmin = () => {

    const [workerProfiles, setWorkerProfiles] = useState([]);

    useEffect(() => {
      getAllworkerProfiles();
    }, []);

    const getAllworkerProfiles = async () => {
      try {
        let response = await axios.get(`${URL}/worker/allWorkerProfiles`);
        setWorkerProfiles(response.data);
        console.log(workerProfiles);
        // console.log(workerProfiles[0]);
      } catch (error) {
        console.log("Error while calling /client/allClientProfiles API");
      }
    };
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

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  // const [rows, setRows] = useState(data);

  // const handleDelete = (id) => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  const VerificationComponent = () => (
    <Paper
      sx={{
        width: "90%",
        overflow: "hidden",
        position: "relative",
        left: "3%",
        top: "10vh",
      }}
      elevation={3}
    >
     
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />
          {/* <VerificationComponent /> */}
          <TableContainer
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 7,
              marginLeft: 4.2,
              width: 1070,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Document</StyledTableCell>
                  <StyledTableCell>Accept</StyledTableCell>
                  <StyledTableCell>Reject</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workerProfiles.map((workerProfile) => (
                  <StyledTableRow key={workerProfile._id}>
                    <StyledTableCell component="th" scope="row">
                      {workerProfile.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {workerProfile.expertise}
                    </StyledTableCell>
                    <StyledTableCell>{workerProfile.contact}</StyledTableCell>
                    <StyledTableCell>{workerProfile.image}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        sx={{ marginLeft: 3 }}
                        variant="contained"
                        // onClick={() => deleteWorkerProfiles(workerProfile._id)}
                      >
                        <CheckIcon />
                        Accept
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        sx={{ marginLeft: 3, backgroundColor: "#ff0000" }}
                        variant="contained"
                        // onClick={() => deleteWorkerProfiles(workerProfile._id)}
                      >
                        <CloseIcon />
                        Decline
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default VerificationAdmin;
