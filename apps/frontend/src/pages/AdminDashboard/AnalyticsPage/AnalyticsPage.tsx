import React, {useEffect, useState} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import {PanelGroup, Panel} from "react-resizable-panels";
import {Resizable} from "re-resizable";
import {PieChart} from "@mui/x-charts/PieChart";
// import CustomPieChart from "./CustomPieChart.tsx";
// import Paper from "@mui/material/Paper";
// import {CChartPie, CChartBar} from "@coreui/react-chartjs";
// import {CircularProgress} from "@mui/material";

// import ResizeHandle from "./ResizeHandle.tsx";
//
interface Data {
    [key: string]: {
        id: number;
        value: number;
        label: string;
    }
}

type ChartData = {
    id: number;
    value: number;
    label: string;
};

export default function AnalyticsPage(){
    const [serviceData, setServiceData] = useState<ChartData[]>([{id: 0, value: 0, label: ''}]);
    // const [employeeData, setEmployeeData] = useState<ChartData | null>(null);

    useEffect(() => {
        // Fetch service request
        axios.get('/api/service-requests')
            .then(response => {
                // Prepare data for pie chart
                if(response.status !== 200) {return;}

                let dataID = 0;
                const requestTypes = ['MAINTENANCE', 'SANITATION', 'FLOWER', 'GIFT', 'MEDICINE', 'RELIGIOUS'];
                const serviceData = response.data
                    .reduce((acc: Data, request: { requestID: number, type: string }) => {
                        // There's probably a better way but eh

                        if(requestTypes.includes(request.type)) {

                            const id = request.type;
                            if(acc[id] === undefined){
                                acc[id] = {
                                    id: dataID,
                                    value: (acc[id]===undefined)?0:(acc[id].value + 1),
                                    label: request.type,
                                };
                                dataID += 1;
                            }

                            acc[id].value += 1;
                        }
                    return acc;
                }, {});

                console.log(Object.values(serviceData));

                // const data2 = response.data.reduce((acc: { [key: string]: number }, request: {
                //     status: string
                // }) => {
                //     const status = request.status;
                //     if (status === 'ASSIGNED') {
                //         acc[status] = (acc[status] || 0) + 1;
                //     }
                //     return acc;
                // }, {});

                // const totalWorkers = 11;
                // data2['UNASSIGNED'] = totalWorkers - (data2['ASSIGNED'] || 0);

                // const employeeData = {
                //     labels: ['Assigned', 'Unassigned'],
                //     datasets: [
                //         {
                //             label: 'Employees',
                //             data: [data2['ASSIGNED'] || 0, data2['UNASSIGNED'] || 0],
                //             backgroundColor: ['#012d5a', '#f6bd38'],
                //         },
                //     ],
                // };

                // setEmployeeData(employeeData);
                            // backgroundColor: ,
                setServiceData(Object.values(serviceData));
            })
            .catch(error => console.error(error));
    }, []);

    return(
        <>
            <Box sx={{display: 'flex', flexDirection: 'row',padding: 3}}>
                    <Resizable
                        defaultSize={{
                            height: '40vh',
                            width: '50%',
                        }}
                        minHeight={'40vh'}
                        minWidth={'40%'}
                        maxWidth={'60%'}
                        bounds={'window'}
                    >
                        <Box sx={{border: 2, borderColor: '#E4E4E4', bgcolor: '#F1F1F1', height: '100%', padding: 3}}>
                            <Typography
                                variant={"h5"}
                                sx={{
                                    fontFamily: 'Open Sans',
                                    color: '#012d5a',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '20%'
                                }}
                            >Service Request Usage</Typography>
                            <Box sx={{height: '80%'}}>
                                <PieChart
                                    sx={{transition: 'all 0.5s ease-out'}}
                                    colors={['#ef476f', '#f78c6b', '#f6bd38', '#9f8be8', '#003a96', '#012d5a']}
                                    series={[{
                                        data: serviceData,
                                        cornerRadius: 5,
                                    }]}
                                    slotProps={{
                                        legend: {hidden: true}
                                    }}
                                />
                            </Box>
                        </Box>
                    </Resizable>
                    <Box sx={{border: 1, borderColor: '#E4E4E4', bgcolor: '#F1F1F1', width: '100%', height: '40vh', padding: 3}}>
                        <Typography
                            variant={"h5"}
                            sx={{
                                fontFamily: 'Open Sans',
                                color: '#012d5a',
                                display: 'flex',
                                justifyContent: 'center',
                                height: '20%'
                            }}
                        >Service Request Usage</Typography>
                        <Box sx={{height: '80%'}}>
                            <PieChart
                                colors={['#ef476f', '#f78c6b', '#f6bd38', '#9f8be8', '#003a96', '#012d5a']}
                                series={[{
                                    data: serviceData,
                                }]}
                            />
                        </Box>
                    </Box>
            </Box>
            {/*<PanelGroup autoSaveId={"page-group"} direction={"vertical"}>*/}
            {/*    <Panel minSize={48} maxSize={48} collapsible={true}>*/}
            {/*        <PanelGroup autoSaveId={"chart-group"} direction={"horizontal"}>*/}
            {/*            <Panel defaultSize={50} minSize={35} maxSize={80} collapsible={true} order={1}>*/}
            {/*                <Box sx={{height: '100%', padding: 3}}>*/}
            {/*                    <Box sx={{bgcolor: '#E4E4E4', height: '100%', borderRadius: 2, padding: 3}}>*/}
            {/*                        <Typography*/}
            {/*                            variant={"h5"}*/}
            {/*                            sx={{*/}
            {/*                                fontFamily: 'Open Sans',*/}
            {/*                                color: '#012d5a',*/}
            {/*                                display: 'flex',*/}
            {/*                                justifyContent: 'center',*/}
            {/*                                height: '20%'*/}
            {/*                            }}*/}
            {/*                        >Service Request Usage</Typography>*/}
            {/*                        <Box sx={{height: '80%'}}>*/}
            {/*                            <PieChart*/}
            {/*                                series={[{*/}
            {/*                                    data: serviceData,*/}
            {/*                                }]}*/}
            {/*                            />*/}
            {/*                        </Box>*/}
            {/*                    </Box>*/}
            {/*                </Box>*/}
            {/*            </Panel>*/}
            {/*            <ResizeHandle/>*/}

            {/*            <Panel defaultSize={50} minSize={30} maxSize={80} collapsible={true} order={2}>*/}
            {/*                <Typography*/}
            {/*                    variant={"h5"}*/}
            {/*                    sx={{*/}
            {/*                        fontFamily: 'Open Sans',*/}
            {/*                        color: '#012d5a',*/}
            {/*                        display: 'flex',*/}
            {/*                        justifyContent: 'center',*/}
            {/*                    }}*/}
            {/*                >Unassigned and Assigned employees</Typography>*/}
            {/*                /!*<Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>*!/*/}
            {/*                /!*    {employeeData && (*!/*/}
            {/*                /!*        <CChartBar*!/*/}
            {/*                /!*            data={employeeData}*!/*/}
            {/*                /!*            options={{*!/*/}
            {/*                /!*                responsive: true,*!/*/}
            {/*                /!*                maintainAspectRatio: false,*!/*/}
            {/*                /!*                scales: {*!/*/}
            {/*                /!*                    y: {*!/*/}
            {/*                /!*                        max: 11,*!/*/}
            {/*                /!*                        min: 0,*!/*/}
            {/*                /!*                        ticks: {*!/*/}
            {/*                /!*                            stepSize: 1*!/*/}
            {/*                /!*                        }*!/*/}
            {/*                /!*                    }*!/*/}
            {/*                /!*                }*!/*/}
            {/*                /!*            }}*!/*/}
            {/*                /!*            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, padding: 20 }}*!/*/}
            {/*                /!*        />*!/*/}
            {/*                /!*    )}*!/*/}
            {/*                /!*</Box>*!/*/}
            {/*            </Panel>*/}
            {/*        </PanelGroup>*/}
            {/*    </Panel>*/}
            {/*    <ResizeHandle/>*/}
            {/*    <Panel defaultSize={20} collapsible={true} order={2}>*/}

            {/*    </Panel>*/}
            {/*</PanelGroup>*/}
        </>
    );
}
