import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,
    MenuItem,
    Link,
    Menu,
    Typography
} from "@mui/material";
import logo from "../../assets/Brigham_and_Womens_Hospital_Logo_White.png";
import {useNavigate} from "react-router-dom";
import SearchBar from "../SearchBar/searchBar.tsx";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

const services = [
    {label: "Sanitation", path: "/sanitation"},
    {label: "Medicine Delivery", path: "/medicine-request"},
    {label: "Flowers", path: "/flower-request"},
    {label: "Gift", path: "/gift-request"},
];

function ResponsiveAppBar() {
    const [anchorElRequests, setAnchorElRequests] =
        React.useState<null | HTMLElement>(null);
    const [icon, setIcon] = React.useState("unread");
    const openRequests = Boolean(anchorElRequests);

    const navigate = useNavigate();
    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    const handleCloseRequests = () => {
        setAnchorElRequests(null);
    };

    const handleOnClickRequests = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRequests(event.currentTarget);
    };

    const handleClickMenuItemListRequests = (path: string) => {
        console.log(path);
        navigate(path);
        setAnchorElRequests(null);
    };

    const toggleChatbotIcon = () => {
        setIcon(icon === 'unread' ? 'chat' : 'unread');
    };

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
                            <Typography
                                sx={{
                                    fontSize: "0.9rem",
                                }}
                            >
                                Admin
                            </Typography>
                        </Button>

                        <Button
                            key={"Request Services"}
                            id="demo-customized-button"
                            aria-controls={openRequests ? "demo-customized-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openRequests ? "true" : undefined}
                            onClick={handleOnClickRequests}
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
                                sx={{
                                    fontSize: "0.9rem",
                                }}
                            >
                                Service Requests
                                <ArrowDropDownIcon sx={{
                                    height: '1rem'
                                }}/>
                            </Typography>
                        </Button>
                        <Menu
                            id="demo-customized-menu"
                            MenuListProps={{
                                "aria-labelledby": "demo-customized-button",
                            }}
                            disableScrollLock={true}
                            anchorEl={anchorElRequests}
                            open={openRequests}
                            onClose={handleCloseRequests}
                            sx={{
                                padding: 0,
                            }}
                        >
                            {services.map((services) => (
                                <MenuItem
                                    key={services.label}
                                    onClick={() => handleClickMenuItemListRequests(services.path)}
                                    disableRipple
                                >
                                    {services.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {icon === 'unread' ? (
                        <MarkChatUnreadIcon sx={{ marginRight: 1, color: 'white' }} onClick={toggleChatbotIcon} />
                    ) : (
                        <ChatBubbleIcon sx={{ marginRight: 1, color: 'white' }} onClick={toggleChatbotIcon} />
                    )}
                    <SearchBar/>
                    <Button
                        key={"login"}
                        onClick={() => handleMenuItemClick("/login")}
                        sx={{
                            my: "5vh",
                            height: "6vh",
                            paddingX: "2vw",
                            color: "black",
                            transition: "all 0.2s ease-in-out",
                            fontSize: 15,
                            display: "block",
                            background: "#f6bd38",

                            "&:hover": {
                                textDecoration: "underline",
                                background: "#f6bd38",
                                color: "black",
                            },
                        }}
                    >
                        {"login"}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
