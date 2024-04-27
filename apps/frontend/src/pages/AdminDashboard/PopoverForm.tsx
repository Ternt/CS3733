import {useState} from "react";
// import {renderToString} from "react-dom/server";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Icon from "@mui/material/Icon";
// import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import InputBase from "@mui/material/InputBase";
import {IconButton} from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import {EmployeeAutoCompleteData, EmployeeAutoCompleteOption, ServiceRequest, AssignedEmployee} from "../../helpers/typestuff.ts";
import EmployeeAutoComplete from "../../components/EmployeeAutoComplete.tsx";
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

    const onChangeEmployee = (newValue: EmployeeAutoCompleteOption) => {
        let statusChanged = false;
        function changeStatus(employee: EmployeeAutoCompleteOption, currentStatus: string): string{
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

        setServiceRequest(
            {
                ...serviceRequest,
                assignedEmployee: newEmployee,
                status: changeStatus(newValue, serviceRequest.status),
            });

        prop.autocomplete.updateFunction();

        updateEmployeeRequests(newEmployee);
        if(statusChanged){updateAssignmentStatus("ASSIGNED");}
    };

    //
    // const onChangeAssignment = (event: ChangeEvent<HTMLInputElement>) => {
    //     setServiceData({...serviceData, status: event.target.value});
    //     updateAssignmentStatus(event.target.value);
    // };

    // the most scuffed recursion function ever
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
                        <Box sx={{width: '15vw'}}>
                            <Typography>Employee</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', py: 1}}>
                                <IconButton>
                                    <AccountCircleRoundedIcon/>
                                </IconButton>
                                <EmployeeAutoComplete
                                    sx={{width: '50%'}}
                                    label={"Employee"}
                                    employeeList={prop.autocomplete.employeeList}
                                    onChange={onChangeEmployee}></EmployeeAutoComplete>
                            </Box>
                        </Box>
                        <Box sx={{width: '15vw'}}>
                            <Typography>Status</Typography>
                        </Box>
                        <Box sx={{width: '15vw'}}>
                            <Typography>Priority</Typography>
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
