import React, { useEffect, useState } from "react";
import Blog from "../Blog/blogCard";
import SideBar from "../../sidebar/sidebar";
import unable_to_load_website from "../../../assets/unable_to_load_website.png";
import { Typography, Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../utils/loader";
import { getBlogsApi } from "../../../apiCalls/apiCalls";
import BlogHeader from "../BlogHeader/blogHeader";
import Quotes from "../../home/Quotes";
// import { setBlogsData } from "../Slices/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [category, setCategory] = useState("All");
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  // const blogs = blogObj.blogs;
  console.log(blogs);

  //GET BLOGS API CALL
  const getBlogsData = async () => {
    try {
      const response = await getBlogsApi(category);
      console.log(response);
      if (response.status === 200) {
        setApiStatus("SUCCESS");
        // dispatch(setBlogsData(response.data));
        setBlogs(response.data);
      } else {
        setApiStatus("FAILURE");
      }
    } catch (error) {
      setApiStatus("FAILURE");
    }
  };

  useEffect(() => {
    document.title = "AAPMOR | Blogs";
    setApiStatus("INITIAL");
    getBlogsData();
  }, [category]);

  const renderBlogsView = () =>
    blogs.map((blogItem) => {
      return <Blog blogDetails={blogItem} key={blogItem._id} />;
    });

  const renderNoBlogsView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} color={"GrayText"}>
          There are no blogs in this category, please select other categories or{" "}
          <a
            style={{
              fontStyle: "italic",
              fontWeight: "700",
              cursor: "pointer",
              color: "Highlight",
            }}
            href="/"
          >
            load
          </a>{" "}
          all blogs
        </Typography>
      </Box>
    );
  };

  const renderSuccessView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          flexWrap: "wrap",
          minHeight: "90vh",
          padding: "20px 0px ",
          gap: 4,
          boxSizing: "border-box",
        }}
      >
        {blogs.length > 0 ? renderBlogsView() : renderNoBlogsView()}
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <img src={unable_to_load_website} />
        <Typography variant="h5">
          Currently, the blogs page is unable to load. Please check your network
          connectivity and try again.
        </Typography>
      </Box>
    );
  };

  const renderBlogsApi = () => {
    switch (apiStatus) {
      case "INITIAL":
        return <Loader />;
      case "SUCCESS":
        return renderSuccessView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item>
    //     <SideBar />
    //   </Grid>
    <Grid item flex={8} flexDirection={"column"} sx={{ p: 1 }}>
      <Quotes sx={{}} />
      <BlogHeader setCategory={setCategory} category={category} />
      {renderBlogsApi()}
    </Grid>
    // </Grid>
  );
};

export default Home;
