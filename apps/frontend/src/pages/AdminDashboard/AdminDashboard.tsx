import {Box, CircularProgress, Typography} from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MapIcon from "@mui/icons-material/Map";
import TableViewIcon from "@mui/icons-material/TableView";
import MapCanvas from "../../components/Map/MapCanvas.tsx";
import { useState } from "react";
import DisplayCSV from "../TableDisplayPage/displayCSV.tsx";
import ServiceRequestOverview from "./ServiceRequestOverview.tsx";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export default function AdminDashboard() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  let tabInject = <></>;

  if (selectedTab === 0) {
    tabInject = (<ServiceRequestOverview/>);
  } else if (selectedTab === 1) {
    tabInject = (
      <MapCanvas
        defaultFloor={1}
        pathfinding={null}
        startLocation={""}
        endLocation={""}
      />
    );
  } else if (selectedTab === 2) {
    tabInject = <DisplayCSV />;
  }

  function handleSelect(i: number) {
    setSelectedTab(i);
    console.log(i);
  }

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
            tabs={["Menu", "Map", "Analytics"]}
            onSelect={(i) => {
              handleSelect(i);
            }}
          >
            <ViewKanbanIcon/>
            <MapIcon/>
            <TableViewIcon/>
          </SidebarMenu>
          <Box
            sx={{
              height: "90vh",
              width: "100%",
            }}
          >
            {tabInject}
          </Box>
        </Box>
      </>
    );
  }
}
