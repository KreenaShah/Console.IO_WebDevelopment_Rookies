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

import { StyledTableCell , StyledTableRow} from "./VerificationAdmin";

export const columns = [
    { id: "id", label: "Id", minWidth: 45 },
    { id: "name", label: "Name", minWidth: 60 , align:"center"},
    {
      id: "category",
      label: "Category",
      minWidth: 60,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "gender",
      label: "gender",
      minWidth: 60,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "city",
      label: "city",
      minWidth: 60,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "idproof",
      label: "ID Proof",
      minWidth: 70,
      align: "center",
      // format: (value) => value.toFixed(2),
    },
  ];
  
  export function createData(id, name , category,gender, city ,idproof) {
    return {id, name , category,gender, city ,idproof };
  }

  export const data = [
    createData(
      "1",
      "Ramlal",
      "Plumber",
      "Male",
      "Mumbai",
      "Aadhar",
    ),
    createData(
      "2",
      "Ramlal",
      "Plumber",
      "Male",
      "Mumbai",
      "Aadhar",
    ),
    createData(
      "3",
      "Ramlal",
      "Plumber",
      "Male",
      "Mumbai",
      "Aadhar",
    ),
    createData(
      "4",
      "Ramlal",
      "Plumber",
      "Male",
      "Mumbai",
      "Aadhar",
    ),
  ];

const Workers = () => {
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

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const [rows, setRows] = useState(data);

const handleDelete = (id) => {
  setRows(rows.filter((row) => row.id !== id));
};

const WorkersComponent = () => (
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    {/* {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        { value}
                      </StyledTableCell>
                    );
                  })} */}
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    <TableCell align="center">{row.city}</TableCell>
                    <TableCell align="center">{row.idproof}</TableCell>

                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
            <WorkersComponent/>
          </Grid>
        </Grid>
      </>
     );
}
 
export default Workers;