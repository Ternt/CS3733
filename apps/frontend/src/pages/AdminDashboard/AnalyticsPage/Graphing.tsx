import React, { useEffect, useState } from 'react';
import { CChartPie, CChartBar } from "@coreui/react-chartjs";
import axios from 'axios';
import Box from "@mui/material/Box";
import {CircularProgress, Typography} from "@mui/material";

type ChartData = {
    labels: string[];
    datasets: {
        label?: string;
        data: number[];
        backgroundColor: string[];
    }[];
};

const GraphPage = () => {
    const [serviceData, setServiceData] = useState<ChartData | null>(null);
    const [employeeData, setEmployeeData] = useState<ChartData | null>(null);



    useEffect(() => {
        // Fetch service request
        axios.get('/api/service-requests')
            .then(response => {
                // Prepare data for pie chart
                if(response.status !== 200)
                    return;
                console.log(response.status);
                const data = response.data.reduce((acc: { [key: string]: number }, request: {
                    type: string
                }) => {
                    if (['MAINTENANCE', 'SANITATION', 'FLOWER', 'GIFT', 'MEDICINE', 'RELIGIOUS'].includes(request.type)) {
                        acc[request.type] = (acc[request.type] || 0) + 1;
                    }
                    return acc;
                }, {});

                const data2 = response.data.reduce((acc: { [key: string]: number }, request: {
                    status: string
                }) => {
                    const status = request.status;
                    if (status === 'ASSIGNED') {
                        acc[status] = (acc[status] || 0) + 1;
                    }
                    return acc;
                }, {});

                const totalWorkers = 11;
                data2['UNASSIGNED'] = totalWorkers - (data2['ASSIGNED'] || 0);

                const employeeData = {
                    labels: ['Assigned', 'Unassigned'],
                    datasets: [
                        {
                            label: 'Employees',
                            data: [data2['ASSIGNED'] || 0, data2['UNASSIGNED'] || 0],
                            backgroundColor: ['#012d5a', '#f6bd38'],
                        },
                    ],
                };

                setEmployeeData(employeeData);

                setServiceData({
                    labels: Object.keys(data),
                    datasets: [
                        {
                            data: Object.values(data),
                            backgroundColor: ['#ef476f', '#f78c6b', '#f6bd38', '#9f8be8', '#003a96', '#012d5a'],
                        },
                    ],
                });
            })
            .catch(error => console.error(error));
    }, []);

    console.log("render");
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '70vh', paddingTop: "10vh"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
                <Typography
                    variant={"h5"}
                    sx={{
                        fontFamily: 'Open Sans',
                        color: '#012d5a',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >Service Request Usage</Typography>
                <Box sx={{ flex: 1, position: 'relative', height: '100%' }}>
                    {serviceData && (
                        <CChartPie
                            data={serviceData}
                            options={{ responsive: true, maintainAspectRatio: false }}
                            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                        />
                    )}
                    {serviceData === null && (
                        <CircularProgress/>
                    )}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
                <Typography
                    variant={"h5"}
                    sx={{
                        fontFamily: 'Open Sans',
                        color: '#012d5a',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >Unassigned and Assigned employees</Typography>
                <Box sx={{ flex: 1, position: 'relative', height: '100%' }}>
                    {employeeData && (
                        <CChartBar
                            data={employeeData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        max: 11,
                                        min: 0,
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }}
                            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default GraphPage;
