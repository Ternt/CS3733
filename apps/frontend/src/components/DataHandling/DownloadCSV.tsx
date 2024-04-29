import axios from "axios";
import {Box, Button} from "@mui/material";
import React from "react";


type DownloadCSVProps = {
  url:string;
  filename:string;
  title:string;
};

export default function DownloadCSV(props: DownloadCSVProps){
  async function handleDownload(downloadUrl: string, filename: string){
    const response = await axios.get(downloadUrl, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => handleDownload(props.url, props.filename)}
        sx={{boxShadow: 0}}
      >
        Download {props.title} CSV
      </Button>
    </Box>
  );
}
