import React, {useState} from 'react';
import {
    Box,
    Paper,
    FormControl,
    TextField,
    Button,
    Typography,
    MenuItem,
    InputAdornment,
    IconButton, Grow, DialogTitle, DialogContent, DialogActions, Dialog
} from '@mui/material';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import EventIcon from "@mui/icons-material/Event";

type formFields = {
    name: string;
    email: string;
    date: string;
    type: string
    notes: string;
};

function AppointmentPage() {
    const [submitDialogText, setSubmitDialogText] = useState("Request Submitted");
    const [submitDialogFlag, setSubmitDialogFlag] = useState(false);
    const [calendarMenuFlag, setCalendarMenuFlag] = useState<boolean>(true);
    const [formInput, setFormInput] = useState<formFields>({
        name: "",
        email: "",
        date: "MM/DD/YY",
        type: "",
        notes: "",
    });

    const handleDialogClose = () =>{
        setSubmitDialogFlag(!submitDialogFlag);
    };
    function isComplete(): boolean {
        return (
            formInput.name != "" &&
            formInput.email != "" &&
            formInput.date != "" &&
            formInput.type != ""
        );
    }
    function submitForm() {
        if (isComplete()) {
            // Log the current state of service and details
            console.log("Submitting Request");

            // Create a service request object
            const AppointmentRequest = {
                type: "APPOINTMENT",
                patientName: formInput.name,
                patientEmail: formInput.email,
                date: formInput.date,
                aptType: formInput.type.toUpperCase(),
                notes: formInput.notes,
                locationID: "ACONF00103",
                priority: "LOW",
                status: "UNASSIGNED",

            };
            console.log(JSON.stringify(AppointmentRequest));

            // Send a POST request to the server
            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(AppointmentRequest),
            })
                .then((response) => {
                    setSubmitDialogText("Request submitted");
                    setSubmitDialogFlag(!submitDialogFlag);
                    console.log("congratulations! u've submitted");
                    console.log(response);
                })

                .then((data) => console.log(data))
                .catch((error) => {
                    setSubmitDialogText("Request failed to submit. Please try again.");
                    setSubmitDialogFlag(!submitDialogFlag);
                    console.error("Error:", error);
                });
        } else {
            // If service is "Null option", do not log anything
            console.log("No service request submitted.");
        }
    }

        return (
        <Box
            display="flex"
            height="90vh"
            bgcolor="white"
        >
            <Box
                width={"60%"}
                display="flex"
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        width: '70%',
                        borderRadius: '15px'
                }}
                    sx={{
                        flexDirection: 'column',
                        mx: '25%',
                        mt: '3%',
                        backgroundColor: 'whitesmoke'
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: '#012d5a',
                            padding: '20px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px'
                    }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            style={{
                                color: '#f6bd38',
                                fontFamily: 'Open Sans',
                                fontWeight: 600
                        }}>
                            Schedule Appointment
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            padding: '20px'
                    }}>
                        <FormControl

                            component="fieldset"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'top',
                                gap: '20px'
                        }}>
                            <TextField
                                required
                                fullWidth
                                value={formInput.name}
                                label="Full Name"
                                variant="outlined"
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        name: event.target.value,
                                    });
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                value={formInput.email}
                                label="Email"
                                variant="outlined"
                                type="email"
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        email: event.target.value,
                                    });
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                label={"Date"}
                                value={formInput.date}
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        date: event.target.value,
                                    });
                                }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => {
                                                setCalendarMenuFlag(!calendarMenuFlag);
                                                console.log(calendarMenuFlag);
                                            }}>
                                                <EventIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                required
                                fullWidth
                                select
                                value={formInput.type}
                                label="Appointment Type"
                                defaultValue=""
                                variant="outlined"
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        type: event.target.value,
                                    });
                                }}
                            >
                                <MenuItem value="Physical Examination">Physical Examination</MenuItem>
                                <MenuItem value="Consultation">Consultation</MenuItem>
                                <MenuItem value="Surgery">Surgery</MenuItem>
                                <MenuItem value="Follow-up">Follow-up</MenuItem>
                                <MenuItem value="Emergency Care">Emergency Care</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Notes"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={(event) => {
                                    setFormInput({
                                        ...formInput,
                                        notes: event.target.value,
                                    });
                                }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={submitForm}
                                disabled={!isComplete()}
                            >
                                Submit
                            </Button>

                            <Dialog open={submitDialogFlag}>
                                <DialogTitle></DialogTitle>
                                <DialogContent>
                                    <Typography>{submitDialogText}</Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        onClick={handleDialogClose}>
                                        CLOSE
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </FormControl>
                    </Box>
                </Paper>
            </Box>
            <Box
                width="40%"
                height="50vh"
                display="flex"
                flexDirection="column"
                sx={{
                    mt: '26px',
                }}
            >
                        <Grow in={calendarMenuFlag} {...calendarMenuFlag? {timeout:1000}:{}}>{
                            <Box>
                                <Box
                                    sx={{
                                        width: '60%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: '#012d5a',
                                        color: '#f6bd38',
                                        p: 2.5,
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
                                        width: '60%',
                                        backgroundColor: 'whitesmoke',
                                        borderRadius: '0 0 23px 23px',
                                        boxShadow: 3,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateCalendar
                                            defaultValue={dayjs(Date.now())}
                                            views={['year', 'month', 'day']}
                                            onChange={(newDate) => {
                                                setFormInput({...formInput, date: newDate.format("MM/DD/YY")});
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

export default AppointmentPage;
