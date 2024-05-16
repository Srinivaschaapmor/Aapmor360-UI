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
} from "@mui/material";

const ProjectDetailsModal = ({
  tableRowToEdit,
  openEditModal,
  handleSubmit,
  setTableRowToEdit,
  handleEditModalClose,
}) => {
  return (
    <Modal
      open={openEditModal}
      onClose={handleEditModalClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          fontWeight={"bold"}
        >
          Project details
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, tableRowToEdit.id)}>
          <Stack gap={3} sx={{ p: 1, my: 3 }} alignItems={"center"}>
            <TextField
              name="projectName"
              label="Project Name"
              value={tableRowToEdit.project}
              onChange={(e) =>
                setTableRowToEdit({
                  ...tableRowToEdit,
                  project: e.target.value,
                })
              }
              fullWidth
              id="projectName"
              type="text"
              required
              size="small"
            />
            <TextField
              name="projectSponsor"
              label="Project Sponsorer"
              value={tableRowToEdit.sponsor}
              onChange={(e) =>
                setTableRowToEdit({
                  ...tableRowToEdit,
                  sponsor: e.target.value,
                })
              }
              fullWidth
              id="projectSponsor"
              type="text"
              required
              size="small"
            />
            <Button type="submit" variant="outlined">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ProjectDetailsModal;
