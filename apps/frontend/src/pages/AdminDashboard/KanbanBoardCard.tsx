import {ChangeEvent, useState} from "react";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
import {Autocomplete, Card, Collapse, FormControl, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

type KanbanBoardProp = {
    serviceRequestData: ServiceRequest;
    employeeList: AssignedEmployee[];
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);
    const [expanded, setExpanded] = useState<boolean>(false);

    const options:string[] = [];
    prop.employeeList.forEach((employee)=> {
        options.push(employee.firstName + " " + employee.lastName);
    });

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

        if (event.target.value !== "UNASSIGNED"){
            const newEmployeeService = {
                employeeID: serviceData.assignedEmployee?.id,
                requestID: serviceData.requestID
            };

            fetch("/api/employees/assign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployeeService),
            })
                .then((response) => {
                    console.log(response);
                })

                .then((data) => console.log(data))
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };


    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width:'100%',
            }}
        >
            <Card
                sx={{
                    backgroundColor:'#FFFFFF',
                    borderRadius: 2,
                }}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: "5%",
                            pt: "5%",
                        }}>
                        <Typography variant="h6">{serviceData.location.longName}</Typography>
                    </CardContent>
                    <Collapse in={expanded} timeout={'auto'} unmountOnExit>
                        <CardContent>
                            {/*{*/}
                            {/*    Object.entries(serviceData).filter((data) => data[1] !== null).map((data, index) => {*/}
                            {/*        console.log(data);*/}

                            {/*        return(*/}
                            {/*            <Box key={"field" + index} sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*                <Typography sx={{width: '50%'}}>{data[0]}: </Typography>*/}
                            {/*                /!*<Typography>{data[1]}</Typography>*!/*/}
                            {/*            </Box>*/}
                            {/*        );*/}
                            {/*    })*/}
                            {/*}*/}

                            {/*<Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*    <Typography sx={{width: '50%'}}>Priority: </Typography>*/}
                            {/*    <Typography>{serviceData.priority.toLowerCase()}</Typography>*/}
                            {/*</Box>*/}
                            {/*{(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Sender: </Typography>*/}
                            {/*        <Typography>{serviceData.giftDetail.senderName}</Typography>*/}
                            {/*    </Box>*/}

                            {/*}*/}

                            {/*{(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Recipient: </Typography>*/}
                            {/*        <Typography>{serviceData.giftDetail.recipientName}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Shipping Type: </Typography>*/}
                            {/*        <Typography>{serviceData.giftDetail.shippingType.toLowerCase()}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Patient Name: </Typography>*/}
                            {/*        <Typography>{serviceData.medicineDetail.patientName}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Physician Name: </Typography>*/}
                            {/*        <Typography>{serviceData.medicineDetail.primaryPhysicianName}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Medicine: </Typography>*/}
                            {/*        <Typography>{serviceData.medicineDetail.medicine.toLowerCase().replace("_", " ")}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.sanitationDetail === undefined || serviceData.sanitationDetail === null)?*/}
                            {/*    <></>*/}
                            {/*    :*/}
                            {/*    <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*        <Typography sx={{width: '50%'}}>Date: </Typography>*/}
                            {/*        <Typography>{serviceData.sanitationDetail.date}</Typography>*/}
                            {/*    </Box>*/}
                            {/*}*/}

                            {/*{(serviceData.sanitationDetail === undefined || serviceData.sanitationDetail === null)?"":(*/}
                            {/*    serviceData.sanitationDetail.messTypes.map((messtype)=>{*/}
                            {/*        return(*/}
                            {/*            <Box key={messtype.messType} sx={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*                <Typography sx={{width: '50%'}}>Mess Type: </Typography>*/}
                            {/*                <Typography>{messtype.messType.toLowerCase().replace("_", " ")}</Typography>*/}
                            {/*            </Box>*/}
                            {/*        );*/}
                            {/*    })*/}
                            {/*)}*/}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 3
                            }}>
                                {/*{(serviceData.assignedEmployee === undefined || serviceData.assignedEmployee === null)?*/}
                                {/*    <></> : <Typography>{serviceData.assignedEmployee.firstName + " " + serviceData.assignedEmployee.lastName}</Typography>*/}
                                {/*}*/}
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
                                    <Box sx={{width: "20%"}}>
                                        <Autocomplete
                                            fullWidth
                                            options={options}
                                            renderInput={(params) => <TextField {...params} label="Employee"/>}
                                            onChange={(event, newValue) => {
                                                if (newValue && typeof newValue === "string") {
                                                    setServiceData({...serviceData, assignedEmployee: newValue, status: "ASSIGNED"});
                                                }
                                            }}
                                        />
                                    </Box>
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
                            display: "flex",
                            flexDirection: "row",
                        }}>
                        <CardActions>
                            <Button
                                size={"small"}
                                onClick={() => {
                                    setExpanded(!expanded);
                                }}
                            >expand</Button>
                        </CardActions>
                        <Box
                            sx={{
                                p: 1,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography>
                                ID{serviceData.requestID}
                            </Typography>
                        </Box>
                    </Box>
            </Card>
        </Box>
    );
}
