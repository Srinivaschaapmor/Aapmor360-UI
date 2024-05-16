import { Box, Grid } from "@mui/material";
import React from "react";
import application_form from "../../assets/applicaion_form.png";
import status from "../../assets/status.png";
import onboarding from "../../assets/onboarding.png";
import new_job from "../../assets/new_job.png";
import CardItem from "../card/card";
import SideBar from "../sidebar/sidebar";
import Quotes from "./Quotes";

const Recruitment = () => {
  const cardData = [
    {
      heading: "New Recruitment",
      image: application_form,
      cardText: "Click to submit form",
      path: "/recruitment-form",
    },
    {
      heading: "Recruitment Status",
      image: status,
      cardText: "View all applications status",
      path: "/recruitment-list",
    },
    {
      heading: "On Boarding",
      image: onboarding,
      cardText: "Send Onboarding link",
      path: "/onboarding-form",
    },
    {
      heading: "New Job",
      image: new_job,
      cardText: "Add new job vacancy",
      path: "/jobOpeningForm",
    },
  ];
  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>
    <Grid item flex={8} sx={{ padding: "20px" }}>
      <Quotes />
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          gap: 2,
          marginTop: 4,
        }}
      >
        {cardData.map((eachCard) => (
          <CardItem cardDetails={eachCard} key={eachCard} />
        ))}
      </Box>
    </Grid>
    // </Grid>
  );
};

export default Recruitment;
