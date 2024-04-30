import React, { useEffect, useState} from "react";
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
    InputAdornment, IconButton, Grow,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

type formInputs = {
    name: string;
    email: string;
    gender: string;
    birthday: string;
    address: string;
    appointmentDate: string;
    appointmentTime: string;
    status: string;
};

function CheckInForm () {
    useEffect(() => {
        document.title = "Patient Check In";
    });

    //const [submitDialogText, setSubmitDialogText] = useState("Request Submitted");
    // const [submitDialogFlag, setSubmitDialogFlag] = useState(false);
    const [calendarMenuFlag, setCalendarMenuFlag] = useState<null | string>(null);
    const [formMenuTransform, setFormMenuTransform] = useState<number>(0);
    const [formInput, setFormInput] = useState<formInputs>({
        name: "",
        email: "",
        gender: "",
        birthday: "MM/DD/YY",
        address: "",
        appointmentDate: "MM/DD/YY",
        appointmentTime: "",
        status: "",
    });

    function isComplete(): boolean {
        return (
            formInput.name != "" &&
            formInput.email != "" &&
            formInput.gender != "" &&
            formInput.birthday != "" &&
            formInput.address != "" &&
            formInput.appointmentDate != "" &&
            formInput.appointmentTime != "" &&
            formInput.status != ""
        );
    }

    function handleChange(prop: keyof formInputs, value: string) {
        setFormInput({...formInput, [prop]: value});
    }

    // const handleDialogClose = () =>{
    //     setSubmitDialogFlag(!submitDialogFlag);
    // };

    // function handlePhysicianNameInput(e: ChangeEvent<HTMLInputElement>) {
    //     setFormInput({...formInput, physicianName: e.target.value});
    // }
    //
    // function handlePatientNameInput(e: ChangeEvent<HTMLInputElement>) {
    //     setFormInput({...formInput, patientName: e.target.value});
    // }

    function submitForm(){
        if (isComplete()) {
            console.log("Patient is succesfully checked in");

            const CheckInRequest = {
                type: "CHECKIN",
                notes: "None",
                priority: "LOW",
                status: "UNASSIGNED",
                patientName: formInput.name,
                patientEmail: formInput.email,
                patientAddress: formInput.address,
                patientGender: formInput.gender,
                patientBirthday: formInput.birthday,
                appointmentDate: formInput.appointmentDate,
                appointmentTime: formInput.appointmentTime,
                locationID: "ACONF00102",
            };
            console.log(JSON.stringify(CheckInRequest));

            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(CheckInRequest),
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
            ...formInput,
            name: "",
            email: "",
            gender: "",
            birthday: "MM/DD/YY",
            address: "",
            appointmentDate: "MM/DD/YY",
            appointmentTime: "",
            status: "",
        });
    }

    return <Box
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
                transitionDelay: calendarMenuFlag? '0ms':'100ms',
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
                    {TranslateTo("checkIn.Header")}
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
                    id="CheckInForm"
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
                            label={TranslateTo("checkIn.PName")}
                            value={formInput.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <TextField
                            required
                            label={TranslateTo("checkIn.EmailAdd")}
                            value={formInput.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        <TextField
                            required
                            label={TranslateTo("address")}
                            value={formInput.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                        <TextField
                            required
                            select
                            label={TranslateTo("gender")}
                            inputProps={{ MenuProps: { disableScrollLock: true } }}
                            value={formInput.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                        >
                            <MenuItem value={"MALE"}>{TranslateTo("gender.male")}</MenuItem>
                            <MenuItem value={"FEMALE"}>{TranslateTo("gender.female")}</MenuItem>
                            <MenuItem value={"TRANSGENDER"}>{TranslateTo("gender.Trans")}</MenuItem>
                            <MenuItem value={"NON_BINARY"}>{TranslateTo("gender.NonBi")}</MenuItem>
                            <MenuItem value={"OTHER"}>{TranslateTo("other")}</MenuItem>
                        </TextField>

                        {/* Datepicker for Patient Birthday */}
                        <Box>
                            <TextField
                                label={TranslateTo("checkIn.Birthday")}
                                value={formInput.birthday}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={() => {
                                            setCalendarMenuFlag(calendarMenuFlag==='bday'?null:"bday");
                                            setFormMenuTransform((calendarMenuFlag==='bday'?150:0));
                                        }}>
                                            <EventIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                sx={{width:"100%"}}
                            />
                        </Box>

                        {/* Datepicker for Appointment Date */}
                        <Box>
                            <TextField
                                label={TranslateTo("checkIn.AppDate")}
                                value={formInput.appointmentDate}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={() => {
                                            setCalendarMenuFlag(calendarMenuFlag==='appt'?null:"appt");
                                            setFormMenuTransform((calendarMenuFlag==='appt'?150:0));
                                        }}>
                                            <EventIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                sx={{width:"100%"}}
                            />
                        </Box>

                        <TextField
                            required
                            label={TranslateTo("time")}
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={formInput.appointmentTime}
                            onChange={(e) => {
                                handleChange('appointmentTime', e.target.value);
                            }}
                            sx={{ width: 150 }}
                        />

                        {/* Status Assignment Dropdown */}
                        <TextField
                            required
                            select
                            value={formInput.status}
                            label={TranslateTo("status")}
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
                            <MenuItem value={"UNASSIGNED"}>{TranslateTo("status.un")}</MenuItem>
                            <MenuItem value={"ASSIGNED"}>{TranslateTo("status.as")}</MenuItem>
                            <MenuItem value={"IN_PROGRESS"}>{TranslateTo("status.in")}</MenuItem>
                            <MenuItem value={"CLOSED"}>{TranslateTo("status.cl")}</MenuItem>
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
                                {TranslateTo("button.CheckIn")}
                            </Button>
                        </Box>

                        {/*<Dialog*/}
                        {/*    open={submitDialogFlag}>*/}
                        {/*    <DialogTitle></DialogTitle>*/}
                        {/*    <DialogContent>*/}
                        {/*        <Typography>{submitDialogText}</Typography>*/}
                        {/*    </DialogContent>*/}
                        {/*    <DialogActions>*/}
                        {/*        <Button*/}
                        {/*            onClick={handleDialogClose}*/}
                        {/*        >*/}
                        {/*            Close*/}
                        {/*        </Button>*/}
                        {/*    </DialogActions>*/}
                        {/*</Dialog>*/}
                    </FormControl>
                </form>
            </Box>
            <Typography variant={"caption"}>Made by Rayyan</Typography>
        </Box>


        <Box sx={{mt: '3%'}}>
            <Grow in={calendarMenuFlag!==null} {...calendarMenuFlag? {timeout:1000}:{}}>{
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
                            {TranslateTo("date")}
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
                                    if(calendarMenuFlag === "bday")
                                        setFormInput({...formInput, birthday : mewDate.format('MM/DD/YY')});
                                    else if(calendarMenuFlag === "appt")
                                        setFormInput({...formInput, appointmentDate : mewDate.format('MM/DD/YY')});
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            }
            </Grow>
        </Box>
    </Box>;
}

export default CheckInForm;
