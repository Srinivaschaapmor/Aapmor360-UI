import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useNavigate } from "react-router-dom";
function SimilarJobs({ similarJobs, calculatePostAge }) {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            border: "1px solid rgb(224, 224, 224)",
            backgroundColor: "white",
            mt: 2,
            px: 1,
            py: 2,
            width: "100%",
            borderRadius: 2,
            // height: "30%",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            color={"rgb(21, 101, 192)"}
            pl={2}
          >
            {" "}
            Similar Jobs
          </Typography>
          {similarJobs?.length > 0
            ? similarJobs?.map((value, index) => (
                <Stack
                  key={index}
                  sx={{
                    pt: 2,
                    cursor: "pointer",
                    ":hover": { backgroundColor: "#F5F5F5" },
                    px: 2,
                  }}
                  onClick={() =>
                    navigate(
                      `/careers/job-openings/${value._id}`,
                      setIsloading(true),
                      setTimeout(() => {
                        setIsloading(false);
                      }, 500)
                    )
                  }
                >
                  <Typography fontWeight={600}>{value.position}</Typography>
                  <span
                    style={{ color: "rgb(133, 133, 133)" }}
                    dangerouslySetInnerHTML={{
                      __html: value.about.substring(0, 100) + "....",
                    }}
                  ></span>
                  <Stack direction={"row"} alignItems={"center"} gap={1}>
                    <Typography>
                      <span style={{ color: "grey" }}>Posted:</span>{" "}
                      {calculatePostAge(value.createdAt)}
                    </Typography>
                    <Divider
                      sx={{ height: "15px", width: "10px", color: "black" }}
                      orientation="vertical"
                    />
                    <Typography>
                      <FmdGoodOutlinedIcon
                        sx={{ fontSize: 15, color: "grey" }}
                      />{" "}
                      {value.location}
                    </Typography>
                  </Stack>
                  {/* Conditionally render the divider */}
                  {index !== similarJobs.length - 1 && (
                    <Divider sx={{ py: 1 }} />
                  )}
                </Stack>
              ))
            : "No Similar Jobs"}
        </Box>
      )}
    </>
  );
}

export default SimilarJobs;
