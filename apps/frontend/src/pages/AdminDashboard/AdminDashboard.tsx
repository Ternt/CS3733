import {Box, CircularProgress, Typography} from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MapIcon from "@mui/icons-material/Map";
import TableViewIcon from "@mui/icons-material/TableView";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MapCanvas from "../../components/Map/MapCanvas.tsx";
import React, {useEffect, useState} from "react";
import DisplayCSV from "../../components/DataHandling/DisplayCSV.tsx";
import Graphing from "./Graphing.tsx";
import ServiceRequestOverview from "./ServiceRequestOverview.tsx";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import UploadGraphData from "../../components/DataHandling/UploadGraphData.tsx";
import EmployeeTable from "../../components/DataHandling/EmployeeTable.tsx";
import UploadEmployeeData from "../../components/DataHandling/UploadEmployeeData.tsx";
import { io } from 'socket.io-client';



export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        // Connect to the server using link, prob amazon link in future
        const socket = io('http://localhost:3000');

        // Emit mouse position to the server
        const handleMouseMove = (event: MouseEvent) => {
            socket.emit('mousePosition', { x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Listen for mouse position events from the server
        socket.on('mousePosition', (data) => {
            console.log(`Mouse position of another user: ${data.x}, ${data.y}`);
            // handle the data as needed
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            socket.disconnect();
        };
    }, []);

  const tabSelector = [
    <ServiceRequestOverview/>,
    <MapCanvas
      defaultFloor={1}
      pathfinding={null}
      startLocation={""}
      endLocation={""}
    />,
    <Box>
      <DisplayCSV />
      <UploadGraphData />
    </Box>,
    <Graphing />,
    <>
      <EmployeeTable/>
      <UploadEmployeeData/>
    </>
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
            width: "100vw",
            height: "80vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          <SidebarMenu
            value={0}
            tabs={["Menu", "Map", "Data", "Charts", "Employees"]}
            onSelect={(i) => {
              setSelectedTab(i);
            }}
          >
            <ViewKanbanIcon/>
            <MapIcon/>
            <TableViewIcon/>
            <SignalCellularAltIcon/>
            <PersonIcon/>
          </SidebarMenu>
          <Box
            sx={{
              height: "90vh",
              width: "92vw",
            }}
          >
            {tabSelector[selectedTab]}
          </Box>
        </Box>
      </>
    );
  }
}
