import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { postFeedbackApi } from "../../apiCalls/apiCalls";
import { isEmpty } from "lodash";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
// import SideBar from "../sidebar/sidebar";
import Quotes from "../home/Quotes";
import Cookies from "js-cookie";

const PostFeedback = () => {
  const [feedback, setFeedback] = useState({
    feedbackType: "",
    subject: "",
    comment: "",
    username: "",
    date: new Date(),
  });

  const getUsername = async () => {
    const userEmail = Cookies.get("userEmail");
    const name = userEmail.split("@")[0];
    const firstName = name.slice(0, 1);
    const lastName = name.slice(1, -1);
    const fullName = firstName.toUpperCase() + lastName;
    setFeedback({ ...feedback, username: fullName });
  };

  useEffect(() => {
    getUsername();
  }, []);

  const navigate = useNavigate();

  const handleSubmitFeedback = async () => {
    try {
      const response = await postFeedbackApi(feedback);
      if (response.status === 200) {
        alert("Feedback submitted successfully");
      }
      setFeedback({
        feedbackType: "",
        subject: "",
        comment: "",
      });
    } catch (error) {
      alert("Failed to submit feedback");
    }
  };
  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>

    <Grid item flex={8}>
      <Quotes />
      <Stack direction={"row"} spacing={2}>
        <IconButton
          sx={{
            pl: 2,
            pt: 2,
            height: "12px",
            width: "12px",
          }}
          size="small"
          onClick={() => navigate("/feedback")}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={700}>
          Help Us Improve! Share Your Feedback and Suggestions
        </Typography>
      </Stack>
      <Grid item sx={{ p: 2, width: "50%" }}>
        <FormControl sx={{ mb: "16px" }} fullWidth required>
          <InputLabel id="demo-simple-select-label">Feedback Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Feedback Type"
            onChange={(e) =>
              setFeedback({ ...feedback, feedbackType: e.target.value })
            }
            value={feedback.feedbackType}
          >
            <MenuItem value="Request">Request</MenuItem>
            <MenuItem value="Complaint">Complaint</MenuItem>
            <MenuItem value="Feedback">Feedback</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          required
          fullWidth
          id="outlined-basic"
          label="Subject"
          variant="outlined"
          sx={{ mb: "16px" }}
          onChange={(e) =>
            setFeedback({ ...feedback, subject: e.target.value })
          }
          value={feedback.subject}
        />
        <br />
        <TextField
          label="Comments"
          multiline
          rows={8}
          fullWidth
          sx={{ mb: "16px" }}
          onChange={(e) =>
            setFeedback({ ...feedback, comment: e.target.value })
          }
          value={feedback.comment}
        />
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleSubmitFeedback}
          disabled={
            isEmpty(feedback.subject) ||
            isEmpty(feedback.feedbackType) ||
            isEmpty(feedback.comment)
          }
        >
          Send Feedback
        </Button>
      </Grid>
    </Grid>
    // </Grid>
  );
};

export default PostFeedback;
