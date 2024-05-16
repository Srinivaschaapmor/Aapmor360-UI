import { Stack, Typography } from "@mui/material";
import React from "react";
import AapmorLogo from "../../assets/AapmorLogo.png";
function Header() {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} sx={{ p: 3 }}>
      {" "}
      <Stack>
        <img src={AapmorLogo} style={{ width: "100px" }}></img>
        <Typography sx={{ fontSize: 9, fontWeight: 600 }}>
          AAPMOR TECHNOLOGIES
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Header;
