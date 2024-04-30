import { Box } from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Face6Icon from '@mui/icons-material/Face6';
import React, {useEffect, useState } from "react";
import SoftwareList from "../../components/CreditsPage/SoftwareList.tsx";
import Wongprism from "../../components/Wongprism.tsx";

export default function CreditsPage() {
    useEffect(() => {
      document.title = "Credits";
    });
    const [selectedTab, setSelectedTab] = useState(0);
    let tabInject = <></>;

    if (selectedTab === 0) {
      tabInject = (<SoftwareList/>);
    }else if (selectedTab === 1){
      tabInject = <Wongprism/>;
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
                        value={selectedTab}
                        tabs={["Libraries", "Special Thanks"]}
                        onSelect={(i) => {
                            setSelectedTab(i);
                        }}
                    >
                        <GroupsIcon/>
                        <LibraryBooksIcon/>
                        <Face6Icon/>
                    </SidebarMenu>
                    <Box
                        sx={{
                            height: "90vh",
                            width: "92vw",
                        }}
                    >
                        {tabInject}
                    </Box>
                </Box>
        </>
    );
}
