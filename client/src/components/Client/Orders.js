import { Table, TableHead, TableBody, TableRow, Button, Typography, TextField } from "@mui/material";
// import {getUsers , deleteUser} from '../service/api.js';
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Link } from "react-router-dom";
import { Sidebar } from "./clientSidebar";
import { NavBar } from "./clientNavbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";

import Avatar from "@mui/material/Avatar";

import { StyledTableCell, StyledTableRow } from "../Admin/VerificationAdmin";

const URL = "http://localhost:3000";

export const columns = [
    { id: "issue", label: "Issue" },
    { id: "category", label: "Category" },
    { id: "negotiated", label: "Negotiated" },
];

const ClientOrders = () => {
    const [clientIssues, setClientIssues] = useState([]);

    useEffect(() => {
        getAllClientIssues();
    }, []);

    const getAllClientIssues = async () => {
        try {
            let response = await axios.get(`${URL}/client/allClientIssues`);
            // console.log(response.data[0].name);
            // const workerProfileArray = Object.entries(response.data)
            // console.log("kreena")
            // console.log(typeof(workerProfileArray));
            // console.log(workerProfileArray);
            setClientIssues(response.data);
            console.log(clientIssues);
            // console.log(workerProfiles[0]);

        } catch (error) {
            console.log("Error while calling /client/allCLientIssues API");
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

    const deleteClientIssues = async (id) => {
        console.log("Delete Cleint Issue");
        // await deleteClientIssue(id);
        // getAllClientIssues();
    };

    return (
        <>
          <div className="clientBg" style={{height: "105vh"}}>
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
                                    <StyledTableCell>Issue</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Negotiated</StyledTableCell>
                                    <StyledTableCell>Accept</StyledTableCell>
                                    <StyledTableCell>Decline</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientIssues.map((clientIssue) => (
                                    <StyledTableRow key={clientIssue._id}>
                                        <StyledTableCell component="th" scope="row">
                                            {clientIssue.issue}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {clientIssue.category}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{display:"flex"}}>
                                            <TextField type="number"
                                                id="outlined-basic"
                                                label="Quotation"
                                                variant="outlined"
                                            />
                                            <Button
                                                sx={{ marginLeft: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                                                variant="contained"
                                                onClick={() => deleteClientIssues(clientIssue._id)}
                                            >
                                                <CheckBoxIcon />
                                            </Button>
                                            {/* {clientIssue.negotiated} */}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                sx={{ marginLeft: 0, backgroundColor: "green" }}
                                                variant="contained"
                                                onClick={() => deleteClientIssues(clientIssue._id)}
                                            >
                                                <CheckBoxIcon />
                                                Accept
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                sx={{ marginLeft: 0, backgroundColor: "#ff0000" }}
                                                variant="contained"
                                                onClick={() => deleteClientIssues(clientIssue._id)}
                                            >
                                                <DeleteIcon />
                                                Reject
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
}

export default ClientOrders;