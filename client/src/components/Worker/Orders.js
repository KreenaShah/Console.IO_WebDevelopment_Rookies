import { Table, TableHead, TableBody, TableRow, Button, TextField } from "@mui/material";
// import {getUsers , deleteUser} from '../service/api.js';
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Sidebar } from "./workerSidebar";
import { NavBar } from "./workerNavbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import VerifiedIcon from "@mui/icons-material/Verified";
import { createTheme } from '@mui/material/styles';
import { Box } from "@mui/material";

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
    id: "issue",
    label: "Issue",
    minWidth: 70,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "accept",
    label: "Accept",
    minWidth: 70,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "reject",
    label: "Reject",
    minWidth: 70,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

export function createData(id, name, category, issue, accept, reject) {
  return { id, name, category, issue, accept, reject };
}

const AcceptBtn = styled(Button)({
  color: "white",
  backgroundColor: "green",
  fontSize: 12,
//   fontSize: resp ? "0.8rem" : "1rem",
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
  fontSize: 12,
  // fontSize: resp ? "0.8rem" : "1rem",
  p: "10px",
  "&:hover": {
    backgroundColor: "white",
    color: "red",
    border: "2px solid red",
  },
});

export const data = [
  createData(
    "1",
    "Ramlal",
    "Plumber",
    "Aadhar",
    <AcceptBtn>Accept</AcceptBtn>,
    <RejectBtn>Reject</RejectBtn>
  ),
  createData(
    "2",
    "Ramlal",
    "Plumber",
    "Aadhar",
    <AcceptBtn>Accept</AcceptBtn>,
    <RejectBtn>Reject</RejectBtn>
  ),
  createData(
    "3",
    "Ramlal",
    "Plumber",
    "Aadhar",
    <AcceptBtn>Accept</AcceptBtn>,
    <RejectBtn>Reject</RejectBtn>
  ),
  createData(
    "4",
    "Ramlal",
    "Plumber",
    "Aadhar",
    <AcceptBtn>Accept</AcceptBtn>,
    <RejectBtn>Reject</RejectBtn>
  ),
];

const OrdersTable = () => {
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

  const OrderComponent = () => (
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
                    <TableCell align="center">{row.issue}</TableCell>
                    <Box sx={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                        <TextField 
                        sx={{ width: "12ch" }}
                        type='number'
                        label="Price"
                        name="price"
                        size="small"
                        />
                        <TableCell align="center">
                        <AcceptBtn
                            onClick={() => handleDelete(row.id)}
                        >
                            Accept
                        </AcceptBtn>
                        </TableCell>
                    </Box>
                    <TableCell align="center">
                      <RejectBtn
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </RejectBtn>
                    </TableCell>

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
          <OrderComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default OrdersTable;