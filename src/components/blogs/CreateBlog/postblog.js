import {
  Box,
  Button,
  TextField,
  Stack,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { useState, React } from "react";
import { createBlogApi, publishBlogApi } from "../../../apiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import SideBar from "../../sidebar/sidebar";

const name = Cookies.get("username");
const role = Cookies.get("userrole");

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image", "video"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const savedBlogData = JSON.parse(localStorage.getItem("blogData"));
const savedData = savedBlogData !== null && savedBlogData;

const CreateBlog = () => {
  document.title = "Create New Blog";
  const [category, setCategory] = useState(
    savedData !== false ? savedData.category : ""
  );
  const [title, setTitle] = useState(
    savedData !== false ? savedData.title : ""
  );
  const [description, setDescription] = useState(
    savedData !== false ? savedData.description : ""
  );
  const [blogImage, setBlogImage] = useState(
    savedData !== false ? savedData.blog_img : ""
  );
  const [editorHtml, setEditorHtml] = useState(
    savedData !== false ? savedData.content : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    const saveBlogData = {
      category,
      title,
      description,
      blog_img: blogImage,
      content: editorHtml,
    };
    if (title && description && blogImage && category && editorHtml) {
      setLoading(true);
      localStorage.setItem("blogData", JSON.stringify(saveBlogData));
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBlogImage(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const submitPost = async () => {
    setLoading(true);
    const blogDetails = {
      username: name,
      userrole: role,
      title,
      description,
      blogImage,
      category,
      date: dateObject,
      likes: 0,
      comments: [],
      html: editorHtml,
      savedUsers: [],
    };
    try {
      const response = await createBlogApi(blogDetails);
      if (response.status === 200) {
        localStorage.removeItem("blogData");
        setLoading(true);
        const data = response.data;
        var blogId = data.message;
        const content = { title, description, blogImage, dateObject, blogId };
        try {
          await publishBlogApi(content);
          alert("Published successfully");
        } catch (err) {
          alert("Failed to publish your blog");
        }
        navigate("/blogs");
      }
    } catch (err) {
      setLoading(false);
      alert("Failed to post blog");
    }
  };

  const disablePublishButton =
    !!category &&
    !!title &&
    !!description &&
    !!blogImage &&
    !!editorHtml &&
    editorHtml !== "<p><br></p>";

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={0}>
    //     <SideBar />
    //   </Grid>
    <Grid item flex={8}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
          }}
        >
          {/* HEADER BOX */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              backgroundColor: "#bfbfbf20",
              pb: 1,
              borderRadius: "6px",
              boxSizing: "border-box",
              border: "0.5px solid #bfbfbf",
              marginTop: 2,
            }}
          >
            <TextField
              placeholder="Enter your blog title"
              label="Blog title"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: "50%" }}
              variant="standard"
              required
              value={title}
            />
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={"Insights"}>Insights</MenuItem>
                    <MenuItem value={"Fitness"}>Fitness</MenuItem>
                    <MenuItem value={"Artificial Intelligence"}>
                      Artificial Intelligence
                    </MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    <MenuItem value={"Politics"}>Politics</MenuItem>
                    <MenuItem value={"International"}>International</MenuItem>
                    <MenuItem value={"News"}>News</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                    <MenuItem value={"Food & Health"}>Food & health</MenuItem>
                    <MenuItem value={"Gaming"}>Gaming</MenuItem>
                    <MenuItem value={"Technology"}>Technology</MenuItem>
                    <MenuItem value={"Arts"}>Arts</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("blogData");
                  navigate("/blogs");
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={submitPost}
                disabled={!disablePublishButton}
              >
                Publish
              </LoadingButton>
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              ></LoadingButton>
            </Stack>
          </Box>
          <Box
            sx={{
              mt: 0.5,
              backgroundColor: "#bfbfbf10",
              padding: 2,
              borderRadius: "6px",
              border: "0.5px solid #bfbfbf",
              boxSizing: "border-box",
            }}
          >
            <Stack direction={"row"} spacing={4} alignItems={"flex-end"}>
              <TextField
                variant="standard"
                placeholder="Enter few lines about your blog"
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Divider orientation="vertical" flexItem />
              <Input
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileUpload}
                id="imageFile"
                sx={{ display: "none" }}
              />
              <Tooltip title="Insert thumbnail image for your blog">
                <label htmlFor="imageFile">
                  <Image sx={{ cursor: "pointer" }} />
                </label>
              </Tooltip>
            </Stack>
          </Box>
          {/* EDITOR BOX*/}
          {blogImage !== "" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                boxSizing: "border-box",
                backgroundColor: "#bfbfbf50",
                width: "300px",
                height: "200px",
                mt: 1,
                borderRadius: 2,
                boxShadow: "0px 0px 10px 0px #00000050",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={12}
              >
                <Typography variant="p" fontWeight={500}>
                  Your blog thumbnail
                </Typography>
                <Tooltip title="click to remove thumbnail" placement="right">
                  <IconButton onClick={() => setBlogImage("")}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <img
                src={blogImage}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "80%",
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              m: 2,
              alignSelf: "center",
            }}
          >
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={modules}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
    // </Grid>
  );
};
export default CreateBlog;
