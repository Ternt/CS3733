import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import logo from "../../assets/Brigham_and_Womens_Hospital_Logo_White.png";
import {useNavigate} from "react-router-dom";
import SearchBar from "../SearchBar/searchBar.tsx";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton.tsx";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {LanguageSelect} from "./LanguageSelect.tsx";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

import DropDownMenu from "../DropDownMenu.tsx";
import NavbarItem from "./NavbarItem.tsx";
// import DarkModeToggle from "./DarkModeSwitch.tsx";

export type ResponsiveAppBarProps = {
    chatbotOpen: boolean;
    toggleChatbot: () => void;
    onSetLanguage: (l: string) => void;
}

export default function ResponsiveAppBar(props: ResponsiveAppBarProps) {

    const staffServices = [
        {label:  TranslateTo("services.Sanitation"), path: "/sanitation"},
        {label: TranslateTo("services.Medicine"), path: "/medicine-request"},
        {label: TranslateTo("services.Flwr"), path: "/flower-request"},
        {label: TranslateTo("services.Gift"), path: "/gift-request"},

    ];

    const normalServices = [
        {label: TranslateTo("services.Flwr"), path: "/flower-request"},
        {label: TranslateTo("services.Gift"), path: "/gift-request"},
    ];

    const navigate = useNavigate();
    const {user, isAuthenticated, isLoading} = useAuth0();
    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };
    let permissionLevel = 0;
    if (isAuthenticated) {
        permissionLevel = 1;
        if (user?.email && user.email.substring(0, 5) === "admin") {
            permissionLevel = 2;
        }
    }


    return (
        <AppBar
            position="static"
            sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#012d5a",
                height: "100%",
                maxHeight: "10vh",
                boxShadow: "none",
                position: 'fixed',
                zIndex: 3,
            }}
        >
            <Container maxWidth="xl" sx={{maxHeight: "100%"}}>
              <Toolbar disableGutters sx={{height: "10vh"}}>
                <Box
                  sx={{
                    flexGrow: 1,
                    maxHeight: "10vh",
                    display: {xs: "none", md: "flex", justifyContent: "flex-start"},
                  }}
                >
                        <Link
                            href=""
                            underline="none"
                            sx={{}}
                        >
                            <Box
                                component="img"
                                className={"logo"}
                                src={logo}
                                alt={"logo"}
                                onClick={() => handleMenuItemClick("")}
                                sx={{width: "4vh", aspectRatio: "294/423", mx: 1, p: "1%"}}
                            ></Box>
                        </Link>
                        <NavbarItem title={TranslateTo("navB.Home")} link={"/"}/>
                        <NavbarItem title={TranslateTo("navB.Map")} link={"/map"}/>
                      {!isLoading && (
                            <>
                                {permissionLevel === 2 && (
                                    <NavbarItem title={TranslateTo("navB.Admin")} link={"/admin"}/>
                                )}
                                {permissionLevel >= 1 && (
                                    <DropDownMenu label={TranslateTo("navB.ServiceReq")} menuData={staffServices}></DropDownMenu>
                                )}
                                {permissionLevel == 0 && (
                                    <DropDownMenu label={"SERVICES"} menuData={normalServices}></DropDownMenu>
                                )}
                            </>
                        )}
                    </Box>
                    <LiveHelpIcon
                        sx={{
                            fontSize: '2rem',
                            color: (props.chatbotOpen ? "#f6bd38" : 'white'),
                            '&:hover': {
                                opacity: 0.9,
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => {
                            props.toggleChatbot();
                        }}
                    />
                    <>
                        <LanguageSelect
                            toggleChatbot={props.toggleChatbot}
                            chatbotOpen={props.chatbotOpen}
                            onSetLanguage={props.onSetLanguage}/>

                        {/*<DarkModeToggle/>*/}
                    </>
                    <SearchBar/>
                    <LoginButton/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
