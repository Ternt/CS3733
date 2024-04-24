import { Box } from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import React, { useState } from "react";
import StaffGrid from "../../components/CreditsPage/StaffGrid.tsx";
import SoftwareList from "../../components/CreditsPage/SoftwareList.tsx";

export default function CreditsPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    let tabInject = <></>;

    if (selectedTab === 0) {
        tabInject = (<StaffGrid/>);
    } else if (selectedTab === 1) {
        tabInject = (<SoftwareList/>);
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
                        tabs={["Meet the Team", "What We Used"]}
                        onSelect={(i) => {
                            setSelectedTab(i);
                        }}
                    >
                        <GroupsIcon/>
                        <LibraryBooksIcon/>
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
