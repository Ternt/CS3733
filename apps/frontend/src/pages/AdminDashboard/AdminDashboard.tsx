import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

import {useMediaQuery} from "@mui/system";
import Button from "@mui/material/Button";
import {Box, CircularProgress, Typography} from "@mui/material";

import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MapIcon from "@mui/icons-material/Map";
import TableChartSharpIcon from '@mui/icons-material/TableChartSharp';
import PollSharpIcon from '@mui/icons-material/PollSharp';

import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import MapCanvas from "../../components/Map/MapCanvas.tsx";
import DataPage from "./DataPage.tsx";
import ServiceRequestOverview from "./ServiceRequestOverview.tsx";
import AnalyticsPage from "./AnalyticsPage/AnalyticsPage.tsx";
import { io } from 'socket.io-client';
import mouseCursor from "../../assets/mouse-cursor.jpg";



export default function AdminDashboard() {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
  const [otherUserMousePosition, setOtherUserMousePosition] = useState<{ [id: string]: { id: string, x: number, y: number, tabId: number } }>({});
  useEffect(() => {
        // Connect to the server using link, prob amazon link in future
        const socket = io('http://localhost:3005');
        console.log('Selected tab:', selectedTab);

        const handleMouseMove = (event: MouseEvent) => {
            // Include the user ID when emitting the mouse position
            const userData = { id: socket.id, x: event.clientX, y: event.clientY, tabId: selectedTab };

            socket.emit('mousePosition', userData);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Listen for mouse position events from the server
        socket.on('mousePosition', (userData) => {
            setOtherUserMousePosition(prevState => ({
                ...prevState,
                [userData.id]: userData
            }));
        });

      socket.on('userDisconnected', (userId) => {
          console.log('userDisconnected event triggered with userId: ', userId);
          setOtherUserMousePosition(prevState => {
                const newState = { ...prevState };
                delete newState[userId];
                return newState;
          });
      });

      return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          socket.disconnect();
      };
  }, [selectedTab]);

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
                        tabs={["Menu", "Map", "Charts", "Analytics"]}
                        onSelect={(i) => {
                            setSelectedTab(i);
                        }}
                    >
                        <ViewKanbanIcon/>
                        <MapIcon/>
                        <TableChartSharpIcon/>
                        <PollSharpIcon/>
                    </SidebarMenu>

                    {/* Tabs */}
                    <Box sx={{overflowY: 'scroll', width: '100%', zIndex: 1}}>
                        {tabSelector[selectedTab]}
                    </Box>
                </Box>
                {
                    Object.values(otherUserMousePosition).filter((x)=>x.tabId===selectedTab).map((userData) => (
                        <div
                            key={userData.id} // Use the user's ID as the key
                            style={{
                                position: 'absolute',
                                top: userData.y,
                                left: userData.x,
                                zIndex: 1000,
                            }}
                        >
                            <img
                                src={mouseCursor}
                                alt="mouse cursor"
                                style={{
                                    width: '15px',
                                    height: '15px',
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '0',
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    padding: '2px',
                                    fontSize: '15px',
                                }}
                            >{userData.id}</span>
                        </div>
                    ))
                }
            </>
        );
  }
}
