import React from 'react'
import {
    Box,
    Typography,
    Grid,
    Avatar,
    IconButton,
    Tab,
    Tabs,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
  } from "@mui/material";
  import { tableCellClasses } from "@mui/material/TableCell";
  import { styled } from "@mui/material/styles";


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
  
const CustomTable = () => {
  return (
    <TableContainer component={Paper}>
    <Table stickyHeader size="small">
    <TableHead>
<TableRow
sx={{
 "& .MuiTableCell-head": {
   backgroundColor: "#26262630",
   backdropFilter: "blur(100px)",
   fontWeight: "600",
 },
}}
>
<StyledTableCell>Certification Name</StyledTableCell>
<StyledTableCell>Certification ID</StyledTableCell>
<StyledTableCell>Issued By</StyledTableCell>
{/* <StyledTableCell>Email</StyledTableCell>
<StyledTableCell>Role</StyledTableCell>
<StyledTableCell>Status</StyledTableCell> */}
</TableRow>
</TableHead>
<TableBody>
 
<TableRow>
<TableCell>
<Typography variant="p"> {each.certificationName}</Typography>
</TableCell>
<TableCell>
<Typography variant="p"> {each.certificationId}</Typography>
</TableCell>
<TableCell>
<Typography variant="p"> {each.issuedBy}</Typography>
</TableCell>
</TableRow> 

</TableBody>
    </Table>
 </TableContainer>
  )
}

export default CustomTable