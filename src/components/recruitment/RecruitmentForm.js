import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { Viewer } from "@react-pdf-viewer/core";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import React, { useState } from "react";
import { postRecruitmentDetails } from "../../apiCalls/apiCalls";
// import SideBar from "../sidebar/sidebar";
import { Validations } from "../../utils/validation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const InterviewForm = () => {
  // State to manage form data

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [roleApplied, setRoleApllied] = useState("");
  const [resume, setResume] = useState(null);
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    gender: "",
    email: "",
    phoneNo: "",
    roleApplied: "",
    resume: null,
    education: {
      degree: "",
      branch: "",
      yop: "",
      cgpa: "",
    },
    techSkills: "",
  });
  const [education, setEducation] = useState({
    degree: "",
    branch: "",
    yop: "",
    cgpa: "",
  });
  const [isExperienced, setIsExperienced] = useState("");
  const [experience, setExperience] = useState({
    companyName: "",
    previousRole: "",
    experience: "0",
  });
  const [techSkills, setTechSkills] = useState([]);
  const [question, setQuestion] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [resumeName, setResumeName] = useState("");

  const handleToggleResume = () => {
    setResume(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const submitApplication = async () => {
    const recruitmentObj = {
      fullName,
      mobileNo: phoneNo,
      email,
      role: roleApplied,
      resume,
      address,
      education,
      gender,
      experience,
      techSkills,
      question,
      rounds: [
        {
          interviewType: "",
          interviewer: "",
          techRating: 0,
          commRating: 0,
          feedback: "",
          status: "Yet to be Interviewed",
        },
      ],
    };

    try {
      const response = await postRecruitmentDetails(recruitmentObj);
      const result = await response.data;
      console.log(result);
      if (response.status === 200) {
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const handleErrorMsgs = (fieldName) => (event) => {
    // You can perform your validation logic here
    let errorMessage = "";
    const fieldValue = event.target.value;
    console.log(fieldName, fieldValue);
    switch (fieldName) {
      case "fullName":
        errorMessage = !Validations.fullName.validate(fieldValue)
          ? Validations.fullName.errorMessage
          : "";

        break;

      case "phoneNumber":
        errorMessage = !Validations.phoneNumber.validate(fieldValue)
          ? Validations.phoneNumber.errorMessage
          : "";

        break;
      case "email":
        errorMessage = !Validations.email.validate(fieldValue)
          ? Validations.email.errorMessage
          : "";

        break;

      case "branch":
        errorMessage = !Validations.branch.validate(fieldValue)
          ? Validations.branch.errorMessage
          : "";

        break;
      case "yearOfPassout":
        errorMessage = !Validations.yearOfPassout.validate(fieldValue)
          ? Validations.yearOfPassout.errorMessage
          : "";
        break;
      case "cgpa":
        errorMessage = !Validations.cgpa.validate(fieldValue)
          ? Validations.cgpa.errorMessage
          : "";
        break;

      case "technicalSkills":
        errorMessage = !Validations.technicalSkills.validate(fieldValue)
          ? Validations.technicalSkills.errorMessage
          : "";
        break;

      default:
        break;
    }
    // Update the errors state
    setErrors({
      ...errors,
      [fieldName]: errorMessage,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
    }
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResume(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        component={"form"}
        onSubmit={submitApplication}
        flexDirection={"column"}
        container
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <Typography gutterBottom fontSize={24} fontWeight={700}>
          Candidate Information Form
        </Typography>
        <Box sx={{ alignSelf: "flex-end", marginRight: "30px" }}>
          <Button
            // disabled={Object.values(errors).some((error) => !!error)}
            variant="contained"
            // onClick={submitApplication}
            type="submit"
          >
            Submit
          </Button>
        </Box>
        <Grid
          sx={{
            width: "100%",
            flexDirection: "column",
            borderRadius: "8px",
            justifyContent: "center",
            overflowY: "auto",
            height: "auto",
            // padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h6">
            Basic Details
          </Typography>
          <>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  placeholder="Enter your full name"
                  size="medium"
                  label="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={handleErrorMsgs("fullName")}
                  required
                />
                {errors.fullName && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.fullName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  size="medium"
                  label="Email"
                  placeholder="Enter your email id"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onBlur={handleErrorMsgs("email")}
                />
                {errors.email && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter your phone number"
                  size="medium"
                  label="Phone No"
                  value={phoneNo}
                  inputProps={{
                    pattern: "\\d{10}",
                    maxLength: 10,
                  }}
                  onChange={(e) =>
                    setPhoneNo(e.target.value.replace(/\D/g, ""))
                  }
                  required
                  onBlur={handleErrorMsgs("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.phoneNumber}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role *</InputLabel>
                  <Select
                    value={roleApplied}
                    label="Role"
                    onChange={(e) => setRoleApllied(e.target.value)}
                    required
                  >
                    <MenuItem value={"FullStack"}>Fullstack</MenuItem>
                    <MenuItem value={"Data Analyst"}>Data Analyst</MenuItem>
                    <MenuItem value={"Devops"}>Devops</MenuItem>
                    <MenuItem value={"QA"}>QA</MenuItem>
                    <MenuItem value={"SAP"}>SAP</MenuItem>
                    <MenuItem value={"Data Science"}>Data Science</MenuItem>
                    <MenuItem value={"AI/ML"}>AI/ML</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"Content Writer"}>Content Writer</MenuItem>
                    <MenuItem value={"Business Analyst"}>
                      Business Analyst
                    </MenuItem>
                    <MenuItem value={"DB Admin"}>DB Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label-2">
                    Gender *
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label-2"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  textAlign: "start",
                  marginBottom: "20px",
                }}
              >
                <Input
                  type="file"
                  accept=".txt, .pdf"
                  id="fileUpload"
                  sx={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Tooltip title="upload pdf files ">
                  <Button
                    sx={{
                      // width: "200px",
                      color: "black",
                      height: "45px",
                      background: "#f7f8ff",
                      borderRadius: "8px",
                      borderWidth: "dotted",
                    }}
                    component={"label"}
                    htmlFor={"fileUpload"}
                    variant="outlined"
                  >
                    <Typography gutterBottom variant="body">
                      upload Resume{" "}
                    </Typography>
                    <UploadFileIcon sx={{ marginLeft: "10px" }} />
                  </Button>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {resume ? (
                  <Typography ml={2}>{resumeName}</Typography>
                ) : (
                  <Typography ml={2}>No pdf uploaded</Typography>
                )}

                {resume ? (
                  <Button onClick={handleToggleResume}>
                    <DeleteOutlineIcon />
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            <Typography gutterBottom variant="h6">
              Education Details
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="degree-label">Degree</InputLabel>
                  <Select
                    labelId="degree-label"
                    id="degree-select"
                    value={education.degree}
                    label="Degree*"
                    required
                    onChange={(e) =>
                      setEducation({ ...education, degree: e.target.value })
                    }
                  >
                    <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
                    <MenuItem value={"M.Tech"}>M.Tech</MenuItem>
                    <MenuItem value={"MCA"}>MCA</MenuItem>
                    <MenuItem value={"MBA"}>MBA</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  size="medium"
                  label="Branch"
                  fullWidth
                  value={education.branch}
                  placeholder="Enter your branch"
                  onChange={(e) =>
                    setEducation({ ...education, branch: e.target.value })
                  }
                  onBlur={handleErrorMsgs("branch")}
                  required
                />
                {errors.branch && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.branch}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="medium"
                  type="tel"
                  label="Year of Passed Out"
                  value={education.yop}
                  placeholder="Enter your pass out year"
                  onChange={(e) =>
                    setEducation({
                      ...education,
                      yop: e.target.value,
                    })
                  }
                  onBlur={handleErrorMsgs("yearOfPassout")}
                  required
                />
                {errors.yearOfPassout && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.yearOfPassout}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  size="medium"
                  label="CGPA"
                  type="tel"
                  placeholder="Enter your CGPA"
                  fullWidth
                  value={education.cgpa}
                  onChange={(e) =>
                    setEducation({ ...education, cgpa: e.target.value })
                  }
                  required
                  onBlur={handleErrorMsgs("cgpa")}
                />
                {errors.cgpa && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.cgpa}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Typography variant="h6">Experience</Typography>

            <FormControl sx={{ display: "flex", mb: 2 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Do you have experience?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setIsExperienced(e.target.value)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            {isExperienced === "yes" && (
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    size="medium"
                    label="Company Name"
                    fullWidth
                    value={experience.companyName}
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        companyName: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="medium"
                    label="Role"
                    value={experience.role}
                    onChange={(e) =>
                      setExperience({ ...experience, role: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    size="medium"
                    label="Year of Experience"
                    type="number"
                    fullWidth
                    value={experience.yoe}
                    onChange={(e) =>
                      setExperience({ ...experience, yoe: e.target.value })
                    }
                    required
                  />
                </Grid>
              </Grid>
            )}
            <Typography gutterBottom variant="h6">
              Technical Skills
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item sx={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  size="medium"
                  label="Technical Skills"
                  value={techSkills}
                  onBlur={handleErrorMsgs("technicalSkills")}
                  onChange={(e) => setTechSkills(e.target.value.split(","))}
                  required
                  helperText="Please Enter comma seperated Values"
                />
                {errors.technicalSkills && (
                  <Typography sx={{ color: "red" }} variant="body2">
                    {errors.technicalSkills}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              How did you Know about this Company?
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="company-label">How do you know?</InputLabel>
                  <Select
                    label="How do you know?"
                    labelId="company-label"
                    id="degree-select-id"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  >
                    <MenuItem value={"Friend"}>Friend</MenuItem>
                    <MenuItem value={"LinkedIn"}>LinkedIn</MenuItem>
                    <MenuItem value={"Naukri"}>Naukri</MenuItem>
                    <MenuItem value={"Social Media"}>Social Media</MenuItem>
                    <MenuItem value={"Company Referral"}>
                      Company Referral
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </>
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Details updated successfully!
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};
export default InterviewForm;
