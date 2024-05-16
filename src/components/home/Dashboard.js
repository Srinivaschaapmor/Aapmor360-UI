import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Header from "./Header";
import CardItem from "../card/card";
import SideBar from "../sidebar/sidebar";

const Dashboard = () => {
  const dashboardCards = [
    {
      heading: "Recent Openings",
      image: null,
      cardText: "Check out recent openings from the company",
      path: "/job-openings",
    },
    {
      heading: "Events",
      image: null,
      cardText: "Check out all events happening in the company",
      path: "",
    },
    {
      heading: "Blogs",
      image: null,
      cardText: "Visit Aapmor blogs",
      path: "/blogs",
    },
    {
      heading: "Policies",
      image: null,
      cardText: "Click to view all policies",
      path: "",
    },
  ];

  const test = {
    heading: "Apply form test",
    cardText: "Public form for applying to a job",
    path: `careers/apply/6630893afd9245679186347e`,
    image: null,
  };

  return (
    // <Grid container flexDirection={"row"} justifyContent={"flex-start"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>

    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            p: 2,
          }}
        >
          {dashboardCards.map((eachCard) => (
            <CardItem cardDetails={eachCard} key={eachCard} />
          ))}
          <CardItem cardDetails={test} key={1234} />
        </Box>
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default Dashboard;
