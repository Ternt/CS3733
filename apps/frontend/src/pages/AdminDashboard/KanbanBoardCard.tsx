import { ServiceRequest } from "./ServiceRequestOverview";
import {Paper, Typography} from "@mui/material";
import {FormControl} from "@mui/material";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

type KanbanBoardProp = {
    serviceRequest: ServiceRequest;
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const service = prop.serviceRequest;

    return(
        <Paper
            key={service.requestID}
            sx={{
                width:'100%',
                backgroundColor:'#FFFFFF',
                borderRadius: 2,
            }}
            elevation={1}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: "5%",
                    pt: "5%",
                    pb: "2.5%"
                }}>
                <Typography variant="h6">{service.location.longName}</Typography>
                <Typography>{service.location.nodeID}</Typography>
                <Typography>{service.priority}</Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#F1F1F1",
                    borderRadius: 2,
                }}>
                <Box sx={{ px: "5%", pb: "5%", pt: "2.5%" }}>
                    <Box>
                        <FormControl
                            sx={{width: "100%",}}>
                            <TextField
                                select
                                value={service.status}
                                margin="normal"
                                inputProps={{MenuProps: {disableScrollLock: true}}}
                                sx={{marginY: 0, width: "100%"}}
                            >
                                <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                <MenuItem value={"CLOSED"}>Closed</MenuItem>
                            </TextField>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
