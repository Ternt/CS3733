import {Box, Paper, Typography} from "@mui/material";
import {FormControl} from "@mui/material";
import {TextField} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";
import axios, {AxiosResponse} from "axios";
import MenuItem from "@mui/material/MenuItem";
// import AddIcon from '@mui/icons-material/Add';
// import Button from "@mui/material/Button";

export type RequestCard = {
    type:string;
}

export type Node = {
    nodeID: string;
    xcoord: number;
    ycoord: number;
    building: string;
    floor: string;
    longName: string;
    shortName: string;
    nodeType: string;
}

export type serviceRequest = {
    requestID: number,
    priority: string,
    status: string,
    type: string,
    location: Node,
    assignedEmployee?: string,
    giftDetail? : string,
    maintenanceDetail?: string,
    medicineDetail?: string,
    notes?: string,
}

export default function ServiceRequestOverview(){

    const [selectedCard, setSelectedCard] = useState<RequestCard | null>(null);
    const [reqs, setReqs] = useState<serviceRequest[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "DELIVERY"];

    useEffect(()=>{
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            setReqs(res.data);
            console.log(res.data);
        });
    }, []);

    // On change, the function finds the specific request object in an array of service requests, and then update it with a new status field.
    function onChangeStatus(event: ChangeEvent<HTMLInputElement>){
        console.log(event.target.value);
    }


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
                    height: "90vh",
                }}
            >
                {
                    reqTypes.map((category)=>{
                        return (
                            <Box
                                key={category}
                                sx={{
                                    width: ((100.0/reqTypes.length - 2)+"%"),
                                    minHeight:'85vh',
                                    height: 'fill-available',
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'flex-start',
                                    alignItems:'flex-start',
                                }}
                            >
                                <Typography
                                    variant={"h4"}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItem: "center",
                                    }}>{category}</Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: "1%",
                                        padding: '1.5%',
                                        minHeight:'80vh',
                                        height: 'fill-available',
                                        width: '100%',
                                        backgroundColor: '#E4E4E4',
                                        gap: "1rem",
                                        boxShadow: 3,
                                    }}>
                                {
                                    reqs.map((service) => {
                                        return(
                                            ((service.type === category)?
                                                <Paper
                                                    key={service.requestID}
                                                    sx={{
                                                        width:'100%',
                                                        bgcolor:'#FFFFFF',
                                                        // flexGrow: 1,
                                                    }}
                                                    elevation={1}
                                                >
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', px: "5%", pt: "5%", pb: "2.5%" }}>
                                                        <Typography variant="h6">{service.location.longName}</Typography>
                                                        <Typography>ID {service.location.nodeID}</Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            backgroundColor: "#F1F1F1",
                                                            borderRadius: 1,
                                                        }}>
                                                        <Box sx={{px: "5%", pb: "5%", pt: "2.5%"}}>
                                                            <Box>
                                                                <FormControl
                                                                    sx={{gap: 1, width: "100%",}}>
                                                                    <TextField
                                                                        select
                                                                        value={service.status}
                                                                        margin="normal"
                                                                        inputProps={{MenuProps: {disableScrollLock: true}}}
                                                                        sx={{marginY: 0, width: "100%"}}
                                                                        onChange={onChangeStatus}
                                                                    >
                                                                        <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                                                        <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                                                        <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                                                        <MenuItem value={"CLOSED"}>Closed</MenuItem>
                                                                    </TextField>
                                                                </FormControl>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Paper> : <></>)
                                        );
                                    })
                                }
                                {/*<Box sx={{display: 'flex'}}>*/}
                                {/*    <Button*/}
                                {/*        variant="contained"*/}
                                {/*        sx={{*/}
                                {/*            width: "20vw",*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        <AddIcon/>*/}
                                {/*    </Button>*/}
                                {/*</Box>*/}
                                </Box>
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
