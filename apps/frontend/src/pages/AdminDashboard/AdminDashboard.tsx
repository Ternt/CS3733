import { Box } from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import TableViewIcon from "@mui/icons-material/TableView";
import MapCanvas from "../../components/MapCanvas.tsx";
import { useState } from "react";
import DisplayCSV from "../TableDisplayPage/displayCSV.tsx";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  let tabInject = <></>;

  if (selectedTab === 0) {
    console.log("a");
  } else if (selectedTab === 1) {
    tabInject = (
      <MapCanvas
        defaultFloor={1}
        pathfinding={false}
        startLocation={"CCONF001L1"}
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
          <MenuIcon />
          <MapIcon />
          <TableViewIcon />
        </SidebarMenu>
        <Box
          sx={{
            height: "80vh",
            width: "100%",
          }}
        >
          {tabInject}
        </Box>
      </Box>
    </>
  );
}
