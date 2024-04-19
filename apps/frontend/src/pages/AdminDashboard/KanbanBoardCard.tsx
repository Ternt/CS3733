import {ChangeEvent, useState} from "react";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
import {Autocomplete, Card, Collapse, FormControl, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import * as React from "react";

type KanbanBoardProp = {
    serviceRequestData: ServiceRequest;
    employeeList: AssignedEmployee[];
};

type employeeOptionType = {
    label: string;
    id: number;
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);
    const [expanded, setExpanded] = useState<boolean>(false);

    const employeeDropdownOptions: employeeOptionType[] = [];
    prop.employeeList.filter((x) => x !== null || undefined).forEach((employee)=> {
        employeeDropdownOptions.push({
            label: employee.firstName + " " + employee.lastName,
            id: employee.id,
        });
    });

    function updateEmployeeRequests(newEmployee: AssignedEmployee){
        const newEmployeeService = {
            employeeID: newEmployee?.id,
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

    function updateAssignmentStatus(newStatus: string){
        const updatedStatus = {
            requestID: serviceData.requestID,
            status: newStatus
        };

        // const updatedEmployee = {
        //     requestID: serviceData.requestID,
        //     assignedEmployeeID: serviceData.assignedEmployee?.id,
        // };

        fetch("/api/service-requests/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStatus),
        })
            .then((response) => {
                console.log(response);
            })

            .then((data) => console.log(data))
            .catch((error) => {
                console.error("Error:", error);
            });

        // fetch("/api/service-requests/update", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(updatedEmployee),
        // })
        //     .then((response) => {
        //         console.log(response);
        //     })
        //
        //     .then((data) => console.log(data))
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
    }

    const onChangeEmployee = (event: React.SyntheticEvent, newValue: employeeOptionType | null) => {
        let statusChanged = false;

        function changeStatus(employee: employeeOptionType | null, currentStatus: string): string{
            if(currentStatus === "UNASSIGNED"){
                statusChanged = true;
                return "ASSIGNED";
            }else if(employee === null){
                statusChanged = true;
                return "UNASSIGNED";
            }else{
                return currentStatus;
            }
        }

        if (newValue && typeof newValue === "object") {
            const name = newValue.label.split(" ");
            const newEmployee = {
                firstName: name[0],
                lastName: name[1],
                id: newValue.id,
                assignedRequests: [],
            };

            setServiceData(
                {
                    ...serviceData,
                    assignedEmployee: newEmployee,
                    status: changeStatus(newValue, serviceData.status),
                });
            updateEmployeeRequests(newEmployee);
        }

        if(statusChanged){
            updateAssignmentStatus("ASSIGNED");
        }
    };

    const onChangeAssignment = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceData({...serviceData, status: event.target.value});
        updateAssignmentStatus(event.target.value);
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

                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography sx={{width: '50%'}}>Priority: </Typography>
                                <Typography>{serviceData.priority.toLowerCase()}</Typography>
                            </Box>
                            {(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Sender: </Typography>
                                    <Typography>{serviceData.giftDetail.senderName}</Typography>
                                </Box>

                            }

                            {(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Recipient: </Typography>
                                    <Typography>{serviceData.giftDetail.recipientName}</Typography>
                                </Box>
                            }

                            {(serviceData.giftDetail === undefined || serviceData.giftDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Shipping Type: </Typography>
                                    <Typography>{serviceData.giftDetail.shippingType.toLowerCase()}</Typography>
                                </Box>
                            }

                            {(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Patient Name: </Typography>
                                    <Typography>{serviceData.medicineDetail.patientName}</Typography>
                                </Box>
                            }

                            {(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Physician Name: </Typography>
                                    <Typography>{serviceData.medicineDetail.primaryPhysicianName}</Typography>
                                </Box>
                            }

                            {(serviceData.medicineDetail === undefined || serviceData.medicineDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Medicine: </Typography>
                                    <Typography>{serviceData.medicineDetail.medicine.toLowerCase().replace("_", " ")}</Typography>
                                </Box>
                            }

                            {(serviceData.sanitationDetail === undefined || serviceData.sanitationDetail === null)?
                                <></>
                                :
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <Typography sx={{width: '50%'}}>Date: </Typography>
                                    <Typography>{serviceData.sanitationDetail.date}</Typography>
                                </Box>
                            }

                            {(serviceData.sanitationDetail === undefined || serviceData.sanitationDetail === null)?"":(
                                serviceData.sanitationDetail.messTypes.map((messtype)=>{
                                    return(
                                        <Box key={messtype.messType} sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Typography sx={{width: '50%'}}>Mess Type: </Typography>
                                            <Typography>{messtype.messType.toLowerCase().replace("_", " ")}</Typography>
                                        </Box>
                                    );
                                })
                            )}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 3
                            }}>
                                {/*{(serviceData.assignedEmployee === undefined || serviceData.assignedEmployee === null)?*/}
                                {/*    <></> : <Typography>{serviceData.assignedEmployee.firstName + " " + serviceData.assignedEmployee.lastName}</Typography>*/}
                                {/*}*/}
                                <FormControl
                                    sx={{width: "100%", display: "flex", flexDirection: "column"}}>
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
                                    <Box sx={{width: "100%"}}>
                                        <Autocomplete
                                            fullWidth
                                            options={employeeDropdownOptions}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            renderInput=
                                                {(params) =>
                                                    <TextField
                                                        {...params}
                                                        label={(serviceData.assignedEmployee === null)?
                                                            "Employee"
                                                            :
                                                            (serviceData.assignedEmployee.firstName + " " + serviceData.assignedEmployee.lastName)}
                                                    />}
                                            onChange={onChangeEmployee}
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
