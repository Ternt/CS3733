import {Box, Card} from "@mui/material";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import KanbanBoardCard from "./KanbanBoardCard.tsx";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
import * as React from "react";
import EmployeeAutoComplete, {EmployeeAutocompleteOption} from "../../components/EmployeeAutoComplete.tsx";
import CardContent from "@mui/material/CardContent";
// import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";



export default function ServiceRequestOverview(){
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [employeeList, setEmployeeList] = useState<EmployeeAutocompleteOption[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "MAINTENANCE", "LANGUAGE", "RELIGIOUS"];
    const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);

    function updateKanbanBoard(){
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            setServiceRequests(res.data);
            setFilteredRequests(res.data);
        });
        axios.get('/api/employees').then((res: AxiosResponse) => {
            if(res.status !== 200){
                console.error("die");
            }
            const employeeDropdownOptions: EmployeeAutocompleteOption[] = [];
            res.data.forEach((employee: AssignedEmployee)=> {
                employeeDropdownOptions.push({
                    label: employee.firstName + " " + employee.lastName,
                    id: employee.id,
                });
            });
            setEmployeeList(employeeDropdownOptions);
        });
    }

    useEffect(()=>{
        updateKanbanBoard();
    }, []);

    function onChange(value: EmployeeAutocompleteOption){
        setFilteredRequests(serviceRequests.filter((request) => request.assignedEmployee?.id === value.id));
    }

    function onClear(){
        setFilteredRequests(serviceRequests);
    }

    return(
        <>
            <Box>
                <Box sx={{px: '1.5%', pt: '1.5%', backgroundColor: '#FFFFFF', width: '40%'}}>
                    <EmployeeAutoComplete
                        onClear={onClear}
                        onChange={(label: EmployeeAutocompleteOption) => {
                            onChange(label);
                        }}
                        label={"Filter..."} employeeList={employeeList}
                        disableClearable={false}
                    >
                    </EmployeeAutoComplete>
                </Box>
                <Box
                    sx={{
                        height: "78vh",
                        width:'100%',
                        overflowY:'hidden',
                        p: '1%',
                        display:'flex',
                        flexDirection:'row',
                        gap: 1,
                    }}
                >
                    {
                        reqTypes.map((category)=>{
                            return (
                                <Card
                                    key={category}
                                    sx={{
                                        minWidth: "25vw",
                                        minHeight:'70vh',
                                        display:'flex',
                                        flexDirection:'column',
                                        backgroundColor: '#ffffff',
                                        boxShadow:3,
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItem: "center",
                                            width:'fill-available',
                                            py: "2%",
                                            backgroundColor: '#012d5a',
                                            borderRadius:2,
                                            boxShadow:2,
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
                                                '::-webkit-scrollbar': {
                                                  display: 'none'
                                                },
                                                '-ms-overflow-style': 'none',  /* IE and Edge */
                                                'scrollbar-width': 'none',  /* Firefox */
                                                pt:1
                                            }}>
                                            {
                                                filteredRequests.filter(x=> x.type === category).map((service) => {
                                                    return(
                                                        <KanbanBoardCard
                                                            key={service.requestID}
                                                            serviceRequestData={service}
                                                            employeeList={employeeList}
                                                            updateFunction={updateKanbanBoard}
                                                        />
                                                    );
                                                })
                                            }
                                        </Box>
                                    </CardContent>
                                </Card>
                            );})
                    }
                </Box>
                {/*<RequestInspectionDialogue*/}
                {/*    selectedRequest={selectedCard}*/}
                {/*    onCloseDialogue={()=>{*/}
                {/*        setSelectedCard(null);*/}
                {/*    }}*/}
                {/*/>*/}
            </Box>
        </>
    );
}
