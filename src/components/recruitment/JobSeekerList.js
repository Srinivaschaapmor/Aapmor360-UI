import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
  TableBody,
  IconButton,
  Alert,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import JobSeekerDetails from "./JobSeekerDetails";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Recruitment from "../home/Recruitment";
import { getRecruitmentDetails } from "../../apiCalls/apiCalls";
import EmployeeForm from "../employeeForm/EmployeeForm";
import Loader from "../../utils/loader";
import SideBar from "../sidebar/sidebar";
import { isEmpty } from "lodash";
import axios from "axios";

const constants = {
  loading: "loading",
  recruitment: "recruitment",
  jobSeekerDetails: "jobseekerdetails",
  jobSeekerList: "jobseekerlist",
  onBoarding: "onBoarding",
};
const JobSeekersList = () => {
  const navigate = useNavigate();
  const [renderThisTab, setRenderThisTab] = useState(constants.loading);
  const [jobSeekerId, setJobSeekerId] = useState("");
  const [jobSeekersList, setJobSeekersList] = useState([]);

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
  useEffect(() => {
    getJobSeekersList();
  }, []);

  const getJobSeekersList = async () => {
    try {
      // const response = await getRecruitmentDetails();
      const response = await axios(
        "http://localhost:5000/api/recruitmentDetails"
      );
      const data = await response.data;
      console.log("data", data);
      if (response.status === 200) {
        // setRenderThisTab(constants.jobSeekerList);
        setJobSeekersList(data);
      }
    } catch (error) {
      return (
        <Alert variant="outlined" severity="warning">
          Please check your network connectivity
        </Alert>
      );
    }
  };
  console.log(jobSeekersList);
  const handleClickHere = (id, status) => {
    // const assingTab =
    //   status === "Selected" ? constants.onBoarding : constants.jobSeekerDetails;
    // setRenderThisTab(assingTab);
    // setJobSeekerId(id);
    status === "Selected"
      ? navigate("/onboarding-form")
      : navigate(`/jobseeker-details/${id}`);
  };
  const renderJobSeekerList = () => (
    <Grid item flex={8} p={2}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Grid item xs={4}>
          <IconButton>
            <KeyboardBackspaceIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/recruitment-home")}
            />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            Candidates List
          </Typography>
        </Grid>
      </Box>
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
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobSeekersList.length > 0 ? (
              jobSeekersList?.map((row, index) => (
                <TableRow
                  key={row._id}
                  scope="row"
                  component="th"
                  sx={{
                    outline: "none",
                  }}
                >
                  <TableCell sx={{ fontSize: "16px", height: "60px" }}>
                    <Typography variant="p">{row.firstName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="p">{row.role}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "16px" }}>
                    {row.email}
                  </TableCell>

                  <TableCell
                  // align="left"
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        padding: 5,
                        borderRadius: 2,
                        backgroundColor:
                          row.interviewRounds.length > 0
                            ? row.interviewRounds[
                                row.interviewRounds.length - 1
                              ].status === "Selected"
                              ? "rgb(240, 255, 248)" // Background color for "Selected"
                              : "rgb(254, 250, 224)" // Background color for other statuses
                            : "rgb(254, 250, 224)", // Default background color if no interview rounds
                        color:
                          row.interviewRounds.length > 0
                            ? row.interviewRounds[
                                row.interviewRounds.length - 1
                              ].status === "Selected"
                              ? "rgb(12, 66, 66)"
                              : "rgb(129, 127, 21)"
                            : "rgb(129, 127, 21)",
                      }}
                    >
                      {row.interviewRounds.length > 0
                        ? row.interviewRounds[row.interviewRounds.length - 1]
                            .status
                        : "Pending for Interview"}
                    </span>
                  </TableCell>

                  <TableCell
                    sx={{ cursor: "pointer", textDecoration: "underline" }}
                    align="left"
                    onClick={() =>
                      handleClickHere(
                        row._id,
                        row.interviewRounds.length > 0 &&
                          row.interviewRounds[row.interviewRounds.length - 1]
                            .status
                      )
                    }
                  >
                    {row.interviewRounds.length > 0 &&
                    row.interviewRounds[row.interviewRounds.length - 1]
                      .status === "Selected"
                      ? "Click to OnBoard"
                      : "View Details"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  rowSpan={2}
                  align="center"
                  sx={{ fontSize: 20, fontWeight: 300 }}
                >
                  No Appilicants
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  const renderRequiredView = () => {
    switch (renderThisTab) {
      case constants.loading:
        return <Loader />;
      case constants.jobSeekerList:
        return renderJobSeekerList();
      case constants.recruitment:
        return <Recruitment />;
      case constants.jobSeekerDetails:
        return <JobSeekerDetails id={jobSeekerId} />;

      case constants.onBoarding:
        return <EmployeeForm id={jobSeekerId} />;
      default:
        return renderJobSeekerList();
    }
  };

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>
    <Grid item flex={8}>
      {renderJobSeekerList()}
    </Grid>
    // </Grid>
  );
};

export default JobSeekersList;
