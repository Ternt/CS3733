import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

import {useMediaQuery} from "@mui/system";
import Button from "@mui/material/Button";
import {Box, CircularProgress, Typography} from "@mui/material";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MapIcon from "@mui/icons-material/Map";
import TableViewIcon from "@mui/icons-material/TableView";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
// import PersonIcon from '@mui/icons-material/Person';

import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import MapCanvas from "../../components/Map/MapCanvas.tsx";
import DataPage from "./DataPage.tsx";
import Graphing from "./AnalyticsPage/Graphing.tsx";
import ServiceRequestOverview from "./ServiceRequestOverview.tsx";
import AnalyticsPage from "./AnalyticsPage/AnalyticsPage.tsx";

export default function AdminDashboard() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);

    // For conditional styling. Different styles applied depending on size of screen.
    const matches = useMediaQuery('(min-width: 900px)');

    const tabSelector = [
        <ServiceRequestOverview/>,
        <MapCanvas
            defaultFloor={1}
            pathfinding={null}
            startLocation={""}
            endLocation={""}
        />,
        <AnalyticsPage/>,
        <DataPage/>,
        <Graphing />,
    ];

    if(isLoading){
        return (
            <Box sx={{width:'100%', height:'90vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <CircularProgress />
            </Box>
        );
    }else if(!isAuthenticated){
        return (
            <Box sx={{gap:1,width:'100%', height:'90vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <Typography variant={"h1"}>403</Typography>
                <Typography variant={"h5"}>Access Denied</Typography>
                <Button
                    variant={"contained"}
                    onClick={()=>navigate("/")}
                >Return Home</Button>
            </Box>
        );
    }else {
        return (
            <>
                <Box
                    sx={{
                        width: "100%",
                        height: "90vh",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'nowrap',
                        overflow:'hidden',
                    }}
                >
                    {/* Sidebar */}
                    <SidebarMenu
                        isActive={matches}
                        sx={{
                            borderRight: 1,
                            borderColor: '#E4E4E4',
                        }}
                        value={0}
                        tabs={["Menu", "Map", "Data", "Analytics","Charts"]}
                        onSelect={(i) => {
                            setSelectedTab(i);
                        }}
                    >
                        <ViewKanbanIcon/>
                        <MapIcon/>
                        <SignalCellularAltIcon/>
                        <TableViewIcon/>
                        <SignalCellularAltIcon/>
                    </SidebarMenu>

                    {/* Tabs */}
                    <Box sx={{overflowY: 'scroll', width: '100%'}}>
                        {tabSelector[selectedTab]}
                    </Box>
                </Box>
            </>
        );
    }
}
