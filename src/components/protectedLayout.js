import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import SideBar from "./sidebar/sidebar";

const ProtectedRoute = () => {
  const token = Cookies.get("jwtToken");
  return token === undefined ? <Navigate to="/login" /> : <SideNavBar />;
};
export default ProtectedRoute;

const SideNavBar = () => {
  return (
    <Grid container flexDirection={"row"} justifyContent={"flex-start"}>
      <Grid item xs={2} flex={1}>
        <SideBar />
      </Grid>
      <Grid item xs={10} id="top">
        <Outlet />
      </Grid>
    </Grid>
  );
};
