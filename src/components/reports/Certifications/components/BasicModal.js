import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  px: 4,
  py: 6,
  overflowY: "scroll",
  maxHeight: 500,
};

export default function BasicModal({ open, setOpen, setEmployeesData }) {
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    certificationId: '',
    certificationName: '',
    issuedBy: '',
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'employeeId') {
      try {
        const response = await axios.get(`http://localhost:5000/api/certifications/getEmpNameByEmpId/${value}`);
        // const data = await response.json();
        console.log(response);
        const Name = response.data.employee.fullName
        console.log(Name);
        if (Name) {
          // Update the employeeId after the response is received
          setFormData((prevData) => ({
            ...prevData,
            employeeName: Name,
            employeeId: value, // Update employeeId here
          }));
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEntry = {
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      certificationId: formData.certificationId,
      certificationName: formData.certificationName,
      issuedBy: formData.issuedBy,
    };
    const res = await axios.post("http://localhost:5000/api/certifications/createcertification",newEntry)
    console.log(res);
    setEmployeesData((prevSampleData) => [...prevSampleData, newEntry]);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Certification
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Employee Id"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              disabled
            />
            <TextField
              fullWidth
              margin="normal"
              label="Certification Name"
              name="certificationName"
              value={formData.certificationName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Certification Id"
              name="certificationId"
              value={formData.certificationId}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Issued By"
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
