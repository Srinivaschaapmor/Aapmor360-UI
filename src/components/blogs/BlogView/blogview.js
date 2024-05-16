import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "./style.css";
import {
  commentsApi,
  getBlogViewApi,
  likesApi,
  removeSaveBlogApi,
  saveBlogApi,
} from "../../../apiCalls/apiCalls";
import Cookies from "js-cookie";
import SideBar from "../../sidebar/sidebar";
import { LoadingButton } from "@mui/lab";
import Loader from "../../../utils/loader";
// import { LoadingButton } from "@mui/lab";

const BlogView = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  const id = path[2];
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableCommentButton, setDisableCommentButton] = useState(true);

  useEffect(() => {
    getBlogItem();
  }, []);

  const token = Cookies.get("jwtToken");
  const cookiesName = Cookies.get("username");
  const name = cookiesName !== undefined ? cookiesName : "U";
  const email = Cookies.get("userEmail");
  const dateObject = new Date();

  useEffect(() => {
    if (comment.length >= 1) {
      setDisableCommentButton(false);
    } else {
      setDisableCommentButton(true);
    }
  }, [comment]);

  const handleCommentApi = async () => {
    if (comment === "") {
      setDisableCommentButton(true);
    } else {
      setLoading(true);
      const commentObject = { comment, id, name, dateObject };
      const response = await commentsApi(commentObject);
      if (response.status === 200) {
        setLoading(false);
        getBlogItem();
      }
      setComment("");
    }
  };

  const handleCommentOnEnter = async (e) => {
    if (e.key === "Enter" && comment !== "") {
      handleCommentApi();
    }
  };

  const handleLikes = async () => {
    const response = await likesApi({ id });
    if (response.status === 200) {
      getBlogItem();
    }
  };

  const getBlogItem = async () => {
    const response = await getBlogViewApi(id);
    const blogDetails = response.data;
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      setBlogDetails(blogDetails);
    } else {
      setApiStatus("FAILURE");
    }
  };

  const {
    category,
    comments,
    date,
    likes,
    title,
    html,
    username,
    _id,
    savedUsers,
  } = blogDetails;

  // time difference
  const getTimeAgo = (dateObject) => {
    const currentDate = new Date();
    const date = new Date(dateObject);
    const timeDifference = currentDate - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  };

  // SAVE BLOG TO USER SAVED

  const handleBlogSave = async () => {
    const response = await saveBlogApi(_id);
    if (response.status === 200) {
      getBlogItem();
    }
  };

  const handleBlogUnsave = async () => {
    const response = await removeSaveBlogApi(_id);
    console.log(response);
    if (response.status === 200) {
      getBlogItem();
    }
  };

  const addImageClass = (htmlContent) => {
    return htmlContent.replace(/<img/g, '<img class="quill-blog-image"');
  };

  const createMarkup = (content) => {
    return { __html: addImageClass(content) };
  };

  // RENDER EACH COMMENT

  const renderComments = () => {
    return (
      <Stack direction={"column"} spacing={0}>
        {comments.map((eachComment) => {
          const { comment, name, dateObject } = eachComment;
          const time = getTimeAgo(dateObject);
          return (
            <Box key={eachComment._id}>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  padding: 1,
                  boxSizing: "border-box",
                }}
              >
                <Avatar>{name[0].toUpperCase()}</Avatar>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="inherit" color={"#000"} fontWeight={600}>
                    {name}{" "}
                    <text style={{ color: "grey", fontSize: "10px" }}>
                      {"\u25CF"}
                    </text>
                    <span
                      style={{
                        fontWeight: "lighter",
                        color: "lightslategray",
                        fontSize: "12px",
                      }}
                    >
                      {time}
                    </span>
                  </Typography>

                  <Typography variant="body2">{comment}</Typography>
                </Stack>
              </Stack>
              <Divider orientation="horizontal" flexItem />
            </Box>
          );
        })}
      </Stack>
    );
  };
  //RENDERING NO COMMENTS VIEW
  const renderNoCommentsView = () => {
    return (
      <Box sx={{}}>
        <Typography variant="body1">No comments yet</Typography>
      </Box>
    );
  };

  //RENDERING BLOG VIEW
  const renderBLogView = () => {
    document.title = `Blog: ${title}`;
    const saved = savedUsers.includes(email) ? true : false;
    const formattedDate = new Date(date).toDateString();
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "",
          alignItems: "space-around",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: { md: 4, xs: "16px" },
            paddingTop: 0,
            maxWidth: { md: "100%", xs: "100%", sm: "90%" },
            boxSizing: "border-box",
          }}
        >
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{
              fontSize: "12px",
              color: "#ffffff",
              padding: 1,
              mb: 2,
            }}
          />
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
            <Avatar>P</Avatar>
            <Stack direction={"column"} spacing={0}>
              <Typography variant="p">{username}</Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="caption" color={"darkgray"}>
                  Created on {formattedDate}
                </Typography>
              </Stack>
            </Stack>

            {/* SAVE OR UNSAVE ICON */}

            {token !== undefined && (
              <>
                {saved ? (
                  <Tooltip title="Remove from saved blogs">
                    <IconButton onClick={handleBlogUnsave}>
                      <BookmarkAddedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to saved blogs">
                    <IconButton onClick={handleBlogSave}>
                      <BookmarkAddOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </Box>

          <Divider orientation="horizontal" flexItem />

          {/* HTML FILE */}

          <Box
            dangerouslySetInnerHTML={createMarkup(html)}
            sx={{
              width: { md: "80%", xs: "100%", sm: "90%" },
              // alignSelf: { md: "center", xs: "flex-start" },
            }}
          ></Box>

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />

          {/* Comments and likes*/}
          <Stack direction={"row"} spacing={4} mt={2}>
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton
                onClick={handleLikes}
                sx={{ marginTop: 0, padding: 0 }}
              >
                <ThumbUpAltOutlinedIcon />
              </IconButton>
              <Typography>{likes} </Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"} mt={2}>
              <InsertCommentOutlinedIcon />
              <Typography>{comments.length} </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Comments view */}

        <Box
          sx={{
            paddingLeft: 4,
            backgroundColor: "#fff",
            width: { md: "70%", xs: "90%", sm: "90%" },
          }}
        >
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <ChatBubbleOutlineOutlinedIcon />
              <Typography fontFamily={"Lora"} fontSize={"24px"}>
                Comments
              </Typography>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            {token && (
              <Box
                sx={{
                  backgroundColor: "#bfbfbf20",
                  borderRadius: 2,
                  padding: 1,
                  boxSizing: "border-box",
                  mt: 1,
                }}
              >
                <Stack direction={"row"} spacing={3} sx={{ mt: 1 }}>
                  <Avatar>{name[0].toUpperCase()}</Avatar>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-end"}
                    spacing={1}
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      placeholder="Add a comment"
                      sx={{
                        fontSize: "10px",
                        backgroundColor: "#fff",
                        paddingLeft: 1,
                        paddingTop: 1,
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="standard"
                      multiline
                      rows={2}
                      fullWidth
                      onKeyDown={(e) => handleCommentOnEnter(e)}
                    />
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      size="small"
                      disabled={disableCommentButton}
                      onClick={handleCommentApi}
                      endIcon={<SendOutlinedIcon />}
                    >
                      Send
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            )}

            <Divider sx={{ mt: 1 }} />

            {comments.length > 0 ? renderComments() : renderNoCommentsView()}
            {/* Comments box */}
          </Box>
        </Box>
      </Box>
    );
  };
  const renderFailureView = () => {
    return <Box>Unable to view the blog</Box>;
  };

  const renderBlogDetails = () => {
    switch (apiStatus) {
      case "INITIAL":
        return <Loader />;
      case "SUCCESS":
        return renderBLogView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };
  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>
      <Grid item flex={8}>
        <IconButton
          sx={{
            // pl: 2,
            // pt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="medium"
          onClick={() => navigate("/blogs")}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {renderBlogDetails()}
      </Grid>
    // </Grid>
  );
};

export default BlogView;
