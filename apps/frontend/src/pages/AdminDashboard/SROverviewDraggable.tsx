import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

import Box from '@mui/material/Box';
// import {Typography} from '@mui/material';

import {AssignedEmployee, ServiceRequest} from '../../helpers/typestuff.ts';
import {EmployeeAutocompleteOption} from '../../components/EmployeeAutoComplete.tsx';
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
    const [state , setState] = useState<ColumnData>(initialData);

    function updateServiceRequestData(){
        axios.get('/api/service-requests').then((res: AxiosResponse) => {
            const parsed = JSON.parse(JSON.stringify(initialData));
            res.data.forEach((serviceRequest: ServiceRequest) => {
                const id = serviceRequest.type.toLowerCase();
                parsed.columns[id].tasks.push(serviceRequest);
            });
            console.log(parsed);
            setState(parsed);
        });
        axios.get('/api/employees').then((res: AxiosResponse) => {
            if(res.status !== 200){
                console.error('die');
            }
            const employeeDropdownOptions: EmployeeAutocompleteOption[] = [];
            res.data.forEach((employee: AssignedEmployee)=> {
                employeeDropdownOptions.push({
                    label: employee.firstName + ' ' + employee.lastName,
                    id: employee.id,
                });
            });
            console.log(employeeDropdownOptions);
        });
    }

    useEffect(() => {
        updateServiceRequestData();
    }, []);

    return(
        <Box sx={{display: 'flex', flexDirection: 'row', padding: 3, gap: 3}}>
            {state.columnOrder.map((columnID) => {
                const column = state.columns[columnID];
                return(<Column key={column.id} title={column.title} tasks={column.tasks} />);
            })
            }
        </Box>
    );
}
