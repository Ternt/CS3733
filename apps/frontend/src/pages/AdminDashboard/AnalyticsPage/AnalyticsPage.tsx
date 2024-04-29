import React, {useState, useEffect} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {PanelGroup, Panel} from "react-resizable-panels";
import {Resizable} from "re-resizable";
import {PieChart, BarChart} from "@mui/x-charts";
// import CustomPieChart from "./CustomPieChart.tsx";
// import Paper from "@mui/material/Paper";
// import {CChartBar} from "@coreui/react-chartjs";
// import {CircularProgress} from "@mui/material";

import ResizeHandle from "./ResizeHandle.tsx";
import ButtonBase from "@mui/material/ButtonBase";
import {motion} from "framer-motion";

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
    const [tab, setTab] = useState<number>(0);

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
                                // TRANSLATE HERE MAURI VVV
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

                console.log(Object.values(employeeData));
                setServiceData(Object.values(serviceData));
            })
            .catch(error => console.error(error));
    }, []);

    return(
        <>
            <Box sx={{width: '100%', height: '10em', }}>
                <Typography variant={"h4"} sx={{height: '3em', padding: 3}}>
                    Data Analytics
                </Typography>
                <Box sx={{display: 'flex', borderBottom: 1, borderColor: '#E4E4E4', flexDirection: 'row', width: '100%', height: '2.5em'}}>
                    {["Overview"].map((value, i) => {
                        return(
                            <>
                                <ButtonBase
                                    onClick={() => setTab(i)}
                                    sx={{
                                        p: 0,
                                        width: '5em',
                                        marginLeft: '1.3em',
                                        height: '100%',
                                        textAlign: 'center',
                                    }}
                                    key={i}
                                >
                                    <Typography>
                                        {value}
                                    </Typography>
                                    {i === tab ?
                                        (<motion.div
                                            style={{
                                                backgroundColor: "#f6bd38",
                                                width: '5em',
                                                marginTop: '2.35em',
                                                height: '0.2em',
                                                position: 'absolute'
                                            }} layoutId={"tab_underline"}/>) : null}
                                </ButtonBase>

                            </>
                        );
                    })}
                </Box>
            </Box>

            {/* Top panel */}
            {tab == 0 && (

            <Box sx={{width: '60%', height: '100%'}}>
                <PanelGroup autoSaveId={"page-group"} direction={"vertical"}>
                    <Panel maxSize={50} minSize={30} collapsible={true}>
                        <Box sx={{display: 'flex', height: '100%', width: '100%', flexDirection: 'row', padding: 3}}>
                            <Resizable
                                defaultSize={{
                                    height: '100%',
                                    width: '50%',
                                }}
                                minWidth={'30vw'}
                                maxWidth={'35vw'}
                                maxHeight={'100%'}
                                bounds={'window'}
                            >
                                <Box sx={{pr: 3, height: '100%'}}>
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
                                                colors={['#ef476f', '#f78c6b', '#f6bd38', '#9f8be8', '#003a96', '#012d5a']}
                                                series={[{
                                                    data: serviceData,
                                                }]}
                                                width={undefined}
                                                height={undefined}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Resizable>
                            <Box sx={{pl: 3, height: '100%', width: '100%' }}>
                                <Box sx={{border: 1, borderColor: '#E4E4E4', bgcolor: '#F1F1F1', height: '100%', width: '100%', padding: 3}}>
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
                                                width={undefined}
                                                height={undefined}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Panel>
                    <ResizeHandle/>

                    {/* Bottom Panel */}
                    <Panel defaultSize={20} collapsible={true} order={2}>

                    </Panel>
                </PanelGroup>
            </Box>
            )}
        </>
    );
}
