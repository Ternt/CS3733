import {ChangeEvent, useState} from "react";
import { ServiceRequest } from "./ServiceRequestOverview";
import {Paper, Typography} from "@mui/material";
import {FormControl} from "@mui/material";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

type KanbanBoardProp = {
    serviceRequestData: ServiceRequest;
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);

    const onChangeAssignment = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceData({...serviceData, status: event.target.value});

        const newStatus = {
            requestID: serviceData.requestID,
            status: event.target.value
        };

        fetch("/api/service-requests/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStatus),
        })
            .then((response) => {
                console.log(response);
            })

            .then((data) => console.log(data))
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    return(
        <Paper
            key={serviceData.requestID}
            sx={{
                width:'100%',
                backgroundColor:'#FFFFFF',
                borderRadius: 2,
            }}
            elevation={1}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: "5%",
                    pt: "5%",
                    pb: "2.5%"
                }}>
                <Typography variant="h6">{serviceData.location.longName}</Typography>
                <Typography>{serviceData.location.nodeID}</Typography>
                <Typography>{serviceData.priority}</Typography>
                <Typography variant="h6">{serviceData.location.longName}</Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#F1F1F1",
                    borderRadius: 2,
                }}>
                <Box sx={{ px: "5%", pb: "5%", pt: "2.5%" }}>
                    <Box>
                        <FormControl
                            sx={{width: "100%",}}>
                            <TextField
                                select
                                value={serviceData.status}
                                margin="normal"
                                inputProps={{MenuProps: {disableScrollLock: true}}}
                                sx={{marginY: 0, width: "100%"}}
                                onChange={onChangeAssignment}
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
        </Paper>
    );
}
