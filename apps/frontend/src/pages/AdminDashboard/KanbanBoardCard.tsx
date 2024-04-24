import {ChangeEvent, useState} from "react";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
import {Card, Collapse, FormControl, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import * as React from "react";
import InformationField from "./InformationField.tsx";
import EmployeeAutoComplete, {EmployeeAutocompleteOption} from "../../components/EmployeeAutoComplete.tsx";

type KanbanBoardProp = {
    serviceRequestData: ServiceRequest;
    employeeList: EmployeeAutocompleteOption[];
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);
    const [expanded, setExpanded] = useState<boolean>(false);

    function updateAssignmentStatus(newStatus: string){
        const updatedStatus = {
            requestID: serviceData.requestID,
            status: newStatus
        };

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
    }

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

    const onChangeEmployee = (newValue: EmployeeAutocompleteOption) => {
        let statusChanged = false;
        function changeStatus(employee: EmployeeAutocompleteOption, currentStatus: string): string{
            if(currentStatus === "UNASSIGNED"){
                statusChanged = true;
                return "ASSIGNED";
            }else{
                return currentStatus;
            }
        }

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
        if(statusChanged){updateAssignmentStatus("ASSIGNED");}
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

                            <InformationField label={"Sender"} data={serviceData.giftDetail?.senderName}></InformationField>

                            <InformationField label={"Recipient"} data={serviceData.giftDetail?.recipientName}></InformationField>

                            <InformationField label={"Shipping Type"} data={serviceData.giftDetail?.shippingType.toLowerCase()}></InformationField>

                            <InformationField label={"Patient Name"} data={serviceData.medicineDetail?.patientName}></InformationField>

                            <InformationField label={"Physician Name"} data={serviceData.medicineDetail?.primaryPhysicianName}></InformationField>

                            <InformationField label={"Medicine"} data={serviceData.medicineDetail?.medicine.toLowerCase().replace("_", " ")}></InformationField>

                            <InformationField label={"Requester Name"} data={serviceData.religiousDetail?.requestorName}></InformationField>

                            <InformationField label={"Leader Name"} data={serviceData.religiousDetail?.religiousLeaderName}></InformationField>

                            <InformationField label={"Service Type"} data={serviceData.religiousDetail?.serviceType}></InformationField>

                            <InformationField label={"Date"} data={serviceData.religiousDetail?.date}></InformationField>

                            <InformationField label={"Time"} data={serviceData.religiousDetail?.time}></InformationField>

                            <InformationField label={"Location"} data={serviceData.religiousDetail?.endLocation}></InformationField>

                            <InformationField label={"Interpreter Name"} data={serviceData.languageDetail?.name}></InformationField>

                            <InformationField label={"Language"} data={serviceData.languageDetail?.language.toLowerCase()}></InformationField>

                            <InformationField label={"Date"} data={serviceData.sanitationDetail?.date}></InformationField>

                            <InformationField label={"Date"} data={serviceData.sanitationDetail?.date}></InformationField>

                            <InformationField label={"Physician Name"} data={serviceData.medicineDetail?.primaryPhysicianName}></InformationField>

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
                                pt: 3,
                            }}>
                                <FormControl
                                    sx={{width: "100%", display: "flex", flexDirection: "column"}}>
                                    <TextField
                                        select
                                        value={serviceData.status}
                                        margin="normal"
                                        inputProps={{MenuProps: {disableScrollLock: true}}}
                                        sx={{marginY: 0, width: '100%', p: 1}}
                                        onChange={onChangeAssignment}
                                    >
                                        <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                        <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                        <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                        <MenuItem value={"CLOSED"}>Closed</MenuItem>
                                    </TextField>
                                    <Box sx={{width: "100%", p: 1}}>
                                        <EmployeeAutoComplete
                                            onChange={(v: EmployeeAutocompleteOption)=>{
                                                onChangeEmployee(v);
                                            }}
                                            label={
                                                (serviceData.assignedEmployee && typeof serviceData.assignedEmployee === "object")?
                                                    serviceData.assignedEmployee?.firstName:"Employee"
                                            }
                                            disableClearable={true}
                                            employeeList={prop.employeeList}></EmployeeAutoComplete>
                                    </Box>
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
