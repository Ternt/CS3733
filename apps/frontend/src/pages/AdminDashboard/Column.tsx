import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Droppable } from "@hello-pangea/dnd";

import {EmployeeAutoCompleteData, ServiceRequest} from "../../helpers/typestuff.ts";
import ServiceRequestCard from "./ServiceRequestCard.tsx";

type ColumnProp = {
    id: string;
    title: string;
    tasks: ServiceRequest[];
    autocomplete: EmployeeAutoCompleteData;
}

export default function Column(prop: ColumnProp){
    return(
        <Box sx={{borderRadius: 1, bgcolor: '#E4E4E4', minWidth: '22em', minHeight: '77vh', overflow: 'scroll'}}>

            {/* column header */}
            <Typography
                variant={'h5'}
                sx={{
                    bgcolor: '#012d5a',
                    color: '#f6bd38',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '0.5em'
                }}>
                {prop.title}
            </Typography>

            {/* service request cards */}
            <Droppable droppableId={prop.id}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{display: 'flex', flexDirection: 'column', padding: '0.5em'}}
                    >
                        {prop.tasks.map((service, index) => {
                            return(
                                <ServiceRequestCard
                                    key={service.requestID}
                                    index={index}
                                    serviceRequestData={service}
                                    autocomplete={prop.autocomplete}>
                                </ServiceRequestCard>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Box>
    );
}
