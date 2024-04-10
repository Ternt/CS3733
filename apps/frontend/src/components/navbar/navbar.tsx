import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import "./navbar.scss";
import logo from "../../assets/logo_white_big.png";
import { useNavigate } from "react-router-dom";

const pages = [
  { label: "Map", path: "/map" },
  { label: "Request Service", path: "/service-request" },
  { label: "Service List", path: "/service-request-display" },
  { label: "Node and Edge Tables", path: "/tables" },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const navigate = useNavigate();
  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#012d5a",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleMenuItemClick(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            className={"logo"}
            src={logo}
            alt={"logo"}
            onClick={() => handleMenuItemClick("")}
          />

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
                  my: 3,
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
              key={"login"}
              onClick={() => handleMenuItemClick("/login")}
              sx={{
                my: 3,
                height: 45,
                paddingX: 5,
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
//Husky Test2
