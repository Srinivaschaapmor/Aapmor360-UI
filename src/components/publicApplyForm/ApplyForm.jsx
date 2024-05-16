import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Stack,
  TextField,
  Typography,
  Divider,
  FormLabel,
  InputAdornment,
  Modal,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Autocomplete,
  Chip,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify"; // for string sanitization
import {
  jobPostingBaseUrl,
  jobApplicantBaseUrl,
} from "../../apiCalls/apiCalls";
import axios from "axios";
import ReCapchaScreen from "./ReCapchaScreen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DoneIcon from "@mui/icons-material/Done";
import ApplicationResult from "./ApplicationResult";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../guestAccessiblePages/PageNotFound";
import { techSkills } from "../data";
const ApplyForm = () => {
  const navigate = useNavigate();
  let { id: jobId } = useParams();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [capchaValue, setCapchaValue] = useState("");
  const [openCapchaModal, setOpenCapchaModal] = useState(true);
  // let [jobTitle, setJobTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileConfirmed, setFileConfirmed] = useState(false);
  // const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");
  const [tSkillTempSelect, setTSkillTempSelect] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileConfirmed(false);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // onFileSelect(selectedFile);
      console.log(selectedFile);
      setFileName(selectedFile.name);
      setFileConfirmed(true);
      setResumeError(false);
    } else {
      alert("Please select a file");
    }
  };

  // For Technical skills
  const handleTechnicalDelete = (skillToDelete) => {
    setTSkillTempSelect((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete)
    );
    // setErrorMessage("");
  };
  const handleTechSkillSelect = (event, newValue) => {
    // setBtnState(false);

    setTSkillTempSelect(newValue);
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleCapchaModalClose = () => {
    if (capchaValue) {
      setOpenCapchaModal(false);
    }
  };

  function onCapchaClick(value) {
    console.log("Captcha value:", value);
    setCapchaValue(value);
    // if (value) {
    //   setOpenCapchaModal(false);
    // }
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async function handleFormSubmit(values) {
    console.log(values);
    if (!selectedFile || !fileConfirmed) {
      setResumeError(true);
      return false;
    }

    const base64Resume = await convertToBase64(selectedFile);
    let applicant = values;
    applicant.firstName = capitalizeFirstLetter(applicant.firstName);
    applicant.lastName = capitalizeFirstLetter(applicant.lastName);
    applicant["resume"] = base64Resume;
    applicant["jobPostingId"] = jobId;
    applicant["source"] = "selfApply";
    applicant["status"] = "yetToInitiate";

    try {
      const response = await axios.post(jobApplicantBaseUrl, applicant);
      console.log("Posted successfully", response);
      setApplySuccess("success");
    } catch (error) {
      console.log("Application failed", error);
      if (
        error.response.data &&
        error.response.data.message === "Applicant already exists"
      ) {
        console.log("Application failed", error);
        setApplySuccess("alreadyExists");
      } else {
        setApplySuccess("fail");
      }
    }
  }

  // fetch data of this job
  const fetchJobData = async () => {
    try {
      const res = await axios.get(`${jobPostingBaseUrl}${jobId}`);
      if (res.data === null) {
        navigate("/not-found");
      }
    } catch (error) {
      console.error("Error fetching job data: ", error);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .max(20, "max 20 characters allowed")
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Only alphabets allowed"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(20, "max 20 characters allowed")
      .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Only alphabets allowed"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email"
      ),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/, "Invalid phone number"),
    // degree: Yup.string().required("Degree is required"),
    // branch: Yup.string().required("Branch is required"),
    // yearPassedOut: Yup.string()
    //   .required("Year Passed Out is required")
    //   .matches(/^(?!0000)\d{4}$/, "Invalid year provided"),
    // cgpa: Yup.string()
    //   .required("CGPA is required")
    //   .matches(/^[1-9](\.\d+)?$/, "Invalid CGPA provided"),
    // isExperienced: Yup.string().required("Experience is required"),
    // companyName: Yup.string().when("isExperienced", {
    //   is: (value) => value === "yes",
    //   then: () => Yup.string().required("Company Name is required"),
    //   otherwise: () => Yup.string(),
    // }),
    // role: Yup.string().when("isExperienced", {
    //   is: (value) => value === "yes",
    //   then: () => Yup.string().required("Role is required"),
    //   otherwise: () => Yup.string(),
    // }),
    // yearsExperience: Yup.string().when("isExperienced", {
    //   is: (value) => value === "yes",
    //   then: () => Yup.string().required("Years of Experience is required"),
    //   otherwise: () => Yup.string(),
    // }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      // degree: "",
      // branch: "",
      // yearPassedOut: "",
      // cgpa: "",
      // isExperienced: "",
      // companyName: "",
      // role: "",
      // yearsExperience: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleFormSubmit(values);
    },
  });

  const labelStyling = {
    "& .MuiFormLabel-asterisk": {
      color: "#cd4949",
    },
    fontSize: "12px",
    fontWeight: "bold",
    color: "black",
  };

  const textFieldStyling = {
    fontSize: "12.5px",
    mt: 0.5,
  };

  useEffect(() => {
    setSelectedFile(null);
    setFileConfirmed(false);
    fetchJobData();
  }, []);

  return (
    <>
      {/* {jobTitle && ( */}
      <Box width="100%" sx={{ px: 4, py: 2 }}>
        {!applySuccess ? (
          <form onSubmit={formik.handleSubmit}>
            <Stack gap={2} py={5} px={20}>
              <Typography
                paragraph={true}
                // gutterBottom={false}
                marginBottom={2}
                sx={{
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {/* {jobTitle} &gt; Apply */}
                Apply
              </Typography>
              {/* BASIC DETAILS */}
              <Typography
                component={"h2"}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Basic Details
              </Typography>
              {/* FN */}
              <Box>
                <FormLabel required htmlFor="firstName" sx={labelStyling}>
                  FIRST NAME
                </FormLabel>
                <TextField
                  fullWidth
                  autoComplete="given-name"
                  id="firstName"
                  InputProps={{
                    sx: textFieldStyling,
                    placeholder: "First Name",
                  }}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Box>
              {/* LN */}
              <Box>
                <FormLabel required htmlFor="lastName" sx={labelStyling}>
                  LAST NAME
                </FormLabel>
                <TextField
                  fullWidth
                  autoComplete="family-name"
                  id="lastName"
                  InputProps={{
                    sx: textFieldStyling,
                    placeholder: "Last Name",
                  }}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Box>
              {/* EMAIL */}
              <Box>
                <FormLabel required htmlFor="email" sx={labelStyling}>
                  EMAIL
                </FormLabel>
                <TextField
                  fullWidth
                  autoComplete="email"
                  id="email"
                  name="email"
                  InputProps={{
                    sx: textFieldStyling,
                    placeholder: "Email",
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              {/* PN */}
              <Box>
                <FormLabel required htmlFor="phoneNumber" sx={labelStyling}>
                  PHONE NUMBER
                </FormLabel>
                <TextField
                  fullWidth
                  autoComplete="tel-local"
                  id="phoneNumber"
                  name="phoneNumber"
                  InputProps={{
                    sx: textFieldStyling,
                    placeholder: "Phone Number",
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={"12.5px"}>+91</Typography>
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Box>
              {/* GENDER */}
              <Box>
                {/* <FormLabel
                  htmlFor="gender"
                  sx={{ fontSize: "12px", fontWeight: "bold", color: "black" }}
                >
                  GENDER
                </FormLabel> */}
                <FormControl fullWidth mt={0.5}>
                  <InputLabel
                    id="gender-label"
                    size="small"
                    sx={{
                      ".MuiInputLabel-sizeSmall": {
                        fontSize: "5px",
                      },
                    }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    // fontSize="12.5px"
                    id="gender"
                    name="gender"
                    size="small"
                    sx={{
                      fontSize: "14px",
                      // mt: 0.5,
                      p: 0.8,
                    }}
                    value={formik.values.gender}
                    label="Gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* RESUME */}
              <Stack my={2}>
                <Stack direction={"row"} gap={3}>
                  {selectedFile === null || !fileConfirmed ? (
                    <Box>
                      <input
                        type="file"
                        accept=".pdf"
                        style={{ display: "none" }}
                        name="resume"
                        id="fileInput"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="fileInput">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload Resume
                        </Button>
                      </label>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      component="span"
                      endIcon={<DoneIcon />}
                    >
                      Resume Uploaded
                    </Button>
                  )}
                  {selectedFile !== null && fileConfirmed ? (
                    <Button
                      variant="contained"
                      sx={{
                        width: "fit-content",
                        fontSize: "11px",
                        p: 1,
                      }}
                      onClick={() => {
                        setFileConfirmed(false);
                        setSelectedFile(false);
                        setFileName("");
                        setResumeError(true);
                      }}
                      disabled={!selectedFile}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{
                        width: "fit-content",
                        fontSize: "11px",
                        p: 1,
                      }}
                      onClick={handleUpload}
                      disabled={!selectedFile}
                    >
                      Confirm
                    </Button>
                  )}
                </Stack>
                {fileName && (
                  <Typography
                    variant="caption"
                    component={"span"}
                    display="block"
                    mt={1}
                    sx={{ color: "green" }}
                  >
                    {fileName}
                  </Typography>
                )}
                {resumeError && (
                  <Typography
                    variant="caption"
                    component={"span"}
                    display="block"
                    mt={1}
                    sx={{ color: "#cd4949" }}
                  >
                    Please upload your resume
                  </Typography>
                )}
              </Stack>
              <ReCAPTCHA
                sitekey="6LfNB88pAAAAAPdpc05xsEbz6TTR3TS4MQwM-fsU"
                onChange={onCapchaClick}
              />
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                }}
                type="submit"
                disabled={!capchaValue}
                onClick={() => {
                  if (!selectedFile || !fileConfirmed) {
                    setResumeError(true);
                  }
                }}
              >
                APPLY
              </Button>
            </Stack>
          </form>
        ) : (
          <ApplicationResult success={applySuccess} jobId={jobId} />
        )}

        {/* ) : (
        <ReCapchaScreen onCapchaClick={onCapchaClick} />
     )} */}

        {/* 
      <Modal
        open={openCapchaModal}
        onClose={handleCapchaModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            px: 3,
            py: 4,
            maxHeight: 500,
          }}
        >
          <ReCAPTCHA
            sitekey="6LfNB88pAAAAAPdpc05xsEbz6TTR3TS4MQwM-fsU"
            onChange={onCapchaClick}
          />
        </Box>
      </Modal> */}
      </Box>
    </>
  );
};

/*
 *
 * * * *  USE LATER * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 */

{
  /* EDUCATION */
}
{
  /* <Typography
                gutterBottom
                component={"h2"}
                sx={{ fontSize: "18px", mt: 3, fontWeight: "bold" }}
              >
                Education Details
              </Typography> */
}
{
  /* <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="degree-label">Degree</InputLabel>
                    <Select
                      labelId="degree-label"
                      id="degree-select"
                      name="degree"
                      size="small"
                      sx={{
                        fontSize: "14px",
                        p: 0.8,
                      }}
                      label="Degree"
                      value={formik.values.degree}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.degree && Boolean(formik.errors.degree)
                      }
                      helperText={formik.touched.degree && formik.errors.degree}
                    >
                      <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
                      <MenuItem value={"M.Tech"}>M.Tech</MenuItem>
                      <MenuItem value={"MCA"}>MCA</MenuItem>
                      <MenuItem value={"MBA"}>MBA</MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.degree && Boolean(formik.errors.degree) && (
                    <Typography
                      variant="caption"
                      component={"span"}
                      display="block"
                      mt={0.4}
                      ml={2}
                      sx={{ color: "#cd4949" }}
                    >
                      Degree is required
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Branch"
                    id="branch"
                    InputProps={{
                      sx: { fontSize: "12.5px" },
                      placeholder: "Enter your branch",
                    }}
                    value={formik.values.branch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.branch && Boolean(formik.errors.branch)
                    }
                    helperText={formik.touched.branch && formik.errors.branch}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    labelId="year-passed-out-label"
                    label="Year Passed Out"
                    id="yearPassedOut"
                    type="tel"
                    InputProps={{
                      sx: { fontSize: "12.5px" },
                      placeholder: "Enter your pass out year",
                    }}
                    value={formik.values.yearPassedOut}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.yearPassedOut &&
                      Boolean(formik.errors.yearPassedOut)
                    }
                    helperText={
                      formik.touched.yearPassedOut &&
                      formik.errors.yearPassedOut
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CGPA"
                    id="cgpa"
                    type="tel"
                    InputProps={{
                      sx: { fontSize: "12.5px" },
                      placeholder: "Enter your CGPA",
                    }}
                    value={formik.values.cgpa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cgpa && Boolean(formik.errors.cgpa)}
                    helperText={formik.touched.cgpa && formik.errors.cgpa}
                  />
                </Grid>
              </Grid> */
}
{
  /* EXPERIENCE */
}
{
  /* <Typography
                component={"h2"}
                sx={{ fontSize: "18px", mt: 3, fontWeight: "bold" }}
              >
                Experience
              </Typography> */
}
{
  /* <FormControl sx={{ display: "flex", mb: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Do you have experience?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="isExperienced"
                  // isExperienced
                  value={formik.values.isExperienced}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.isExperienced &&
                    Boolean(formik.errors.isExperienced)
                  }
                  helperText={
                    formik.touched.isExperienced && formik.errors.isExperienced
                  }
                  // onChange={(e) => setIsExperienced(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {formik.values.isExperienced === "yes" && (
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      size="medium"
                      label="Company Name"
                      fullWidth
                      InputProps={{
                        sx: { fontSize: "12.5px" },
                        placeholder: "Company Name",
                      }}
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.companyName &&
                        Boolean(formik.errors.companyName)
                      }
                      helperText={
                        formik.touched.companyName && formik.errors.companyName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="medium"
                      label="Role"
                      InputProps={{
                        sx: { fontSize: "12.5px" },
                        placeholder: "Role",
                      }}
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      size="medium"
                      label="Years of Experience"
                      type="number"
                      fullWidth
                      InputProps={{
                        sx: { fontSize: "12.5px" },
                        placeholder: "Years of Experience",
                      }}
                      value={formik.values.yearsExperience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.yearsExperience &&
                        Boolean(formik.errors.yearsExperience)
                      }
                      helperText={
                        formik.touched.yearsExperience &&
                        formik.errors.yearsExperience
                      }
                    />
                  </Grid>
                </Grid>
              )} */
}

{
  /* Technical Skills */
}
{/* <Autocomplete
  multiple
  id="free-solo-demo"
  options={techSkills}
  // onChange={handleSkillSelect}

  renderInput={(params) => <TextField {...params} label="Skills" />}
  value={tSkillTempSelect}
  onChange={
    ((event, newValue) => {
      setTSkillTempSelect(newValue);
    },
    handleTechSkillSelect)
  }
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        key={index}
        label={option}
        onDelete={() => handleTechnicalDelete(option)}
        {...getTagProps({ index })}
      />
    ))
  }
/>; */}

export default ApplyForm;
