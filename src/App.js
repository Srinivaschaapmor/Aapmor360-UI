import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeeForm from "./components/employeeForm/EmployeeForm";
import InterviewForm from "./components/recruitment/RecruitmentForm";
import JobSeekersList from "./components/recruitment/JobSeekerList";
import ViewStatus from "./components/recruitment/JobSeekerDetails";
import EmployeeDetails from "./components/employee/employeeDetails";
import Employee from "./components/employee/employee";
import Dashboard from "./components/home/Dashboard";
import Feedback from "./components/home/Feedback";
import Recruitment from "./components/home/Recruitment";
import Home from "./components/blogs/HomePage/home";
import BlogView from "./components/blogs/BlogView/blogview";
import CreateBlog from "./components/blogs/CreateBlog/postblog";
import PostFeedback from "./components/feedback/PostFeedback";
import ViewFeedBack from "./components/feedback/ViewFeedback";
import ProtectedRoute from "./components/protectedLayout";
import Jobs from "./components/jobOpenings/Jobs";
import JobOpenings from "./components/jobOpenings/JobOpenings";
import Certifications from "./components/reports/Certifications/Certifications";
import HiringTracker from "./components/reports/HiringTracker/HiringTracker";
import EmployeeEngagement from "./components/reports/EmployeeEngagement/EmployeeEngagement";
import JobOpeningForm from "./components/jobOpenings/JobOpeningForm";
import JobDescription from "./components/jobOpenings/JobDescription";
import ProjectsTables from "./components/home/Projects";
import ApplyForm from "./components/publicApplyForm/ApplyForm";
import Settings from "./settings/UserSettings/Settings";
import JobOpeningsPublicView from "./components/guestAccessiblePages/JobOpeningsPublicView";
import JobDescriptionPublicView from "./components/guestAccessiblePages/JobDescriptionPublicView";
import PageNotFound from "./components/guestAccessiblePages/PageNotFound";

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* GUEST ACCESIBLE ROUTES */}
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/careers/job-openings"
            element={<JobOpeningsPublicView />}
          />
          <Route
            exact
            path="/careers/job-openings/:id"
            element={<JobDescriptionPublicView />}
          />
          <Route exact path="/careers/apply/:id" element={<ApplyForm />} />
          <Route exact path="/not-found" element={<PageNotFound />} />
          {/* PROTECTED ROUTES */}
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/job-openings" element={<JobOpenings />} />
            <Route
              exact
              path="/reports/certifications"
              element={<Certifications />}
            />
            <Route
              exact
              path="/reports/hiring-tracker"
              element={<HiringTracker />}
            />
            <Route
              exact
              path="/job-openings/:id"
              element={<JobDescription />}
            />
            <Route
              exact
              path="/reports/employee-engagement"
              element={<EmployeeEngagement />}
            />
            <Route exact path="/jobOpeningForm" element={<JobOpeningForm />} />
            <Route
              exact
              path="/jobOpeningForm/:id"
              element={<JobOpeningForm />}
            />
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/onboarding-form" element={<EmployeeForm />} />
            <Route exact path="/employees" element={<Employee />} />
            <Route exact path="/:id" element={<EmployeeDetails />} />
            <Route exact path="/recruitment-form" element={<InterviewForm />} />
            <Route exact path="/recruitment-home" element={<Recruitment />} />
            <Route
              exact
              path="/jobseeker-details/:id"
              element={<ViewStatus />}
            />
            <Route
              exact
              path="/recruitment-list"
              element={<JobSeekersList />}
            />
            <Route exact path="/employees/:id" element={<EmployeeDetails />} />
            <Route exact path="/feedback" element={<Feedback />} />
            <Route exact path="/postFeedback" element={<PostFeedback />} />
            <Route exact path="/viewFeedback" element={<ViewFeedBack />} />

            <Route exact path="/blogs" element={<Home />} />
            <Route exact path="/projects" element={<ProjectsTables />} />
            <Route exact path="/blogs/:id" element={<BlogView />} />
            <Route exact path="/createblog" element={<CreateBlog />} />
            {/* <Route exact path="/jobs" element={<Jobs />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
