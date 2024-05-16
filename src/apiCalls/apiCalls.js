import axios from "axios";
import Cookies from "js-cookie";

// const host = "192.168.0.122";
const host = "localhost";

const feedbackApiUrl = `http://${host}:5000/api/v1/employee/feedback`;
const loginApiUrl = `http://${host}:5000/api/v1/employee/login`;
const forgetPassUrl = `http://${host}:5000/api/v1/employee/sendEmail`;
const randomQuoteUrl = `http://${host}:5000/api/v1/employee/getquote`;
const submitEmployeeDetailsUrl = `http://${host}:5000/api/v1/employee/upload`;
const postRecruitmentUrl = `http://${host}:5000/api/v1/employee/postrecruit`;
const getRecruitmentUrl = `http://${host}:5000/api/v1/employee/recruit-details`;
const getAllEmployeesDataUrl = `http://${host}:5000/api/v1/employee`;
const getEmployeeDetailsUrl = `http://${host}:5000/api/v1/employee/`;
const getFeedbackUrl = `http://${host}:5000/api/v1/employee/feedback/data`;

const getJobSeekerUrl = `http://${host}:5000/api/v1/employee/recruit/`;
const updateRecruitUrl = `http://${host}:5000/api/v1/employee/updaterecruit/`;
const createBlogApiUrl = `http://${host}:5000/api/v1/employee/blogs/`;
const saveBlogsApiUrl = `http://${host}:5000/api/v1/employee/blogs/savedblogs/`;
const publishBlogApiUrl = `http://${host}:5000/api/v1/employee/publishBlog`;
const likesApiUrl = `http://${host}:5000/api/v1/employee/blog/likes`;
const saveBLogApiUrl = `http://${host}:5000/api/v1/employee/saveblog`;
const getSavedBlogsApiUrl = `http://${host}:5000/api/v1/employee/usersaved`;
const commentsApiUrl = `http://${host}:5000/api/v1/employee/comments`;
const getBlogsApiUrl = `http://${host}:5000/api/v1/employee/blogs/filter/?category=`;
const getBlogViewUrl = `http://${host}:5000/api/v1/employee/blogs/`;
const createJobOpening = `http://${host}:5000/api/jobPosting/`;

export const postJobOpening = async (jobPosting) => {
  return await axios.post(createJobOpening, jobPosting);
};

// URLS
export const jobApplicantBaseUrl = `http://${host}:5000/api/jobApplicant/`;
export const jobPostingBaseUrl = `http://${host}:5000/api/jobPosting/`;
export const recruitmentDetailsBaseUrl = `http://${host}:5000/api/recruitmentDetails/`;

export const submitEmployeeDetails = async (employeeDetails) => {
  return await axios.post(submitEmployeeDetailsUrl, employeeDetails);
};
export const postFeedbackApi = async (data) => {
  return await axios.post(feedbackApiUrl, data);
};
export const sendOtpApi = async (email) => {
  return await axios.post(forgetPassUrl, { email });
};
export const loginValidation = async (loginDetails) => {
  return await axios.post(loginApiUrl, loginDetails);
};
export const getRandomQuote = async () => {
  return await axios.get(randomQuoteUrl);
};
export const postRecruitmentDetails = async (recruitmentObj) => {
  return await axios.post(postRecruitmentUrl, recruitmentObj);
};
export const getRecruitmentDetails = async () => {
  return await axios.get(getRecruitmentUrl);
};
export const getFeedbackDetails = async () => {
  return await axios.get(getFeedbackUrl);
};
export const getAllEmployeesData = async () => {
  return await axios.get(getAllEmployeesDataUrl);
};
export const getEmployeeDetails = async (id) => {
  return await axios.get(`${getEmployeeDetailsUrl}${id}`);
};
export const getJobSeekerDetails = async (id) => {
  return await axios.get(`${getJobSeekerUrl}${id}`);
};
export const submitRecruiterFeedback = async (id, recruitFeedback) => {
  return await axios.put(`${updateRecruitUrl}${id}`, recruitFeedback);
};

/* BLOGS API */

export const createBlogApi = async (blogDetails) => {
  console.log(blogDetails, "in api call");
  const token = Cookies.get("jwtToken");
  const options = {
    method: "post",
    url: createBlogApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: blogDetails,
  };
  return await axios(options);
};
export const getBlogsApi = async (category) => {
  return await axios.get(`${getBlogsApiUrl}${category}`);
};
export const getBlogViewApi = async (id) => {
  return await axios.get(`${getBlogViewUrl}${id}`);
};
export const saveBlogsApi = async (saveDetails) => {
  return await axios.post(saveBlogsApiUrl, saveDetails);
};

//COMMENTS API
export const commentsApi = async (commentObject) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: commentsApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: commentObject,
  };
  return await axios(config);
};

//PUBLISHING BLOG
export const publishBlogApi = async (content) => {
  return await axios.post(publishBlogApiUrl, content);
};

// LIKES API
export const likesApi = async (id) => {
  return await axios.put(likesApiUrl, id);
};

//GET SAVED BLOGS API
export const getSavedBlogsApi = async () => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "get",
    url: getSavedBlogsApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios(config);
};

//SAVING A BLOG API
export const saveBlogApi = async (_id) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: saveBLogApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { _id },
  };
  return await axios(config);
};

//REMOVE BLOG FROM SAVED ARRAY API
export const removeSaveBlogApi = async (_id) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "put",
    url: saveBLogApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { _id },
  };
  return await axios(config);
};
