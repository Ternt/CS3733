import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";
import {AssignedEmployee, ServiceRequest} from "../helpers/typestuff.ts";
import {useState} from "react";

export type EmployeeAutocompleteOption = {
    label: string;
    id: number;
};

type EmployeeAutoCompleteProp = {
    serviceRequestData: ServiceRequest;
    employeeList: EmployeeAutocompleteOption[];
};


export default function EmployeeAutoComplete(prop: EmployeeAutoCompleteProp){
    const [serviceData, setServiceData] = useState<ServiceRequest>(prop.serviceRequestData);

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


    const onChangeEmployee = (event: React.SyntheticEvent, newValue: EmployeeAutocompleteOption | null) => {
        let statusChanged = false;

        function changeStatus(employee: EmployeeAutocompleteOption | null, currentStatus: string): string{
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
            const updatedStatus = {
            requestID: serviceData.requestID,
            status: "ASSIGNED"
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
    };

   return(
       <Autocomplete
           fullWidth
           options={prop.employeeList}
           isOptionEqualToValue={(option, value) => option.id === value.id}
           renderInput=
               {(params) =>
                   <TextField
                       {...params}
                       label={(prop.serviceRequestData.assignedEmployee === null)?
                           "Employee"
                           :
                           (prop.serviceRequestData.assignedEmployee?.firstName + " " + prop.serviceRequestData.assignedEmployee?.lastName)}
                   />}
           onChange={onChangeEmployee}>
       </Autocomplete>);
}
