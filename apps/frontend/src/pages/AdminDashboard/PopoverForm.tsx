// import {useState} from "react";

import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {ServiceRequest} from "../../helpers/typestuff.ts";

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


    return(
        <>
            <Modal
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
                {/*<Typography>helllo world!</Typography>*/}
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
                            .map((fieldData, index) => {
                                // let informationField = [<></>];
                                {/*                    if(typeof fieldData[1] === "object"){*/}
                                {/*                        informationField = Object.entries(fieldData[1]).map((nestedFieldData) => {*/}
                                {/*                            return(*/}
                                {/*                                <>*/}
                                {/*                                    <Box sx={{display: 'flex', flexWrap: 'wrap', width: '50%'}}>*/}
                                {/*                                        <Typography noWrap={false} >{nestedFieldData[0]}: </Typography>*/}
                                {/*                                    </Box>*/}
                                {/*                                    <Box sx={{display: 'flex', flexWrap: 'wrap', width: '50%'}}>*/}
                                {/*                                        <Typography>{nestedFieldData[1]}</Typography>*/}
                                {/*                                    </Box>*/}
                                {/*                                </>);*/}
                                {/*                        });*/}
                                {/*                        console.log(informationField);*/}
                                {/*                    }*/}
                                return(
                                    <Box key={"field" + index} >
                                        {/*{informationField.map((field, index) => {*/}
                                        {/*    return(*/}
                                        {/*        <Card key={"field" + index} sx={{display: 'flex', flexDirection: 'row'}}>*/}
                                        {/*            {field}*/}
                                        {/*        </Card>*/}
                                        {/*    );*/}
                                        {/*})}*/}
                                        <Typography sx={{width: '50%'}}>{fieldData[0]}: </Typography>
                                    </Box>
                                );
                            })
                    }
                </Box>
            </Modal>
            {/*<Collapse in={expanded} timeout={'auto'} unmountOnExit>*/}
            {/*    <CardContent>*/}

            {/*        <Box sx={{display: 'flex', flexDirection: 'row'}}>*/}
            {/*            <Typography sx={{width: '50%'}}>Priority: </Typography>*/}
            {/*            <Typography>{serviceData.priority.toLowerCase()}</Typography>*/}
            {/*        </Box>*/}
            {/*        {(serviceData.sanitationDetail === undefined || serviceData.sanitationDetail === null)?"":(*/}
            {/*            serviceData.sanitationDetail.messTypes.map((messtype)=>{*/}
            {/*                return(*/}
            {/*                    <Box key={messtype.messType} sx={{display: 'flex', flexDirection: 'row'}}>*/}
            {/*                        <Typography sx={{width: '50%'}}>Mess Type: </Typography>*/}
            {/*                        <Typography>{messtype.messType.toLowerCase().replace("_", " ")}</Typography>*/}
            {/*                    </Box>*/}
            {/*                );*/}
            {/*            })*/}
            {/*        )}*/}
            {/*        <Box sx={{*/}
            {/*            display: 'flex',*/}
            {/*            flexDirection: 'row',*/}
            {/*            pt: 3,*/}
            {/*        }}>*/}
            {/*            <FormControl*/}
            {/*                sx={{width: "100%", display: "flex", flexDirection: "column"}}>*/}
            {/*                <TextField*/}
            {/*                    select*/}
            {/*                    value={serviceData.status}*/}
            {/*                    margin="normal"*/}
            {/*                    inputProps={{MenuProps: {disableScrollLock: true}}}*/}
            {/*                    sx={{marginY: 0, width: '100%', p: 1}}*/}
            {/*                    onChange={onChangeAssignment}*/}
            {/*                >*/}
            {/*                    <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>*/}
            {/*                    <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>*/}
            {/*                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>*/}
            {/*                    <MenuItem value={"CLOSED"}>Closed</MenuItem>*/}
            {/*                </TextField>*/}
            {/*                <Box sx={{width: "100%", p: 1}}>*/}
            {/*                    <EmployeeAutoComplete*/}
            {/*                        onChange={(v: EmployeeAutocompleteOption)=>{*/}
            {/*                            onChangeEmployee(v);*/}
            {/*                        }}*/}
            {/*                        label={*/}
            {/*                            (serviceData.assignedEmployee && typeof serviceData.assignedEmployee === "object")?*/}
            {/*                                serviceData.assignedEmployee?.firstName:"Employee"*/}
            {/*                        }*/}
            {/*                        disableClearable={true}*/}
            {/*                        employeeList={prop.employeeList}></EmployeeAutoComplete>*/}
            {/*                </Box>*/}
            {/*            </FormControl>*/}
            {/*        </Box>*/}
            {/*    </CardContent>*/}
            {/*</Collapse>*/}
        </>
    );
}
