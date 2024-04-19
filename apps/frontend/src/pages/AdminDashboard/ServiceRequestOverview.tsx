import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import KanbanBoardCard from "./KanbanBoardCard.tsx";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
// import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";

export default function ServiceRequestOverview(){

    // const [selectedCard, setSelectedCard] = useState<RequestCard | null>(null);
    const [reqs, setReqs] = useState<ServiceRequest[]>([]);
    const [employeeList, setEmployeeList] = useState<AssignedEmployee[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "MAINTENANCE"];

    useEffect(()=>{
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            setReqs(res.data.reverse());
        });
        axios.get('/api/employees').then((res: AxiosResponse) => {
            if(res.status !== 200){
                console.error("die");
            }
            setEmployeeList(res.data);
        });
    }, []);

    return(
        <>
            <Box
                sx={{
                    height: "80vh",
                    width:'100%',
                    overflowY:'hidden',
                    p: 1,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-evenly',
                    alignItems:'flex-start',
                    backgroundColor: '#FFFFFF',
                }}
            >
                    {
                        reqTypes.map((category)=>{
                            return (
                                <Box
                                    key={category}
                                    sx={{
                                        width: ((100.0/reqTypes.length - 1)+"%"),
                                        minHeight:'70vh',
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'flex-start',
                                        alignItems:'flex-start',
                                        p: "0.5%",
                                        backgroundColor: '#F1F1F1',
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItem: "center",
                                        width:'fill-available',
                                        px: "5%",
                                        pt: "4%",
                                        pb: "2%",
                                        backgroundColor: '#012d5a',
                                    }}>
                                        <Typography
                                            variant={"h5"}
                                            sx={{
                                                textAlign:'center',
                                                color: '#f6bd38',
                                                fontWeight: 500,
                                            }}>{category}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: '100%',
                                            height: '65vh',
                                            gap: "1rem",
                                            overflow: 'scroll',
                                            p: '5%',
                                        }}>
                                        {
                                            reqs.filter(x=> x.type === category).map((service) => {
                                                return(
                                                    <KanbanBoardCard key={service.requestID} serviceRequestData={service} employeeList={employeeList} />
                                                );
                                            })
                                        }
                                    </Box>
                                </Box>
                            );})
                    }
            </Box>
            {/*<RequestInspectionDialogue*/}
            {/*    selectedRequest={selectedCard}*/}
            {/*    onCloseDialogue={()=>{*/}
            {/*        setSelectedCard(null);*/}
            {/*    }}*/}
            {/*/>*/}
        </>
    );
}
