import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import "./navbar.scss";
import logo from "../../assets/Brigham_and_Womens_Hospital_Logo_White.png";
import { useNavigate } from "react-router-dom";
import { Menu, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchBar from "../SearchBar/searchBar.tsx";

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

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#012d5a",
        maxHeight: "10vh",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href=""
            underline="none"
            sx={{
              maxWidth: "30%",
            }}
          >
            <Box
              component="img"
              className={"logo"}
              src={logo}
              alt={"logo"}
              onClick={() => handleMenuItemClick("")}
              sx={{
                width: "1.6vw",
                marginRight: "2vw",
              }}
            ></Box>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-start" },
            }}
          >
            <Button
              key={"home"}
              onClick={() => handleMenuItemClick("/")}
              sx={{
                my: "5vh",
                mr: "1vw",
                height: 45,
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
                  fontSize: "2.3vh",
                }}
              >
                Home
              </Typography>
            </Button>

            <Button
              key={"map"}
              onClick={() => handleMenuItemClick("/map")}
              sx={{
                my: "5vh",
                mr: "1vw",
                height: 45,
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
                  fontSize: "2.3vh",
                }}
              >
                Map
              </Typography>
            </Button>

            <Button
              key={"admin"}
              onClick={() => handleMenuItemClick("/admin")}
              sx={{
                my: "5vh",
                mr: "1vw",
                height: 45,
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
                  fontSize: "2.3vh",
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
                my: "5vh",
                mr: "1vw",
                height: 45,
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
                  fontSize: "2.3vh",
                }}
              >
                Service Requests
                <ArrowDropDownIcon />
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
