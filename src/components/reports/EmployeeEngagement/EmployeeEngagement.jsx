import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { getAllEmployeesData } from "../../../apiCalls/apiCalls";

// const projectsRows = [
//   projectData("J&J"),
//   projectData("Aapmor-360"),
//   projectData("Davose"),
//   projectData("Interversity"),
//   projectData("Nexus-360"),
// ];

function EmployeeEngagement() {
  const [newprojectName, setNewProjectName] = useState("");
  const [projectsRows, setProjectsRows] = useState([
    {
      projectName: "IGA",
      projectSponsor: "J&J",
    },
    {
      projectName: "Aapmor-360",
      projectSponsor: "Aapmor",
    },
    {
      projectName: "Davose",
      projectSponsor: "Davose",
    },
    {
      projectName: "Student Dashboard",
      projectSponsor: "Interversity",
    },
    {
      projectName: "Nexus-360",
      projectSponsor: "Aapmor",
    },
  ]);

  const [employeesData, setEmployeesData] = useState([]);

  const getEmployeeDetails = async () => {
    try {
      const response = await getAllEmployeesData();
      const employeesData = response.data.data;
      setEmployeesData(employeesData);
      console.log(employeesData);
    } catch (error) {
      console.log(
        "error in fetching employees data, please check your network connectivity"
      );
    }
  };

  useEffect(() => {
    getEmployeeDetails();
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProjectsRows([...projectsRows, { projectName: newprojectName }]);
    setNewProjectName("");
  };
  return (
    <>
      <Grid
        flex={8}
        item
        container
        sx={{ p: 1, flexDirection: "column", my: 6, px: 5 }}
      >
        {/* Projects Table */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Projects Table</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newprojectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="project name"
            />
            <button type="submit" style={{ marginLeft: "10px" }}>
              Add Project
            </button>
          </form>
        </div>
        <Divider></Divider> */}
        {/* <ProjectsTables projectsRows={projectsRows} /> */}
        <br />
        <br />
        {/* Employee Engagement Table */}
        <h2>Employee Engagement Table</h2>
        <Divider></Divider>
        <EmployeeEngageMentTable />
      </Grid>
    </>
  );
}

// Common Styling for both the Tables
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//  ===============================================
//                     Projects Table
//  ===============================================

function projectData(name) {
  return { name };
}

function ProjectsTables({ projectsRows }) {
  return (
    <TableContainer component={Paper} sx={{ width: 350, mt: 2 }}>
      <Table sx={{ minWidth: 350, maxWidth: 350 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Projects</StyledTableCell>
            <StyledTableCell>Sponsorer</StyledTableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {projectsRows.map((row) => (
            <StyledTableRow
              key={row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.projectName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.projectSponsor}
              </StyledTableCell>

              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//  ===============================================
//              Employee Engagement Table
//  ===============================================

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const today = new Date().toDateString();

const rows = [
  createData(
    "E001",
    "Thirupathi Rao Thakkallapelly",
    "Aapmor360, Intervercity",
    "Yes"
  ),
  createData("E002", "Kartheek Chakrala", "Aapmor360, Davose", "Yes"),
  createData("E003", "P. Venkata Siva Naga Jyothi", "Aapmor360, Davose", "No"),
  createData(
    "E004",
    "Satyanarayanareddy Boggu",
    "Aapmor360, Davose, J&J",
    "Yes"
  ),
  createData("E005", "Bola Bharath Kumar Dasari", "Aapmor360", "Yes"),
  createData(
    "E006",
    "Nagendra Sai Praveen Kanda",
    "Aapmor360, Intervercity",
    "Yes"
  ),
  createData("E007", "Pranay Dasari", "Aapmor360, Davose", "Yes"),
  createData("E008", "Harikrishna Javoji", "Aapmor360, Davose", "Yes"),
  createData("E009", "Satyanarayan Nayak", "Aapmor360, Davose, J&J", "Yes"),
  createData("E010", "Ganesh Alamanda", "Aapmor360", "No"),
  createData("E0011", "Divyasri Shivakoti", "Aapmor360, Intervercity", "No"),
  createData("E0012", "Golla Ganesh", "Aapmor360, Davose", "No"),
  createData("E0013", "Shaik Shanawaz Hussain", "Aapmor360, Davose", "Yes"),
  createData("E0014", "Mohan Reddy Poreddy", "Aapmor360, Davose, J&J", "Yes"),
  createData("E0015", "Kuruva valagandla Rajeswari", "Aapmor360", "No"),
  createData("E0016", "Vamsi Sai Perni", "Aapmor360, Intervercity", "Yes"),
  createData("E0017", "Shaik Imtiaz Ali", "Aapmor360, Davose", "Yes"),

  createData(
    "E0018",
    "Mahendran Pillay Mohanalayam",
    "Aapmor360, Davose",
    "No"
  ),
  ,
  createData("E0019", "Chaitanya Chodavarapu", "Aapmor360, Davose, J&J", "No"),
  ,
  createData("E0020", "P V S Chandrasekhara Sastry", "Aapmor360", "No"),
  createData(
    "E0021",
    "Mohammed Sharuk Jelani",
    "Aapmor360, Intervercity",
    "No"
  ),

  createData("E0022", "Bokka Lakshmi Tejaswini", "Aapmor360, Davose", "No"),
  createData("E0023", "Praveen", "Aapmor360, Davose", "No"),
  createData("E0024", "Praveen", "Aapmor360, Davose, J&J", "No"),
  createData("E0025", "Gopi Pranay", "Aapmor360", "No"),
  createData("E0026", "Ciril Cherian", "Aapmor360, Intervercity", "No"),
  createData("E0027", "Teppala Satya Shanthi", "Aapmor360, Davose", "Yes"),
  createData("E0028", "Turaga Sai Sreshtaa", "Aapmor360, Davose", "Yes"),
  createData("E0029", "Talari Jagadeesh", "Aapmor360, Davose, J&J", "No"),
  createData("E0030", "Sattineni Sai Vineeth Kumar", "Aapmor360", "No"),
  createData("E0031", "Madduri Mounika Reddy", "Aapmor360, Davose", "No"),
];

function EmployeeEngageMentTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2, height: 400 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead onRequestSort={handleRequestSort}>
          <TableRow>
            <StyledTableCell>Employee Id</StyledTableCell>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell>Projects</StyledTableCell>
            <StyledTableCell>J&J Access</StyledTableCell>
            {/* <StyledTableCell>Assigned Date</StyledTableCell> */}
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeEngagement;
