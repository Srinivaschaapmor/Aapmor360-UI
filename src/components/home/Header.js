import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Cookies from "js-cookie";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomQuote } from "../../apiCalls/apiCalls";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [randomQuote, setRandomQuote] = useState([]);
  const [author, setAuthor] = useState([]);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("user");
  // const [firstName, setFirstName] = useState("user");
  // const [lastName, setLastName] = useState("user");

  const getUsername = async () => {
    const userEmail = Cookies.get("userEmail");
    console.log(userEmail, "email");
    const name = userEmail.split("@")[0];
    const lastName = name.slice(0);
    const intial = lastName.slice(-1);
    const firstName = lastName.slice(0, 1);
    const finalLastname = lastName.slice(1, -1);
    console.log(firstName);
    const fullName =
      firstName.toUpperCase() + finalLastname + " " + intial.toUpperCase();
    setUserName(fullName);
    // setFirstName(firstName);
    // setLastName(lastName);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  useEffect(() => {
    // getQuotes();
    getUsername();
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     getQuotes();
  //   }, 30000);
  // }, []);

  const getQuotes = async () => {
    try {
      const response = await getRandomQuote();
      const data = response.data;
      const quote =
        data[0].length < 80 ? data[0] : `${data[0].slice(0, 50)} . . .`;
      setRandomQuote(quote);
      setAuthor(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 4,
        // py: 1,
        marginTop: "20px",
        marginBottom: "30px",
        display: { xs: "none", sm: "flex" },
      }}
    >
      <Grid item>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600 }}
          fontFamily={"Oxygen"}
        >
          Welcome {userName}
        </Typography>
        {/* <Typography gutterBottom variant="body1">
          {randomQuote} - {author}
        </Typography> */}
        {/* <Typography gutterBottom variant="body2"></Typography> */}
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleClick}
          aria-controls="account-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          open={open}
        >
          {/* <Avatar
            alt="profileImage"
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704844800&semt=ais"
            sx={{ width: 40, height: 40 }}
          /> */}
          <Avatar>{userName[0]}</Avatar>
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          transformOrigin={{
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Help</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Header;
