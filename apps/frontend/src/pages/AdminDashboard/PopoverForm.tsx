import {ChangeEvent, useState} from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import {IconButton, TextField} from "@mui/material";

import {EmployeeAutoCompleteData, AutoCompleteOption, ServiceRequest, AssignedEmployee} from "../../helpers/typestuff.ts";
import CustomAutoComplete from "../../components/CustomAutoComplete.tsx";
import DataGroup from "./DataGroup.tsx";

type PopoverFormProp = {
    open: boolean;
    onClose: () => void;
    data: ServiceRequest;
    autocomplete: EmployeeAutoCompleteData;
}

export function PopoverForm(prop: PopoverFormProp){
    const [serviceRequest, setServiceRequest] = useState<ServiceRequest>(prop.data);

    function updateAssignmentStatus(newStatus: string){
        const updatedStatus = {
            requestID: serviceRequest.requestID,
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
            requestID: serviceRequest.requestID
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

    const onChangeAssignment = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceRequest({...serviceRequest, status: event.target.value});
        updateAssignmentStatus(event.target.value);
    };

    const onChangeEmployee = (newValue: AutoCompleteOption) => {
        let statusChanged = false;
        let employeeChanged = true;
        function changeStatus(employee: AutoCompleteOption, currentStatus: string): string{
            if(currentStatus === "UNASSIGNED"){
                statusChanged = true;
                return "ASSIGNED";
            }else{
                return currentStatus;
            }
        }

        if(newValue.label === serviceRequest.assignedEmployee?.firstName + ' ' + serviceRequest.assignedEmployee?.lastName){
            employeeChanged = false;
        }

        console.log();

        const name = newValue.label.split(" ");
        const newEmployee = {
            firstName: name[0],
            lastName: name[1],
            id: newValue.id,
            assignedRequests: [],
        };

        setServiceRequest(
            {
                ...serviceRequest,
                assignedEmployee: newEmployee,
                status: changeStatus(newValue, serviceRequest.status),
            });

        // api calls to change data
        if(employeeChanged){
            updateEmployeeRequests(newEmployee);
        }

        if(statusChanged){
            updateAssignmentStatus("ASSIGNED");
        }

        // gets the new service data that's been changed
        prop.autocomplete.updateFunction();
    };


    // recursive traverses through the service request object. This is so we can render objects nested inside the root object.
    function recurseTree<Type extends object>(label: string, data: string | number | Type, informationField: JSX.Element) {
        if(Array.isArray(data)){ return informationField; }

        if(typeof data === "object"){
            Object.entries(data)
                .filter((field) => field[0] !== "requestID")
                .forEach((nestedFieldData) => {
                    return informationField = recurseTree(nestedFieldData[0], nestedFieldData[1], informationField);
                });
            return(
                <DataGroup label={label}>{informationField}</DataGroup>
            );
        }

        return(
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', px: 3}}>
                    <Typography noWrap={false} sx={{width: '50%'}}> {label} </Typography>
                    <Typography noWrap={false} sx={{width: '50%'}}> {data.toString()}</Typography>
                </Box>
                {informationField}
            </>
        );
    }


    return(
        <>
            <Modal
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                keepMounted
                open={prop.open}
                onClose={() => {
                    prop.onClose();
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#F1F1F1',
                    width: '50vw',
                    borderRadius: 1,
                    gap: '0.5vh',
                    padding: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '75vh',
                }}>
                    {/* title */}
                    <Typography sx={{pb: 2, px: 4}} variant={"h4"}>
                        Medicine Request at {prop.data.location.longName}
                    </Typography>

                    {/* horizontal bar displaying employee, status, and priority */}
                    <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', px: 4, pb: 1}}>

                        {/* employee */}
                        <Box sx={{width: '15vw'}}>
                            <Typography>Employee</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row' , pb: 1}}>
                                <CustomAutoComplete
                                    variant={'standard'}
                                    sx={{width: '70%'}}
                                    disableClearable={true}
                                    label={
                                        (prop.data.assignedEmployee?.firstName === undefined)?
                                            "Unassigned":
                                            (prop.data.assignedEmployee.firstName + ' ' + prop.data.assignedEmployee.lastName)
                                    }
                                    employeeList={prop.autocomplete.employeeList}
                                    onChange={onChangeEmployee}></CustomAutoComplete>
                            </Box>
                        </Box>

                        {/* status */}
                        <Box sx={{width: '15vw'}}>
                            <Typography>Status</Typography>
                            <Box sx={{width: "100%"}}>
                                <TextField
                                    select
                                    variant={'standard'}
                                    value={serviceRequest.status}
                                    inputProps={{MenuProps: {disableScrollLock: true}}}
                                    sx={{width: '70%', height: 4, pt: 1.48}}
                                    onChange={onChangeAssignment}
                                >
                                    <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                    <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                    <MenuItem value={"CLOSED"}>Closed</MenuItem>
                                </TextField>
                            </Box>
                        </Box>

                        {/* priority */}
                        <Box sx={{width: '15vw'}}>
                            <Typography>Priority</Typography>
                            <Typography sx={{pt: 2}}>{prop.data.priority}</Typography>
                        </Box>
                    </Box>

                    {/* field to display notes */}
                    <Box sx={{pb: 2}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItem: 'center', width: '100%', pb: 2,}}>
                            <IconButton disabled={true} sx={{p: 0}}><SubjectIcon/></IconButton>
                            <Typography sx={{px: 1}}>Notes</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', padding: '0.125vh', px: 4}}>
                            <Box
                                sx={{
                                    bgcolor: '#FFFFFF',
                                    display: 'flex',
                                    width: '100%',
                                    padding: 1,
                                    borderRadius: 2,
                                    border: 2,
                                    borderColor: '#E4E4E4'
                                }}>
                                <InputBase
                                    sx={{px: 1}}
                                    fullWidth
                                    multiline={true}
                                    inputProps={{
                                        readOnly: true,
                                        placeholder: prop.data.notes,
                                    }}
                                >
                                </InputBase>
                            </Box>
                        </Box>
                    </Box>

                    {/* data fields */}
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItem: 'center', width: '100%', pb: 2,}}>
                        <IconButton disabled={true} sx={{p: 0}}><SubjectIcon/></IconButton>
                        <Typography sx={{px: 1}}>Details</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', px: 4, gap: 2}}>
                        {
                            Object.entries(prop.data)
                                .filter((data) =>
                                    (data[1] !== null) &&
                                    (data[0] !== "requestID") &&
                                    (data[0] !== "notes") &&
                                    (data[0] !== "priority") &&
                                    (data[0] !== "status") &&
                                    (data[0] !== "type"))
                                .map((data, index) => {
                                    const form = recurseTree(data[0], data[1], <></>);
                                    return(
                                        <Box key={"field" + index} sx={{border: 1, borderRadius: 1, borderColor: "#E4E4E4"}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                {form}
                                            </Box>
                                        </Box>
                                    );
                                })
                        }
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
