import {ChangeEvent, useEffect, useState} from "react";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
    TextField,
    FormControl,
    MenuItem,
    Button,
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel, InputAdornment, IconButton, Grow,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';

type form = {
    medicine: string;
    dosage: string;
    form: string;
    patientName: string;
    physicianName: string;
    location: string;
    date: string;
    priority: string;
    status: string;
};

function MedicineRequestForm() {
    useEffect(() => {
        document.title = "Medicine Request";
    });

    const [calendarMenuFlag, setCalendarMenuFlag] = useState<boolean>(true);
    const [formMenuTransform, setFormMenuTransform] = useState<number>(0);
    const [formInput, setFormInput] = useState<form>({
        medicine: "",
        dosage: "",
        form: "",
        patientName: "",
        physicianName: "",
        location: "",
        date: "MM/DD/YY",
        priority: "",
        status: "",
    });

    function isComplete(): boolean {
        return (
            formInput.medicine != "" &&
            formInput.dosage != "" &&
            formInput.form != "" &&
            formInput.patientName != "" &&
            formInput.physicianName != "" &&
            formInput.location != "" &&
            formInput.date != "" &&
            formInput.priority != "" &&
            formInput.status != ""
        );
    }

    function handlePhysicianNameInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({...formInput, physicianName: e.target.value});
    }

    function handlePatientNameInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({...formInput, patientName: e.target.value});
    }

    function submitForm() {
        if (isComplete()) {
            // Log the current state of service and details
            console.log("Submitting Request");

            // Create a service request object
            const medicineRequest = {
                type: "MEDICINE",
                priority: formInput.priority,
                status: formInput.status,
                notes: "None",
                locationID: formInput.location,
                date: formInput.date,
                patientName: formInput.patientName,
                primaryPhysicianName: formInput.physicianName,
                medicine: formInput.medicine,
                dosage: parseInt(formInput.dosage),
                form: formInput.form,
            };
            console.log(JSON.stringify(medicineRequest));

            // Send a POST request to the server
            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(medicineRequest),
            })
                .then((response) => {
                    console.log(response);
                })

                .then((data) => console.log(data))
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            // If service is "Null option", do not log anything
            console.log("No service request submitted.");
        }
        clearForm();
    }

    function clearForm() {
        setFormInput({
            ...formInput,
            medicine: "",
            dosage: "",
            form: "",
            patientName: "",
            physicianName: "",
            location: "",
            date: "MM/DD/YY",
            priority: "",
            status: "",
        });
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    m: '3%',
                    mt: '3%',
                    width: '40%',
                    transform: `translate(${formMenuTransform}px)`,
                    transition: '0.5s',
                    transitionDelay: (calendarMenuFlag? '0ms':'100ms'),
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#012d5a',
                        color: '#f6bd38',
                        p: 2,
                        borderRadius: '23px 23px 0 0',
                    }}
                >
                    <Typography
                        style={{fontFamily: 'Open Sans', fontWeight: 600}}
                        variant="h4"
                        component="h1"
                        align="center"
                    >
                        MEDICINE REQUEST
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: 'whitesmoke',
                        borderRadius: '0 0 23px 23px',
                        boxShadow: 3,
                    }}
                >
                    <form
                        id="medicineForm"
                        style={{
                            backgroundColor: 'whitesmoke',
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '0 0 23px 23px',
                            flexDirection: 'column',
                            margin: '2%',
                        }}
                    >
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "top",
                                padding: 2,
                                gap: 1,
                            }}
                        >
                            <TextField
                                required
                                label="Patient Name"
                                onChange={handlePatientNameInput}
                                margin="normal"
                                value={formInput.patientName}
                                fullWidth
                                sx={{marginY: 0}}
                            />

                            <TextField
                                required
                                label={"Name of Primary Physician"}
                                onChange={handlePhysicianNameInput}
                                margin="normal"
                                value={formInput.physicianName}
                                sx={{marginY: 0}}
                            />

                            {/* Priority Dropdown */}
                            <TextField
                                required
                                select
                                id="priority-select"
                                label={"Priority"}
                                margin="normal"
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                value={formInput.priority}
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        priority: event.target.value,
                                    });
                                }}
                                sx={{marginY: 0,}}
                            >
                                <MenuItem value={"LOW"}>Low</MenuItem>
                                <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                                <MenuItem value={"HIGH"}>High</MenuItem>
                                <MenuItem value={"EMERGENCY"}>Emergency</MenuItem>
                            </TextField>

                            {/* Location Dropdown */}
                            <Box sx={{marginY: 0}}><LocationDropdown
                                onChange={(v: string) => {
                                    setFormInput({...formInput, location: v});
                                }}
                                value={formInput.location}
                                filterTypes={["HALL"]}
                                label={"Location"}
                            /></Box>

                            {/* Datepicker */}
                            <Box>
                                <TextField
                                    label={"Date"}
                                    value={formInput.date}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => {
                                                    setCalendarMenuFlag(!calendarMenuFlag);
                                                    setFormMenuTransform((calendarMenuFlag?150:0));
                                                }}>
                                                    <EventIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{width:"100%"}}
                                />
                            </Box>

                            {/* Medicine Dropdown and dosage text field */}
                            <Box sx={{display: "flex", justifyContent: "space-between", marginY: 0}}>
                                <TextField
                                    required
                                    select
                                    id="medicine-select"
                                    label={"Medicine"}
                                    inputProps={{MenuProps: {disableScrollLock: true}}}
                                    value={formInput.medicine}
                                    onChange={(event) => {
                                        setFormInput({
                                            ...formInput,
                                            medicine: event.target.value,
                                        });
                                    }}
                                    sx={{width: "60%", pr: "5%"}}
                                >
                                    <MenuItem value={"PAIN_KILLERS"}>PainKillers</MenuItem>
                                    <MenuItem value={"TYLENOL"}>Tylenol</MenuItem>
                                    <MenuItem value={"PARACETAMOL"}>Paracetamol</MenuItem>
                                </TextField>

                                <TextField
                                    required
                                    sx={{width: "35%"}}
                                    label="Dosage"
                                    onChange={(event) => {
                                        setFormInput({
                                            ...formInput,
                                            dosage: event.target.value,
                                        });
                                    }}
                                    value={formInput.dosage}
                                />
                            </Box>

                            {/* Radio button group for forms of medicine */}
                            <Box sx={{marginY: 0, width: '100%'}}>
                                <FormLabel id="medicine-form">Form</FormLabel>
                                <RadioGroup
                                    name="medicine-form"
                                    aria-labelledby="medicine-form"
                                    value={formInput.form}
                                    onChange={(event) => {
                                        setFormInput({
                                            ...formInput,
                                            form: event.target.value,
                                        });
                                    }}
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box sx={{display: "flex"}}>
                                        <Box sx={{width: "50%"}}><FormControlLabel
                                            value="POWDER"
                                            control={<Radio/>}
                                            label="Powder"
                                        /></Box>
                                        <Box><FormControlLabel
                                            value="TAB_OR_CAP"
                                            control={<Radio/>}
                                            label="Tab/Cap"
                                        /></Box>
                                    </Box>
                                    <Box sx={{display: "flex"}}>
                                        <Box sx={{width: "50%"}}><FormControlLabel
                                            value="CHEWABLE"
                                            control={<Radio/>}
                                            label="Chewable"
                                        /></Box>
                                        <Box><FormControlLabel
                                            value="LIQUID"
                                            control={<Radio/>}
                                            label="Liquid"
                                        /></Box>
                                    </Box>
                                    <Box sx={{display: "flex"}}>
                                        <FormControlLabel
                                            value="INHALER"
                                            control={<Radio/>}
                                            label="Inhaler"
                                        />
                                    </Box>
                                </RadioGroup>
                            </Box>

                            {/* Status Assignment Dropdown */}
                            <TextField
                                required
                                select
                                value={formInput.status}
                                label={"Status"}
                                margin="normal"
                                inputProps={{MenuProps: {disableScrollLock: true}}}
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        status: event.target.value,
                                    });
                                }}
                                sx={{marginY: 0}}
                            >
                                <MenuItem value={"UNASSIGNED"}>Unassigned</MenuItem>
                                <MenuItem value={"ASSIGNED"}>Assigned</MenuItem>
                                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                                <MenuItem value={"CLOSED"}>Closed</MenuItem>
                            </TextField>

                            {/* Submit and clear Button */}
                            <Box sx={{display: "flex", justifyContent: "space-between", marginY: 0}}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    sx={{margin: 1}}
                                    onClick={clearForm}
                                >
                                    Clear
                                </Button>

                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    sx={{margin: 1}}
                                    disabled={!isComplete()}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>


            <Box sx={{mt: '3%'}}>
                <Grow in={calendarMenuFlag} {...calendarMenuFlag? {timeout:1000}:{}}>{
                    <Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: '#012d5a',
                                color: '#f6bd38',
                                p: 2,
                                borderRadius: '23px 23px 0 0',
                            }}
                        >
                            <Typography
                                style={{fontFamily: 'Open Sans', fontWeight: 600}}
                                variant="h4"
                                component="h1"
                                align="center"
                            >
                                Date
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: 'whitesmoke',
                                borderRadius: '0 0 23px 23px',
                                boxShadow: 3,
                                padding: '1%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    defaultValue={dayjs(Date.now())}
                                    views={['year', 'month', 'day']}
                                    onChange={(mewDate) => {
                                        setFormInput({...formInput, date: mewDate.format('MM/DD/YY')});
                                        console.log(mewDate.format('MM/DD/YY'));
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                }
                </Grow>
            </Box>
        </Box>
    );
}

export default MedicineRequestForm;
