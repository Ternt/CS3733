import React, {useEffect, useState} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import {PanelGroup, Panel} from "react-resizable-panels";
import {Resizable} from "re-resizable";
import {PieChart, BarChart} from "@mui/x-charts";
// import CustomPieChart from "./CustomPieChart.tsx";
// import Paper from "@mui/material/Paper";
// import {CChartBar} from "@coreui/react-chartjs";
// import {CircularProgress} from "@mui/material";

// import ResizeHandle from "./ResizeHandle.tsx";
//
type DataObject = {
    [key: string]: Data
}

type Data = {
    id: number;
    value: number;
    label: string;
};

type BarChartData = {
    data: number[]
}

export default function AnalyticsPage(){
    const [serviceData, setServiceData] = useState<Data[]>([{id: 0, value: 0, label: ''}]);
    const [employeeData] = useState<BarChartData[]>([{data: [2, 3, 4, 5]}]);

    useEffect(() => {
        // Fetch service request
        axios.get('/api/service-requests')
            .then(response => {
                // Prepare data for pie chart
                if(response.status !== 200) {return;}

                let dataID = 0;
                function createDataObject(acc: DataObject, dataGroup: string[], filterString: string){
                    if(dataGroup.includes(filterString)) {
                        const id = filterString;
                        if(acc[id] === undefined){
                            acc[id] = {
                                id: dataID,
                                value: (acc[id]===undefined)?0:(acc[id].value + 1),
                                label: filterString,
                            };
                            dataID += 1;
                        }
                        acc[id].value += 1;
                    }
                    return acc;
                }

                const requestTypes = ['MAINTENANCE', 'SANITATION', 'FLOWER', 'GIFT', 'MEDICINE', 'RELIGIOUS'];
                const serviceData = response.data
                    .reduce((acc: DataObject, request: { type: string }) => {
                        return createDataObject(acc, requestTypes, request.type);
                    }, {});

                const statusTypes = ['UNASSIGNED', 'ASSIGNED', 'IN_PROGRESS', 'CLOSED'];
                const employeeData = response.data.reduce((acc: DataObject , request: { status: string }) => {
                    return createDataObject(acc, statusTypes, request.status);
                }, {});

                Object.values(employeeData).map((data) => {
                    console.log(typeof data);
                });
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
                        maxHeight={'60vh'}
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
                                    }]}
                                />
                            </Box>
                        </Box>
                    </Resizable>
                    <Box sx={{border: 1, borderColor: '#E4E4E4', bgcolor: '#F1F1F1', width: '100%', padding: 3}}>
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
                            <Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: ['Unassigned', 'Assigned', 'In-Progress', 'Closed'] }]}
                                    series={employeeData}
                                />
                            </Box>
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
