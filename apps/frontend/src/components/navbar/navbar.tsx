import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import "./navbar.scss";
import logo from "../../assets/logo_white_big.png";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";

const pages = [
  { label: "Map", path: "/map" },
  { label: "Service List", path: "/service-request-display" },
  { label: "Node and Edge Tables", path: "/tables" },
];

const services = [
  { label: "Sanitation", path: "/sanitation" },
  { label: "Medicine Delivery", path: "/medicine-request" },
  { label: "Flowers", path: "/flower-request" },
  { label: "Gift", path: "/gift-request" },
];

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickMenuItemList = (path: string) => {
    console.log(path);
    navigate(path);
    setAnchorEl(null);
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
                width: "250px",
              }}
            ></Box>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleMenuItemClick(page.path)}
                sx={{
                  my: "5vh",
                  mr: 3,
                  height: 45,
                  color: "white",
                  display: "block",
                  fontSize: 15,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    background: "#012d5a",
                  },
                }}
              >
                {page.label}
              </Button>
            ))}

            <Button
              key={"Request Services"}
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleOnClick}
              sx={{
                my: "5vh",
                mr: 3,
                height: 45,
                color: "white",
                display: "block",
                fontSize: 15,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  background: "#012d5a",
                },
              }}
            >
              {"Request Services"}
            </Button>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                padding: 0,
              }}
            >
              {services.map((services) => (
                <MenuItem
                  key={services.label}
                  onClick={() => handleClickMenuItemList(services.path)}
                  disableRipple
                >
                  {services.label}
                </MenuItem>
              ))}
            </Menu>

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
                  transform: "translateY(-5px)",
                  background: "#f6bd38",
                  color: "black",
                },
              }}
            >
              {"login"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
