import {ChangeEvent, useState} from "react";
import { ServiceRequest } from "./ServiceRequestOverview";
import {Card, Collapse, Typography} from "@mui/material";
import {FormControl} from "@mui/material";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
// import PersonIcon from '@mui/icons-material/Person';


type KanbanBoardProp = {
    serviceRequestData: ServiceRequest;
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);
    const [expanded, setExpanded] = useState<boolean>(false);

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
        <Box
            key={serviceData.requestID}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
                backgroundColor:'#FFFFFF',
            }}
        >
            <Card
                sx={{
                    borderRadius: "2% 2% 0 0",
                }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: "5%",
                            pt: "5%",
                            pb: "5%"
                        }}>
                        <Typography variant="h6">{serviceData.location.longName}</Typography>
                    </CardContent>
                    <Collapse in={expanded} timeout={'auto'} unmountOnExit>
                        <CardContent>
                            <Typography>{serviceData.location.nodeID}</Typography>
                            <Typography>{serviceData.priority}</Typography>
                            <Typography>{
                                (serviceData.giftDetail === undefined || serviceData.giftDetail === null)?
                                    "" : (serviceData.giftDetail.senderName + " " + serviceData.giftDetail.recipientName)
                            }
                            </Typography>
                            <Typography>{
                                (serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                    "" : (serviceData.medicineDetail.patientName)
                            }
                            </Typography>
                            <Typography>{
                                (serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                    "" : (serviceData.medicineDetail.primaryPhysicianName)
                            }
                            </Typography>
                            <Typography>{
                                (serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                    "" : (serviceData.medicineDetail.medicine.toLowerCase().replace("_", " "))
                            }
                            </Typography>
                            <Typography>{
                                (serviceData.assignedEmployee === undefined || serviceData.assignedEmployee === null)?
                                    "" : (serviceData.assignedEmployee.firstName + " " + serviceData.assignedEmployee.lastName)
                            }
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                px: "5%", pb: "5%", pt: "5%",
                            }}>
                                <FormControl
                                    sx={{width: "100%", display: "flex", flexDirection: "row"}}>
                                    <TextField
                                        select
                                        value={serviceData.status}
                                        margin="normal"
                                        inputProps={{MenuProps: {disableScrollLock: true}}}
                                        sx={{marginY: 0, width: '100%'}}
                                        onChange={onChangeAssignment}
                                    >
                                        <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                        <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                        <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                        <MenuItem value={"CLOSED"}>Closed</MenuItem>
                                    </TextField>
                                    {/*<Box sx={{width: "20%"}}>*/}
                                    {/*    <Button variant="contained" endIcon={<PersonIcon />}>*/}
                                    {/*    </Button>*/}
                                    {/*</Box>*/}
                                </FormControl>
                            </Box>
                        </CardContent>
                    </Collapse>
                    <Box
                        sx={{
                            backgroundColor: "#F1F1F1",
                            borderRadius: 2,
                        }}>
                        <CardActions>
                            <Button
                                size={"small"}
                                onClick={() => {
                                    setExpanded(!expanded);
                                }}
                            >expand</Button>
                        </CardActions>
                    </Box>
            </Card>
        </Box>
    );
}
