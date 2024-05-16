import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import { Category, Height } from "@mui/icons-material";
import axios from "axios";
import JobOpeningFormSettings from "./JobOpeningFormSettings";
import RecruitmentStatusSettings from "./RecruitmentStatusSettings";
function Settings() {
  const navigate = useNavigate();
  const [updatedMasterData, setUpdatedMasterData] = useState({
    category: "",
    name: "",
    label: "",
  });
  const [tvalue, setTValue] = useState("Job Posting Form"); // State to manage the selected tab label

  const ThandleChange = (event, newValue) => {
    setTValue(newValue); // Update the selected tab label
  };

  const handleAddItem = (event) => {
    const { name, value } = event.target;
    setUpdatedMasterData((prevState) => ({
      ...prevState,
      [name]: value,
      label: value.toLowerCase(),
    }));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    Height: 400,
    textAlign: "center",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [formErrors, setFormErrors] = useState({});
  console.log(formErrors);
  const validate = (values) => {
    const errors = {};

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex to detect special characters
    const emojiRegex =
      /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]/u; // Regex to detect emojis
    const leadingTrailingSpacesRegex = /^\s+|\s+$/g; // Regex to detect leading and trailing spaces

    // Common validation function for text fields
    const validateTextField = (fieldName, value) => {
      if (!value) {
        errors[fieldName] = "* Field is required";
      } else if (
        specialCharsRegex.test(value) ||
        emojiRegex.test(value) ||
        leadingTrailingSpacesRegex.test(value)
      ) {
        errors[fieldName] =
          "Field should not contain special characters, emojis, or leading/trailing spaces";
      }
    };
    validateTextField("category", values.category);
    validateTextField("name", values.name);

    return errors;
  };

  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    // console.log(formErrors);
    if (isSubmit) {
      setFormErrors(validate(updatedMasterData));
    }
  }, [formErrors, updatedMasterData, isSubmit]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/masterData`,
        updatedMasterData
      );
      alert("masterData Posted successfully");
      setOpen(false);
      setUpdatedMasterData({
        category: "",
        name: "",
        label: "",
      });
    } catch (error) {
      console.error("masterData posting failed");
    }
  };

  const handleSave = () => {
    setIsSubmit(true);
    if (Object.entries(validate(updatedMasterData)).length === 0) {
      setOpen(true);
    }
  };
  return (
    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      {/* Your Header component */}
      {/* JOB DESCRIPTION */}
      <Stack width={"100%"} gap={3} sx={{ px: 4, mb: 8 }}>
        {/* Back Button and Settings Title */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <IconButton
              aria-label="back"
              size="small"
              onClick={() => navigate("/")} // Assuming you want to navigate back to the home page
            >
              <ArrowBackIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Typography variant="h6" component="h2">
              Settings
            </Typography>
          </Stack>
        </Stack>
        {/* Tabs */}
        <Tabs
          value={tvalue}
          onChange={ThandleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Job Posting Form" value="Job Posting Form" />
          <Tab label="Reruitment Status" value="Recruitment Status" />
        </Tabs>
        {/* Form to add items */}
        {tvalue === "Job Posting Form" && (
          <JobOpeningFormSettings
            updatedMasterData={updatedMasterData}
            handleClose={handleClose}
            handleAddItem={handleAddItem}
            formErrors={formErrors}
            handleSave={handleSave}
            handleSubmit={handleSubmit}
            style={style}
            open={open}
          />
        )}
        {tvalue === "Recruitment Status" && (
          <RecruitmentStatusSettings
            updatedMasterData={updatedMasterData}
            handleClose={handleClose}
            handleAddItem={handleAddItem}
            formErrors={formErrors}
            handleSave={handleSave}
            handleSubmit={handleSubmit}
            style={style}
            open={open}
          />
        )}
      </Stack>
    </Grid>
  );
}

export default Settings;
