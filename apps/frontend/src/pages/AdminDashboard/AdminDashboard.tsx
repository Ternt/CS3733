import { Box } from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import TableViewIcon from "@mui/icons-material/TableView";
import EditableMapCanvas from "../../components/editableMapCanvas.tsx";

export default function AdminDashboard() {
  function handleSelect(i: number) {
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
          <EditableMapCanvas floor={1} startLocation={"CCONF001L1"} />
        </Box>
      </Box>
    </>
  );
}
