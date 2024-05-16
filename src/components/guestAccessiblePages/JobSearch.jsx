import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function JobSearch({
  uniqueSkillsAndDepartments,
  uniqueLocations,
  handleSubmit,
  inputKeywordValue,
  inputLocationValue,
  keyword,
  setInputKeywordValue,
  setInputLocationValue,
}) {
  // const handleSubmit = (e, keyword) => {
  //   e.preventDefault();

  //   const params = {};

  //   if (inputKeywordValue) {
  //     params.keyword = inputKeywordValue;
  //   }

  //   if (inputLocationValue) {
  //     params.location = inputLocationValue;
  //   }

  //   setSearchParams(params);
  // };

  return (
    <Box display={"flex"} gap={4} sx={{ pl: 7, mt: 5 }}>
      <Autocomplete
        sx={{ width: "39%" }}
        forcePopupIcon={false}
        inputValue={inputKeywordValue}
        onInputChange={(event, newInputValue) => {
          setInputKeywordValue(newInputValue);
        }}
        options={uniqueSkillsAndDepartments?.map((skill) => ({
          label: skill,
          value: skill,
        }))}
        // onChange={(e) => setKeyword(e.target.value)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            value={keyword}
            label="Search For Keyword"
            InputLabelProps={{ sx: { fontSize: 14 } }}
            sx={{ width: "100%", backgroundColor: "white" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <AppRegistrationOutlinedIcon />
                </InputAdornment>
              ),
              style: {
                ...params.InputProps.style,
                borderRadius: 0,
              },
            }}
          />
        )}
      />
      <Autocomplete
        sx={{ width: "39%" }}
        forcePopupIcon={false}
        inputValue={inputLocationValue}
        onInputChange={(event, newInputValue) => {
          setInputLocationValue(newInputValue);
        }}
        options={uniqueLocations?.map((location) => ({
          label: location,
          value: location,
        }))}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Search For Location"
            InputLabelProps={{ sx: { fontSize: 14 } }}
            sx={{ width: "100%", backgroundColor: "white" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <LocationOnOutlinedIcon />
                </InputAdornment>
              ),
              style: {
                ...params.InputProps.style,
                borderRadius: 0,
              },
            }}
          />
        )}
      />

      <Button
        variant="contained"
        sx={{ fontSize: 13, bgcolor: "rgb(49, 38, 228)" }}
        type="submit"
        onClick={(e) => handleSubmit(e, keyword)}
      >
        Find Jobs
      </Button>
    </Box>
  );
}

export default JobSearch;
