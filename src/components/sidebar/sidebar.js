import {
  Typography,
  Grid,
  Box,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportIcon from "@mui/icons-material/Report";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WorkIcon from "@mui/icons-material/Work";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import React, { useState, useEffect } from "react";
import Aapmor360logo from "../../assets/Aapmor360logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const SideBar = (props) => {
  const location = useLocation();
  const tabValue = JSON.parse(localStorage.getItem("tabValue"));
  const [value, setValue] = useState(tabValue !== null ? tabValue : 0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    localStorage.setItem("tabValue", JSON.stringify(newValue));
    setValue(newValue);
  };

  const tanStyles = {
    color: "white",
    // display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    pl: "8px",
    borderRadius: "16px",
    textTransform: "none",
    fontSize: "16px",
    minHeight: "12px",
    width: "220px",
    mb: 1,
    "&.Mui-selected": { bgcolor: "#0047FF", color: "#ffffff" },
  };

  return (
    <Grid
      sx={{
        // display: "flex",
        flexWrap: "nowrap",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
      // container
    >
      {/* TABS */}

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "16vw",
          height: "auto",
          backgroundColor: "#262626",
          color: "white",
          // padding: "32px 0px 0px 0px",
        }}
      >
        <img
          src={Aapmor360logo}
          alt="aapmor-logo"
          style={{
            width: "80%",
            alignSelf: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Box>
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                padding: "0px",
              }}
            >
              <Tab
                label="Dashboard"
                icon={<DashboardIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(0)}
                onClick={() => navigate("/")}
              />
              <Tab
                label="Employees"
                icon={<AccountBoxIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(1)}
                onClick={() => navigate("/employees")}
              />
              <Tab
                label="Recruitment"
                icon={<GroupAddIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(2)}
                onClick={() => navigate("/recruitment-home")}
              />
              <Tab
                label="Blogs"
                icon={<EditNoteIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(3)}
                onClick={() => navigate("/blogs")}
              />
              <Tab
                label="Feedback"
                icon={<ReportIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(4)}
                onClick={() => navigate("/feedback")}
              />
              <Tab
                label="Projects"
                icon={<EngineeringIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(5)}
                onClick={() => navigate("/projects")}
              />
              {/* <Tab
                label="Jobs"
                icon={<WorkIcon sx={{ marginRight: "10px" }} />}
                sx={{
                  ...tanStyles,
                }}
                {...a11yProps(4)}
                onClick={() => navigate("/jobs")}
              /> */}
              <Accordion
                sx={{ backgroundColor: "#262626", mr: 4.5 }}
                // defaultExpanded="true"
                // sx={
                //   {
                //     // ...tanStyles,
                //     // backgroundColor: "blue",

                //   }
                // }
                // {...a11yProps(5)}
              >
                <AccordionSummary
                  sx={{ backgroundColor: "#262626", color: "white", mr: 5 }}
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "white" }}
                      onChange={handleChange}
                    />
                  }
                >
                  <AssessmentOutlinedIcon
                    sx={{ mr: 2 }}
                    // sx={{ backgroundColor: "black" }}
                  />
                  Reports
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    ...tanStyles,
                    cursor: "pointer",
                    // backgroundColor: "blue",
                    fontSize: 13,
                    pl: 2,

                    backgroundColor: location.pathname.includes(
                      "employee-engagement"
                    )
                      ? "#0047FF"
                      : null,
                  }}
                  {...a11yProps(5)}
                  onClick={() => navigate("/reports/employee-engagement")}
                >
                  Employee Engagement
                </AccordionDetails>
                <AccordionDetails
                  sx={{
                    ...tanStyles,
                    cursor: "pointer",
                    fontSize: 13,
                    pl: 2,
                    backgroundColor: location.pathname.includes(
                      "hiring-tracker"
                    )
                      ? "#0047FF"
                      : null,
                  }}
                  {...a11yProps(6)}
                  onClick={() => navigate("/reports/hiring-tracker")}
                >
                  Hiring Tracker
                </AccordionDetails>
                <AccordionDetails
                  sx={{
                    ...tanStyles,
                    cursor: "pointer",
                    fontSize: 13,
                    pl: 2,
                    backgroundColor: location.pathname.includes(
                      "certifications"
                    )
                      ? "#0047FF"
                      : null,
                  }}
                  {...a11yProps(7)}
                  onClick={() => navigate("/reports/certifications")}
                >
                  Certifications
                </AccordionDetails>
              </Accordion>
            </Tabs>
          </Box>
          <Box>
            <Typography variant="caption" fontSize={11}>
              Copyright @ Aapmor Technologies {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideBar;
