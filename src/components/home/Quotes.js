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

const Quotes = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /* User Name */

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

  const [randomQuote, setRandomQuote] = useState([]);
  const [author, setAuthor] = useState([]);

  // useEffect(() => {
  //   getQuotes();
  // }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     getQuotes();
  //   }, 30000);
  // }, []);

  const getQuotes = async () => {
    try {
      const response = await getRandomQuote();
      const data = response.data;
      setRandomQuote(data[0]);
      setAuthor(data[1]);
    } catch (error) {
      setRandomQuote("Random Quote");
      setAuthor("Author");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 12px",
      }}
    >
      <Grid item>
        <Typography gutterTop variant="body1">
          {/* {randomQuote?.length > 60 ? randomQuote.slice(0, 60) : randomQuote} -{" "} */}
          {/* {author} */}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={handleClick}
          sx={{ ml: 2 }}
          aria-controls="account-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          open={open}
        >
          <Avatar
            alt="Pradeep"
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704844800&semt=ais"
            sx={{ width: 40, height: 40 }}
          />
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
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Help</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Quotes;
