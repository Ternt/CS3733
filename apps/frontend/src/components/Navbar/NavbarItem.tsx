import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";

type NavbarItemProps = {
  title:string;
  link:string;
};
export default function NavbarItem(props: NavbarItemProps){
  const navigate = useNavigate();

  return (
    <Button
      key={props.title}
      onClick={() => navigate(props.link)}
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
        {props.title}
      </Typography>
    </Button>
  );
}