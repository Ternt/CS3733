import {Box, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";

export type RequestCard = {
  type:string;
}

export default function ServiceRequestOverview(){

  const [selectedCard, setSelectedCard] = useState<RequestCard | null>(null);
  const reqs = ["Service 1", "Service 2", "Serice 3", "AAAAAA", "AAAAAA"];

  return(
    <>
      <Box
        sx={{
          width:'100%',
          overflowY:'scroll',
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-evenly',
          alignItems:'flex-start',
          pt:3,
        }}
      >
        {
          reqs.map((service)=>{
          return (
            <Box
              sx={{
                width: ((100.0/reqs.length - 2)+"%"),
                minHeight:'85vh',
                height: 'fill-available',
                display:'flex',
                flexDirection:'column',
                justifyContent:'flex-start',
                alignItems:'flex-start',
                gap:'1rem',
              }}
            >
              <Typography variant={"h4"}>{service}</Typography>
              <Paper
                sx={{
                  width:'100%',
                  height:'300px',
                  bgcolor:'white'
                }}
                elevation={5}
              >

              </Paper>

            </Box>
          );})
        }


      </Box>
      <RequestInspectionDialogue
        selectedRequest={selectedCard}
        onCloseDialogue={()=>{
          setSelectedCard(null);
        }}
      />
    </>
  );
}