import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AapmorLogo from "../../assets/AapmorLogo.png";
// import Aapmor360logo from "../assets/Aapmor360logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useSWR from "swr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SimilarJobs from "./SimilarJobs";
import Header from "./Header";

const fetcher = (url) => fetch(url).then((res) => res.json());
function JobDesriptionPublicView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: jobDetails, isLoading: jobdescLoading } = useSWR(
    `http://localhost:5000/api/jobPosting/${id}`,
    fetcher
  );
  //For similar jobs
  const similarJobdepartment = jobDetails?.department;
  const { data: similarJobs } = useSWR(
    `http://localhost:5000/api/jobPosting/similarJobs/${similarJobdepartment}`,
    fetcher
  );
  // console.log("similarJobs", similarJobs);
  if (jobdescLoading) {
    return (
      <Box>
        <Stack direction={"row"} columnGap={4}>
          <Box width={"100%"}>
            <Skeleton sx={{ width: "10%" }}></Skeleton>
            <Skeleton sx={{ width: "30%" }}></Skeleton>
            <Skeleton sx={{ width: "40%" }}></Skeleton>
          </Box>
          <Skeleton sx={{ width: "20%", height: "100px" }}></Skeleton>
        </Stack>
        <Divider></Divider>
        <Skeleton sx={{ width: "40%" }}></Skeleton>
        <Skeleton sx={{ width: "40%" }}></Skeleton>
        <Skeleton sx={{ width: "100%", height: "300px", mt: -5 }}></Skeleton>
        <Stack direction={"row"} columnGap={3} mt={-5}>
          <Skeleton sx={{ width: "10%", height: "50px" }}></Skeleton>
          <Skeleton sx={{ width: "10%" }}></Skeleton>
          <Skeleton sx={{ width: "10%" }}></Skeleton>
        </Stack>
      </Box>
    );
  }
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
  } = jobDetails;
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
      return "Today";
    } else if (daysDiff === 1) {
      return "1 day ago";
    } else if (daysDiff > 29) {
      return `${Math.abs(Math.round(daysDiff / 30))} months ago`;
    } else {
      return `${daysDiff} days ago`;
    }
  }

  // Format the average salary as "X-Y lacs P.A." string
  const formattedSalary = `${Math.floor(minSalary / 100000)}-${Math.ceil(
    maxSalary / 100000
  )} lacs P.A.`;
  // console.log("jobDetails", jobDetails);

  const departmentMap = {
    fullStack: "Full Stack",
    testing: "Testing",
    uiUx: "UI/UX",
    dataScience: "Data Science",
    devops: "Devops",
    aiMl: "AI/ML",
    business: "Business",
    hr: "HR",
  };

  const employmentTypemap = {
    fullTime: "Full Time",
    partTime: "Part Time",
    internship: "Internship",
  };

  return (
    <Box sx={{ backgroundColor: "#FCFBFB", pb: 3 }}>
      <Header />
      <Stack direction={"row"} gap={2} alignItems={"center"} ml={6}>
        {/* 0047ff */}
        <IconButton
          aria-label="back"
          size="small"
          onClick={() => navigate("/careers/job-openings")}
        >
          <ArrowBackIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Stack>
      <Grid
        container
        // direction={"row"}
        width={"100%"}
        justifyContent={"space-evenly"}
        // px={4}
        columnGap={1}
        // gap={2}
        // justifyContent={"space-between"}
      >
        <Grid
          item
          xs={12}
          sm={8}
          lg={8}
          sx={
            {
              // border: "1px solid rgb(224, 224, 224)",
              // borderRadius: 2,
              // mx: 5,
              // mx: 2,
              // my: 3,
              // width: "60% ",
            }
          }
        >
          <Stack
            sx={{
              // margin: 8,
              border: "1px solid rgb(224, 224, 224)",
              backgroundColor: "white",
              mt: 2,
              width: "100%",
              mx: 1,
              padding: 5,
              borderRadius: 2,
            }}
          >
            <Typography fontWeight={700}>{position}</Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} alignItems={"center"} gap={2} pb={2}>
                <Typography
                  sx={{ fontSize: 14 }}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                >
                  <WorkOutlineOutlinedIcon
                    sx={{ fontSize: 14, color: "grey" }}
                  />

                  {experience === "entryLevel"
                    ? "Entry Level"
                    : minExperience + "-" + maxExperience + " Yrs"}
                </Typography>
                |
                <Typography
                  sx={{ fontSize: 14 }}
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                >
                  <CurrencyRupeeOutlinedIcon
                    sx={{ fontSize: 14, color: "grey" }}
                  />{" "}
                  {salary === "notSpecified"
                    ? "Not Disclosed"
                    : `${minSalary}-${maxSalary} LPA`}
                </Typography>
              </Stack>
              <Box>
                <img src={AapmorLogo} style={{ width: "120px" }} />
              </Box>
            </Stack>
            <Typography>
              <FmdGoodOutlinedIcon sx={{ fontSize: 15, color: "grey" }} />{" "}
              {location}
            </Typography>

            <Divider sx={{ py: 1 }} />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              mt={2}
            >
              <Typography>
                <span style={{ color: "grey" }}>Posted:</span>{" "}
                {calculatePostAge(createdAt)}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(`/careers/apply/${_id}`)}
                sx={{ bgcolor: "rgb(49, 38, 228)" }}
              >
                Apply
              </Button>
            </Stack>
          </Stack>
          <Stack
            sx={{
              // mt: 2,
              border: "1px solid rgb(224, 224, 224)",
              backgroundColor: "white",
              mt: 2,
              // mb: 2,
              width: "100%",
              // mb: 2,
              mx: 1,
              padding: 5,
              borderRadius: 3,
            }}
          >
            <Typography fontWeight={600} mb={2}>
              Job description
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              About the Role:
            </Typography>

            <span
              style={{ textAlign: "justify" }}
              dangerouslySetInnerHTML={{
                __html: about,
              }}
            ></span>
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Specific Knowledge & Skills Required:
            </Typography>
            <span
              dangerouslySetInnerHTML={{ __html: requirements }}
              style={{ color: "#353535", textAlign: "justify" }}
            ></span>
            <Typography sx={{ fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>Role:</span> {position}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>Department:</span>{" "}
              {departmentMap[department]}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>Employment Type:</span>{" "}
              {employmentTypemap[employmentType]}
            </Typography>

            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 600, my: 2 }}>
                Key Skills
              </Typography>
              {mandatorySkills.map((value, i) => (
                <Chip
                  key={i}
                  label={value}
                  variant="outlined"
                  sx={{
                    mx: 1,
                    bgcolor: "#EEEEEE",
                    px: 1,
                    borderRadius: 0.5,
                    fontSize: "12px",
                    borderColor: "#EEEEEE",
                  }}
                />
              ))}
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <SimilarJobs
            similarJobs={similarJobs}
            calculatePostAge={calculatePostAge}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default JobDesriptionPublicView;
