import React, {useState, useEffect} from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import CustomPieChart from "./CustomPieChart.tsx";
// import Paper from "@mui/material/Paper";
// import {CChartBar} from "@coreui/react-chartjs";
// import {CircularProgress} from "@mui/material";

import {BarChart, PieChart} from "@mui/x-charts";

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

    const siteData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

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

    console.log(employeeData);
    console.log(serviceData);

    return(
        <>
            <Box sx={{width: '100%', height: '10em', }}>
                <Typography variant={"h4"} sx={{height: '3.5em', padding: 3}}>
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
                                            }} layoutId={"chart_tab_underline"}/>) : null}
                                </ButtonBase>

                            </>
                        );
                    })}
                </Box>
            </Box>

            {/* Top panel */}
            {tab == 0 && (
                <>
                    <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '75vh'}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            borderRight: 1,
                            borderColor: '#E4E4EE'
                        }}>
                            <Box sx={{width: '100%', height: '4em'}}>
                                <Typography
                                    variant={"h5"}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        pl: 3,
                                        py: 2,
                                        borderBottom: 1,
                                        borderColor: '#E4E4E4'
                                    }}
                                >
                                    The site got {
                                    // First line just formats the number
                                    new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                        siteData.reduce((acc, number) => acc+number, 0))
                                } visits in the last week
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    transition: '0.5s',
                                    width: '100%',
                                    height: "100%",
                                    minWidth: '600px',
                                    pl: 3,
                                    py: 2,
                                }}>
                                <BarChart
                                    width={undefined}
                                    height={600}
                                    series={[
                                        { data: siteData, label: 'Page visits', id: 'pvId' },
                                    ]}
                                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                />
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column',width: '100%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                <Box sx={{display: 'flex', height: '100%', width: '100%', flexDirection: 'column'}}>
                                    <Typography
                                    variant={"h5"}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        pl: 3,
                                        py: 2,
                                        borderBottom: 1,
                                        borderColor: '#E4E4E4'
                                    }}
                                >
                                        Service Requests
                                </Typography>
                                    <Box sx={{display: 'flex',width: '100%', height: '30em'}}>
                                        <PieChart
                                            colors={['#ef476f', '#f78c6b', '#f6bd38', '#9f8be8', '#003a96', '#012d5a']}
                                            slotProps={{
                                                legend: {
                                                    position: {
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                }
                                            }}
                                            series={[{
                                                arcLabel: (item) => `${item.label} (${item.value})`,
                                                arcLabelMinAngle: 45,
                                                data: serviceData,
                                            }]}
                                            width={undefined}
                                            height={undefined}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}

        </>
    );
}
