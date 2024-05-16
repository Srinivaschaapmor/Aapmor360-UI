import { Box, Typography } from "@mui/material";
import "./style.css";

const MainLogo = () => {
  return (
    <Box>
      <Box>
        <Typography
          fontFamily={"Oxygen"}
          fontSize={"72px"}
          fontWeight={"bold"}
          color="#fff"
        >
          Aapmor
          <span
            style={{
              fontSize: "40px",
              fontWeight: 600,
              marginLeft: "20px",
              color: "#ffffff",
            }}
          >
            360
          </span>
        </Typography>
      </Box>
      <div className="load2">
        <span className="line"></span>
      </div>
      <div className="logo"></div>
    </Box>
  );
};

export default MainLogo;
