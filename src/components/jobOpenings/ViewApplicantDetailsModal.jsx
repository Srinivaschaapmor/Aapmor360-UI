import React from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ViewApplicantDetailsModal = ({
  tableRowToView,
  openViewModal,
  handleClose,
  handleDownloadResume,
}) => {
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

  return (
    <Modal
      open={openViewModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflowY: "scroll",
          maxHeight: 500,
        }}
      >
        <Stack gap={3} sx={{ p: 1, my: 3 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            fontWeight={"bold"}
          >
            {tableRowToView.firstName} {tableRowToView.lastName}
          </Typography>
          {/* <Typography component={"h6"} fontWeight={"bold"}>
            firstName: 
          </Typography> */}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  key={"firstName"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    First Name
                  </TableCell>
                  <TableCell align="left">{tableRowToView.firstName}</TableCell>
                </TableRow>
                <TableRow
                  key={"lastName"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell align="left">{tableRowToView.lastName}</TableCell>
                </TableRow>
                <TableRow
                  key={"phoneNumber"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell align="left">
                    {tableRowToView.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={"email"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Email
                  </TableCell>
                  <TableCell align="left">{tableRowToView.email}</TableCell>
                </TableRow>
                <TableRow
                  key={"source"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Source
                  </TableCell>
                  <TableCell align="left">
                    {sourceMap[tableRowToView.source]}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={"resume"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Resume
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "12px" }}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={() => {
                        if (tableRowToView.resume) {
                          handleDownloadResume(
                            tableRowToView.resume,
                            `${tableRowToView.firstName}${tableRowToView.lastName}Resume`
                          );
                        }
                      }}
                    >
                      <InsertDriveFileIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                    {/* {tableRowToView.resume} */}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={"status"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Status
                  </TableCell>
                  <TableCell align="left">
                    {statusMap[tableRowToView.status]}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={"initialImpression"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Initial Impression
                  </TableCell>
                  <TableCell align="left">
                    {tableRowToView.initialImpression
                      ? `${tableRowToView.initialImpression}/10`
                      : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={"comments"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width={"30%"}
                    sx={{ fontWeight: "bold" }}
                  >
                    Comments
                  </TableCell>
                  <TableCell align="left">
                    {tableRowToView.comments ? tableRowToView.comments : "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ViewApplicantDetailsModal;
