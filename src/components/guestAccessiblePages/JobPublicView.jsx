import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "../card/card";
import SideBar from "../sidebar/sidebar";

import { nanoid } from "nanoid";

import JobCardPublicView from "./JobCardPublicView";

const JobPublicView = ({ jobOpeningData, jobData }) => {
  // const jobOpening = {
  //   id: nanoid(),
  //   title: "Developer",
  //   description:
  //     "We are seeking a talented Junior Software Developer to join our technical team to help us accelerate digital transformation for the resources sector. The ideal candidate will possess solid programming skills, strong problem-solving/creative thinking abilities, and excel in" +
  //     "a team environment. This is an ideal opportunity to grow and expand your skill set and to be mentored by a highly accomplished team of experts. You will be valued and acknowledged for your talents, provided opportunities to gain new skills and competencies, and empowered to work autonomously.",
  //   postDate: new Date("2024-01-20T00:00:00"),
  //   workExp: "6-9 Yrs",
  //   salary: "15-20 LPA",
  //   location: "Hyderabad, Telangana",
  //   keySkills: ["Javascript", "React", "HTML5", "CSS"],
  // };

  // console.log("JobOpeningData", jobOpeningData);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const numPages = Math.ceil(jobData.length / itemsPerPage);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsToShow = jobData.slice(startIndex, endIndex);
  return (
    <Grid
      flex={8}
      item
      container
      sx={{ px: 5, pb: 5, pt: 2, flexDirection: "column" }}
    >
      {/* <Typography variant="h5" p={2}>
        JobPublicView
      </Typography> */}
      <Stack gap={3} sx={{ width: "100%", px: 2, py: 1 }}>
        {jobsToShow?.map((job, key) => {
          return <JobCardPublicView key={key} job={job} />;
          // console.log(JobDescription);
        })}
        <Pagination
          count={numPages}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          sx={{ m: "auto" }}
        />
        {/* <JobCard {...jobOpening} />
        <JobCard {...jobOpening} /> */}
      </Stack>
    </Grid>
  );
};

export default JobPublicView;
