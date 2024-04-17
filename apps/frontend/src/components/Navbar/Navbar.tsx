import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import logo from "../../assets/Brigham_and_Womens_Hospital_Logo_White.png";
import { useNavigate } from "react-router-dom";
import { Menu, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBar from "../SearchBar/searchBar.tsx";
import {useAuth0} from "@auth0/auth0-react";
// import User from '../../../../../packages/common/src/User.tsx';



const services = [
  { label: "Sanitation", path: "/sanitation" },
  { label: "Medicine Delivery", path: "/medicine-request" },
  { label: "Flowers", path: "/flower-request" },
  { label: "Gift", path: "/gift-request" },
];

function ResponsiveAppBar() {
  const [anchorElRequests, setAnchorElRequests] =
    React.useState<null | HTMLElement>(null);
  const openRequests = Boolean(anchorElRequests);

  const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated); //to debug
    const handleMenuItemClick = (path: string) => {
    navigate(path);
  };
    let permissionLevel = 0;
    if(isAuthenticated){
        permissionLevel = 1;
        if (user?.email && user.email.substring(0, 5) === "admin") {
            permissionLevel = 2;
        }
    }
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
                display: { xs: "none", md: "flex", justifyContent: "flex-start" },
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
              sx={{width: "4vh", aspectRatio: "294/423", mx: 1, p:"1%"}}
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
              {!isLoading && (
                  <>

                      {permissionLevel === 2 && (

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
                                      fontSize: "1.1rem",
                                  }}
                              >
                                  Admin
                              </Typography>
                          </Button>
                      )}

                      {permissionLevel >= 1 && (
                          <><Button
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
                          </Button></>
                      )}




                  </>
              )}
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
          <SearchBar />
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
