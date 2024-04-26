// import {useState} from "react";
// import {renderToString} from "react-dom/server";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import {ServiceRequest} from "../../helpers/typestuff.ts";
import TaskGroup from "./TaskGroup.tsx";

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
        if(Array.isArray(data)){
            return informationField;
        }

        if(typeof data === "object"){
            Object.entries(data)
                .filter((field) => field[0] !== "requestID")
                .forEach((nestedFieldData) => {
                    return informationField = recurseTree(nestedFieldData[0], nestedFieldData[1], informationField);
                });

            return(
                <TaskGroup label={label}>
                    {informationField}
                </TaskGroup>
            );
        }

        return(
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', padding: 0}}>
                    <Typography
                        noWrap={false}
                        sx={{width: '50%'}}
                    >{label}: </Typography>
                    <Typography
                        noWrap={false}
                        sx={{width: '50%'}}
                    >{data.toString()}</Typography>
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
                    justifyContent: 'center',
                    alignItem: 'center',
                    bgcolor: '#FFFFFF',
                    width: '40vw'
                }}>
                    {
                        Object.entries(prop.data)
                            .filter((data) =>
                                (data[1] !== null) &&
                                (data[0] !== "requestID") &&
                                (data[0] !== "status") &&
                                (data[0] !== "assignedEmployee"))
                            .map((data, index) => {
                                const form = recurseTree(data[0], data[1], <></>);
                                return(
                                    <Box key={"field" + index} >
                                        <Card sx={{display: 'flex', flexDirection: 'column'}}>
                                            {form}
                                        </Card>
                                    </Box>
                                );
                            })
                    }
                </Box>
            </Modal>
        </>
    );
}
