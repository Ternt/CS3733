// import Card from "@mui/material/Card";
// import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Droppable } from "@hello-pangea/dnd";

import {ServiceRequest} from "../../helpers/typestuff.ts";
import KanbanBoardCard from "./KanbanBoardCard.tsx";

type ColumnProp = {
    id: string;
    title: string;
    tasks: ServiceRequest[];
}

export default function Column(prop: ColumnProp){
    return(
        <Container sx={{bgcolor: '#E4E4E4', minWidth: '20vw', minHeight: '65vh', overflow: 'scroll'}}>
            <Typography sx={{display: 'flex', justifyContent: 'center', padding: 3}}>
                {prop.title}
            </Typography>
            <Droppable droppableId={prop.id}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{display: 'flex', flexDirection: 'column' }}
                    >
                        {prop.tasks.map((service, index) => {
                            return(
                                <KanbanBoardCard key={service.requestID} index={index} serviceRequestData={service}></KanbanBoardCard>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Container>
    );
}
