import {Box, FormControl, Paper, TextField, Typography} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";
import axios, {AxiosResponse} from "axios";
import MenuItem from "@mui/material/MenuItem";

export type RequestCard = {
    type:string;
}


type serviceRequest = {
    requestID: number,
    priority: string,
    status: string,
    type: string,
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
                }}
            >
                {
                    reqTypes.map((category)=>{
                        return (
                            <Box
                                key={category}
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
                                <Typography variant={"h4"}>{category}</Typography>
                                {
                                    reqs.map((service) => {
                                        return(
                                            ((service.type === category)?
                                                <Paper
                                                    key={service.requestID}
                                                    sx={{
                                                        width:'100%',
                                                        height:'300px',
                                                        bgcolor:'white'
                                                    }}
                                                    elevation={5}
                                                >
                                                    <Box>
                                                        <FormControl
                                                            sx={{
                                                                gap: 1,
                                                                width: "100%",
                                                                padding: "5%",
                                                        }}>
                                                            <TextField
                                                                select
                                                                label={"Status"}
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
                                                </Paper> : <></>)
                                        );
                                    })
                                }
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
