import { Box, Chip, Divider, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AapmorLogo from "../../assets/AapmorLogo.png";
// import Aapmor360logo from "../assets/Aapmor360logo.png";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());

function ParticularJobDescription({ numApplicants, jobDetails, jobdescLoading }) {
  // const jobPosting = {
  //   position: "Junior Software Engineer",
  //   experience: "Entry Level",
  //   salary: "3,00,000",
  //   location: "Hyderabad",
  //   aboutTheRole: `<div>
  //   <p style={{ fontSize: "12px" }}>
  //     We are currently looking out for “Angular developer” with the
  //     following skill set, we request you to go through the job profile
  //     and revert with your updated profile to take it forward.
  //   </p>

  //   <h5>Essential Duties/Responsibilities:</h5>
  //   <ul style={{ fontSize: "12px" }}>
  //     <li>Delivering a complete front-end application</li>
  //     <li>Ensuring high performance on mobile and desktop</li>
  //     <li>
  //       Writing tested, idiomatic, and documented JavaScript, HTML, and
  //       CSS
  //     </li>
  //     <li>
  //       Coordinating the workflow between the graphic designer, the HTML
  //       coder, and yourself
  //     </li>
  //     <li>
  //       Cooperating with the back-end developer in the process of
  //       building the RESTful API
  //     </li>
  //     <li>Communicating with external web services</li>
  //   </ul>

  // </div>`,
  //   requirements: `<ul>
  //   <li>Bachelor's degree in Computer Science or related field preferred.</li>
  //   <li>Proficient in HTML, CSS, JavaScript, J2EE, and Spring MVC/Boot.</li>
  //   <li>Familiarity with React.js is a plus.</li>
  //   <li>Knowledge of full stack development is desired.</li>
  //   <li>Strong understanding of web development principles and trends.</li>
  //   <li>Ability to work collaboratively in a team environment.</li>
  // </ul>`,
  //   department: "Engineering",
  //   typeOfEmployment: "Full-time",
  //   mandatory_skills: ["Java", "HTML", "CSS"],
  //   technical_skills: ["Spring", "JavaScript", "MySQL"],
  //   number_of_openings: 5,
  // };

  // const { data: jobDetails, isLoading: jobdescLoading } = useSWR(
  //   `http://localhost:5000/api/jobPosting/${jobId}`,
  //   fetcher
  // );

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
    <>
      <Box sx={{ border: "1px solid rgb(224, 224, 224)", borderRadius: 2 }}>
        <Stack
          sx={{
            // margin: 8,
            mt: 2,
            // mb: 2,
            mx: 1,
            padding: 2,
            borderRadius: 3,
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
                <WorkOutlineOutlinedIcon sx={{ fontSize: 14, color: "grey" }} />

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
          <Stack direction={"row"} alignItems={"center"} gap={2} py={2}>
            <Typography>
              <span style={{ color: "grey" }}>Posted:</span>{" "}
              {calculatePostAge(createdAt)}
            </Typography>
            <Typography>
              {" "}
              <span style={{ color: "grey" }}>Applicants:</span> {numApplicants}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            // mt: 2,
            mb: 2,
            mx: 1,
            padding: 2,
            borderRadius: 3,
          }}
        >
          <Typography fontWeight={600}>Job description</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            About the Role:
          </Typography>
          {/* <div>
  <p style={{ fontSize: "12px" }}>
    We are currently looking out for “Angular developer” with the
    following skill set, we request you to go through the job profile
    and revert with your updated profile to take it forward.
  </p>

  <h5>Essential Duties/Responsibilities:</h5>
  <ul style={{ fontSize: "12px" }}>
    <li>Delivering a complete front-end application</li>
    <li>Ensuring high performance on mobile and desktop</li>
    <li>
      Writing tested, idiomatic, and documented JavaScript, HTML, and
      CSS
    </li>
    <li>
      Coordinating the workflow between the graphic designer, the HTML
      coder, and yourself
    </li>
    <li>
      Cooperating with the back-end developer in the process of
      building the RESTful API
    </li>
    <li>Communicating with external web services</li>
  </ul>

  <h5>Specific Knowledge & Skills Required:</h5>
  <ul style={{ fontSize: "12px" }}>
    <li>
      Extensive knowledge of the Microsoft.Net development platform.
    </li>
    <li>1-3 years: Angular 2/4/6/7/10</li>
    <li>
      3-4+ years: C#, MVC, MVVM including .NET 4.0 framework and above
      or any other Language
    </li>
    <li>2-4 years: SQL Server</li>
    <li>2-4 years: n-tier development experience</li>
    <li>1-2+ years: Web API / wcf / web services</li>
    <li>1-2+ years: Html and css experience</li>
    <li>
      Experience with Source Control (i.e. Clear Case, Subversion)
    </li>
    <li>
      Nice to have Unit Testing frameworks (i.e. NUnit, MS Testing
      Framework )
    </li>
  </ul>
</div> */}
          <span
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
            style={{ color: "#353535", fontSize: "15px" }}
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
            {/* {mandatorySkills.map((value, i) => (
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
            ))} */}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ParticularJobDescription;
