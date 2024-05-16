//IMPORTS
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Snackbar,
} from "@mui/material";

import { sendOtpApi, loginValidation } from "../apiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import MainLogo from "./MainLogo/mainLogo";
import { MuiOtpInput } from "mui-one-time-password-input";
import Aapmor360logo from "../assets/Aapmor360logo.png";

//MAIN FUNCTION
const Login = () => {
  //STATE HOOKS
  const [buttonText, setButtonText] = useState("Get OTP");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [showEmailView, setShowEmailView] = useState(true);
  const [otp, setOtp] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isButtonDisable, setButtonDisable] = useState(true);
  const [isOtpButtonDisable, setOtpButtonDisable] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  //CHECKING FOR ALREADY REGISTERED USER AND NAVIGATING TO HOME
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      navigate("/");
    }
  });

  const handleOnSubmitError = (message) => {
    setShowErrMsg(true);
    setErrorMsg(message);
    setSuccessMsg("");
  };

  useEffect(() => {
    checkOtpValidation();
  });

  const checkOtpValidation = () => {
    if (otp.length === 6) {
      setOtpButtonDisable(false);
    } else {
      setOtpButtonDisable(true);
    }
  };

  // OTP ENTERED API CALL
  const handleOtpEntered = async () => {
    setButtonText("Validating...");
    const loginDetails = { email, otp };
    const response = await loginValidation(loginDetails);
    const data = response.data;
    if (response.status === 200) {
      setButtonText("Success");
      const jwtToken = data.jwt_token;
      Cookies.set("jwtToken", jwtToken, { expires: 10 });
      Cookies.set("userEmail", data.email, { expires: 10 });
      navigate("/");
    } else {
      setButtonText("Submit OTP");
      handleOnSubmitError(data.message);
    }
  };

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z]\w{3,50}@([a-zA-Z]+\.)+[a-zA-Z]+$/;
    return pattern.test(email);
  };
  const handleEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setButtonText("Submit OTP");
    setShowErrMsg(false);
    setOtp(e);
  };

  useEffect(() => {
    checkEmailValidation();
  });

  const checkEmailValidation = () => {
    if (email.endsWith("@aapmor.com")) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  // EMAIL VALIDATION AND VERIFICATION API CALL
  const onSubmitEmail = async (event) => {
    event.preventDefault();
    const validEmail = isValidEmail(email);
    if (!validEmail) {
    }

    if (validEmail) {
      setButtonText("sending...");
      setShowErrMsg(false);
      try {
        const response = await sendOtpApi(email);
        const data = response.data;
        setSuccessMsg(data.message);

        if (response.status === 200) {
          setButtonText("Submit OTP");
          setShowEmailView(false);
          setShowOtpView(true);
        } else {
          handleOnSubmitError(data.message);
        }
      } catch (error) {
        setShowSnackbar(true);
        setToastMessage("Please check your network and try again.");
        setButtonText("Get OTP");
      }
    } else {
      setEmailError(true);
    }
  };

  const handleIncorrectEmail = () => {
    setShowOtpView(false);
    setShowEmailView(true);
    setSuccessMsg("");
  };

  //RETURN
  return (
    <Grid sx={{ display: "flex", flexWrap: "nowrap" }} container>
      <Grid item sx={{ flex: { md: 8 } }}>
        <Box
          sx={{
            display: { md: "flex", xs: "none" },
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#262626",
          }}
        >
          <MainLogo />
        </Box>
      </Grid>

      <Grid
        item
        sx={{
          width: { md: "40vw" },
          height: { xs: "100vh", md: "100vh" },
          flex: { md: 4 },
          display: "flex",
          padding: 2,
          backgroundImage: { xs: `url(${Aapmor360logo})`, md: "none" },
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 15%",
          backdropFilter: "drop-shadow(10px)",
        }}
      >
        <Grid
          sx={{
            width: { md: "40vw" },
            height: { xs: "100%", md: "90vh" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#26262601",
            // backdropFilter: "blur(15px)",
            // boxShadow: { xs: "0px 2px 16px 0px #0047FF", md: "none" },
            gap: 4,
          }}
        >
          <Typography variant="h6" textAlign={"center"} gutterBottom>
            Unlocking Possibilities, Empowering Journeys – Welcome to Aapmor
            360, Where Every Click Fuels Innovation!
          </Typography>
          <Typography variant="subtitle1" textAlign={"center"} gutterBottom>
            Login with your email
          </Typography>
          {/* email Input */}
          {showEmailView && (
            <TextField
              variant="outlined"
              required
              label="Email"
              id="email"
              error={emailError}
              helperText={emailError === true && "Invalid email id"}
              placeholder="Enter Aapmor email id"
              onChange={handleEmailChange}
              value={email}
              sx={{
                height: "52px",
                width: { xs: "90%", lg: "60%" },
                // marginBottom: { xs: "30px", lg: "24px" },
                animation: emailError ? "shake 0.3s" : "",
                "@keyframes shake": {
                  "0%": { marginLeft: "0rem" },
                  "25%": { marginLeft: "0.5rem" },
                  "75%": {
                    marginLeft: "-0.5rem",
                  },
                  "100%": { marginLeft: "0rem" },
                },
              }}
            />
          )}
          {/* OTP Input */}
          {showOtpView && (
            <MuiOtpInput
              value={otp}
              length={6}
              onChange={handleOtpChange}
              sx={{ width: "350px", marginBottom: "16px" }}
            />
          )}
          {/* EMAIL SEND BUTTON */}
          {showEmailView && (
            <Button
              onClick={onSubmitEmail}
              data-testid="email input"
              variant="contained"
              disabled={isButtonDisable}
              sx={{
                width: { xs: "90%", lg: "60%" },
                height: "52px",
                fontWeight: 500,
              }}
            >
              {buttonText}
            </Button>
          )}
          {/*  OTP BUTTON */}
          {showOtpView && (
            <Button
              variant="contained"
              sx={{
                width: { xs: "90%", lg: "60%" },
                height: "52px",
                marginBottom: { xs: "30px", lg: "0px" },
              }}
              onClick={handleOtpEntered}
              disabled={isOtpButtonDisable}
            >
              {buttonText}
            </Button>
          )}
          {/* Error message */}
          {showErrMsg && (
            <Typography variant="p" sx={{ color: "red", marginTop: 2 }}>
              *{errorMsg}
            </Typography>
          )}
          {/* Success message */}
          {successMsg !== "" && (
            <Box sx={{ textAlign: "center", maxWidth: 400 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "green", marginTop: 2 }}
              >
                {successMsg}
              </Typography>
              <Typography variant="caption" fontSize={12}>
                incorrect email ?{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={handleIncorrectEmail}
                >
                  click here
                </span>{" "}
                to update your email address.{" "}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <Snackbar
        key={"top right"}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={toastMessage}
      />
    </Grid>
  );
};

export default Login;
