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
    { id: "id", label: "Id", minWidth: 10 },
    { id: "name", label: "Name", minWidth: 60 , align:"center"},
    {
      id: "contact",
      label: "contact",
      minWidth: 60,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "email",
      label: "email",
      minWidth: 60,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  
  export function createData(id, name , contact, email) {
    return {id, name , contact, email };
  }

  export const data = [
    createData(
      "1",
      "Ramlal",
      "1234567890",
      "abc@mail.com",
    ),
    createData(
      "2",
      "Ramlal",
      "1234567890",
      "abc@mail.com",
    ),
    createData(
      "3",
      "Ramlal",
      "1234567890",
      "abc@mail.com",
    ),
    createData(
      "4",
      "Ramlal",
      "1234567890",
      "abc@mail.com",
    ),
  ];

const Clients = () => {
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

const ClientsComponent = () => (
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
                    <TableCell align="center">{row.contact}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>

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
        <div className="clientBg" style={{height: "105vh"}}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={10}>
            <NavBar />
            <ClientsComponent/>
          </Grid>
        </Grid>
        </div>
      </>
     );
}
 
export default Clients;