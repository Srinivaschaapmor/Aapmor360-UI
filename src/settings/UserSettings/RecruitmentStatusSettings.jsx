import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
function RecruitmentStatusSettings({
  updatedMasterData,
  handleClose,
  handleAddItem,
  formErrors,
  handleSave,
  handleSubmit,
  style,
  open,
}) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 600 }}>
        Add Items in the Recruitment Fedback Form
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "100%", mt: 3 }}
      >
        {/* Select Category */}
        <FormControl sx={{ width: "35%" }}>
          <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="category"
            label="Select Category"
            value={updatedMasterData.category}
            onChange={handleAddItem}
          >
            <MenuItem value={"interviewType"}>Interview Type</MenuItem>
            {/* <MenuItem value={"employmentType"}>Employment Type</MenuItem> */}
            {/* Add more menu items as needed */}
          </Select>
          <FormHelperText sx={{ color: "red", fontSize: 12 }}>
            {formErrors.category}
          </FormHelperText>
        </FormControl>
        {/* Enter Name */}
        <TextField
          placeholder="Enter the value"
          name="name"
          helperText={formErrors.name}
          value={updatedMasterData.name}
          onChange={handleAddItem}
          FormHelperTextProps={{ style: { color: "red" } }}
          sx={{ width: "45%" }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ height: "55px", width: "10%" }}
        >
          Save
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to add itmes
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"} my={3}>
            <Button variant="outlined" onClick={handleClose}>
              {" "}
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default RecruitmentStatusSettings;
