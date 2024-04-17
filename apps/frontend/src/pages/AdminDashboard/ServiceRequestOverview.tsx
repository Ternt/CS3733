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

export type AssignedEmployee = {
    id: number;
    firstName: string;
    lastName: string;
    assignedRequests: ServiceRequest[];
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

export type GiftRequest = {
    requestID: number;
    senderName: string;
    recipientName: string;
    shippingType: string;
    cardNumber: number;
    cardCVV: number;
    cardHolderName: string;
    cardExpirationDate: string;
}

export type MedicineRequest = {
    requestID: number;
    patientName: string;
    primaryPhysicianName: string;
    medicine: string;
    dosage: number;
    form: string;
    date: string;
}

export type SanitationRequestMessTypes = {
    messType: string;
}

export type SanitationRequest = {
    requestID: number;
    employeeName: string;
    messTypes: SanitationRequestMessTypes[];
    date: string;
}

export type MaintenanceRequest = {
    requestID: number;
    maintenanceType: string;
    workersNeeded: number;
}

export type ServiceRequest = {
    requestID: number,
    priority: string,
    status: string,
    type: string,
    location: Node,
    assignedEmployee?: AssignedEmployee,
    giftDetail? : GiftRequest,
    maintenanceDetail?: MaintenanceRequest,
    sanitationDetail?: SanitationRequest,
    medicineDetail?: MedicineRequest,
    notes?: string,
}

export default function ServiceRequestOverview(){

    const [selectedCard, setSelectedCard] = useState<RequestCard | null>(null);
    const [reqs, setReqs] = useState<ServiceRequest[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "MAINTENANCE"];

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
                                            height: '80vh',
                                            gap: "1rem",
                                            overflow: 'scroll',
                                            p: '5%',
                                        }}>
                                        {
                                            reqs.map((service) => {
                                                return(
                                                    ((service.type === category)? <KanbanBoardCard serviceRequestData={service}/> : <></>)
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
