import ButtonBase from "@mui/material/ButtonBase";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import {useState} from "react";

type TaskGroupProp = {
    label: string;
    children: JSX.Element;
}

export default function DataGroup(prop: TaskGroupProp){
    const [open, setOpen] = useState<boolean>(true);

    function handleOpen() {
        setOpen(!open);
    }

    return(
        <Card elevation={0} sx={{bgcolor: '#E4E4E4'}}>
            <ButtonBase
                sx={{display: 'flex', justifyContent: 'flex-start', width: '100%', height: '4vh'}}
                onClick={() => (
                    handleOpen())}
            >
                <CardContent>
                    <Typography>{prop.label}</Typography>
                </CardContent>
            </ButtonBase>
            <Collapse in={open}>
                <CardContent sx={{bgcolor: '#FFFFFF'}}>
                    {prop.children}
                </CardContent>
            </Collapse>
        </Card>
    );
}
