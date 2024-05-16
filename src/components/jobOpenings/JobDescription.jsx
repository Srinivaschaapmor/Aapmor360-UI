import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Modal,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  FormControl,
  styled,
  Divider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import Header from "../home/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditApplicantDetailsModal from "./EditApplicantDetailsModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewApplicantDetailsModal from "./ViewApplicantDetailsModal";
import ParticularJobDescription from "./ParticularJobDescription";
// import "./tableStyles.css";
import {
  jobApplicantBaseUrl,
  recruitmentDetailsBaseUrl,
} from "../../apiCalls/apiCalls";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

const JobDescription = () => {
  let { id: jobId } = useParams();
  const navigate = useNavigate();
  const { data: jobDetails, isLoading: jobdescLoading } = useSWR(
    `http://localhost:5000/api/jobPosting/${jobId}`,
    fetcher
  );

  const [openEditModal, setOpenEditModal] = useState(false);
  const [tableRowToEdit, setTableRowToEdit] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [tableRowToView, setTableRowToView] = useState("");
  const [applicantsData, setApplicantsData] = useState("");
  const [openEditStatusModal, setOpenEditStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // state that keeps track of whether the selected row has been edited
  const [rowEdited, setRowEdited] = useState(false);
  // state that keeps track of whether the status has been changed to "movedToInterview"
  const [movedToInterview, setMovedToInterview] = useState(false);

  const sourceMap = {
    linkedIn: "LinkedIn",
    naukri: "Naukri",
    employeeReference: "Employee Reference",
    selfApply: "Self Apply",
  };

  const statusMap = {
    yetToInitiate: "Yet To Initiate",
    noResponse: "No Response",
    notInterested: "Not Interested",
    waitingForInterview: "Waiting For Interview",
    movedToInterview: "Moved To Interview",
  };

  const statusOptions = {
    "Yet To Initiate": "yetToInitiate",
    "No Response": "noResponse",
    "Not Interested": "notInterested",
    "Waiting For Interview": "waitingForInterview",
    "Moved To Interview": "movedToInterview",
  };

  // fetch data of all applicants who applied to this job
  const fetchApplicantsData = async () => {
    try {
      const res = await axios.get(`${jobApplicantBaseUrl}${jobId}`);
      setApplicantsData(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // handle methods for modal that opens when status is changed in the table
  const handleOpenEditStatusModal = (rowToEdit, status) => {
    rowToEdit["newStatus"] = status;
    setTableRowToEdit(rowToEdit);
    setOpenEditStatusModal(true);
  };
  const handleEditStatusModalClose = () => {
    setOpenEditStatusModal(false);
    setTableRowToEdit("");
  };

  // handle methods for modal that opens when eye button is clicked
  const handleOpenViewModal = (rowToView) => {
    // console.log(rowToView);
    setTableRowToView(rowToView);
    setOpenViewModal(true);
  };
  const handleViewModalClose = () => {
    setOpenViewModal(false);
    setTableRowToView("");
  };

  // handle methods for modal that opens when edit button is clicked
  const handleOpenEditModal = (rowToEdit) => {
    // console.log(rowToEdit);
    setTableRowToEdit(rowToEdit);
    setOpenEditModal(true);
  };
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setTableRowToEdit("");
  };

  // handle methods for modal that opens when delete button is clicked
  const handleOpenDeleteModal = (rowToDelete) => {
    setTableRowToEdit(rowToDelete);
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setTableRowToEdit("");
  };

  const columns = [
    //fullName,phoneNumber,email,source,resume,status,actions
    {
      field: "firstName",
      headerName: "First name",
      sortable: false,
      editable: false,
      sortable: true,
      width: 110,
    },
    {
      field: "lastName",
      headerName: "Last name",
      sortable: false,
      editable: false,
      sortable: true,
      width: 90,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      // type: "number",
      width: 110,
      editable: false,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
      editable: false,
      sortable: true,
    },
    {
      headerName: "Source",
      editable: false,
      sortable: true,
      width: 100,
      description:
        "Application source (ex: LinkedIn, Naukri, employee reference)",
      valueGetter: (value, row) =>
        row.source ? `${sourceMap[row.source]}` : `${sourceMap["selfApply"]}`,
    },
    {
      field: "resume",
      headerName: "Resume",
      editable: false,
      sortable: false,
      width: 70,
      disableExport: true,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => {
              if (params.row.resume) {
                handleDownloadResume(
                  params.row.resume,
                  `${params.row.firstName}${params.row.lastName}Resume`
                );
              }
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: "19px" }} />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{ p: 1, width: "100%" }}
          alignItems={"center"}
          height="100%"
          justifyContent={"center"}
        >
          <FormControl fullWidth>
            <Select
              value={params.row.status}
              onChange={(e) =>
                handleOpenEditStatusModal(params.row, e.target.value)
              }
              displayEmpty
              inputProps={{ "aria-label": "Select" }}
              sx={{
                height: "40px",
                borderRadius: 1,
                fontSize: "14px",
                // minWidth: "140px",
              }}
            >
              <MenuItem value="yetToInitiate">Yet to initiate</MenuItem>
              <MenuItem value="noResponse">No response</MenuItem>
              <MenuItem value="notInterested">Not interested</MenuItem>
              <MenuItem value="waitingForInterview">
                Waiting for interview
              </MenuItem>
              <MenuItem value="movedToInterview">Moved to interview</MenuItem>{" "}
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130.5,
      editable: false,
      disableExport: true,
      renderCell: (params) => (
        <Stack
          direction={"row"}
          gap={0.2}
          alignItems={"center"}
          height="100%"
          justifyContent={"center"}
        >
          <IconButton
            aria-label="back"
            size="small"
            onClick={(e) => handleOpenViewModal(params.row)}
          >
            <VisibilityIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={(e) => handleOpenEditModal(params.row)}
          >
            <EditIcon sx={{ fontSize: "19px" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={(e) => handleOpenDeleteModal(params.row)}
          >
            <DeleteIcon sx={{ fontSize: "19px" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Sai Sreshtaa",
      lastName: "Turaga",
      phoneNumber: "9912345677",
      email: "sreshtaat@gmail.com",
      source: "linkedIn",
      resume: "resume.pdf",
      status: "waitingForInterview",
      initialImpression: "8",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      firstName: "Jagadeesh",
      lastName: "Talari",
      phoneNumber: "9812345666",
      email: "jagadeesh@gmail.com",
      source: "naukri",
      resume: "resume.pdf",
      status: "yetToInitiate",
      initialImpression: "9",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      firstName: "Srinivas",
      lastName: "Chintalapati",
      phoneNumber: "9012345688",
      email: "srinivas@gmail.com",
      source: "employeeReference",
      resume: "resume.pdf",
      status: "movedToInterview",
      initialImpression: "10",
      comments:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  // triggered when status is changed in the table
  async function handleStatusChange(status, row) {
    // console.log("e: ", e.target.value);
    // console.log("row", rowId);
    try {
      const response = await axios.put(`${jobApplicantBaseUrl}${row._id}`, {
        status,
      });
      console.log("Row updated successfully", response);
      fetchApplicantsData();
      setOpenEditStatusModal(false);
      if (response.status === 200) {
        // toast("Applicant details updated successfully");
        if (status === "movedToInterview") {
          handleMovedToInterview(row);
        }

        toast.success("Status updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Row update failed", error);
    }
  }

  // triggered when row is deleted in the table
  async function handleApplicantDelete(rowId) {
    // console.log("e: ", e.target.value);
    // console.log("row", rowId);
    try {
      const response = await axios.delete(`${jobApplicantBaseUrl}${rowId}`);
      console.log("Row deleted successfully", response);
      fetchApplicantsData();
      setOpenDeleteModal(false);
      if (response.status === 200) {
        // toast("Applicant details updated successfully");
        toast.success("Applicant details deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Row delete failed", error);
    }
  }

  // triggered when applicant details are edited
  async function handleEditApplicantDetailsSubmit() {
    // update only if row has been edited
    if (rowEdited) {
      console.log("called handleEditApplicantDetailsSubmit");
      try {
        const response = await axios.put(
          `${jobApplicantBaseUrl}${tableRowToEdit._id}`,
          {
            status: tableRowToEdit.status,
            initialImpression: tableRowToEdit.initialImpression,
            comments: tableRowToEdit.comments,
          }
        );
        console.log("Row updated successfully", response);
        fetchApplicantsData();

        if (response.status === 200) {
          if (movedToInterview) {
            handleMovedToInterview(tableRowToEdit);
          }

          toast.success("Applicant details updated successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Row update failed", error);
      }
      setRowEdited(false);
    }
    setOpenEditModal(false);
    setTableRowToEdit("");
  }

  function handleDownloadResume(base64String, fileName) {
    // Convert Base64 string to Blob
    base64String = base64String.split(",")[1];
    // console.log("b64: ", base64String)
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // returns the id for each table row
  const getRowId = (row) => row._id;

  const handleMovedToInterview = async (applicant) => {
    console.log("called handleMovedToInterview");
    try {
      let applicantData = {
        jobPostingId: jobId,
        jobApplicantId: applicant._id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        phoneNumber: applicant.phoneNumber,
        email: applicant.email,
        role: jobDetails.position,
        resume: applicant.resume,
      };

      if (applicant.gender) {
        applicantData["gender"] = applicant.gender;
      }

      console.log("applicantData", applicantData);
      const response = await axios.post(
        recruitmentDetailsBaseUrl,
        applicantData
      );

      if (response.status === 201) {
        toast.success("Applicant moved to interview", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
    setMovedToInterview(false);
  };

  useEffect(() => {
    fetchApplicantsData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid flex={8} item container sx={{ p: 1, flexDirection: "column" }}>
      <Header />
      {/* JOB DESCRIPTION */}
      <Stack width={"100%"} gap={3} sx={{ px: 4, mb: 4 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <IconButton
              aria-label="back"
              size="small"
              onClick={() => navigate("/job-openings")}
            >
              <ArrowBackIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Typography variant="h6" component="h2">
              JOB DESCRIPTION
            </Typography>
          </Stack>
          <Button
            onClick={() => scrollToSection("applicants")}
            sx={{
              backgroundColor: "rgb(25, 118, 210)",
              fontSize: "12px",
              color: "white",
              ":hover": { backgroundColor: "rgb(30, 143, 255)" },
            }}
          >
            view applicants
          </Button>
        </Stack>
        {applicantsData && (
          <ParticularJobDescription
            numApplicants={applicantsData?.length}
            jobDetails={jobDetails}
            jobdescLoading={jobdescLoading}
          />
        )}
        <Typography variant="h6" component="h2" mt={3}>
          APPLICANTS
        </Typography>
        {/* JOB APPLICANTS TABLE */}
        <Box id="applicants" sx={{ width: "100%" }}>
          {/* {applicantsData && applicantsData.length > 0 && (
            <iframe
              title="PDF Viewer"
              style={{ width: "100%", height: "500px" }}
              src={applicantsData[0].resume}
            />
          )} */}

          {applicantsData && applicantsData.length > 0 ? (
            <DataGrid
              rows={applicantsData}
              getRowId={getRowId}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  csvOptions: { fileName: `${jobId}_Applicants` },
                },
              }}
              disableRowSelectionOnClick
            />
          ) : (
            <Typography
              variant="subtitle"
              color="#5b6067"
              sx={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              No Applicants to display
            </Typography>
          )}
        </Box>
        {/* SCROLL TO TOP */}
        <Stack width="100%" justifyContent={"center"} alignItems={"center"}>
          <IconButton
            aria-label="scroll-to-top"
            size="medium"
            onClick={() => scrollToSection("top")}
            sx={{ bgcolor: "#eeeeee", width: "3.5%" }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Stack>
      </Stack>
      {/* MODALS FOR THE APPLICANTS TABLE */}
      <EditApplicantDetailsModal
        tableRowToEdit={tableRowToEdit}
        setTableRowToEdit={setTableRowToEdit}
        openEditModal={openEditModal}
        handleClose={handleEditModalClose}
        handleSubmit={handleEditApplicantDetailsSubmit}
        setRowEdited={setRowEdited}
        setMovedToInterview={setMovedToInterview}
      />
      <ViewApplicantDetailsModal
        tableRowToView={tableRowToView}
        openViewModal={openViewModal}
        handleClose={handleViewModalClose}
        handleDownloadResume={handleDownloadResume}
      />
      {/* confirmation modal when status is changed in the table */}
      <Modal
        open={openEditStatusModal}
        onClose={handleEditStatusModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            px: 3,
            py: 4,
            maxHeight: 500,
            textAlign: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="paragraph"
            align={"center"}
            // fontWeight={"bold"}
          >
            {`Are you sure you want to change the application status from \"${
              statusMap[tableRowToEdit.status]
            }\" to \"${statusMap[tableRowToEdit.newStatus]}\"?`}
          </Typography>
          <Stack direction={"row"} mt={3} gap={3} justifyContent={"center"}>
            <Button variant="outlined" onClick={handleEditStatusModalClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={(e) =>
                handleStatusChange(tableRowToEdit.newStatus, tableRowToEdit)
              }
            >
              Change
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* confirmation modal when row is deleted in the table */}
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            px: 4,
            py: 5,
            maxHeight: 500,
            textAlign: "center",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="paragraph"
            align={"center"}
            fontWeight={"bold"}
          >
            {`Are you sure you want to delete these applicant details?`}
          </Typography>
          <Stack direction={"row"} mt={3} gap={3} justifyContent={"center"}>
            <Button variant="outlined" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                bgcolor: "#FF4B4B",
                borderColor: "#FF4B4B",
                color: "white",
                ":hover": {
                  bgcolor: "white",
                  color: "#FF4B4B",
                  borderColor: "#FF4B4B",
                },
              }}
              onClick={(e) => handleApplicantDelete(tableRowToEdit._id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      <ToastContainer type="success" autoClose={3000} hideProgressBar={true} />
    </Grid>
  );
};

export default JobDescription;
