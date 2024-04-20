import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import KanbanBoardCard from "./KanbanBoardCard.tsx";
import {AssignedEmployee, ServiceRequest} from "../../helpers/typestuff.ts";
import * as React from "react";
import EmployeeAutoComplete, {EmployeeAutocompleteOption} from "../../components/EmployeeAutoComplete.tsx";
// import {RequestInspectionDialogue} from "./RequestInspectionDialogue.tsx";



export default function ServiceRequestOverview(){
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [employeeList, setEmployeeList] = useState<EmployeeAutocompleteOption[]>([]);
    const reqTypes = ["MEDICINE", "SANITATION", "GIFT", "MAINTENANCE"];
    const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([]);

    useEffect(()=>{
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
                <Box sx={{p: 1, backgroundColor: '#FFFFFF'}}>
                    <EmployeeAutoComplete
                        onClear={onClear}
                        onChange={(label: EmployeeAutocompleteOption) => {
                            onChange(label);
                        }}
                        label={"Filter..."} employeeList={employeeList}></EmployeeAutoComplete>
                </Box>
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
                                            filteredRequests.filter(x=> x.type === category).map((service) => {
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
            </Box>
        </>
    );
}
