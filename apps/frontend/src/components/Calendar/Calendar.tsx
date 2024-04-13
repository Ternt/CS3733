import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {useState} from "react";

export default function DateCalendarViews() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date: React.SetStateAction<null>) => {
        setSelectedDate(date);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateCalendar
                        defaultValue={dayjs('2003-12-06')}
                        views={['year', 'month', 'day']}
                        onChange={handleDateChange}

                    />
                    {selectedDate && (
                        <div>
                            <p>Year: {selectedDate.year()}</p>
                            <p>Month: {selectedDate.month() + 1}</p>
                            <p>Day: {selectedDate.date()}</p>
                        </div>
                    )}
        </LocalizationProvider>
    );
}
