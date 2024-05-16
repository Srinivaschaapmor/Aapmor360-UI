import { Typography, Box, Stack } from "@mui/material";
import React from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ApplicationResult = ({ success, jobId }) => {
  const navigate = useNavigate();
  // const history = useHistory();

  const refreshPage = () => {
    // navigate(0);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        // bgcolor: "#E9E6E6",
        px: 5,
        py: 10,
        width: "70%",
        borderRadius: 2,
      }}
    >
      {success === "success" ? (
        <Box>
          <Stack
            direction="row"
            alignItems={"center"}
            gap={2}
            justifyContent={"center"}
          >
            <Typography variant={"h4"}>
              Your application has been submitted
            </Typography>
            <CheckCircleRoundedIcon
              sx={{ color: "green", fontSize: "2.5em" }}
            />
          </Stack>
          <Typography variant={"h6"}>
            Our recruitment team will soon be in touch with you
          </Typography>
        </Box>
      ) : success === "alreadyExists" ? (
        <Box>
          <Typography variant={"h4"}>
            You have already applied for this position
          </Typography>
          <Stack
            direction="row"
            alignItems={"center"}
            gap={1}
            justifyContent={"center"}
          >
            <Typography variant={"h6"}>
              Please wait for our recruitment team to get in touch with you
            </Typography>
            <WatchLaterRoundedIcon
              sx={{ color: "#F8C00F", fontSize: "1.5em" }}
            />
          </Stack>
        </Box>
      ) : (
        <Box>
          <Stack
            direction="row"
            alignItems={"center"}
            gap={1}
            justifyContent={"center"}
          >
            <Typography variant={"h4"}>
              There was a problem with your application
            </Typography>
            <CancelRoundedIcon sx={{ color: "#cd4949", fontSize: "2.5em" }} />
          </Stack>
          <Stack
            direction="row"
            alignItems={"center"}
            gap={1}
            justifyContent={"center"}
          >
            <Typography variant={"h6"}>Please</Typography>
            <Typography
              variant="h6"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={refreshPage}
            >
              try again
            </Typography>
          </Stack>
          {/* () => navigate(`/job-openings/${_id}`) */}
          {/* window.location.reload(); */}
        </Box>
      )}
    </Box>
  );
};

export default ApplicationResult;
