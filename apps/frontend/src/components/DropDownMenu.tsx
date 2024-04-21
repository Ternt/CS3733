import MenuItem from "@mui/material/MenuItem";
import {Menu, Typography} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type MenuDataType = {
    label   : string;
    path    : string;
};

type DropdownProp = {
    label: string;
    menuData: MenuDataType[];
};

export default function DropDownMenu(prop: DropdownProp){
    const [anchorElRequests, setAnchorElRequests] = React.useState<null | HTMLElement>(null);
    const openRequests = Boolean(anchorElRequests);
    const navigate = useNavigate();

    const handleCloseRequests = () => {
        setAnchorElRequests(null);
    };

    const handleOnClickRequests = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRequests(event.currentTarget);
    };

    const handleClickMenuItemListRequests = (path: string) => {
        navigate(path);
        setAnchorElRequests(null);
    };

    return(
        <>
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
                <Typography sx={{fontSize: "0.9rem",}}>
                    {prop.label}
                    <ArrowDropDownIcon sx={{height: '1rem'}}/>
                </Typography>
            </Button>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{"aria-labelledby": "demo-customized-button"}}
                disableScrollLock={true}
                anchorEl={anchorElRequests}
                open={openRequests}
                onClose={handleCloseRequests}
                sx={{padding: 0}}
            >
                {prop.menuData.map((data) => (
                    <MenuItem
                        key={data.label}
                        onClick={() => handleClickMenuItemListRequests(data.path)}
                        disableRipple
                    >
                        {data.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
