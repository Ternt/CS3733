import React, { useEffect, useState} from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LineChart, PieChart } from '@mui/x-charts';
import {
    TextField,
    FormControl,
    MenuItem,
    Button,
    Box,
    Typography,
    // InputAdornment, IconButton,
} from "@mui/material";
// import EventIcon from '@mui/icons-material/Event';
import LocationDropdown from "../../components/LocationDropdown.tsx";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import FooterBar from "../../components/Footerbar/footer.tsx";


type FormInputs = {
    name: string;
    serviceType: string;
    hospitalRoom: string;
    endLocation: string;
    religiousLeaderName: string;
    date: string;
    time: string;
    status: string;
}

const years = [
    new Date(2000, 0, 1),
    new Date(2001, 0, 1),
    new Date(2002, 0, 1),
    new Date(2003, 0, 1),
    new Date(2004, 0, 1),
    new Date(2005, 0, 1),
    new Date(2006, 0, 1),
    new Date(2007, 0, 1),
    new Date(2008, 0, 1),
    new Date(2009, 0, 1),
    new Date(2010, 0, 1),
    new Date(2011, 0, 1),
    new Date(2012, 0, 1),
    new Date(2013, 0, 1),
    new Date(2014, 0, 1),
    new Date(2015, 0, 1),
    new Date(2016, 0, 1),
    new Date(2017, 0, 1),
    new Date(2018, 0, 1),
    new Date(2019, 0, 1),
    new Date(2020, 0, 1),
    new Date(2021, 0, 1),
    new Date(2022, 0, 1),
    new Date(2023, 0, 1),
    new Date(2024, 0, 1),
];

const ChristianityGrowth = [
    33, 35, 37, 38, 40, 42, 43, 44, 45, 47, 46, 45,
    44, 43, 42, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31
];

const IslamGrowth = [
    10, 11, 12, 14, 16, 18, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38
];

const HinduismGrowth = [
    5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16
];

const BuddhismGrowth = [
    4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8,
    8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12
];



