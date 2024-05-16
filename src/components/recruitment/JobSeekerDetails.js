import {
  Grid,
  Typography,
  Box,
  Card,
  Drawer,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import useSWR from "swr";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import JobSeekersList from "./JobSeekerList";
import { Viewer } from "@react-pdf-viewer/core";
// import { Preview } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  getJobSeekerDetails,
  submitRecruiterFeedback,
} from "../../apiCalls/apiCalls";
import Loader from "../../utils/loader";
import SideBar from "../sidebar/sidebar";
import axios from "axios";

const spanWidth = {
  width: "200px",
};
const fetcher = (url) => fetch(url).then((res) => res.json());
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
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const constants = {
  loading: "loading",
  jobSeekerDetails: "jobseekerdetails",
  jobSeekerList: "jobseekerlist",
};

const JobSeekerDetails = () => {
  const { id } = useParams();
  const { data: masterData, isLoading: jobdescLoading } = useSWR(
    `http://localhost:5000/api/masterData`,
    fetcher
  );
  const navigate = useNavigate();
  const [renderView, setRenderView] = useState(constants.loading);
  const [previewResume, setPreviewResume] = useState(false);
  const [userData, setUserData] = useState([]);
  const [value, setValue] = useState(0);
  const [recruitFeedback, setRecruitFeedback] = useState({
    interviewType: "",
    interviewer: "",
    techRating: 0,
    commRating: 0,
    feedback: "",
    status: "",
  });
  console.log("recruitFeedback", recruitFeedback);
  const handleToggleResume = () => {
    setPreviewResume(!previewResume);
  };

  useEffect(() => {
    getJobSeekerData();
  }, []);

  const getJobSeekerData = async () => {
    try {
      // const response = await getJobSeekerDetails(id);
      const response = await axios(
        `http://localhost:5000/api/recruitmentDetails/${id}`
      );
      if (response.status === 200) {
        setRenderView(constants.jobSeekerDetails);
      }
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const submitRecruitFeedback = async (e) => {
    // e.preventDefault();
    try {
      // const response = await submitRecruiterFeedback(id, recruitFeedback);
      const response = await axios.put(
        `http://localhost:5000/api/recruitmentDetails/${id}`,
        { id, recruitFeedback }
      );
      console.log("success");
      // if (response.status === 200) {
      //   // getJobSeekerData();
      //   setRecruitFeedback({
      //     interviewType: "",
      //     interviewer: "",
      //     techRating: 0,
      //     commRating: 0,
      //     feedback: "",
      //     status: "",
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const renderJobSeekerDetailsView = () => {
    const filteredMasterdData = masterData?.filter(
      (e) => e.category === "interviewType"
    );
    const {
      firstName,
      phoneNumber,
      gender,
      question,
      resume,
      role,
      technicalSkills,
      experience,
      email,
      education,
      interviewRounds,
    } = userData;
    console.log("userData", userData);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Grid
        container
        sx={{ overflowY: "auto", height: "100vh", p: 1 }}
        spacing={1}
      >
        <Grid item xs={12} md={8}>
          <IconButton>
            <KeyboardBackspaceIcon
              onClick={() => navigate("/recruitment-list")}
            />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Candidate Details" {...a11yProps(0)} />
                <Tab label="Interview Rounds" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Grid container sx={{ flexDirection: "column" }} spacing={1}>
                <Grid item>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    Candidate Details
                  </Typography>
                  <Drawer />
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Full Name
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {firstName}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Gender
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {gender ? "gender" : "N/A"}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Email
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {email}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Phone No
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {phoneNumber}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Qualification
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {education.degree}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Branch
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {education.branch}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    CGPA
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {education.cgpa}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Role
                  </Typography>
                  <Typography variant="body1" component="span">
                    : {role}
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  {experience && (
                    <>
                      <Typography
                        variant="body1"
                        sx={spanWidth}
                        component="span"
                      >
                        Experience
                      </Typography>
                      <Typography variant="body1" component="span">
                        : {experience.experience} years
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={spanWidth} component="span">
                    Skills
                  </Typography>
                  <Typography variant="body1" component="span">
                    :
                    {technicalSkills.slice(0, 3).map((e, index) => (
                      <React.Fragment key={index}>
                        {e}
                        {index < 2 && ", "}{" "}
                      </React.Fragment>
                    ))}
                  </Typography>
                </Grid>
                {/* <Button
                  variant="text"
                  sx={{
                    width: "180px",
                    height: "40px",
                    marginTop: "10px",
                    textTransform: "none",
                  }}
                  onClick={handleToggleResume}
                >
                  {resume !== null ? (
                    <>
                      {previewResume ? (
                        "Close"
                      ) : (
                        <>
                          <PictureAsPdfIcon sx={{ marginRight: "10px" }} />
                          <Typography variant="body">Preview Resume</Typography>
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Button> */}
                <Grid item sx={{ display: "flex" }}>
                  {previewResume && (
                    <iframe
                      style={{
                        "&::-webkit-scrollbar": {
                          display: "hidden",
                        },
                      }}
                      title="PDF Viewer"
                      src={`${resume}#toolbar=0`}
                      accept=".txt, .pdf"
                      width="100%"
                      height="400px" // Adjust height as needed
                    >
                      <Viewer
                        fileUrl={resume}
                        onOpenError={(error) => console.error("Error", error)}
                      />
                    </iframe>
                  )}
                </Grid>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {interviewRounds.map((eachRound) => (
                <Grid container spacing={1} sx={{ flexDirection: "column" }}>
                  <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {eachRound.interviewType.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" sx={spanWidth} component="span">
                      Interviewer
                    </Typography>
                    <Typography variant="body1" component="span">
                      : {eachRound.interviewer}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" sx={spanWidth} component="span">
                      Technical Skills
                    </Typography>
                    <Typography variant="body1" component="span">
                      : {eachRound.techRating}/5
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" sx={spanWidth} component="span">
                      Communication skills
                    </Typography>
                    <Typography variant="body1" component="span">
                      : {eachRound.commRating}/5
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" sx={spanWidth} component="span">
                      Feedback
                    </Typography>
                    <Typography variant="body1" component="span" width="50%">
                      : {eachRound.feedback}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" sx={spanWidth} component="span">
                      Status
                    </Typography>
                    <Typography variant="body1" component="span" width="50%">
                      : {eachRound.status}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </CustomTabPanel>
          </Card>
        </Grid>
        {}
        <Grid item xs={12} md={4} spacing={1}>
          <form onSubmit={(e) => submitRecruitFeedback(e)}>
            <Card sx={{ padding: "20px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ marginBottom: "30px", fontWeight: "bold" }}
              >
                Candidate Feedback
              </Typography>
              <Grid container spacing={2} sx={{ flexDirection: "column" }}>
                <Grid item>
                  <FormControl fullWidth required>
                    <InputLabel>Interview Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={recruitFeedback.interviewType}
                      label="Interview Type"
                      onChange={(e) =>
                        setRecruitFeedback({
                          ...recruitFeedback,
                          interviewType: e.target.value,
                        })
                      }
                    >
                      {filteredMasterdData?.map((e, index) => (
                        <MenuItem key={index} value={e.label}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    label="Interviewer"
                    variant="outlined"
                    value={recruitFeedback.interviewer}
                    onChange={(e) =>
                      setRecruitFeedback({
                        ...recruitFeedback,
                        interviewer: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="span">Technical skills </Typography>
                  <Rating
                    sx={{ color: "gold" }}
                    value={recruitFeedback.techRating}
                    onChange={(e, newValue) =>
                      setRecruitFeedback({
                        ...recruitFeedback,
                        techRating: newValue,
                      })
                    }
                  />
                </Grid>
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography component="span">
                    Communication skills{" "}
                  </Typography>
                  <Rating
                    sx={{ color: "gold" }}
                    onChange={(e, newValue) =>
                      setRecruitFeedback({
                        ...recruitFeedback,
                        commRating: newValue,
                      })
                    }
                    value={recruitFeedback.commRating}
                  />
                </Grid>
              </Grid>
              <Grid item mt={1}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={6}
                  label="Feedback"
                  variant="outlined"
                  value={recruitFeedback.feedback}
                  onChange={(e) =>
                    setRecruitFeedback({
                      ...recruitFeedback,
                      feedback: e.target.value,
                    })
                  }
                />
                <Grid item mt={2}>
                  <FormControl fullWidth required>
                    <InputLabel>Interview Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={recruitFeedback.status}
                      label="Interview Type"
                      onChange={(e) =>
                        setRecruitFeedback({
                          ...recruitFeedback,
                          status: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={"On Hold"}>On Hold</MenuItem>
                      <MenuItem value={"In Progress"}>In Progress</MenuItem>
                      <MenuItem value={"Selected"}>Selected</MenuItem>
                      <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      <MenuItem value={"Joined"}>Joined</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "20px",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Send Feedback
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </form>
        </Grid>
      </Grid>
    );
  };
  const renderRequiredView = () => {
    switch (renderView) {
      case constants.loading:
        return <Loader />;
      case constants.jobSeekerDetails:
        return renderJobSeekerDetailsView();
      default:
        return null;
    }
  };

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>
    <Grid item flex={8}>
      {renderRequiredView()}
    </Grid>
    // </Grid>
  );
};

export default JobSeekerDetails;
