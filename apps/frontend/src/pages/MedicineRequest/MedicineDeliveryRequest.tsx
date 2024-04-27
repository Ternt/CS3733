import React, {ChangeEvent, useEffect, useState} from "react";
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
    FormLabel, InputAdornment, IconButton, Grow, Dialog, DialogContent, DialogTitle, DialogActions,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import FooterBar from "../../components/Footerbar/footer.tsx";

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

    const [submitDialogText, setSubmitDialogText] = useState("Request Submitted");
    const [submitDialogFlag, setSubmitDialogFlag] = useState(false);
    const [calendarMenuFlag, setCalendarMenuFlag] = useState(true);
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

    const handleDialogClose = () =>{
        setSubmitDialogFlag(!submitDialogFlag);
    };

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

    return <>
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
                    {TranslateTo("mediR.Header")}
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
                            label={TranslateTo("mediR.PName")}
                            onChange={handlePatientNameInput}
                            margin="normal"
                            value={formInput.patientName}
                            fullWidth
                            sx={{marginY: 0}}
                        />

                        <TextField
                            required
                            label={TranslateTo("mediR.PhysicianName")}
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
                            label={TranslateTo("priority")}
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
                            <MenuItem value={"Low"}>{TranslateTo("priority.low")}</MenuItem>
                            <MenuItem value={"Medium"}>{TranslateTo("priority.med")}</MenuItem>
                            <MenuItem value={"High"}>{TranslateTo("priority.high")}</MenuItem>
                            <MenuItem value={"Emergency"}>{TranslateTo("priority.emergency")}</MenuItem>
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
                                label={TranslateTo("date")}
                                value={formInput.date}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={() => {
                                                setCalendarMenuFlag(!calendarMenuFlag);
                                                setFormMenuTransform((calendarMenuFlag?150:0));
                                            }}>
                                                <EventIcon/>
                                            </IconButton>
                                        </InputAdornment>,
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
                                label={TranslateTo("mediR.MedicineType")}
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
                                <MenuItem value={"PainKillers"}>{TranslateTo("medType.PainK")}</MenuItem>
                                <MenuItem value={"Tylenol"}>{TranslateTo("medType.Tylenol")}</MenuItem>
                                <MenuItem value={"Paracetamol"}>{TranslateTo("medType.Paracetamol")}</MenuItem>
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
                            <FormLabel id="medicine-form">{TranslateTo("mediR.Form")}</FormLabel>
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
                                        label={TranslateTo("ingestType.Powder")}
                                    /></Box>
                                    <Box><FormControlLabel
                                        value="TAB_OR_CAP"
                                        control={<Radio/>}
                                        label={TranslateTo("ingestType.Tab")}
                                    /></Box>
                                </Box>
                                <Box sx={{display: "flex"}}>
                                    <Box sx={{width: "50%"}}><FormControlLabel
                                        value="CHEWABLE"
                                        control={<Radio/>}
                                        label={TranslateTo("ingestType.Chewable")}
                                    /></Box>
                                    <Box><FormControlLabel
                                        value="LIQUID"
                                        control={<Radio/>}
                                        label={TranslateTo("ingestType.Liquid")}
                                    /></Box>
                                </Box>
                                <Box sx={{display: "flex"}}>
                                    <FormControlLabel
                                        value="INHALER"
                                        control={<Radio/>}
                                        label={TranslateTo("ingestType.Inhaler")}
                                    />
                                </Box>
                            </RadioGroup>
                        </Box>

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
                                {TranslateTo("submit")}
                            </Button>
                        </Box>

                        <Dialog
                            open={submitDialogFlag}>
                            <DialogTitle></DialogTitle>
                            <DialogContent>
                                <Typography>{submitDialogText}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleDialogClose}
                                >
                                    {TranslateTo("close")}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </FormControl>
                </form>
            </Box>
          <Typography variant={"caption"}>Made by Thinh and Nick</Typography>
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
    <FooterBar />
    </>;
}

export default MedicineRequestForm;