function ReligiousRequestForm() {
    useEffect(() => {
        document.title = "Religious Service Request";
    });

    // const [calendarMenuFlag, setCalendarMenuFlag] = useState<boolean>(false);
    //const [timeMenuFlag, setTimeMenuFlag] = useState<boolean>(false);
    const d = new Date();
    console.log();
    const [formInput, setFormInput] = useState<FormInputs>({
        name: "",
        serviceType: "",
        hospitalRoom: "",
        endLocation: "",
        religiousLeaderName: "",
        date: d.getFullYear()+"-"+(1+d.getMonth())+"-"+d.getDate(),
        time: String(d.getHours()).padStart(2,'0')+":"+String(d.getMinutes()).padStart(2,'0')+":00",
        status: "",
    });

    function isComplete(): boolean {
        return Object.values(formInput).every(x => x !== null && x !== '');
    }

    const handleChange = (prop: keyof FormInputs, value: string) => {
        setFormInput({...formInput, [prop]: value});
    };

    function submitForm() {
        if (isComplete()) {
            console.log("Submitting Religious Service Request");
            const serviceRequest = {
                type: "RELIGIOUS",
                notes: "None",
                priority: "LOW",
                status: "UNASSIGNED",
                locationID: formInput.hospitalRoom,
                religiousLeaderName: formInput.religiousLeaderName,
                requestorName: formInput.name,
                serviceType: formInput.serviceType,
                date: formInput.date,
                time: formInput.time,
                endLocation: formInput.endLocation,

            };
            console.log(JSON.stringify(serviceRequest));

            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceRequest),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.log("Incomplete form submission attempt.");
        }
        clearForm();
    }

    function clearForm() {
        setFormInput({
            name: "",
            serviceType: "",
            hospitalRoom: "",
            endLocation: "",
            religiousLeaderName: "",
            date: dayjs().format('MM/DD/YYYY'),
            time: "",
            status: "",
        });
    }

    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 3,
                    gap: 2,
                    flexWrap: 'wrap',
                }}
              >
                <Box
                    sx={{
                        backgroundColor: 'whitesmoke',
                        borderRadius: '23px',
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        m: '3%',
                        mt: '3%',
                        width: '50%',
                        transform: 'translateX(0)',
                        transition: 'transform 0.5s',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: '#012d5a',
                            color: '#f6bd38',
                            borderRadius: '23px 23px 0 0',
                            py: '3%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            style={{fontFamily: 'Open Sans', fontWeight: 600}}
                            variant="h4"
                            component="h1"
                            align="center"
                        >
                            {TranslateTo("relR.Header")}
                        </Typography>
                    </Box>
                    <FormControl fullWidth sx={{ mt: 3, gap: 2, px: '3%', }}>
                        <TextField
                            required
                            label={TranslateTo("relR.PName")}
                            value={formInput.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <TextField
                            required
                            select
                            label={TranslateTo("relR.SrvType")}
                            value={formInput.serviceType}
                            onChange={(e) => handleChange('serviceType', e.target.value)}
                        >
                            <MenuItem value="CHAPEL">{TranslateTo("chapel")}</MenuItem>
                            <MenuItem value="BEDSIDE">{TranslateTo("bedside")}</MenuItem>
                            <MenuItem value="COMMUNAL">{TranslateTo("communal")}</MenuItem>
                        </TextField>
                        <Box sx={{marginY: 0}}><LocationDropdown
                            onChange={(v: string) => {
                                setFormInput({...formInput, hospitalRoom: v});
                            }}
                            value={formInput.hospitalRoom}
                            filterTypes={["HALL"]}
                            label={TranslateTo("location")}
                        /></Box>
                        <TextField
                            required
                            label="End Location"
                            value={formInput.endLocation}
                            onChange={(e) => handleChange('endLocation', e.target.value)}
                        />
                        <TextField
                            required
                            label={TranslateTo("relR.LeaderN")}
                            value={formInput.religiousLeaderName}
                            onChange={(e) => handleChange('religiousLeaderName', e.target.value)}
                        />
                        <TextField
                            required
                            label={TranslateTo("date")}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formInput.date}
                            onChange={(e) => {handleChange('date', e.target.value);}}

                        />
                        <TextField
                            required
                            label="Time"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={formInput.time}
                            onChange={(e) => {
                                handleChange('time', e.target.value);
                            }}
                            sx={{ width: 150 }}
                        />
                        <TextField
                            required
                            select
                            label={TranslateTo("status")}
                            value={formInput.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            <MenuItem value="Scheduled">{TranslateTo("status.sc")}</MenuItem>
                            <MenuItem value="Completed">{TranslateTo("status.comp")}</MenuItem>
                            <MenuItem value="Cancelled">{TranslateTo("status.cancel")}</MenuItem>
                        </TextField>
                    </FormControl>
                    <Box sx={{display: "flex", justifyContent: "space-between", mt:2}}>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{margin: 1}}
                            onClick={clearForm}
                        >
                            {TranslateTo("clear")}
                        </Button>

                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{margin: 1}}
                            disabled={!isComplete()}
                            onClick={submitForm}
                        >
                            {TranslateTo("submit")}
                        </Button>
                    </Box>
                </Box>

                {/*Holds both Graphs*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        pt: 6,
                        gap: 2,
                        maxWidth: 'calc(100% - 700px)',
                        flexBasis: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 3,
                            borderRadius: '23px',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            maxWidth: '500px',
                            width: '100%',
                            height: 'fit-content',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            {TranslateTo("relR.PieH")}
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 58, label: TranslateTo("christianity")},
                                        { id: 1, value: 15, label: TranslateTo("islam") },
                                        { id: 2, value: 10, label: TranslateTo("judaism") },
                                        { id: 3, value: 8, label: TranslateTo("hinduism") },
                                        { id: 4, value: 9, label: TranslateTo("buddhism") },
                                        { id: 5, value: 2, label: TranslateTo("other") },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Box>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 3,
                            borderRadius: '23px',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '500px',
                            width: '100%',
                            height: 'fit-content',
                            overflow: 'hidden',
                        }}
                    >
                        <Typography variant="h6" align="center" gutterBottom>
                            {TranslateTo("relR.LineH")}
                        </Typography>
                        <LineChart
                            xAxis={[
                                {
                                    id: 'Years',
                                    data: years,
                                    scaleType: 'point',
                                },
                            ]}
                            series={[
                                {
                                    id: 'Christianity',
                                    label: TranslateTo("christianity"),
                                    data: ChristianityGrowth,
                                    color: '#377eb8',
                                },
                                {
                                    id: 'Islam',
                                    label: TranslateTo("islam"),
                                    data: IslamGrowth,
                                    color: '#ff7f00'
                                },
                                {
                                    id: 'Hinduism',
                                    label: TranslateTo("hinduism"),
                                    data: HinduismGrowth,
                                    color: '#4daf4a'
                                },
                                {
                                    id: 'Buddhism',
                                    label: TranslateTo("buddhism"),
                                    data: BuddhismGrowth,
                                    color: '#984ea3'
                                },

                            ]}
                            width={500}
                            height={350}
                            margin={{left: 70, bottom: 50}}
                        />
                    </Box>
                  <Typography variant={"caption"}>Made by Rayyan</Typography>
                </Box>
            </Box>
        </LocalizationProvider>
      <FooterBar />
      </>
    );

}

export default ReligiousRequestForm;
