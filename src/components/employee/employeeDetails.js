import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Tab,
  Tabs,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getEmployeeDetails } from "../../apiCalls/apiCalls";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import SideBar from "../sidebar/sidebar";


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


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeDetails = () => {
  const navigate = useNavigate();

  const [employeeData, setEmpbsId] = useState([]);
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [certifications, setcertification] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(id);

  useEffect(() => {
    employeeView();
    // eslint-disable-next-line
  }, []);

  useEffect(()=> {
    const fetchEmployeeCertifications = async () =>{
     const res =  axios.get(`http://localhost:5000/api/certifications/getAllCertificationByempId/${id}`)
                  .then((res) => {
                    console.log(res)
                    setcertification(res.data)
                  }
                  )
      // console.log(res)
    } 
    fetchEmployeeCertifications();
  },[])
 console.log(certifications)
  const employeeView = async () => {
    const response = await getEmployeeDetails(id);
    const singleemployee = response.data.data;
    console.log(singleemployee)
    setEmpbsId(singleemployee);
  };

  const { dateOfHire, dateOfBirth, profileImage } = employeeData;
  console.log(employeeData);
  const hireDate = new Date(dateOfHire);
  const birthDate = new Date(dateOfBirth);

  const dateObjectBirth = `${birthDate.getDate()} ${birthDate.toLocaleString(
    "default",
    {
      month: "short",
    }
  )}, ${birthDate.getFullYear()}`;

  const dateObject = `${hireDate.getDate()} ${hireDate.toLocaleString(
    "default",
    {
      month: "short",
    }
  )}, ${hireDate.getFullYear()}`;

  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "employeeId",
      headerName: "Employee Id",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "certificationName",
      headerName: "Certification Name",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "certificationId",
      headerName: "Certification ID",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "issuedBy",
      headerName: "Issued By",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 235,
    },

  ]

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>

    <Grid item flex={8} sx={{ overflowY: "auto", height: "auto" }}>
      <Grid
        sx={{
          display: "flex",
        }}
      >
        <Grid>
          <IconButton>
            <ArrowBackOutlinedIcon onClick={() => navigate("/employees")} />
          </IconButton>

          <Box
            sx={{
              height: "160px",
              width: "800px",
              padding: "20px",
              marginLeft: "10px",
              backgroundColor: "",
              borderRadius: "9px",
            }}
          >
            <Grid sx={{ display: "flex" }} key={id}>
              <Avatar
                variant="square"
                alt="Remy Sharp"
                src={profileImage}
                sx={{
                  height: "120px",
                  width: "120px",
                  marginRight: "16px",
                  borderRadius: "5px",
                }}
              />
              <Box sx={{ marginBottom: "50px", marginLeft: "50px" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", pb: "6px" }}>
                  {employeeData.fullName}
                </Typography>
                <Grid sx={{ display: "flex" }}>
                  <Typography variant="body" sx={{ width: "60px" }}>
                    Role{" "}
                  </Typography>
                  <Typography sx={{ marginRight: "15px" }}>:</Typography>
                  <Typography variant="span">
                    {employeeData.jobTitle}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <Typography variant="body" sx={{ width: "60px" }}>
                    Email{" "}
                  </Typography>
                  <Typography sx={{ marginRight: "15px" }}>:</Typography>
                  <Typography variant="span">
                    {employeeData.employeeEmail}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <Typography variant="body" sx={{ width: "60px" }}>
                    Ph.No{" "}
                  </Typography>
                  <Typography sx={{ marginRight: "15px" }}>:</Typography>
                  <Typography variant="span">
                    {employeeData.phoneNumber}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid>
        <Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginLeft: "24px",
              marginRight: "6px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="company Assets" {...a11yProps(1)} />
              <Tab label="Projects" {...a11yProps(2)} />
              <Tab label="Emergency Details" {...a11yProps(3)} />
              <Tab label="Certifications" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                fontWeight: "550",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                }}
              >
                <Typography variant="span" sx={{ width: "200px" }}>
                  Employee Id{" "}
                </Typography>
                <Typography mr={1}>:</Typography>

                <Typography variant="span">
                  {employeeData.employeeId}
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Gender{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span"> {employeeData.gender}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  DOB{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">{dateObjectBirth}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Personal Email{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">{employeeData.email}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Date Of Hire{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">{dateObject}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Marital status{" "}
                </Typography>
                <Typography mr={1}>:</Typography>

                <Typography variant="span">
                  {employeeData.maritalStatus}
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Employment Type{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span"> Fulltime</Typography>
              </Grid>

              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Department{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span"> Information Technology</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Manager{" "}
                </Typography>
                <Typography sx={{ marginRight: "6px" }}>:</Typography>
                <Typography variant="span">{employeeData.manager}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Work Location{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">
                  {employeeData.workLocation}
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Blood Group{" "}
                </Typography>
                <Typography sx={{ marginRight: "8px" }}>:</Typography>
                <Typography variant="span"> A+</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography variant="body" sx={{ width: "200px" }}>
                  Address
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">{employeeData.address}</Typography>
              </Grid>
            </Paper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Paper elevation={3} sx={{ padding: "20px", fontWeight: "550" }}>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography
                  variant="body"
                  sx={{ width: "200px", marginLeft: "16px" }}
                >
                  Laptop{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">{employeeData.laptop}</Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography
                  variant="body"
                  sx={{
                    width: "200px",
                    marginLeft: "16px",
                  }}
                >
                  Laptop Serial No{" "}
                </Typography>
                <Typography mr={1}>:</Typography>
                <Typography variant="span">
                  {employeeData.laptopSerialNo}
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex" }} mt={1}>
                <Typography
                  variant="body"
                  sx={{
                    width: "200px",
                    marginLeft: "16px",
                    marginBottom: "20px",
                  }}
                >
                  Charger Serial No{" "}
                </Typography>
                <Typography mr={1}>:</Typography>

                <Typography variant="span">
                  {employeeData.chargerSerialNo}
                </Typography>
              </Grid>
            </Paper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              {employeeData.projects ? (
                employeeData.projects.map((each, index) => (
                  <Grid
                    container
                    sx={{ display: "flex", fontWeight: "550" }}
                    key={index}
                    mt={1}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body"
                        marginBottom={"4px"}
                        marginLeft={"16px"}
                      >
                        {`Project Name ${index + 1}`}
                      </Typography>

                      <Typography mr={1}>:</Typography>
                      <Typography marginBottom="10px" variant="span">
                        {each}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body"
                        marginBottom={"4px"}
                        marginLeft={"16px"}
                      >
                        {`Client Name`}
                      </Typography>

                      <Typography mr={1}>:</Typography>
                      <Typography marginBottom="10px" variant="span">
                        {each}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body"
                        marginBottom={"4px"}
                        marginLeft={"16px"}
                      >
                        {`Client email Id `}
                      </Typography>

                      <Typography mr={1}>:</Typography>
                      <Typography marginBottom="10px" variant="span">
                        {each}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant="body"
                        marginBottom={"4px"}
                        marginLeft={"16px"}
                      >
                        {`Project Status ${index + 1}`}
                      </Typography>

                      <Typography mr={1}>:</Typography>
                      <Typography marginBottom="10px" variant="span">
                        Completed
                      </Typography>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "550",
                  }}
                >
                  <Typography variant="body">No projects yet</Typography>
                </Grid>
              )}
            </Paper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              {employeeData.emergencyDetails ? (
                employeeData.emergencyDetails.map((each, index) => (
                  <Grid
                    container
                    sx={{ display: "flex", fontWeight: "551" }}
                    key={index}
                  >
                    <Typography
                      variant="body"
                      sx={{
                        width: "180px",
                        marginLeft: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      Name : {each.name}
                    </Typography>
                    <Typography variant="body" sx={{ width: "250px" }}>
                      Phone Number : {each.phoneNo}
                    </Typography>
                    <Typography variant="body">
                      Relation : {each.relation}
                    </Typography>
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "550",
                  }}
                >
                  <Typography variant="body" sx={{ width: "200px" }}>
                    No Emergency Details
                  </Typography>
                </Grid>
              )}
            </Paper>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={4}>
            <Paper elevation={3} sx={{ padding: "20px" }}>

           
              {certifications ? 
              (
                <DataGrid
                rows={certifications}
                getRowId={getRowId}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                // slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                disableRowSelectionOnClick
              />
              ) : (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "550",
                  }}
                >
                  <Typography variant="body" sx={{ width: "200px" }}>
                    No Certifications yet
                  </Typography>
                </Grid>
              )}
            </Paper>
          </CustomTabPanel>
        </Box>
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default EmployeeDetails;
