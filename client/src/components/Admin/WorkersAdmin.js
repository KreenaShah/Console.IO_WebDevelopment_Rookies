import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
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
import axios from "axios";
import { deleteClientProfile, deleteWorkerProfile } from "../api";
import { StyledTableCell, StyledTableRow } from "./VerificationAdmin";

const URL = "http://localhost:3000";
const imageURL = "http://localhost:3000/workerDocImages/";

const Workers = () => {
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
  //

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

  const deleteWorkerProfiles = async (id) => {
    await deleteWorkerProfile(id);
    getAllworkerProfiles();
  };

  return (
    <>
      <div className='Workerbg' style={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <NavBar />

          <TableContainer
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 7,
              marginLeft: 4.2,
              width: 1070,
            }}
            component={Paper}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>City</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Gender</StyledTableCell>
                  <StyledTableCell>Age</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
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
                    <StyledTableCell component="th" scope="row">
                      {workerProfile.city}
                    </StyledTableCell>
                    <StyledTableCell>{workerProfile.contact}</StyledTableCell>
                    <StyledTableCell>{workerProfile.gender}</StyledTableCell>
                    <StyledTableCell>{workerProfile.age}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        sx={{ marginLeft: 3, backgroundColor: "#ff0000" }}
                        variant="contained"
                        onClick={() => deleteWorkerProfiles(workerProfile._id)}
                      >
                        <DeleteIcon />
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      </div>
    </>
  );
};

export default Workers;