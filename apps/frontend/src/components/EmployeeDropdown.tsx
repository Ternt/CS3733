import {Autocomplete, TextField} from "@mui/material";

type EmployeeDropdownProp = {
    employeeList: string[];
}

export default function EmployeeDropdown(prop: EmployeeDropdownProp){
    console.log(prop.employeeList);

    return(
        <Autocomplete
            fullWidth
            options={prop.employeeList}
            renderInput={(params) => <TextField {...params} label="Employee"/>}
        />
    );
}
