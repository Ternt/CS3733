import * as React from "react";
import {Autocomplete, TextField, SxProps} from "@mui/material";
import {EmployeeAutoCompleteOption} from "../helpers/typestuff.ts";

type EmployeeAutoCompleteProp = {
    sx?: SxProps;
    label: string;
    employeeList: EmployeeAutoCompleteOption[];
    onChange:  (value: EmployeeAutoCompleteOption) => void;
    onClear?: () => void;
    disableClearable?: boolean;
};

export default function EmployeeAutoComplete(prop: EmployeeAutoCompleteProp){
    return(
        <Autocomplete
            sx={prop.sx}
            size={'small'}
            disableClearable={prop.disableClearable}
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
