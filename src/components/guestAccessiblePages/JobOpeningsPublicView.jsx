import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Modal,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import SideBar from "../sidebar/sidebar";
// import Header from "../home/Header";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Jobs from "../jobOpenings/Jobs";
import JobPublicView from "./JobPublicView";
import JobSearch from "./JobSearch";
import Header from "./Header";
import useSWR from "swr";
import { set } from "lodash";
import axios from "axios";
const fetcher = (url) => fetch(url).then((res) => res.json());
function JobOpeningsPublicView() {
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const [inputKeywordValue, setInputKeywordValue] = React.useState("");
  const [inputLocationValue, setInputLocationValue] = React.useState("");
  // const { data: jobOpeningData, isLoading: jobopeningData } = useSWR(
  //   "http://localhost:5000/api/jobPosting/jobs",
  //   fetcher
  // );
  const { data: allKeyWords, isLoading: keywordsLoading } = useSWR(
    "http://localhost:5000/api/jobPosting/search/options",
    fetcher
  );
  console.log(allKeyWords);

  // Example jobOpeningData array
  // const job = [
  //   {
  //     department: "Engineering",
  //     keySkills: ["JavaScript", "React", "Node.js"],
  //     mandatorySkills: ["Problem-solving", "Communication"],
  //   },
  //   {
  //     department: "Sales",
  //     keySkills: ["Negotiation", "Customer Service"],
  //     mandatorySkills: ["Sales Techniques", "Relationship Building"],
  //   },
  //   // Add more jobOpeningData objects as needed
  // ];
  const allLocations = allKeyWords?.flatMap((value) => [value.location]);
  const uniqueLocations = [...new Set(allLocations)];
  // // Extract department, keySkills, and mandatorySkills from each jobOpeningData object
  const allSkillsAndDepartments = allKeyWords?.flatMap((item) => [
    item.department,
    ...item.mandatorySkills,
    ...item.technicalSkills,
    item.position,
    item.employmentType,
    item.experience,
  ]);

  const uniqueSkillsAndDepartments = [...new Set(allSkillsAndDepartments)];
  console.log(uniqueSkillsAndDepartments);
  const [value, setValue] = useState(uniqueSkillsAndDepartments[0]);
  const [jobData, setJobData] = useState(null);
  const [searchValue, setSearchValue] = useState();
  const [isLoading, setIsloading] = useState(false);
  // const keywords = jobOpeningData.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function SeachFilters() {
      try {
        // Make the API request using Axios
        let response = "";
        if (searchValue) {
          response = await axios.get(
            "http://localhost:5000/api/jobPosting/api/jobs/search",
            {
              params: searchValue,
            }
          );
        } else {
          response = await axios.get(
            "http://localhost:5000/api/jobPosting/api/jobs/search"
          );
        }

        const openJobs = response.data.filter((job) => job.status === "open");

        // jobData = response ? response.data : null;
        setJobData(openJobs);
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors that occur during the request
      }
    }
    SeachFilters();
  }, [searchValue]);

  if (keywordsLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton sx={{ width: 150, height: 100, pl: 2 }}></Skeleton>
        <Stack justifyContent={"center"}>
          <Stack direction={"row"} gap={2} justifyContent={"center"}>
            <Skeleton width={"30%"} height={80}></Skeleton>
            <Skeleton width={"30%"} height={80}></Skeleton>
            <Skeleton width={"10%"} height={80}></Skeleton>
          </Stack>
          <Stack ml={21} mt={-5}>
            <Skeleton width={"85%"} height={300}></Skeleton>
          </Stack>
        </Stack>
      </Box>
    );
  }
  if (isLoading) {
    <Skeleton
      sx={{ bgcolor: "grey.900" }}
      width={"85%"}
      height={300}
    ></Skeleton>;
  }

  const handleSubmit = async (e, keyword) => {
    e.preventDefault();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 500);
    const params = {};

    if (inputKeywordValue) {
      params.keyword = inputKeywordValue;
    }

    if (inputLocationValue) {
      params.location = inputLocationValue;
    }
    // setSearchParams(params);
    setSearchValue(params);
  };

  return (
    <Box sx={{ pb: 2, backgroundColor: "#FCFBFB", minHeight: "100vh" }}>
      <Header />
      <Stack width={"100%"} sx={{ px: 12 }}>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          ml={6}
          // mt={5}
          // px={10}
        >
          {/* 0047ff */}

          <Typography variant="h5" sx={{ textAlign: "center" }}>
            JOB OPENINGS
          </Typography>
        </Stack>
        <JobSearch
          uniqueSkillsAndDepartments={uniqueSkillsAndDepartments}
          uniqueLocations={uniqueLocations}
          handleSubmit={handleSubmit}
          inputKeywordValue={inputKeywordValue}
          inputLocationValue={inputLocationValue}
          keyword={keyword}
          setInputKeywordValue={setInputKeywordValue}
          setInputLocationValue={setInputLocationValue}
        />
        {!isLoading &&
          (jobData?.length > 0 ? (
            <JobPublicView jobData={jobData} />
          ) : (
            <Typography variant="h6" sx={{ margin: "auto", pt: 10 }}>
              No Jobs Found
            </Typography>
          ))}
      </Stack>
    </Box>
  );
}

export default JobOpeningsPublicView;
