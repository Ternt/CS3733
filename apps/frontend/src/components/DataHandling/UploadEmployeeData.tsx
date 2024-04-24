import React, {useState} from "react";
import axios from "axios";
import {Box, Button, TextField, Typography} from "@mui/material";

export default function UploadGraphData(){
  const [employeeFile, setEmployeeFile] = useState<File | null>(null);

  const handleNodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeFile(event.target.files ? event.target.files[0] : null);
  };


  async function handleSubmit(event: React.FormEvent){
    event.preventDefault();
    if (!employeeFile) return;
    const formData = new FormData();
    formData.append('employees', employeeFile);
    await axios.post("/api/employees/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  return (
    <Box
      sx={{
        p:5,
        display:'flex',
        flexDirection:'column',
        gap:1,
        width:'50%',
      }}
    >
      <Typography variant={"h6"}>Upload new data</Typography>
      <Typography variant={"subtitle1"}>Employees</Typography>
      <TextField
        type="file"
        InputProps={{
          inputProps: {
            accept: ".csv",
          },
        }}
        onChange={handleNodeFileChange}
      />
      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Upload
      </Button>
    </Box>
  );
}
