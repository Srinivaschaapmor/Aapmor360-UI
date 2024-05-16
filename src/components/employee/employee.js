import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
  Box,
  InputBase,
  Stack,
  IconButton,
  Avatar,
  Drawer,
  Button,
  CircularProgress,
  circularProgressClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { getAllEmployeesData } from "../../apiCalls/apiCalls";
import SideBar from "../sidebar/sidebar";
import Quotes from "../home/Quotes";
// import Quotes from "../home/Quotes";

const Employee = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  //Status Bar
  const [status, setStatus] = useState([]);
  //SEARCH INPUT
  const [searchInput, setSearchInput] = useState("");
  const [drawerContent, setDrawerContent] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [similarPeople, setSimilarPeople] = useState([]);
  const navigate = useNavigate();
  console.log(drawerContent);

  useEffect(() => {
    const updatedStatus = employeesData.map((employee, index) => {
      let rating = 0;
      if (employee.profileImage <= 150) {
        if (employee.profile_image <= 150) {
          rating += 1;
        } else {
          rating = 0;
        }
      }
      Object.entries(employee).forEach(([key, value]) => {
        rating += value !== null ? 1 : 0;
      });
      return rating;
    });
    setStatus(updatedStatus);
  }, [employeesData]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "",
      color: theme.palette.common.black,
      height: "35px",
      fontSize: "18px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "18px",
    },
  }));

  const handleEmployeeClick = (row) => {
    setOpenDrawer(true);
    setDrawerContent(row);
    getSimilarEmployees(row.department);
  };

  const getEmployeeDetails = async () => {
    try {
      const response = await getAllEmployeesData();
      const employeesData = response.data.data;
      setEmployeesData(employeesData);
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

  useEffect(() => {
    if (searchInput === "") {
      setEmployeesData(employeesData);
    } else {
      const filteredResults = employeesData.filter((each) => {
        if (each.fullName.toLowerCase().includes(searchInput.toLowerCase())) {
          return each;
        }
      });
      setFilteredData(filteredResults);
    }
    setEmployeesData(filteredData);
  }, [searchInput]);

  const getSimilarEmployees = (department) => {
    const similarPeople = employeesData.filter((eachEmployee) => {
      if (eachEmployee.department === department) {
        return eachEmployee;
      }
    });
    setSimilarPeople(similarPeople);
  };

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>

    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      {/* TOP HEADER */}
      <Quotes />

      <Grid
        container
        item
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#ffffff",
          zIndex: 10,
          marginTop: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          All Employees
        </Typography>

        {/* Search funcion */}

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            border: "1px solid #bfbfbf",
            borderRadius: "20px",
            pl: 1.5,
            pr: 1.5,
            height: "36px",
          }}
        >
          <Box sx={{ pl: 1, width: "220px" }}>
            <InputBase
              placeholder="Search by employee Name"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Box>
        </Stack>
      </Grid>

      {/* EMPLOYEE TABLE */}
      <Grid item>
        <TableContainer component={Paper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableCell-head": {
                    backgroundColor: "#26262630",
                    backdropFilter: "blur(100px)",
                    fontWeight: "600",
                  },
                }}
              >
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(employeesData) ? (
                employeesData.map((row, index) => (
                  <TableRow
                    key={row.employeeId}
                    onClick={() => handleEmployeeClick(row)}
                    sx={{
                      cursor: "pointer",
                    }}
                    hover
                  >
                    <TableCell>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar src={row.profileImage} />
                        <Typography variant="p">{row.fullName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">{row.employeeId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">{row.gender}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">{row.employeeEmail}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">{row.jobTitle}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      {status[index] >= 20 ? (
                        <Typography
                          gutterBottom
                          sx={{
                            backgroundColor: "#EDF7ED",
                            borderRadius: "16px",
                            textAlign: "center",
                            color: "#2E7D32",
                            padding: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          Completed
                        </Typography>
                      ) : (
                        <Typography
                          gutterBottom
                          sx={{
                            backgroundColor: "#fff4e5",
                            borderRadius: "16px",
                            textAlign: "center",
                            color: "#ff9800",
                            padding: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          Pending
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    top: "50%",
                    left: "50%",
                  }}
                >
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
                      animationDuration: "550ms",
                      position: "absolute",
                      left: 0,
                      [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round",
                      },
                    }}
                    size={40}
                    thickness={4}
                    // {...props}
                  />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* DRAWER */}
      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => setOpenDrawer(false)}
      >
        <Grid
          container
          sx={{
            width: "400px",

            flexDirection: "column",
            p: 2,

            gap: 1,
          }}
        >
          {/* MANAGE ICON */}
          <Grid item justifySelf={"flex-end"} alignSelf={"flex-end"}>
            <Stack direction={"column"} spacing={-1}>
              <IconButton>
                <ManageAccountsIcon />
              </IconButton>
              <Typography variant="caption" fontSize={10}>
                Manage
              </Typography>
            </Stack>
          </Grid>
          {/* PROFILE IMAGE */}
          <Grid item alignItems={"center"}>
            <Stack direction={"column"} alignItems={"center"} spacing={1}>
              <Typography>{drawerContent.employeeId}</Typography>
              <Avatar
                src={drawerContent.profileImage}
                sx={{
                  height: "150px",
                  width: "150px",
                  // boxShadow: "0px 0px 10px 0px #0047FF",
                }}
              />
              <Typography variant="h6" fontWeight={"bold"}>
                {drawerContent.fullName}
              </Typography>
              <Typography variant="subtitle1">
                {drawerContent.department}
              </Typography>
            </Stack>
          </Grid>
          {/* ABOUT PROFILE */}
          <Grid item>
            <Typography variant="p" fontSize={16} fontWeight={600}>
              About
            </Typography>
          </Grid>
          {/* BASIC DETAILS */}
          <Grid item justifyContent={"space-between"}>
            {/* AGE, GENDER */}
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack spacing={1}>
                <Typography variant="p" fontSize={16} fontWeight={600}>
                  Age
                </Typography>
                <Typography variant="p">
                  {new Date().getFullYear() -
                    new Date(drawerContent.dateOfBirth).getFullYear()}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="p" fontSize={16} fontWeight={600}>
                  Gender
                </Typography>
                <Typography variant="p">{drawerContent.gender}</Typography>
              </Stack>
            </Stack>
            {/* DOB, ADDRESS */}
            <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
              <Stack spacing={1}>
                <Typography variant="p" fontSize={16} fontWeight={600}>
                  Date of birth
                </Typography>
                <Typography variant="p">
                  {new Date(drawerContent.dateOfBirth)
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </Typography>
              </Stack>
              <Stack spacing={1} textAlign={"right"}>
                <Typography variant="p" fontSize={16} fontWeight={600}>
                  Address
                </Typography>
                <Typography variant="p">
                  {/* {drawerContent.address.length > 0
                    ? drawerContent.address.split(",")[0]
                    : drawerContent.address} */}
                  {drawerContent.address}
                </Typography>
              </Stack>
            </Stack>
            {/* PROJECTS */}
            <Stack direction={"column"} spacing={1} mt={1}>
              <Typography variant="p" fontSize={16} fontWeight={600}>
                Projects
              </Typography>
              <Typography variant="p">{drawerContent.projects}</Typography>
            </Stack>
            {/* SAME CLASS PEOPLE */}
            <Stack direction={"column"} spacing={1} mt={2}>
              <Typography variant="p" fontSize={16} fontWeight={600}>
                People from the same role
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  maxWidth: "380px",
                  overflowX: "auto",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {!isEmpty(similarPeople) &&
                  similarPeople.map((each) => (
                    <Avatar
                      key={each}
                      src={each.profileImage}
                      size="small"
                      sx={{ boxShadow: "0px 0px 4px 0px #bfbfbf" }}
                    />
                  ))}
              </Box>
            </Stack>
          </Grid>
          <Grid item sx={{ alignSelf: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/employees/${drawerContent.employeeId}`)}
            >
              View more details
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
    // </Grid>
  );
};

export default Employee;
