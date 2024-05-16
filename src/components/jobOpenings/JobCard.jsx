import React from "react";
import { Stack, Typography, Divider, Box, Button, Chip } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import EditIcon from "@mui/icons-material/Edit";

function JobCard({ job }) {
  const {
    _id,
    position,
    about,
    createdAt,
    department,
    employmentType,
    experience,
    location,
    mandatorySkills,
    numOpenings,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
    requirements,
    salary,
    status,
    technicalSkills,
    updatedAt,
  } = job;
  const navigate = useNavigate();
  // console.log("JobDescription", JobDescription);
  function calculatePostAge(postedDate) {
    const postedDateUpdated = new Date(postedDate);
    const currentDate = new Date();
    // Set both dates to the same time (midnight)
    postedDateUpdated.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    // Calculating the time difference of two dates
    let timeDiff = currentDate.getTime() - postedDateUpdated.getTime();
    // Calculating the no. of days between two dates
    let daysDiff = Math.abs(Math.round(timeDiff / (1000 * 3600 * 24)));

    if (daysDiff === 0) {
      return "Posted Today";
    } else if (daysDiff === 1) {
      return "Posted 1 day ago";
    } else if (daysDiff > 29) {
      return `Posted ${Math.abs(Math.round(daysDiff / 30))} months ago`;
    } else {
      return `Posted ${daysDiff} days ago`;
    }
  }

  // Format the average salary as "X-Y lacs P.A." string
  const formattedSalary = `${Math.floor(minSalary / 100000)}-${Math.ceil(
    maxSalary / 100000
  )} lacs P.A.`;

  return (
    <Box
      sx={{
        bgcolor: "white",
        px: 2.5,
        py: 2,
        borderRadius: 1,
        boxShadow: 1,
        position: "relative",
        ":hover": {
          // bgcolor: "#FAFAFA",
          cursor: "pointer",
          // boxShadow: 2,
          transition: "transform 0.3s ease",
          transform: "scale(1.01)",
        },
      }}
    >
      <Stack onClick={() => navigate(`/job-openings/${_id}`)}>
        <Typography variant="subtitle1" component={"h3"}>
          {position}
        </Typography>
        {/* work exp, salary, location */}
        <Stack direction={"row"} width="90%" gap={1} my={0.5}>
          {/* work exp */}
          <Stack
            direction={"row"}
            width={experience === "ENTRY_LEVEL" ? "12%" : "10%"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={0.5}
          >
            <WorkOutlineIcon sx={{ fontSize: "13px", color: "#555b76" }} />
            <Typography component={"paragraph"} sx={{ fontSize: "11px" }}>
              {experience === "ENTRY_LEVEL"
                ? "Entry Level"
                : minExperience + "-" + maxExperience + " Yrs"}
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "black", opacity: "0.2" }}
          />
          {/* salary */}
          <Stack
            direction={"row"}
            width={salary === "notSpecified" ? "12%" : "10%"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <CurrencyRupeeIcon sx={{ fontSize: "13px", color: "#555b76" }} />
            <Typography component={"paragraph"} sx={{ fontSize: "11px" }}>
              {salary === "notSpecified"
                ? "Not Disclosed"
                : `${minSalary}-${maxSalary} LPA`}
            </Typography>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "black", opacity: "0.2" }}
          />
          {/* location */}
          <Stack
            direction={"row"}
            width="40%"
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <LocationOnOutlinedIcon
              sx={{ fontSize: "13px", color: "#555b76" }}
            />
            <Typography component={"paragraph"} sx={{ fontSize: "11px" }}>
              {location}
            </Typography>
          </Stack>
        </Stack>
        {/* job desc */}
        <Typography
          component="paragraph"
          sx={{ fontSize: "12px" }}
          width="90%"
          my={1}
          dangerouslySetInnerHTML={{
            __html:
              about.length > 400 ? `${about.substring(0, 400)}....` : about,
          }}
        >
          {/* {about.length > 400 ? about.substring(0, 400) + "...." : about} */}
        </Typography>
        {/* key skills */}
        <Stack direction={"row"} gap={2} my={0.5}>
          {mandatorySkills.map((skill, j) => (
            <Box key={j} sx={{ bgcolor: "#EEEEEE", px: 1, borderRadius: 0.5 }}>
              <Typography component="paragraph" sx={{ fontSize: "11.5px" }}>
                {skill}
              </Typography>
              {/* <Chip
                component="paragraph"
                sx={{ fontSize: "11.5px" }}
                key={nanoid()}
                label={skill}
              ></Chip> */}
            </Box>
          ))}
        </Stack>
        {/* post date, edit and view applicant buttons */}
        <Stack
          direction={"row"}
          gap={3}
          // justifyContent={"space-between"}
          alignItems={"center"}
          mt={1}
        >
          {/* post date */}
          <Typography
            component="paragraph"
            sx={{ fontSize: "11px", color: "#555b76" }}
            // width="90%"
            my={1}
          >
            {calculatePostAge(createdAt)}
          </Typography>
          <Typography fontSize="11px">
            <span style={{ color: "#555b76" }}>Status:</span>
            <span
              style={{
                backgroundColor:
                  status === "open"
                    ? "rgb(240, 255, 248)"
                    : "rgb(254, 250, 224)",
                color:
                  status === "open" ? "rgb(12, 66, 66)" : "rgb(129, 127, 21)",
                padding: 5,
                fontWeight: 600,
                borderRadius: 2,
                marginLeft: 1,
              }}
            >
              {status === "open" ? "Open" : "Closed"}
            </span>
          </Typography>
        </Stack>
      </Stack>
      <Button
        sx={{ position: "absolute", right: 10, bottom: 10, gap: 1 }}
        variant="outlined"
        onClick={() => navigate(`/jobOpeningForm/${_id}`)}
      >
        <EditIcon sx={{ fontSize: 15 }} /> Edit
      </Button>
    </Box>
  );
}

export default JobCard;
