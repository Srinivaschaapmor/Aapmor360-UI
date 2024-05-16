import { useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Tab,
  Tabs,
  Alert,
  Box,
  IconButton,
  Card,
  Tooltip,
} from "@mui/material";

import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getJobSeekerDetails,
  submitEmployeeDetails,
  getRecruitmentDetails,
} from "../../apiCalls/apiCalls";
import { Validations } from "../../utils/validation";
import SideBar from "../sidebar/sidebar";

const vertical = "top";
const horizontal = "center";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    fontWeight: "bold",
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeForm = (props) => {
  // const getLocalStorageItem = JSON.parse(localStorage.getItem("userDetails"));
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showWarning, setUserExistMsg] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [value, setValue] = useState(0);
  // const [jobSeekersList, setJobSeekersList] = useState([]);
  const tabs = [
    "personal information",
    "contact information",
    "employment information",
    "emergency information",
    "projects",
    "company assets",
  ];

  const { id } = props;
  console.log(id, "hari id");

  useEffect(() => {
    const getJobSeekersList = async () => {
      try {
        const response = await getJobSeekerDetails(id);
        const data = await response.data;
        if (response.status === 200) {
          const lastEmployee = data.response;
          setEmployeeDetails(lastEmployee);
        }
      } catch (error) {
        return (
          <Alert variant="outlined" severity="warning">
            Please check your network connectivity
          </Alert>
        );
      }
    };

    getJobSeekersList();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    console.log("next");

    setValue((prevValue) => prevValue + 1);
  };

  const handlePrevious = () => {
    setValue((prevValue) => prevValue - 1);
  };

  useEffect(() => {
    document.title = "Aapmor Employee Details";
  });

  //handle Emergency contacts
  const [emrgncy, setEmrgncy] = useState([
    { name: "", phoneNo: "", relation: "" },
  ]);
  const handleEmrgncyChanges = (e, index) => {
    const { name, value } = e.target;
    const list = [...emrgncy];
    list[index][name] = value;
    setEmrgncy(list);
    setEmployeeDetails({
      ...employeeDetails,
      emergencyDetails: list,
    });
  };
  const addEmrgncyrField = () => {
    setEmrgncy([...emrgncy, { name: "", phoneNo: "", relation: "" }]);
    setEmployeeDetails({
      ...employeeDetails,
      emergencyDetails: [...emrgncy, { name: "", phoneNo: "", relation: "" }],
    });
  };
  const removeEmrgncyField = (index) => {
    const list = [...emrgncy];
    list.splice(index, 1);
    setEmrgncy(list);
    setEmployeeDetails({
      ...employeeDetails,
      emergencyDetails: list,
    });
  };

  // handle Projects
  const [projects, setProjects] = useState([
    { projectName: "", clientName: "" },
  ]);
  const handelProjects = (e, index) => {
    const list = [...projects];
    list[index] = e.target.value;
    setProjects(list);
    setEmployeeDetails({
      ...employeeDetails,
      projects: list,
    });
  };
  const addProjectField = () => {
    setProjects([...projects, ""]);
    setEmployeeDetails({
      ...employeeDetails,
      projects: [...projects, ""],
    });
  };
  const deleteProjectField = (index) => {
    const list = [...projects];
    list.splice(index, 1);
    setProjects(list);
    setEmployeeDetails({
      ...employeeDetails,
      projects: list,
    });
  };

  // STATE TO MAINTAIN ALL VALUES
  const [employeeDetails, setEmployeeDetails] = useState(
    // getLocalStorageItem !== null
    //   ? getLocalStorageItem
    {
      fullName: "",
      dateOfBirth: "",
      employeeId: "",
      employeeEmail: "",
      gender: "",
      address: "",
      phoneNumber: "",
      email: "",
      maritalStatus: "",
      jobTitle: "",
      dateOfHire: "",
      department: "",
      workLocation: "",
      manager: "",
      bloodGroup: "",
      laptop: "",
      laptopSerialNo: "",
      userImage: "",
      projects: { projectName: "", clientName: "" },
    }
  );

  // ERRORS VALIDATIONS ALL VALUES
  const [errors, setErrors] = useState({
    fullName: "",
    dateOfBirth: "",
    employeeId: "",
    employeeEmail: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    maritalStatus: "",
    jobTitle: "",
    dateOfHire: "",
    department: "",
    workLocation: "",
    manager: "",
    emergencyPerson: "",
    bloodGroup: "",
    emergencyPhoneNumber: "",
    emergencyRelation: "",
    laptop: "",
    laptopSerialNo: "",
    projects: { projectName: "", clientName: "" },
    userImage: "",
  });
  const handleInputChange = (fieldName) => (event) => {
    setEmployeeDetails({
      ...employeeDetails,
      [fieldName]: event.target.value,
    });
  };
  const handleErrorMsgs = (fieldName) => (event) => {
    // You can perform your validation logic here
    let errorMessage = "";
    const fieldValue = event.target.value;
    console.log(fieldName, fieldValue);
    switch (fieldName) {
      case "userImage":
        if (!fieldValue) {
          errorMessage = "Please select an image file.";
        } else {
          // Check file type
          const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
          if (!allowedTypes.includes(fieldValue.type)) {
            errorMessage =
              "Invalid file type. Please upload a JPEG, PNG, or GIF.";
          }

          // Check file size (in bytes)
          const maxSize = 5 * 1024 * 1024; // 5 MB
          if (fieldValue.size > maxSize) {
            errorMessage = "File size exceeds the maximum limit of 5 MB.";
          }
        }
        break;
      case "fullName":
        errorMessage = !Validations.fullName.validate(fieldValue)
          ? Validations.fullName.errorMessage
          : "";

        break;
      case "manager":
        // const managerName = /^[a-z][a-z\s]*$/;
        errorMessage = !Validations.name.validate(fieldValue)
          ? Validations.name.errorMessage
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
      case "employeeEmail":
        const employeeEmailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@aapmor\.com$/;
        errorMessage = !employeeEmailRegex.test(fieldValue)
          ? "Invalid email address"
          : "";
        break;
      case "employeeID":
        errorMessage = !Validations.employeeID.validate(fieldValue)
          ? Validations.employeeID.errorMessage
          : "";
        break;
      case "laptop":
        errorMessage = !Validations.laptopName.validate(fieldValue)
          ? Validations.laptopName.errorMessage
          : "";
        break;

      case "laptopSerialNo":
        errorMessage = !Validations.laptopSerialNumber.validate(fieldValue)
          ? Validations.laptopSerialNumber.errorMessage
          : "";
        break;

      case "chargerSerialNo":
        errorMessage = !Validations.laptopSerialNumber.validate(fieldValue)
          ? Validations.laptopSerialNumber.errorMessage
          : "";
        break;

      case "mouseSerialNumber":
        errorMessage = !Validations.mouseSerialNumber.validate(fieldValue)
          ? Validations.mouseSerialNumber.errorMessage
          : "";
        break;

      case "projectName":
        errorMessage = !Validations.projectName.validate(fieldValue)
          ? Validations.projectName.errorMessage
          : "";
        break;

      case "workLocation":
        errorMessage = !Validations.workLocation.validate(fieldValue)
          ? Validations.workLocation.errorMessage
          : "";
        break;
      case "emergencyPerson":
        errorMessage =
          fieldValue.length < 3
            ? "Full Name must be at least 3 characters"
            : "";
        break;
      case "emergencyPhoneNumber":
        const EmergencyPhoneNumberRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        errorMessage = !EmergencyPhoneNumberRegex.test(fieldValue)
          ? "Invalid phone number"
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

  // PROFILE IMAGE UPLOADING...
  const handleImageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setEmployeeDetails({
      ...employeeDetails,
      userImage: base64,
    });
  };

  // CONVERTING TO BASE64 FORMAT
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

  //SAVING DATA TO LOCALSTORAGE
  const handleSaveButton = () => {
    localStorage.setItem("userDetails", JSON.stringify(employeeDetails));
  };

  //SUBMITTING THE DATA TO BACKEND
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("entered");
    const response = await submitEmployeeDetails(employeeDetails);
    console.log(response.data);
    console.log("Submitted:", employeeDetails);
    if (response.status === 200) {
      setEmployeeDetails({
        fullName: "",
        dateOfBirth: "",
        employeeId: "",
        employeeEmail: "",
        gender: "",
        address: "",
        phoneNumber: "",
        email: "",
        maritalStatus: "",
        jobTitle: "",
        dateOfHire: "",
        department: "",
        workLocation: "",
        manager: "",
        emergencyPerson: "",
        bloodGroup: "",
        emergencyPhoneNumber: "",
        emergencyRelation: "",
        laptop: "",
        laptopSerialNo: "",
        userImage: "",
        projects: { projectName: "", clientName: "" },
      });

      setAlertMessage("Success");
      setShowAlert(true);
    }
    if (response.status === 202) {
      setWarningMessage(response.data.error);
      setUserExistMsg(true);
    }
  };

  const renderAlertMessage = () => {
    return (
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="Details updated successfully"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    );
  };
  const renderWarningMessage = () => {
    return (
      <Snackbar
        open={showWarning}
        autoHideDuration={6000}
        onClose={() => setUserExistMsg(false)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => setUserExistMsg(false)}
          severity="warning"
          sx={{ width: "500px" }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    );
  };

  return (
    // <Grid container flexDirection={"row"}>
    // {/* <Grid item flex={1}>
    //   <SideBar />
    // </Grid> */}
    <Grid
      component={"form"}
      onSubmit={handleNext}
      item
      flex={8}
      container
      spacing={1}
      padding={"20px"}
    >
      <Box
        // p={3}
        sx={{
          width: { md: "100%", xs: "90%" },
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Employee Profile Center
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Card>
              {/* PERSONAL INFORMATION */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Personal Information" {...a11yProps(0)} />
                  <Tab label="Contact Information" {...a11yProps(1)} />
                  <Tab label="Employment Information" {...a11yProps(2)} />
                  <Tab label="Emergency Information" {...a11yProps(3)} />
                  <Tab label="Company Assets" {...a11yProps(4)} />
                  <Tab label="Projects" {...a11yProps(5)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0} fullWidth>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{
                    height: { md: "200px", xs: "auto" },
                  }}
                >
                  <Stack direction={"column"} spacing={1} mr={3} mb={{ xs: 2 }}>
                    <Avatar
                      sx={{
                        width: 160,
                        height: 160,
                        borderRadius: "6px",
                      }}
                      alt="profile image"
                      variant="square"
                      src={
                        employeeDetails.userImage !== ""
                          ? employeeDetails.userImage
                          : ""
                      }
                    />
                    <Stack direction={"row"} alignItems={"start"} spacing={1}>
                      <Tooltip title="file size maximum 5mb">
                        <Button
                          variant="outlined"
                          color="primary"
                          component="label"
                          htmlFor="userImage"
                          sx={{ width: "128px" }}
                          startIcon={<PhotoCameraOutlinedIcon />}
                        >
                          Upload
                        </Button>
                      </Tooltip>
                      <input
                        type={"file"}
                        style={{ display: "none" }}
                        id="userImage"
                        onChange={handleImageUpload}
                      />
                      <IconButton
                        size="small"
                        variant="contained"
                        sx={{
                          cursor: "pointer",
                          outline: "none",
                          color: "black",
                        }}
                        onClick={() =>
                          setEmployeeDetails({
                            ...employeeDetails,
                            userImage: "",
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        size="small"
                        variant="outlined"
                        label="Full name"
                        fullWidth
                        value={employeeDetails.fullName}
                        onChange={handleInputChange("fullName")}
                        onBlur={handleErrorMsgs("fullName")}
                      />
                      {errors.fullName && (
                        <Typography sx={{ color: "red" }} variant="body2">
                          {errors.fullName}
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        size="small"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={employeeDetails.dateOfBirth}
                        onChange={handleInputChange("dateOfBirth")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small" required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          fullWidth
                          value={employeeDetails.gender}
                          label="Gender"
                          onChange={handleInputChange("gender")}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Marital Status</InputLabel>
                        <Select
                          fullWidth
                          value={employeeDetails.maritalStatus}
                          label="Marital Status"
                          onChange={handleInputChange("maritalStatus")}
                          placeholder="Select"
                        >
                          <MenuItem value={"Married"}>Married</MenuItem>
                          <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                          label="Blood Group"
                          value={employeeDetails.bloodGroup}
                          onChange={handleInputChange("bloodGroup")}
                        >
                          <MenuItem value={"A+"}>A+</MenuItem>
                          <MenuItem value={"A-"}>A-</MenuItem>
                          <MenuItem value={"B+"}>B+</MenuItem>
                          <MenuItem value={"B-"}>B-</MenuItem>
                          <MenuItem value={"O+"}>O+</MenuItem>
                          <MenuItem value={"O-"}>O-</MenuItem>
                          <MenuItem value={"AB+"}>AB+</MenuItem>
                          <MenuItem value={"AB-"}>AB-</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Stack>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1} fullWidth>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      label="Phone Number"
                      variant="outlined"
                      type="tel"
                      fullWidth
                      value={employeeDetails.phoneNumber}
                      onChange={handleInputChange("phoneNumber")}
                      onBlur={handleErrorMsgs("phoneNumber")}
                    />
                    {errors.phoneNumber && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={employeeDetails.email}
                      onChange={handleInputChange("email")}
                      onBlur={handleErrorMsgs("email")}
                    />
                    {errors.email && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.email}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      value={employeeDetails.address}
                      onChange={handleInputChange("address")}
                    />
                  </Grid>
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2} fullWidth>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      size="small"
                      label="Job Title"
                      variant="outlined"
                      fullWidth
                      value={employeeDetails.jobTitle}
                      onChange={handleInputChange("jobTitle")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      size="small"
                      label="Employee ID"
                      variant="outlined"
                      fullWidth
                      value={employeeDetails.employeeId}
                      onChange={handleInputChange("employeeId")}
                      onBlur={handleErrorMsgs("employeeID")}
                    />
                    {errors.employeeID && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.employeeID}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      size="small"
                      label="Employee Email"
                      variant="outlined"
                      fullWidth
                      value={employeeDetails.employeeEmail}
                      onChange={handleInputChange("employeeEmail")}
                      onBlur={handleErrorMsgs("employeeEmail")}
                    />
                    {errors.employeeEmail && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.employeeEmail}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      required
                      size="small"
                      label="Date of Hire"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      value={employeeDetails.dateOfHire}
                      onChange={handleInputChange("dateOfHire")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Department</InputLabel>
                      <Select
                        label="Department"
                        value={employeeDetails.department}
                        onChange={handleInputChange("department")}
                      >
                        <MenuItem value={"Fullstack"}>Fullstack</MenuItem>
                        <MenuItem value={"Data Analyst"}>Data Analyst</MenuItem>
                        <MenuItem value={"Data Science"}>Data Science</MenuItem>
                        <MenuItem value={"AI ML"}>AI ML</MenuItem>
                        <MenuItem value={"Testing"}>Testing</MenuItem>
                        <MenuItem value={"Devops"}>Devops</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      size="small"
                      label="Work Location"
                      variant="outlined"
                      fullWidth
                      required
                      value={employeeDetails.workLocation}
                      onChange={handleInputChange("workLocation")}
                      onBlur={handleErrorMsgs("workLocation")}
                    />
                    {errors.workLocation && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.workLocation}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      size="small"
                      label="Manager / Supervisor"
                      variant="outlined"
                      fullWidth
                      value={employeeDetails.manager}
                      onChange={handleInputChange("manager")}
                      onBlur={handleErrorMsgs("manager")}
                    />
                    {errors.manager && (
                      <Typography sx={{ color: "red" }} variant="body2">
                        {errors.manager}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3} xs={12}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid sx={{ alignSelf: "flex-end" }}>
                    {emrgncy.length > 0 && emrgncy.length < 3 && (
                      <Button
                        variant="filled"
                        onClick={addEmrgncyrField}
                        sx={{ marginBottom: "10px" }}
                      >
                        <PersonAddAlt1Icon />
                      </Button>
                    )}
                  </Grid>
                  {emrgncy.map((value, index) => (
                    <Grid container rowSpacing={1.5} mb={5}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            size="small"
                            label="Emergency contact name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={emrgncy.phoneNo}
                            onChange={(e) => handleEmrgncyChanges(e, index)}
                            onBlur={handleErrorMsgs("emergencyPerson")}
                          />
                          {errors.emergencyPerson && (
                            <Typography sx={{ color: "red" }} variant="body2">
                              {errors.emergencyPerson}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            size="small"
                            label="Phone Number"
                            variant="outlined"
                            type="number"
                            fullWidth
                            name="phoneNo"
                            value={value.phoneNo}
                            onChange={(e) => handleEmrgncyChanges(e, index)}
                            onBlur={handleErrorMsgs("emergencyPhoneNumber")}
                          />
                          {errors.emergencyPhoneNumber && (
                            <Typography sx={{ color: "red" }} variant="body2">
                              {errors.emergencyPhoneNumber}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Relation</InputLabel>
                            <Select
                              label="Relation"
                              name="relation"
                              value={employeeDetails.relation}
                              onChange={(e) => handleEmrgncyChanges(e, index)}
                            >
                              <MenuItem value={"Father"}>Father</MenuItem>
                              <MenuItem value={"Mother"}>Mother</MenuItem>
                              <MenuItem value={"Brother"}>Brother</MenuItem>
                              <MenuItem value={"Sister"}>Sister</MenuItem>
                              <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item>
                          {emrgncy.length > 1 && (
                            <Button
                              variant="filled"
                              onClick={removeEmrgncyField}
                            >
                              <PersonRemoveAlt1Icon />{" "}
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4} fullWidth>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid sx={{ alignSelf: "flex-end" }}></Grid>
                  <Grid container rowSpacing={1.5} mb={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Laptop Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={employeeDetails.laptop}
                          onBlur={handleErrorMsgs("laptop")}
                          onChange={handleInputChange("laptop")}
                        />
                        {errors.laptop && (
                          <Typography sx={{ color: "red" }} variant="body2">
                            {errors.laptop}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Laptop serial no:"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={employeeDetails.laptopSerialNo}
                          onBlur={handleErrorMsgs("laptopSerialNo")}
                          onChange={handleInputChange("laptopSerialNo")}
                        />
                        {errors.laptopSerialNo && (
                          <Typography sx={{ color: "red" }} variant="body2">
                            {errors.laptopSerialNo}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Charger serial no:"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={employeeDetails.chargerSerialNo}
                          onChange={handleInputChange("chargerSerialNo")}
                          onBlur={handleErrorMsgs("chargerSerialNo")}
                        />
                        {errors.chargerSerialNo && (
                          <Typography sx={{ color: "red" }} variant="body2">
                            {errors.chargerSerialNo}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          label="Mouse serial no:"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={employeeDetails.MouseSerialNo}
                          onBlur={handleErrorMsgs("mouseSerialNumber")}
                          onChange={handleInputChange("MouseSerialNo")}
                        />
                        {errors.mouseSerialNumber && (
                          <Typography sx={{ color: "red" }} variant="body2">
                            {errors.mouseSerialNumber}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={5} fullWidth>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Grid sx={{ alignSelf: "flex-end" }}>
                    {projects.length > 0 && projects.length < 3 && (
                      <Button
                        variant="filled"
                        onClick={addProjectField}
                        sx={{ marginBottom: "10px" }}
                      >
                        <NoteAddIcon />
                      </Button>
                    )}
                  </Grid>
                  <Grid container rowSpacing={1.5} mb={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} spacing={2}>
                        {projects.map((value, index) => (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignContent: "center",
                            }}
                            gap={2}
                            spacing={2}
                          >
                            <TextField
                              label={`Project Name ${index + 1}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{ marginBottom: "12px" }}
                              value={projects.projectName}
                              onChange={(e) => handelProjects(e, index)}
                              onBlur={handleErrorMsgs("projectName")}
                              required
                            />
                            {errors.projectName && (
                              <Typography sx={{ color: "red" }} variant="body2">
                                {errors.projectName}
                              </Typography>
                            )}
                            <TextField
                              label={`Client Name ${index + 1}`}
                              variant="outlined"
                              size="small"
                              fullWidth
                              required
                              sx={{ marginBottom: "12px" }}
                              value={projects.clientName}
                              onChange={(e) => handelProjects(e, index)}
                            />
                            <TextField
                              label={`Client Email ${index + 1}`}
                              variant="outlined"
                              size="small"
                              required
                              fullWidth
                              sx={{ marginBottom: "12px" }}
                              value={projects.clientEmail}
                              onChange={(e) => handelProjects(e, index)}
                            />
                            <FormControl fullWidth size="small" required>
                              <InputLabel>Project Status</InputLabel>
                              <Select
                                fullWidth
                                value={employeeDetails.projectStatus}
                                label="projectStatus"
                                onChange={handleInputChange("projectStatus")}
                              >
                                <MenuItem value={"Inprogress"}>
                                  Inprogress
                                </MenuItem>
                                <MenuItem value={"Completed"}>
                                  Completed
                                </MenuItem>
                                <MenuItem value={"Hold"}>Hold</MenuItem>
                                <MenuItem value={"Hold"}>Cancelled</MenuItem>
                              </Select>
                            </FormControl>
                            {projects.length > 1 && (
                              <Button
                                variant="filled"
                                onClick={deleteProjectField}
                              >
                                <DeleteIcon />
                              </Button>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomTabPanel>

              <Box
                sx={{
                  position: "fixed",
                  bottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "80%",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={handleSaveButton}
                  sx={{ width: "150px" }}
                >
                  Save
                </Button>
                <Box>
                  {value === tabs.length - 1 ? (
                    <Box>
                      <Typography
                        sx={{ color: "red", mr: "10px" }}
                        variant="caption"
                        gutterBottom
                      >
                        *Please save the file before submitting
                      </Typography>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: "150px" }}
                      >
                        Submit
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {value > 0 ? (
                        <Button
                          variant="text"
                          color="primary"
                          sx={{ width: "150px", marginRight: "10px" }}
                          onClick={handlePrevious}
                        >
                          Previous
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "150px" }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        </form>
        {showAlert && renderAlertMessage()}
        {showWarning && renderWarningMessage()}
      </Box>
    </Grid>
    // {/* </Grid> */}
  );
};

export default EmployeeForm;
