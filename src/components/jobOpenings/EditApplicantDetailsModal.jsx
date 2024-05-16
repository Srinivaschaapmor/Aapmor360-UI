import React, { useState, useEffect } from "react";
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
  Slider,
} from "@mui/material";

const EditApplicantDetailsModal = ({
  tableRowToEdit,
  setTableRowToEdit,
  openEditModal,
  handleClose,
  handleSubmit,
  setRowEdited,
  setMovedToInterview,
}) => {
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  return (
    <Modal
      open={openEditModal}
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
          px: 4,
          py: 6,
          overflowY: "scroll",
          maxHeight: 500,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={"bold"}
        >
          Edit applicant details
        </Typography>
        <form>
          <Stack gap={3} sx={{ p: 1, my: 3 }}>
            <TextField
              name="firstName"
              label="First Name"
              value={tableRowToEdit.firstName}
              fullWidth
              id="firstName"
              type="text"
              required
              size="small"
              disabled
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={tableRowToEdit.lastName}
              fullWidth
              id="lastName"
              type="text"
              required
              size="small"
              disabled
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={tableRowToEdit.phoneNumber}
              fullWidth
              id="phoneNumber"
              type="text"
              required
              size="small"
              disabled
            />
            <TextField
              name="email"
              label="Email"
              value={tableRowToEdit.email}
              fullWidth
              id="email"
              type="text"
              required
              size="small"
              disabled
            />
            <FormControl fullWidth size="small">
              <InputLabel id="source-label">Source</InputLabel>
              <Select
                labelId="source-label"
                label="Source"
                inputProps={{ "aria-label": "Select" }}
                value={tableRowToEdit.source}
                disabled
              >
                <MenuItem value="linkedIn">LinkedIn</MenuItem>
                <MenuItem value="naukri">Naukri</MenuItem>
                <MenuItem value="employeeReference">
                  Employee reference
                </MenuItem>
                <MenuItem value="selfApply">Self Apply</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="source-label">Status</InputLabel>
              <Select
                labelId="source-label"
                label="Status"
                inputProps={{ "aria-label": "Select" }}
                value={tableRowToEdit.status}
                onChange={(e) => {
                  setTableRowToEdit({
                    ...tableRowToEdit,
                    status: e.target.value,
                  });
                  setRowEdited(true);
                  if (e.target.value === "movedToInterview") {
                    setMovedToInterview(true);
                  }
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
            {/* Initial impression */}
            <Typography sx={{ fontSize: "13.5px", color: "#636880" }}>
              Initial impression:
            </Typography>
            <Box sx={{ width: "70%" }}>
              <Slider
                // defaultValue={0}
                value={tableRowToEdit.initialImpression}
                onChange={(e) => {
                  setTableRowToEdit({
                    ...tableRowToEdit,
                    initialImpression: e.target.value,
                  });
                  setRowEdited(true);
                }}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                min={0}
                max={10}
                size="medium"
                // valueLabelDisplay="on"
              />
            </Box>

            {/* <Grid container spacing={1} sx={{ alignItems: "center", mt: 0 }}>
              <Grid item xs={2.5}>
                <Typography sx={{ fontSize: "13.5px", color: "#636880" }}>
                  Initial impression:
                </Typography>
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  name="initialImpression"
                  // label="Initial Impression"
                  value={tableRowToEdit.initialImpression}
                  id="initialImpression"
                  type="text"
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography>/ 10</Typography>
              </Grid>
            </Grid> */}

            <TextField
              name="comments"
              label="Comments"
              value={tableRowToEdit.comments ? tableRowToEdit.comments : ""}
              onChange={(e) => {
                setTableRowToEdit({
                  ...tableRowToEdit,
                  comments: e.target.value,
                });
                setRowEdited(true);
              }}
              id="comments"
              type="text"
              size="small"
              multiline
              rows={5}
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditApplicantDetailsModal;
