import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import Box from '@mui/material/Box';

import {AssignedEmployee, ServiceRequest, AutoCompleteOption} from '../../helpers/typestuff.ts';
import CustomAutoComplete from '../../components/CustomAutoComplete.tsx';
import Column from './Column.tsx';


export interface Column<T>{
    [key: string]: T
}

export interface ColumnData{
    columns: Column<column>;
    columnOrder: string[];
}

export type column = {
    id: string;
    title: string;
    tasks: ServiceRequest[];
};

const initialData : ColumnData = {
    columns: {
        "medicine": {
            id: 'medicine',
            title: 'MEDICINE',
            tasks: [],
        },
        "sanitation": {
            id: 'sanitation',
            title: 'SANITATION',
            tasks: [],
        },
        "gift": {
            id: 'gift',
            title: 'GIFT',
            tasks: [],
        },
        "maintenance": {
            id: 'maintenance',
            title: 'MAINTENANCE',
            tasks: [],
        },
        "language": {
            id: 'language',
            title: 'LANGUAGE',
            tasks: [],
        },
        "religious": {
            id: 'religious',
            title: 'RELIGIOUS',
            tasks: [],
        }
    },
    columnOrder: ['medicine', 'sanitation', 'gift', 'maintenance', 'language', 'religious']
};

export default function ServiceRequestOverview(){

    // current state of the kanban board
    const [state , setState] = useState<ColumnData>(initialData);

    // original state of the kanban board before filtering
    const [originalState, setOriginalState] = useState<ColumnData>(initialData);

    // an array of employees for the autocomplete
    const [employeeList, setEmployeeList] = useState<AutoCompleteOption[]>([]);

    // an array of changes made to the kanban board
    // const [historyBuffer, setHistoryBuffer] = useState<{requestId: number}>();


    function updateServiceRequestData(){
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            const parsed = JSON.parse(JSON.stringify(initialData));
            res.data.forEach((serviceRequest: ServiceRequest) => {
                const id = serviceRequest.type.toLowerCase();
                parsed.columns[id].tasks.push(serviceRequest);
            });
            setState(parsed);
            setOriginalState(parsed);
        });
        axios.get('/api/employees').then((res: AxiosResponse) => {
            if(res.status !== 200){
                console.error('die');
            }
            const employeeDropdownOptions: AutoCompleteOption[] = [];
            res.data.forEach((employee: AssignedEmployee)=> {
                employeeDropdownOptions.push({
                    label: employee.firstName + ' ' + employee.lastName,
                    id: employee.id,
                });
            });
            setEmployeeList(employeeDropdownOptions);
        });
    }

    useEffect(() => {
        updateServiceRequestData();
    }, []);


    /**
     * event handling for dragging
     * @param result - an object which stores event data, for example, information of source and destination, type of drag event, etc.
     */
    function onDragEnd(result: DropResult){
        const {destination, source} = result;

        // return if destination is null
        if(!destination){
            return;
        }

        if(source.droppableId === destination.droppableId
            && source.index === destination.index) {
            return;
        }

        // swapping places in the array
        const column = state.columns[source.droppableId];
        const newTaskIds = Array.from(column.tasks);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, state.columns[source.droppableId].tasks[source.index]);

        const newColumn: column = {
            ...column,
            tasks: newTaskIds
        };

        const newState: ColumnData = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            }
        };

        setState(newState);
    }

    function onChange(value: AutoCompleteOption){
        let accumulatedFilter = state;
        accumulatedFilter.columnOrder.forEach((columnId) => {
            const column = state.columns[columnId];
            const filteredTasks = column.tasks.filter((request) => request.assignedEmployee?.id === value.id);

            const newColumn: column = {
                ...column,
                tasks: filteredTasks
            };

            accumulatedFilter = {
                ...accumulatedFilter,
                columns: {
                    ...accumulatedFilter.columns,
                    [newColumn.id]: newColumn
                }
            };
        });

        setState(accumulatedFilter);
    }

    function onClear(){
        setState(originalState);
    }

    return(
        <Box sx={{width: '100%', height: '100%'}}>
            {/* filter */}
            <Box sx={{backgroundColor: '#FFFFFF', width: '40em', height: '4em', pl: 3, pt: 3}}>
                <CustomAutoComplete label={"Filter..."} employeeList={employeeList} onChange={onChange} onClear={onClear}/>
            </Box>

            {/* columns + drag drop context */}
            <Box sx={{display: 'flex', flexDirection: 'row', overflowY: 'hidden', padding: 3, gap: 3}}>
                {state.columnOrder.map((columnID) => {
                    const column = state.columns[columnID];
                    return(
                        <DragDropContext
                            key={column.id}
                            onDragEnd={result => onDragEnd(result)}
                        >
                            <Column
                                id={column.id}
                                title={column.title}
                                tasks={column.tasks}
                                autocomplete={{
                                    employeeList: employeeList,
                                    updateFunction: updateServiceRequestData
                            }}/>
                        </DragDropContext>
                    );
                })
                }
            </Box>
        </Box>
    );
}
