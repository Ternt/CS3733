// import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

import {ServiceRequest} from "../../helpers/typestuff.ts";
import KanbanBoardCard from "./KanbanBoardCard.tsx";

type ColumnProp = {
    title: string;
    tasks: ServiceRequest[];
}

export default function Column(prop: ColumnProp){
    return(
        <Container sx={{bgcolor: '#E4E4E4'}}>
            <Typography sx={{display: 'flex', justifyContent: 'center', padding: 3}}>
                {prop.title}
            </Typography>
            {
                prop.tasks.map((service) => {
                    return(
                        <KanbanBoardCard serviceRequestData={service} />
                    );
                })
            }
        </Container>
    );
}
