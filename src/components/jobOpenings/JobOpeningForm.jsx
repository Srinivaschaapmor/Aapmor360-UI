import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
  colors,
  Modal,
  Button,
  Autocomplete,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import useSWR from "swr";

import { techSkills } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { postJobOpening } from "../../apiCalls/apiCalls";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
};
const fetcher = (url) => fetch(url).then((res) => res.json());

function JobOpeningForm() {
  const { data: masterData, isLoading: jobdescLoading } = useSWR(
    `http://localhost:5000/api/masterData`,
    fetcher
  );
  // console.log("masterData", masterData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [btnState, setBtnState] = useState(true);
  const [updatedJobForm, setUpdatedJobForm] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  // const { data: jobDetails, isLoading: jobdescLoading } = useSWR(
  //   `http://localhost:5000/api/jobPosting/${id}`,
  //   fetcher
  // );
  // console.log("jobDetails", jobDetails);
  const [jobOpeningForm, setJobOpeningForm] = useState({
    position: "",
    experience: "",
    minExperience: "",
    maxExperience: "",
    salary: "",
    minSalary: "",
    maxSalary: "",
    location: "",
    about: "",
    requirements: "",
    department: "",
    employmentType: "",
    mandatorySkills: [],
    technicalSkills: [],
    numOpenings: "",
    status: "open",
  });
  console.log(jobOpeningForm);

  const handleChange = (event) => {
    setBtnState(false);

    if (!(experience === "ENTRY_LEVEL")) {
      const { name, value } = event.target;
      setJobOpeningForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { name, value } = event.target;
      setJobOpeningForm((prevState) => ({
        ...prevState,
        minExperience: value,
        maxExperience: value,
      }));
    }
    if (!(salary === "notSpecified")) {
      const { name, value } = event.target;
      setJobOpeningForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { name, value } = event.target;
      setJobOpeningForm((prevState) => ({
        ...prevState,
        minSalary: value,
        maxSalary: value,
      }));
    }
  };
  const handleaboutChange = (content) => {
    setBtnState(false);
    setJobOpeningForm((prevState) => ({
      ...prevState,
      about: content,
    }));
  };
  const handlerequirementsChange = (content) => {
    setBtnState(false);
    setJobOpeningForm((prevState) => ({
      ...prevState,
      requirements: content,
    }));
  };

  const [experience, setExperienceType] = useState("");
  const handleExperienceChange = (event) => {
    setExperienceType(event.target.value);
  };

  const [salary, setsalary] = useState("");
  const handleSalaryRangeChange = (event) => {
    setsalary(event.target.value);
  };

  const [mandatoryopen, setMandatoryOpen] = useState(false);
  const handlemandatoryOpen = () => setMandatoryOpen(true);
  const handlemandatoryClose = () => setMandatoryOpen(false);
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const handletechnicalOpen = () => setTechnicalOpen(true);
  const handletechnicalClose = () => setTechnicalOpen(false);

  const [mandatorySkillTempSelect, setMandatorySkillTempSelect] = useState([]);
  const [tSkillTempSelect, setTSkillTempSelect] = useState([]);
  // console.log("selectedSkills", selectedSkills);

  const [errorMessage, setErrorMessage] = useState("");

  const handleMandatoryDelete = (skillToDelete) => {
    setMandatorySkillTempSelect((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete)
    );
    setErrorMessage("");
  };
  const handleTechnicalDelete = (skillToDelete) => {
    setTSkillTempSelect((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToDelete)
    );
    setErrorMessage("");
  };

  const handleMandatorySkillSelect = (event, newValue) => {
    setBtnState(false);
    if (newValue.length <= 5) {
      setMandatorySkillTempSelect(newValue);
      setErrorMessage("");
    } else {
      setErrorMessage("You can select up to 5 skills");
    }
  };
  const handleMandatorySkillSubmit = (newValue) => {
    // setSelectedSkills(newValue);
    setJobOpeningForm({ ...jobOpeningForm, mandatorySkills: newValue });
    setMandatoryOpen(false);
  };
  const handleTechSkillSelect = (event, newValue) => {
    setBtnState(false);
    if (newValue.length <= 5) {
      setTSkillTempSelect(newValue);
      setErrorMessage("");
    } else {
      setErrorMessage("You can select up to 5 skills");
    }
  };
  const handleTechSkillSubmit = (newValue) => {
    // setSelectedSkills(newValue);
    setJobOpeningForm({ ...jobOpeningForm, technicalSkills: newValue });
    setTechnicalOpen(false);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex to detect special characters
    const emojiRegex =
      /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/u; // Regex to detect emojis
    const leadingTrailingSpacesRegex = /^\s+|\s+$/g; // Regex to detect leading and trailing spaces
    // const upperLimit = 50; // Upper limit for field length
    // const lowerLimit = 3; // Lower limit for field length

    // Common validation function for text fields
    const validateTextField = (fieldName, value) => {
      if (!value) {
        errors[fieldName] = "* Field is required";
      } else if (
        specialCharsRegex.test(value) ||
        emojiRegex.test(value) ||
        leadingTrailingSpacesRegex.test(value)
      ) {
        errors[
          fieldName
        ] = `Field should not contain special characters, emojis, or leading/trailing spaces`;
      }
    };

    // Validation for position
    validateTextField("position", values.position);

    // Validation for experience
    validateTextField("experience", values.experience);

    // Validation for salary
    validateTextField("salary", values.salary);

    // Validation for location
    validateTextField("location", values.location);

    // Validation for about
    // validateTextField("about", values.about);

    // Validation for requirements
    // validateTextField("requirements", values.requirements);

    // Validation for department
    validateTextField("department", values.department);

    // Validation for employmentType
    validateTextField("employmentType", values.employmentType);

    // Validation for mandatorySkills
    if (values.mandatorySkills.length === 0) {
      errors.mandatorySkills = "Mandatory Skills is required";
    }

    // Validation for technicalSkills
    if (values.technicalSkills.length === 0) {
      errors.technicalSkills = "Technical Skills is required";
    }

    // Validation for numOpenings
    if (isNaN(values.numOpenings)) {
      errors.numOpenings = "No Of Openings must be a number";
    } else if (!values.numOpenings) {
      errors.numOpenings = "* Field is required";
    }

    if (!values.about) {
      errors.about = "* Field is required";
    }
    if (!values.requirements) {
      errors.requirements = "* Field is required";
    }

    if (values.experience === "MID_SENIOR_LEVEL") {
      if (!values.minExperience && !values.maxExperience) {
        errors.minExperience = "* Field is required";
        errors.maxExperience = "* Field is required";
      } else {
        if (values.minExperience && isNaN(values.minExperience)) {
          errors.minExperience = "Invalid Type";
        }
        if (values.maxExperience && isNaN(values.maxExperience)) {
          errors.maxExperience = "Invalid Type";
        }
        if (
          values.minExperience &&
          values.maxExperience &&
          parseInt(values.maxExperience) <= parseInt(values.minExperience)
        ) {
          errors.maxExperience =
            "Max experience must be greater than min experience";
        }
      }
    }

    if (values.salary === "specifyRange") {
      if (!values.minSalary && !values.maxSalary) {
        errors.minSalary = "* Field is required";
        errors.maxSalary = "* Field is required";
      } else if (parseInt(values.maxSalary) <= parseInt(values.minSalary)) {
        errors.maxSalary = "Must be greater than min salary";
      } else {
        if (isNaN(values.minSalary)) {
          errors.minSalary = "Invalid Type";
        }
        if (isNaN(values.maxSalary)) {
          errors.maxSalary = "Invalid Type";
        }
      }
    }

    return errors;
  };

  async function fetchData() {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobPosting/${id}`);
      setJobOpeningForm(res.data);
      setUpdatedJobForm(true);
      setMandatorySkillTempSelect(res.data.mandatorySkills);
      setTSkillTempSelect(res.data.technicalSkills);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    // console.log(formErrors);
    if (isSubmit) {
      setFormErrors(validate(jobOpeningForm));
    }
  }, [formErrors, jobOpeningForm, isSubmit]);

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormErrors(validate(jobOpeningForm));
    setIsSubmit(true);
    if (Object.entries(validate(jobOpeningForm)).length === 0) {
      try {
        if (id) {
          const res = await axios.put(
            `http://localhost:5000/api/jobPosting/${id}`,
            jobOpeningForm
          );
          if (res.status === 200) {
            toast.success("Job posting updated successfully", {
              onClose: () => {
                navigate("/job-openings");
              },
            });
            // navigate("/job-openings");
          }
        } else {
          const response = await postJobOpening(jobOpeningForm);
          if (response.status === 201) {
            toast.success("Job posting created successfully", {
              onClose: () => {
                // Navigate to the desired location after the toast is closed
                navigate("/job-openings");
              },
            });
          }
        }
      } catch (error) {
        toast("Failed to submit Job Opening form");
      }
    }
  };

  return (
    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      <Box sx={{ m: 5 }}>
        <Stack direction={"row"} gap={2} alignItems={"center"} mb={7}>
          {/* 0047ff */}
          <IconButton
            aria-label="back"
            size="small"
            onClick={() => navigate("/job-openings")}
          >
            <ArrowBackIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <Typography variant="h5" sx={{ ":hover": { cursor: "auto" } }}>
            JOB POSTING FORM
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            // spacing={2}
            justifyContent="center"
            sx={{
              // mt: 5,
              alignItems: "center",
              width: "100%",
              // height: "100%",
              px: 4,
              // height: "100%",
            }}
            // columnSpacing={5}
            rowSpacing={4}
          >
            <Grid item xs={3}>
              <FormLabel
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                POSITION
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField
                // label="Outlined"
                name="position"
                value={jobOpeningForm.position}
                onChange={handleChange}
                helperText={formErrors.position}
                FormHelperTextProps={{ style: { color: "red" } }}
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    fontSize: "14px",
                  },
                  placeholder: "100 characters max",
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                LOCATION
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel style={{ color: "grey", fontSize: 13 }}>
                  Select Location
                </InputLabel>
                <Select
                  name="location"
                  value={jobOpeningForm.location}
                  onChange={handleChange}
                  size="small"
                  label="Select Location"
                >
                  <MenuItem value={"India"}>India</MenuItem>
                  <MenuItem value={"USA"}>USA</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                  {formErrors.location}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                EXPERIENCE
              </FormLabel>
            </Grid>
            <Grid
              item
              xs={jobOpeningForm.experience === "MID_SENIOR_LEVEL" ? 3 : 9}
            >
              <FormControl sx={{ width: 200 }}>
                <InputLabel style={{ color: "grey", fontSize: 13 }}>
                  Select Experience
                </InputLabel>
                <Select
                  // sx={}s
                  size="small"
                  name="experience"
                  // id="demo-simple-select"
                  value={jobOpeningForm.experience}
                  label="Select Experience"
                  onChange={handleChange}
                >
                  <MenuItem value={"ENTRY_LEVEL"}>Entry Level</MenuItem>

                  <MenuItem value={"MID_SENIOR_LEVEL"}>Experienced</MenuItem>
                  <MenuItem value={"DIRECTOR"}>Director</MenuItem>
                  <MenuItem value={"EXECUTIVE"}>Executive</MenuItem>
                  <MenuItem value={"NOT_APPLICABLE"}>Not Applicable</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                  {formErrors.experience}
                </FormHelperText>
              </FormControl>
            </Grid>
            {jobOpeningForm.experience === "MID_SENIOR_LEVEL" ? (
              <Grid item xs={6}>
                <Stack direction={"row"} gap={2}>
                  <Stack width={"50%"}>
                    <TextField
                      type="tel"
                      placeholder="Min experience in years"
                      name="minExperience"
                      value={jobOpeningForm.minExperience}
                      // required
                      size="small"
                      onChange={handleChange}
                      helperText={formErrors.minExperience}
                      FormHelperTextProps={{ style: { color: "red" } }}
                      sx={{
                        // width: "50%",
                        "& .MuiFormLabel-asterisk": {
                          // color: "#cd4949",
                          display: "none",
                        },
                      }}
                    />
                  </Stack>
                  <Stack width={"50%"}>
                    <TextField
                      type="tel"
                      placeholder="Max experience in years"
                      name="maxExperience"
                      value={jobOpeningForm.maxExperience}
                      onChange={handleChange}
                      helperText={formErrors.maxExperience}
                      FormHelperTextProps={{
                        style: { color: "red", width: "300px" },
                      }}
                      // required
                      size="small"
                      sx={{
                        "& .MuiFormLabel-asterisk": {
                          // color: "#cd4949",
                          display: "none",
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              </Grid>
            ) : null}
            <Grid item xs={3}>
              <FormLabel
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                SALARY
              </FormLabel>
            </Grid>
            <Grid item xs={jobOpeningForm.salary === "specifyRange" ? 3 : 9}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel style={{ color: "grey", fontSize: 13 }}>
                  Select Salary Range
                </InputLabel>
                <Select
                  // sx={}s
                  size="small"
                  // id="demo-simple-select"
                  name="salary"
                  value={jobOpeningForm.salary}
                  label="Select Salary Range"
                  onChange={handleChange}
                >
                  <MenuItem value={"notSpecified"}>Not Specified</MenuItem>
                  <MenuItem value={"specifyRange"}>Specify Range</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                  {formErrors.salary}
                </FormHelperText>
              </FormControl>
            </Grid>
            {jobOpeningForm.salary === "specifyRange" ? (
              <Grid item xs={6}>
                <Stack direction={"row"} gap={2}>
                  <Stack width={"50%"}>
                    <TextField
                      type="tel"
                      required
                      value={jobOpeningForm.minSalary}
                      helperText={formErrors.minSalary}
                      FormHelperTextProps={{ style: { color: "red" } }}
                      placeholder="Min Salary"
                      name="minSalary"
                      onChange={handleChange}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {" "}
                            {jobOpeningForm.location === "India" ? "₹" : "$"}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            {" "}
                            {jobOpeningForm.location === "India" ? "LPA" : "K"}
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        // width: "50%",
                        "& .MuiFormLabel-asterisk": {
                          // color: "#cd4949",
                          display: "none",
                        },
                      }}
                    />
                  </Stack>
                  <Stack width={"50%"}>
                    <TextField
                      type="tel"
                      required
                      helperText={formErrors.maxSalary}
                      value={jobOpeningForm.maxSalary}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {jobOpeningForm.location === "India" ? "₹" : "$"}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            {" "}
                            {jobOpeningForm.location === "India" ? "LPA" : "K"}
                          </InputAdornment>
                        ),
                      }}
                      FormHelperTextProps={{
                        style: { color: "red", width: "300px" },
                      }}
                      size="small"
                      name="maxSalary"
                      onChange={handleChange}
                      placeholder="Max Salary"
                      sx={{
                        "& .MuiFormLabel-asterisk": {
                          // color: "#cd4949",
                          display: "none",
                        },
                      }}
                    />
                  </Stack>
                </Stack>
              </Grid>
            ) : null}

            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                ABOUT THE ROLE
              </FormLabel>
            </Grid>
            <Grid item xs={9} sx={{ mb: 8, position: "relative" }}>
              <ReactQuill
                value={jobOpeningForm.about}
                style={{ height: "100px" }}
                theme="snow"
                onChange={handleaboutChange} // Attach onChange handler for ReactQuill
              />
              <FormHelperText
                sx={{ color: "red", fontSize: 12 }}
                style={{
                  position: "absolute",
                  bottom: "-70px",
                }}
              >
                {formErrors.about}
              </FormHelperText>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                REQUIREMENTS
              </FormLabel>
            </Grid>
            <Grid item xs={9} sx={{ mb: 8, position: "relative" }}>
              {/* <TextField
                multiline
                name="requirements"
                value={jobOpeningForm.requirements}
                onChange={handleChange}
                minRows={5}
                helperText={formErrors.requirements}
                FormHelperTextProps={{ style: { color: "red" } }}
                maxRows={5}
                sx={{ width: "100%" }}
                placeholder="5000 characters max"
                // required
                type="textarea"
                // helperText={formErrors.aboutYourself}
                // FormHelperTextProps={{ style: { color: "red" } }}
                size="small"
              ></TextField> */}
              <ReactQuill
                value={jobOpeningForm.requirements}
                style={{ height: "100px" }}
                theme="snow"
                onChange={handlerequirementsChange} // Attach onChange handler for ReactQuill
              />
              <FormHelperText
                sx={{
                  color: "red",
                  fontSize: 12,
                }}
                style={{
                  position: "absolute",
                  bottom: "-70px",
                }}
              >
                {formErrors.requirements}
              </FormHelperText>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                DEPARTMENT
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel style={{ color: "grey", fontSize: 13 }}>
                  Select Department
                </InputLabel>

                <Select
                  name="department"
                  value={jobOpeningForm.department}
                  onChange={handleChange}
                  size="small"
                  label="Select Department"
                  MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                >
                  {masterData?.map(
                    (value, index) =>
                      value.category === "department" && (
                        <MenuItem key={index} value={value.label}>
                          {value.name}
                        </MenuItem>
                      )
                  )}

                  {/* <MenuItem value={"fullStack"}>Full Stack</MenuItem>
                  <MenuItem value={"testing"}>Testing</MenuItem>
                  <MenuItem value={"aiMl"}>AI/ML</MenuItem>
                  <MenuItem value={"devops"}>Devops</MenuItem>
                  <MenuItem value={"uiUx"}>UI/UX</MenuItem>
                  <MenuItem value={"dataScience"}>Data Science</MenuItem>
                  <MenuItem value={"hr"}>HR</MenuItem>
                  <MenuItem value={"business"}>Business</MenuItem> */}
                </Select>
                <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                  {formErrors.department}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                TYPE OF EMPLOYMENT
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <FormControl sx={{ width: 200 }}>
                <InputLabel
                  htmlFor="location"
                  style={{ color: "grey", fontSize: 13 }}
                >
                  Select Employee Type
                </InputLabel>
                <Select
                  name="employmentType"
                  value={jobOpeningForm.employmentType}
                  onChange={handleChange}
                  size="small"
                  label="Select Department"
                >
                  <MenuItem value={"FULL_TIME"}>Full Time</MenuItem>
                  <MenuItem value={"PART_TIME"}>Part Time</MenuItem>
                  <MenuItem value={"INTERNSHIP"}>Internship</MenuItem>
                  <MenuItem value={"CONTRACT"}>Contract</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                  {formErrors.employmentType}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                MANDATORY SKILLS
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid rgb(204, 204, 204)",
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Stack direction={"row"} alignItems={"center"} sx={{ pb: 3 }}>
                  <Typography fontWeight={600}>
                    {" "}
                    Enter Mandatory skills
                  </Typography>
                  <Button
                    onClick={handlemandatoryOpen}
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <CreateIcon />
                  </Button>
                </Stack>

                {jobOpeningForm.mandatorySkills &&
                  jobOpeningForm.mandatorySkills.map((value, i) => (
                    <Chip key={i} label={value} sx={{ mx: 1 }}></Chip>
                  ))}
              </Box>
              <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                {formErrors.mandatorySkills}
              </FormHelperText>
              <Modal
                open={mandatoryopen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0, p: 2 }}
                    onClick={handlemandatoryClose}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box sx={{ p: 3 }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ pl: 5, pt: 5, pr: 5, pb: 2, fontWeight: 700 }}
                    >
                      Mandatory Skills
                    </Typography>
                    {!errorMessage ? (
                      <Typography sx={{ pl: 5, pb: 3, fontSize: 12 }}>
                        Enter 5 mandatory skills
                      </Typography>
                    ) : (
                      <Typography
                        sx={{ pl: 5, pb: 3, fontSize: 12 }}
                        // variant="caption"
                        color="error"
                      >
                        {errorMessage}
                      </Typography>
                    )}
                    {/* <TextField sx={{ width: "100%", pl: 5 }}></TextField> */}
                    <Stack sx={{ pl: 5 }}>
                      <Autocomplete
                        multiple
                        id="free-solo-demo"
                        options={techSkills}
                        // onChange={handleSkillSelect}

                        renderInput={(params) => (
                          <TextField {...params} label="Skills" />
                        )}
                        value={mandatorySkillTempSelect}
                        onChange={
                          ((event, newValue) => {
                            setMandatorySkillTempSelect(newValue);
                          },
                          handleMandatorySkillSelect)
                        }
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              key={index}
                              label={option}
                              onDelete={() => handleMandatoryDelete(option)}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                      />
                    </Stack>
                    <Box sx={{ pt: 5, pl: 5, textAlign: "right" }}>
                      <Button
                        onClick={
                          () =>
                            handleMandatorySkillSubmit(mandatorySkillTempSelect)
                          // handleClose
                        }
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                htmlFor="totalCost"
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                TECHNICAL SKILLS
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid rgb(204, 204, 204)",
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Stack direction={"row"} alignItems={"center"} sx={{ pb: 3 }}>
                  <Typography fontWeight={600}>
                    {" "}
                    Enter Technical skills
                  </Typography>
                  <Button
                    onClick={handletechnicalOpen}
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <CreateIcon />
                  </Button>
                </Stack>

                {jobOpeningForm.technicalSkills &&
                  jobOpeningForm.technicalSkills.map((value, i) => (
                    <Chip key={i} label={value} sx={{ mx: 1 }}></Chip>
                  ))}
              </Box>
              <FormHelperText sx={{ color: "red", fontSize: 12 }}>
                {formErrors.technicalSkills}
              </FormHelperText>
              <Modal
                open={technicalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0, p: 2 }}
                    onClick={handletechnicalClose}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box sx={{ p: 5 }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ pl: 5, pt: 5, pr: 5, pb: 2, fontWeight: 700 }}
                    >
                      Technical Skills
                    </Typography>
                    {/* {!errorMessage ? (
                    <Typography sx={{ pl: 5, pb: 3, fontSize: 12 }}>
                      Enter 5 mandatory skills
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ pl: 5, pb: 3, fontSize: 12 }}
                      // variant="caption"
                      color="error"
                    >
                      {errorMessage}
                    </Typography>
                  )} */}
                    {/* <TextField sx={{ width: "100%", pl: 5 }}></TextField> */}
                    <Stack sx={{ pl: 5 }}>
                      <Autocomplete
                        multiple
                        id="free-solo-demo"
                        options={techSkills}
                        // onChange={handleSkillSelect}

                        renderInput={(params) => (
                          <TextField {...params} label="Skills" />
                        )}
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
                      />
                    </Stack>
                    <Box sx={{ pt: 5, pl: 5, textAlign: "right" }}>
                      <Button
                        onClick={
                          () => handleTechSkillSubmit(tSkillTempSelect)
                          // handleClose
                        }
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            </Grid>
            <Grid item xs={3}>
              <FormLabel
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "#cd4949",
                  },
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                NUMBER OF OPENINGS
              </FormLabel>
            </Grid>
            <Grid item xs={9}>
              <TextField
                // label="Outlined"
                name="numOpenings"
                value={jobOpeningForm.numOpenings}
                onChange={handleChange}
                helperText={formErrors.numOpenings}
                FormHelperTextProps={{ style: { color: "red" } }}
                type="tel"
                size="small"
                // fullWidth

                sx={{ width: "20%" }}
                InputProps={{
                  sx: {
                    fontSize: "14px",
                  },
                  placeholder: "Enter Number",
                }}
              />
            </Grid>
            {updatedJobForm && (
              <>
                <Grid item xs={3}>
                  <FormLabel
                    required
                    sx={{
                      "& .MuiFormLabel-asterisk": {
                        color: "#cd4949",
                      },
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    STATUS
                  </FormLabel>
                </Grid>
                <Grid item xs={9}>
                  <FormControl sx={{ width: 200 }}>
                    <InputLabel style={{ color: "grey", fontSize: 13 }}>
                      Select status
                    </InputLabel>
                    <Select
                      name="status"
                      value={jobOpeningForm.status}
                      onChange={handleChange}
                      size="small"
                      label=" Select status"
                    >
                      <MenuItem value={"open"}>Open</MenuItem>
                      <MenuItem value={"closed"}>Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Stack
              direction={"row"}
              sx={{ mt: 10, width: "100%" }}
              justifyContent={"space-between"}
            >
              <Button
                onClick={() => navigate("/job-openings")}
                variant="outlined"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={btnState} variant="contained">
                Submit
              </Button>
            </Stack>
          </Grid>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </Grid>
  );
}

export default JobOpeningForm;
