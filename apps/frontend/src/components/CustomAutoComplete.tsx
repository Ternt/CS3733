import * as React from "react";

import {SxProps} from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import TextField, {TextFieldVariants} from "@mui/material/TextField";

import {AutoCompleteOption} from "../helpers/typestuff.ts";

type CustomAutoCompleteProp = {
    sx?: SxProps;
    variant?: TextFieldVariants;
    label?: string;
    employeeList: AutoCompleteOption[];
    onChange:  (value: AutoCompleteOption) => void;
    onClear?: () => void;
    disableClearable?: boolean;
};

export default function CustomAutoComplete(prop: CustomAutoCompleteProp){

    return(
        <Autocomplete
            sx={prop.sx}
            size={'small'}
            disableClearable={prop.disableClearable}
            options={prop.employeeList}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params)=>
                <TextField
                    {...params}
                    label={prop.label}
                    variant={prop.variant}
                />
            }
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
