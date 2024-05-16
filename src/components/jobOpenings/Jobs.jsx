import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "../card/card";
import SideBar from "../sidebar/sidebar";
import JobCard from "./JobCard";
import { nanoid } from "nanoid";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Jobs = () => {
  const { data: jobOpeningData } = useSWR(
    "http://localhost:5000/api/jobPosting/",
    fetcher
  );
  // console.log("JobOpeningData", jobOpeningData);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const numPages = Math.ceil(jobOpeningData?.length / itemsPerPage);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsToShow = jobOpeningData?.slice(startIndex, endIndex);
  return (
    <Grid
      flex={8}
      item
      container
      sx={{ px: 5, py: 5, flexDirection: "column" }}
    >
      {/* <Typography variant="h5" p={2}>
        Jobs
      </Typography> */}
      <Stack gap={3} sx={{ width: "100%", px: 2, py: 1 }}>
        {jobsToShow?.map((job, key) => {
          return <JobCard key={key} job={job} />;
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

export default Jobs;
