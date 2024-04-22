import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import logo from "../../assets/Brigham_and_Womens_Hospital_Logo_White.png";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import SearchBar from "../SearchBar/searchBar.tsx";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton.tsx";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import DropDownMenu from "../DropDownMenu.tsx";

const services = [
    {label: "Sanitation", path: "/sanitation"},
    {label: "Medicine Delivery", path: "/medicine-request"},
    {label: "Flowers", path: "/flower-request"},
    {label: "Gift", path: "/gift-request"},
    {label: "Language Interpreter", path: "/language-request"},
];

type ResponsiveAppBarProps = {
    chatbotOpen: boolean;
    toggleChatbot: () => void;
}

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
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
                        <Button
                            key={"home"}
                            onClick={() => handleMenuItemClick("/")}
                            sx={{
                                color: "white",
                                display: "block",
                                fontSize: 15,
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    textDecoration: "underline",
                                    background: "#012d5a",
                                },
                            }}
                        >
                            <Typography
                                sx={{fontSize: "0.9rem",}}
                            >
                                Home
                            </Typography>
                        </Button>

                        <Button
                            key={"map"}
                            onClick={() => handleMenuItemClick("/map")}
                            sx={{
                                color: "white",
                                display: "block",
                                fontSize: 15,
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    textDecoration: "underline",
                                    background: "#012d5a",
                                },
                            }}
                        >
                            <Typography
                                sx={{fontSize: "0.9rem"}}
                            >
                                Map
                            </Typography>
                        </Button>

                        {!isLoading && (
                            <>{permissionLevel === 2 && (
                                    <Button
                                        key={"admin"}
                                        onClick={() => handleMenuItemClick("/admin")}
                                        sx={{
                                            color: "white",
                                            display: "block",
                                            fontSize: 15,
                                            transition: "all 0.2s ease-in-out",
                                            "&:hover": {
                                                textDecoration: "underline",
                                                background: "#012d5a",
                                            },
                                        }}
                                    >
                                        <Typography sx={{fontSize: "0.9rem"}}>
                                            Admin
                                        </Typography>
                                    </Button>
                                )}

                                {permissionLevel >= 1 && (
                                    <DropDownMenu label={"SERVICE REQUESTS"} menuData={services}></DropDownMenu>
                                )}
                            </>
                        )}
                    </Box>
                    <LiveHelpIcon
                        sx={{
                            fontSize: '2.4rem',
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
                    <SearchBar/>
                    <LoginButton/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
