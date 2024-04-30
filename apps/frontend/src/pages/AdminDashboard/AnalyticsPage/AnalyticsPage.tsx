import React, {useState} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import CustomPieChart from "./CustomPieChart.tsx";
// import Paper from "@mui/material/Paper";
// import {CChartBar} from "@coreui/react-chartjs";
// import {CircularProgress} from "@mui/material";
import {BarChart} from "@mui/x-charts";

import ButtonBase from "@mui/material/ButtonBase";
import {motion} from "framer-motion";

export default function AnalyticsPage(){
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
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <BarChart
                        width={500}
                        height={300}
                        series={[
                            { data: siteData, label: 'Page visits', id: 'pvId' },
                        ]}
                        xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    />
                </Box>
        </>
    );
}
