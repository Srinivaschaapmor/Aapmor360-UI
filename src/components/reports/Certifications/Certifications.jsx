import React from "react";
import { 
  Button, 
  Grid, 
  Typography, 
  Paper,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableCell,
 } from "@mui/material";
 import Header from "../../home/Header";
 import { styled } from "@mui/material/styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { getAllEmployeesData } from "../../../apiCalls/apiCalls";
import { useEffect, useState } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import BasicModal from "./components/BasicModal";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "",
    color: theme.palette.common.black,
    height: "35px",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
  },
}));

function Certifications() {

  const[employeesData, setEmployeesData] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [loader, setLoader] = useState(true)
  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "employeeId",
      headerName: "Employee Id",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "certificationName",
      headerName: "Certification Name",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "certificationId",
      headerName: "Certification ID",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 190,
    },
    {
      field: "issuedBy",
      headerName: "Issued By",
      sortable: false,
      editable: false,
      // sortable: true,
      width: 235,
    },

  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/certifications/getAllCertfications");
        // console.log(response.data); 
        setEmployeesData(response.data)
        // setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []); 

  
  console.log(employeesData)

  return (
    <Grid
      flex={8}
      // item
      
      container
      sx={{
        p:1,
        // px: 5,
        // py: 5,
        // border:1,
        flexDirection:"column"
      }}
    >
      <Grid item>
        <Header />
      </Grid>
     
      
      <BasicModal open={open} setOpen={setOpen} setEmployeesData={setEmployeesData}/>
      <Grid 
        item 
        container 
        sx={{
         pl:3,
         pr:4,
          justifyContent:'space-between', 
          // border:1,
          // height:'5vh'
          }}>
      <Typography variant="h5">Certifications</Typography>
      <Button variant="contained" onClick={handleOpen}>
            {" "}
            Add <AddOutlinedIcon fontSize="small" />
          </Button>
      </Grid>
    
      {/* <Grid> */}



{/* <Paper elevation={3} sx={{ marginTop: "3vh",  }}> */}

{/* <Paper elevation={3} sx={{ padding:'20px' }}> */}
{employeesData ? 
( 
  <Grid sx={{marginTop:'3vh', width:"100%", pl:3,pr:4}}>
     <DataGrid
  rows={employeesData}
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
  slots={{ toolbar:  GridToolbar }}
  slotProps={{
    toolbar: {
      showQuickFilter: true,
    },
  }}
  disableRowSelectionOnClick
/>
    </Grid>
   
)
        : (
          <Grid
            container
            item
            sx={{
              width:'100%',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "550",
              padding:'10px'
            }}
          >
            <Typography variant="body" sx={{ width: "200px" }}>
              No Certifications yet
            </Typography>
          </Grid>
        )}
{/* </Paper> */}


    </Grid>
  );
}

export default Certifications;
