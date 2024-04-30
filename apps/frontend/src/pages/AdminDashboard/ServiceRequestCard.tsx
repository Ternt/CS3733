import {useState} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import SubjectIcon from "@mui/icons-material/Subject";
import {Draggable} from "@hello-pangea/dnd";

import {EmployeeAutoCompleteData, ServiceRequest} from "../../helpers/typestuff.ts";
import {PopoverForm} from "./PopoverForm.tsx";

type KanbanBoardProp = {
    index: number;
    serviceRequestData: ServiceRequest;
    autocomplete: EmployeeAutoCompleteData;
};

export default function ServiceRequestCard(prop: KanbanBoardProp){
    // for opening and closing the form
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Draggable draggableId={prop.serviceRequestData.requestID.toString(10)} index={prop.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/* the form that appears when you click a service request card */}
                    <PopoverForm
                        open={open}
                        onClose={handleClose}
                        data={prop.serviceRequestData}
                        autocomplete={prop.autocomplete}
                    />

                    {/* components making up the card */}
                    <Card
                        elevation={1}
                        sx={{
                            backgroundColor:'#FFFFFF',
                            borderRadius: 2,
                            margin: 1,
                        }}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 1,
                                paddingTop: 1,
                            }}>
                            <Typography variant="h6">{prop.serviceRequestData.location.longName}</Typography>
                        </CardContent>

                        <Box
                            sx={{
                                backgroundColor: "#F1F1F1",
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <IconButton
                                onClick={handleOpen}
                                sx={{
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: 'center',
                                }}
                            >
                                <SubjectIcon></SubjectIcon>
                            </IconButton>
                            <Divider orientation={"vertical"} variant={"middle"} flexItem></Divider>
                            <Typography
                                sx={{
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: 'center',
                                }}
                            >
                                ID{prop.serviceRequestData.requestID}
                            </Typography>
                        </Box>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}
