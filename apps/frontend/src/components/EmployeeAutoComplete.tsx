import {Autocomplete, TextField} from "@mui/material";
import * as React from "react";

export type EmployeeAutocompleteOption = {
    label: string;
    id: number;
};

type EmployeeAutoCompleteProp = {
    onChange:  (value: EmployeeAutocompleteOption) => void;
    label: string;
    employeeList: EmployeeAutocompleteOption[];
};


export default function EmployeeAutoComplete(prop: EmployeeAutoCompleteProp){

    function onInputChange(event){
        console.log(event);
    }

    return(
        <Autocomplete
            fullWidth
            options={prop.employeeList}
            renderInput={(params)=><TextField{...params} label={prop.label}/>}
            onInputChange={(event) => onInputChange(event)}
            onChange={(e, newValue) => {
                if (newValue && typeof newValue === "object") {
                    prop.onChange(newValue);
                }
            }}
        >
        </Autocomplete>);
}
