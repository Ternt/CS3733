// import {useState} from "react";
// import {renderToString} from "react-dom/server";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SubjectIcon from "@mui/icons-material/Subject";
import InputBase from "@mui/material/InputBase";
import {IconButton} from "@mui/material";

import {ServiceRequest} from "../../helpers/typestuff.ts";
import DataGroup from "./DataGroup.tsx";

type PopoverFormProp = {
    open: boolean;
    onClose: () => void;
    data: ServiceRequest;
}

export function PopoverForm(prop: PopoverFormProp){


    // function updateAssignmentStatus(newStatus: string){
    //     const updatedStatus = {
    //         requestID: serviceData.requestID,
    //         status: newStatus
    //     };
    //
    //     fetch("/api/service-requests/update", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(updatedStatus),
    //     })
    //         .then((response) => {
    //             console.log(response);
    //         })
    //
    //         .then((data) => console.log(data))
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // }
    //
    // function updateEmployeeRequests(newEmployee: AssignedEmployee){
    //     const newEmployeeService = {
    //         employeeID: newEmployee?.id,
    //         requestID: serviceData.requestID
    //     };
    //
    //     fetch("/api/employees/assign", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newEmployeeService),
    //     })
    //         .then((response) => {
    //             console.log(response);
    //         })
    //
    //         .then((data) => console.log(data))
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // }

    // const onChangeEmployee = (newValue: EmployeeAutocompleteOption) => {
    //     let statusChanged = false;
    //     function changeStatus(employee: EmployeeAutocompleteOption, currentStatus: string): string{
    //         if(currentStatus === "UNASSIGNED"){
    //             statusChanged = true;
    //             return "ASSIGNED";
    //         }else{
    //             return currentStatus;
    //         }
    //     }
    //
    //     const name = newValue.label.split(" ");
    //     const newEmployee = {
    //         firstName: name[0],
    //         lastName: name[1],
    //         id: newValue.id,
    //         assignedRequests: [],
    //     };
    //
    //     setServiceData(
    //         {
    //             ...serviceData,
    //             assignedEmployee: newEmployee,
    //             status: changeStatus(newValue, serviceData.status),
    //         });
    //
    //     prop.funcUpdateSRData();
    //
    //     updateEmployeeRequests(newEmployee);
    //     if(statusChanged){updateAssignmentStatus("ASSIGNED");}
    // };
    //
    // const onChangeAssignment = (event: ChangeEvent<HTMLInputElement>) => {
    //     setServiceData({...serviceData, status: event.target.value});
    //     updateAssignmentStatus(event.target.value);
    // };

    // the most scuffed recursion function ever
    function recurseTree<Type extends object>(label: string, data: string | number | Type, informationField: JSX.Element) {
        if(Array.isArray(data) || label === "type"){
            return informationField;
        }

        if(typeof data === "object"){
            Object.entries(data)
                .filter((field) => field[0] !== "requestID")
                .forEach((nestedFieldData) => {
                    return informationField = recurseTree(nestedFieldData[0], nestedFieldData[1], informationField);
                });

            return(
                <DataGroup label={label}>
                    {informationField}
                </DataGroup>
            );
        }

        // if data have notes as the label, render a text field
        if(label.toLowerCase().includes("notes")){
            return(
                <>
                    <Box sx={{pb: 2}}>
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItem: 'center',
                                width: '100%',
                                pb: 1,
                            }}>
                            <IconButton sx={{p: 0}}><SubjectIcon/></IconButton>
                            <Typography variant="h6" sx={{px: 1}}>{label}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', padding: '0.125vh', px: '3%'}}>
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
                                    fullWidth
                                    multiline={true}
                                    sx={{px: 1}}
                                    placeholder={data.toString()}
                                >
                                </InputBase>
                            </Box>
                        </Box>
                    </Box>
                    {informationField}
                </>
            );
        }

        return(
            <><Box sx={{display: 'flex', flexDirection: 'row', width: '100%', padding: '0.125vh', px: '3%'}}>
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
                keepMounted
                open={prop.open}
                onClose={() => {
                    prop.onClose();
                }}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#F1F1F1',
                    width: '40vw',
                    borderRadius: 1,
                    gap: '0.5vh',
                    padding: 3,
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    height: '75vh',
                }}>

                    {
                        Object.entries(prop.data)
                            .filter((data) =>
                                (data[1] !== null) &&
                                (data[0] !== "requestID"))
                            .map((data, index) => {
                                const form = recurseTree(data[0], data[1], <></>);
                                return(
                                    <Box key={"field" + index} >
                                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                            {form}
                                        </Box>
                                    </Box>
                                );
                            })
                    }
                </Box>
            </Modal>
        </>
    );
}
