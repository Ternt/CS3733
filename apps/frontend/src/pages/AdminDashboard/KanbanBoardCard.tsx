import {useState} from "react";

import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardActionArea from "@mui/material/CardActionArea";
import {Draggable} from "@hello-pangea/dnd";

import {ServiceRequest} from "../../helpers/typestuff.ts";

type KanbanBoardProp = {
    index: number;
    serviceRequestData: ServiceRequest;
};

export default function KanbanBoardCard(prop: KanbanBoardProp){
    const [serviceData] = useState<ServiceRequest>(prop.serviceRequestData);
    // const [open, setOpen] = useState<boolean>(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return(
        <Draggable draggableId={prop.serviceRequestData.requestID.toString(10)} index={prop.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/*<Modal*/}
                    {/*    keepMounted*/}
                    {/*    open={open}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItems: 'center',*/}

                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Box sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'center',*/}
                    {/*        alignItem: 'center',*/}
                    {/*        bgcolor: '#FFFFFF',*/}
                    {/*        width: '40vw'*/}
                    {/*    }}>*/}
                    {/*        <Typography>hello world!</Typography>*/}
                    {/*    </Box>*/}
                    {/*</Modal>*/}
                    <Card
                        sx={{
                            backgroundColor:'#FFFFFF',
                            borderRadius: 2,
                            margin: 1,
                        }}>
                        {/*<CardActionArea onClick={handleOpen}>*/}
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: "5%",
                                    paddingTop: "5%",
                                }}>
                                <Typography variant="h6">{serviceData.location.longName}</Typography>
                            </CardContent>

                            <Box
                                sx={{
                                    backgroundColor: "#FFFFFF",
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <Box
                                    sx={{
                                        p: 1,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Typography>
                                        ID{serviceData.requestID}
                                    </Typography>
                                </Box>
                            </Box>
                        {/*</CardActionArea>*/}
                    </Card>
                </div>
            )}
        </Draggable>
    );
}
