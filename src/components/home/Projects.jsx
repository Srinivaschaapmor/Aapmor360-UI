import { Divider, Grid, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import "./Projects.css";
import ProjectDetailsModal from "../projects/ProjectsModal";

// Common Styling for the Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//  ===============================================
//                     Projects Table
//  ===============================================

function ProjectsTables({}) {
  // to add new project - maintained a state
  const [projectsRows, setProjectRows] = useState([
    {
      projectName: "IGA",
      projectSponsor: "J&J",
    },
    {
      projectName: "Aapmor-360",
      projectSponsor: "Aapmor",
    },
    {
      projectName: "Davose",
      projectSponsor: "Davose",
    },
    {
      projectName: "Student Dashboard",
      projectSponsor: "Interversity",
    },
    {
      projectName: "Nexus-360",
      projectSponsor: "Aapmor",
    },
  ]);
  // data grid states
  const [columns, setColumns] = useState([
    { field: "id", headerName: "S.No.", width: 98 },
    { field: "project", headerName: "Project", width: 250 },
    { field: "sponsor", headerName: "Sponsorer", width: 250 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Stack direction={"row"} gap={0.2}>
          {/* <IconButton
            aria-label="back"
            size="small"
            // onClick={(e) => handleOpenViewModal(params.row)}
          >
            <VisibilityIcon sx={{ fontSize: "20px" }} />
          </IconButton> */}
          <IconButton
            aria-label="edit"
            size="small"
            // onClick={(e) => handleOpenEditModal(params.row)}
            onClick={(e) => handleOpenEditModal(params.row)}
          >
            <EditIcon sx={{ fontSize: "19px" }} />
          </IconButton>
          {/* <IconButton aria-label="delete" size="small">
            <DeleteIcon sx={{ fontSize: "19px" }} />
          </IconButton> */}
        </Stack>
      ),
    },
  ]);

  const [rows, setRows] = useState([
    { id: 1, project: "IGA", sponsor: "J&J" },
    { id: 2, project: "Aapmor-360", sponsor: "Aapmor" },
    { id: 3, project: "Davose", sponsor: "Davose" },
    {
      id: 4,
      project: "Student Dashboard",
      sponsor: "Interversity",
    },
    { id: 5, project: "Nexus-360", sponsor: "Aapmor" },
  ]);
  // Basic modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Project  - Edit modal states
  const [openEditModal, setOpenEditModal] = useState(false);
  const [tableRowToEdit, setTableRowToEdit] = useState("");
  // const [projectData, setProjectData] = useState([{}]);

  const handleOpenEditModal = (rowToEdit) => {
    console.log(rowToEdit);
    setTableRowToEdit(rowToEdit);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => setOpenEditModal(false);

  // const handleInputChange = (e) => {
  //   setProjectData();
  // };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const newRowsData = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          project: e.target.projectName.value,
          sponsor: e.target.projectSponsor.value,
        };
      } else {
        return row;
      }
    });
    setRows(newRowsData);
    handleEditModalClose();
  };

  return (
    <Grid
      flex={8}
      item
      container
      xs={10}
      sx={{ p: 1, flexDirection: "column", my: 6, px: 5 }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        sx={{ mb: 4 }}
      >
        <Typography variant="h4">Projects</Typography>
        <BasicModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          modalText={"Add Project"}
          projectsRows={projectsRows}
          setProjectRows={setProjectRows}
          rows={rows}
          setRows={setRows}
        />
        <ProjectDetailsModal
          tableRowToEdit={tableRowToEdit}
          openEditModal={openEditModal}
          handleClose={handleClose}
          handleEditModalClose={handleEditModalClose}
          handleSubmit={handleSubmit}
          setTableRowToEdit={setTableRowToEdit}
        />
      </Stack>
      {/* <TableContainer component={Paper} sx={{ width: 650, mt: 2, mb: 6 }}>
        <Table sx={{ minWidth: 650, maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Projects</StyledTableCell>
              <StyledTableCell>Sponsorer</StyledTableCell>
              //<TableCell align="right">Protein&nbsp;(g)</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {projectsRows.map((row) => (
              <StyledTableRow
                key={row}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.projectName}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.projectSponsor}
                </StyledTableCell>

                //<TableCell align="right">{row.protein}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <DataTable rows={rows} columns={columns} />
    </Grid>
  );
}

//  -----------------------------------------------
//                       Modal
//  -----------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({
  handleOpen,
  handleClose,
  open,
  modalText,
  projectsRows,
  setProjectRows,
  rows,
  setRows,
}) {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectSponsor, setNewProjectSponsor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjectRows([
      ...projectsRows,
      {
        projectName: newProjectName,
        projectSponsor: newProjectSponsor,
      },
    ]);
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        project: newProjectName,
        sponsor: newProjectSponsor,
      },
    ]);
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleOpen}>{modalText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            New Project Form
          </Typography>
          <form
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              name="projectName"
              label="Project Name"
              onChange={(e) => setNewProjectName(e.target.value)}
              fullWidth
              id="projectName"
              type="text"
              required
              size="small"
            />
            {/* <input
              type="text"
              placeholder="projectName"
              onChange={(e) => setNewProjectName(e.target.value)}
            /> */}
            <TextField
              name="projectSponsor"
              label="Project Sponsorer"
              onChange={(e) => setNewProjectSponsor(e.target.value)}
              fullWidth
              id="projectSponsor"
              type="text"
              required
              size="small"
            />
            <Button type="submit" variant="outlined">
              Add
            </Button>
            {/* <input
              type="text"
              placeholder="sponsor"
              onChange={(e) => setNewProjectSponsor(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "5px 20px",
                borderRadius: "15px",
                fontSize: "12px",
              }}
              type="submit"
            >
              Add Project
            </button> */}
          </form>
          {/*
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}

//  -----------------------------------------------
//                    Data grid table
//  -----------------------------------------------

function DataTable({ rows, columns }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        style={{
          width: 700,
        }}
        // checkboxSelection
      />
    </div>
  );
}

export default ProjectsTables;
