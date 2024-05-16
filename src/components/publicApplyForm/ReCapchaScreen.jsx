import React from "react";
import { Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const ReCapchaScreen = ({ onCapchaClick }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ReCAPTCHA
        sitekey="6LfNB88pAAAAAPdpc05xsEbz6TTR3TS4MQwM-fsU"
        onChange={onCapchaClick}
      />
    </Box>
  );
};

export default ReCapchaScreen;
