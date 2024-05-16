import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SideBar from "../sidebar/sidebar";
import Quotes from "../home/Quotes";
import { useEffect, useMemo, useState } from "react";
import { getFeedbackDetails } from "../../apiCalls/apiCalls";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";

const ViewFeedBack = () => {
  const navigate = useNavigate();
  const [feedbackList, setFeedbacks] = useState([]);

  const columnDefs = [
    { headerName: "Employee", field: "username" },
    { headerName: "Feedback Type", field: "feedbackType" },
    { headerName: "Subject", field: "subject" },
    { headerName: "Feedback", field: "comment" },
    {
      headerName: "Date",
      field: "date",
      cellRenderer: (params) => (
        <Typography variant="p">
          {new Date(params.value).toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      ),
    },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const getFeedback = async () => {
    try {
      const response = await getFeedbackDetails();
      console.log(response);
      const responseData = response.data.response;
      setFeedbacks(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(feedbackList);

  useEffect(() => {
    getFeedback();
  }, []);

  const renderFeedbackTable = () => {
    return (
      <Grid
        className="ag-theme-quartz"
        style={{
          height: "500px",
          width: "100%",
          marginTop: "14px",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={feedbackList}
          getRowId={(params) => params.data._id}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </Grid>
    );
  };

  return (
    // <Grid container flexDirection={"row"}>
    //   <Grid item flex={1}>
    //     <SideBar />
    //   </Grid>
    <Grid sx={{ p: 2 }} item flex={8}>
      <Quotes />
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <IconButton
          sx={{
            height: "12px",
            width: "12px",
            marginBottom: "20px",
            marginLeft: "6px",
          }}
          size="small"
          onClick={() => navigate("/feedback")}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          Employees Feedback
        </Typography>
      </Stack>
      <Grid>{renderFeedbackTable()}</Grid>
    </Grid>
    // </Grid>
  );
};

export default ViewFeedBack;
