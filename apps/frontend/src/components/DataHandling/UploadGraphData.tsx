import React, {useState} from "react";
import axios from "axios";
import {Box, Button, TextField, Typography} from "@mui/material";

export default function UploadGraphData(){
  const [nodeFile, setNodeFile] = useState<File | null>(null);
  const [edgeFile, setEdgeFile] = useState<File | null>(null);

  const handleNodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeFile(event.target.files ? event.target.files[0] : null);
  };

  const handleEdgeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdgeFile(event.target.files ? event.target.files[0] : null);
  };

  async function handleSubmit(event: React.FormEvent){
    event.preventDefault();
    if (!nodeFile || !edgeFile) return;
    const formData = new FormData();
    formData.append('nodes', nodeFile);
    formData.append('edges', edgeFile);
    await axios.post("/api/map/upload?header=true", formData, {
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
      <Typography variant={"subtitle1"}>Nodes</Typography>
      <TextField
        type="file"
        InputProps={{
          inputProps: {
            accept: ".csv",
          },
        }}
        onChange={handleNodeFileChange}
      />
      <Typography variant={"subtitle1"}>Edges</Typography>
      <TextField
        type="file"
        InputProps={{
          inputProps: {
            accept: ".csv",
          },
        }}
        onChange={handleEdgeFileChange}
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
