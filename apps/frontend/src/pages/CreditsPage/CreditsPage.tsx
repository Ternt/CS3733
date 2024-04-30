import { Box } from "@mui/material";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu.tsx";
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Face6Icon from '@mui/icons-material/Face6';
import React, {useEffect, useState } from "react";
import SoftwareList from "../../components/CreditsPage/SoftwareList.tsx";
import Wongprism from "../../components/Wongprism.tsx";
import {useMediaQuery} from "@mui/system";

export default function CreditsPage() {
    useEffect(() => {
      document.title = "Credits";
    });
    const [selectedTab, setSelectedTab] = useState(0);
    const matches = useMediaQuery('(min-width: 900px)');
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
                        width: "100%",
                        height: "90vh",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: 'nowrap',
                        overflow:'hidden',
                    }}
                >
                    <SidebarMenu
                        isActive={matches}
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
                    <Box sx={{overflowY: 'scroll', width: '100%', zIndex: 1}}>
                        {tabInject}
                    </Box>
                </Box>
        </>
    );
}
