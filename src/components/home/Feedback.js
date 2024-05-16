import { Grid } from "@mui/material";
import React from "react";
import SideBar from "../sidebar/sidebar";
import CardItem from "../card/card";
import Quotes from "./Quotes";

const feedbackCards = [
  {
    heading: "Write Feedback",
    image: null,
    cardText:
      "Have any suggestions, complaints or feedback? Drop here, we'll look into it",
    path: "/postFeedback",
  },
  {
    heading: "View Feedbacks",
    image: null,
    cardText: "View what employees think about us",
    path: "/viewFeedback",
  },
];

const Feedback = () => {
  return (
    // <Grid container flexDirection={"row"} justifyContent={"flex-start"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>

    <Grid item container flex={8} sx={{ p: 1, flexDirection: "column" }}>
      <Grid item>
        <Quotes />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
        }}
      >
        {feedbackCards.map((eachFeedbackCard) => (
          <CardItem cardDetails={eachFeedbackCard} />
        ))}
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default Feedback;
