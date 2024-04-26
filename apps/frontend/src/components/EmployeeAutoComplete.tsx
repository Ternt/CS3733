import * as React from "react";
import {Autocomplete, TextField} from "@mui/material";

export type EmployeeAutoCompleteOption = {
    label: string;
    id: number;
};

type EmployeeAutoCompleteProp = {
    label: string;
    employeeList: EmployeeAutoCompleteOption[];
    onChange:  (value: EmployeeAutoCompleteOption) => void;
    onClear?: () => void;
    disableClearable?: boolean;
};

export default function EmployeeAutoComplete(prop: EmployeeAutoCompleteProp){
    return(
        <Autocomplete
            disableClearable={prop.disableClearable}
            fullWidth
            options={prop.employeeList}
            renderInput={(params)=><TextField{...params} label={prop.label}/>}
            onChange={(e, newLabel, value) => {
                if (value === "selectOption" && newLabel && typeof newLabel === "object") {
                    prop.onChange(newLabel);
                }

                if(value === "clear" && prop.onClear){
                    prop.onClear();
                }
            }}
        >
        </Autocomplete>);
}
