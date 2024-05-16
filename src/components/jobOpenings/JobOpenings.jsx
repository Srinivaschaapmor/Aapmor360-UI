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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/sidebar";
import Header from "../home/Header";
import { Navigate, useNavigate } from "react-router-dom";
import Jobs from "./Jobs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function JobOpenings() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // <Stack
    //   container
    //   flexDirection={"row"}
    //   justifyContent={"flex-start"}
    //   width={"100%"}
    // >
    // {/* <Grid item flex={1}> */}
    // {/* <SideBar /> */}
    // {/* </Grid> */}
    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      <Header />
      <Stack width={"100%"} sx={{ px: 4 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            {/* 0047ff */}
            <IconButton
              aria-label="back"
              size="small"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Typography variant="h5" sx={{ ":hover": { cursor: "auto" } }}>
              JOB OPENINGS
            </Typography>
          </Stack>
          <Button
            onClick={() => navigate("/jobOpeningForm")}
            sx={{
              backgroundColor: "rgb(25, 118, 210)",
              color: "white",
              ":hover": { backgroundColor: "rgb(30, 143, 255)" },
            }}
          >
            CREATE A JOB
          </Button>
        </Stack>
        <Jobs />
      </Stack>
    </Grid>
    // {/* </Stack> */}
  );
}

export default JobOpenings;
