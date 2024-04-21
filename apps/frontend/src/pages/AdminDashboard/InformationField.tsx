import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import * as React from "react";

type InformationFieldProp = {
    label: string;
    data?: string;
}

export default function InformationField(prop: InformationFieldProp){

    return(
        <Box>
            {(prop.data === undefined || prop.data === null)?
                <></>
                :
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Typography sx={{width: '50%'}}>{prop.label}: </Typography>
                    <Typography>{prop.data}</Typography>
                </Box>
            }
        </Box>
    );
}
