import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";
import axios, {AxiosResponse} from "axios";
import KanbanBoardCard from "./KanbanBoardCard.tsx";
// import AddIcon from '@mui/icons-material/Add';
// import Button from "@mui/material/Button";

export type RequestCard = {
    type:string;
}

export type Node = {
    nodeID: string;
    xcoord: number;
    ycoord: number;
    building: string;
    floor: string;
    longName: string;
    shortName: string;
    nodeType: string;
}

export type ServiceRequest = {
    requestID: number,
    priority: string,
    status: string,
    type: string,
    location: Node,
    assignedEmployee?: string,
    giftDetail? : string,
    maintenanceDetail?: string,
    medicineDetail?: string,
    notes?: string,
}

export default function ServiceRequestOverview(){

    const [selectedCard, setSelectedCard] = useState<RequestCard | null>(null);
    const [reqs, setReqs] = useState<ServiceRequest[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "FLOWER"];

    useEffect(()=>{
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            setReqs(res.data);
            console.log(res.data);
        });
    }, []);



    return(
        <>
            <Box
                sx={{
                    height: "90vh",
                    width:'100%',
                    overflowY:'hidden',
                    p: 1,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    alignItems:'flex-start',
                    backgroundColor: '#E4E4E4',
                }}
            >
                    {
                        reqTypes.map((category)=>{
                            return (
                                <Box
                                    key={category}
                                    sx={{
                                        width: ((100.0/reqTypes.length - 1)+"%"),
                                        minHeight:'85vh',
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'flex-start',
                                        alignItems:'flex-start',
                                        p: "0.5%",
                                    }}
                                >
                                    <Typography
                                        variant={"h4"}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItem: "center",
                                            px: "5%",
                                            pt: "4%",
                                            pb: "2%",
                                        }}>{category}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: '100%',
                                            minHeight:'80vh',
                                            height: '80vh',
                                            gap: "1rem",
                                            overflow: 'scroll',
                                            p: '5%',
                                        }}>
                                        {
                                            reqs.map((service) => {
                                                return(
                                                    ((service.type === category)? <KanbanBoardCard serviceRequest={service}/> : <></>)
                                                );
                                            })
                                        }
                                        {/*<Box sx={{display: 'flex'}}>*/}
                                        {/*    <Button*/}
                                        {/*        variant="contained"*/}
                                        {/*        sx={{*/}
                                        {/*            width: "20vw",*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        <AddIcon/>*/}
                                        {/*    </Button>*/}
                                        {/*</Box>*/}
                                    </Box>
                                </Box>
                            );})
                    }
            </Box>
            <RequestInspectionDialogue
                selectedRequest={selectedCard}
                onCloseDialogue={()=>{
                    setSelectedCard(null);
                }}
            />
        </>
    );
}
