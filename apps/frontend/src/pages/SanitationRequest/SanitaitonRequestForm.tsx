import React, { ChangeEvent, useEffect, useState } from "react";
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    MenuItem,
    Button,
    Box,
    Typography,
    FormLabel, InputAdornment, IconButton, Grow, DialogTitle, DialogContent, DialogActions, Dialog,
} from "@mui/material";

import Checkboxes from "../../components/FormElements/Checkboxes.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import EventIcon from "@mui/icons-material/Event";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import FooterBar from "../../components/Footerbar/footer.tsx";

type formFields = {
    name: string;
    priority: string;
    location: string;
    date: string;
    type: string[];
    size: string;
    status: string;
};

function SanitationRequestForm() {
    useEffect(() => {
        document.title = TranslateTo("title.Sani");
    });

    const [submitDialogText, setSubmitDialogText] = useState("Request Submitted");
    const [submitDialogFlag, setSubmitDialogFlag] = useState(false);
    const [calendarMenuFlag, setCalendarMenuFlag] = useState<boolean>(true);
    const [formMenuTransform, setFormMenuTransform] = useState<number>(0);
    const [formInput, setFormInput] = useState<formFields>({
        name: "",
        priority: "",
        location: "",
        date: "MM/DD/YY",
        type: [],
        size: "",
        status: "",
    });

    const handleDialogClose = () =>{
        setSubmitDialogFlag(!submitDialogFlag);
    };

    function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({ ...formInput, name: e.target.value });
    }

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Changed type");
        const checkedId = event.target.id;
        if (event.target.checked) {
            setFormInput({ ...formInput, type: [...formInput.type, checkedId] });
        } else {
            setFormInput({
                ...formInput,
                type: formInput.type.filter((id) => id !== checkedId),
            });
        }
    };

    function updateSizeInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({ ...formInput, size: (e.target as HTMLInputElement).value });
    }

    function isComplete(): boolean {
        return (
            formInput.name != "" &&
            formInput.priority != "" &&
            formInput.location != "" &&
            formInput.date != "" &&
            formInput.type.length !== 0 &&
            formInput.size != "" &&
            formInput.status != ""
        );
    }

    function submitForm() {
        if (isComplete()) {
            // Log the current state of service and details
            console.log("Submitting Request");

            // Create a service request object
            const sanitationRequest = {
                type: "SANITATION",
                employeeName: formInput.name,
                priority: formInput.priority,
                status: formInput.status,
                date: formInput.date,
                notes: "None",
                locationID: formInput.location,
                messTypes: formInput.type.map((str) => str.toUpperCase().replace(" ", "_")),
                messSize: formInput.size,
            };
            console.log(JSON.stringify(sanitationRequest));

            // Send a POST request to the server
            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sanitationRequest),
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
            name: "",
            priority: "",
            location: "",
            date: "MM/DD/YY",
            type: [],
            size: "",
            status: "",
        });
        const form = document.getElementById("sanitationForm");
        if (form == null) {
            return;
        } else {
            // @ts-expect-error Declaring form as an HTMLFormElement causes errors with getting
            form.reset();
        }
    }

    return (
      <>
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
                        {TranslateTo("saniR.Header")}
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
                        id="sanitationform"
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
                                label={TranslateTo("employeeN")}
                                onChange={handleNameInput}
                                margin="normal"
                                value={formInput.name}
                                fullWidth
                                sx={{marginY: 0}}
                            />

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
                                sx={{marginY: 0}}
                            >
                                <MenuItem value={"LOW"}>{TranslateTo("priority.low")}</MenuItem>
                                <MenuItem value={"MEDIUM"}>{TranslateTo("priority.med")}</MenuItem>
                                <MenuItem value={"HIGH"}>{TranslateTo("priority.high")}</MenuItem>
                                <MenuItem value={"EMERGENCY"}>{TranslateTo("priority.emergency")}</MenuItem>
                            </TextField>

                            <Box sx={{marginY: 0}}><LocationDropdown
                                onChange={(v: string) => {
                                    setFormInput({ ...formInput, location: v });
                                }}
                                value={formInput.location}
                                filterTypes={["HALL"]}
                                label={TranslateTo("location")}
                            /></Box>

                            <Box>
                                <TextField
                                    label={TranslateTo("date")}
                                    value={formInput.date}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => {
                                                    setCalendarMenuFlag(!calendarMenuFlag);
                                                    setFormMenuTransform((calendarMenuFlag?150:0));
                                                    console.log(calendarMenuFlag);
                                                }}>
                                                    <EventIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{width:"100%"}}
                                />
                            </Box>

                            <Box sx={{marginY: 0}}><Checkboxes
                                label={TranslateTo("saniR.MessType")}
                                onChange={handleTypeChange}
                                items={[TranslateTo("messType.Solid"),
                                    TranslateTo("messType.Liquid"), TranslateTo("messType.Other")]}
                                checked={formInput.type}
                            /></Box>

                            <Box sx={{marginY: 0}}><FormLabel id="mess-size">{TranslateTo("saniR.MessSize")}</FormLabel>
                                <RadioGroup
                                    row
                                    name="mess-size"
                                    aria-labelledby="mess-size"
                                    value={formInput.size}
                                    onChange={updateSizeInput}
                                >
                                    <FormControlLabel
                                        value="SMALL"
                                        control={<Radio />}
                                        label={TranslateTo("small")}

                                    />
                                    <FormControlLabel
                                        value="MEDIUM"
                                        control={<Radio />}
                                        label={TranslateTo("medium")}
                                    />
                                    <FormControlLabel
                                        value="LARGE"
                                        control={<Radio />}
                                        label={TranslateTo("large")}
                                    />
                                </RadioGroup></Box>

                            <TextField
                                required
                                select
                                value={formInput.status}
                                label={TranslateTo("status")}
                                margin="normal"
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
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

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginY: 0,
                                }}
                            >
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        margin: 1,
                                    }}
                                    onClick={clearForm}
                                >
                                    Clear
                                </Button>

                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        margin: 1,
                                    }}
                                    disabled={!isComplete()}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                            </Box>

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
                                        {TranslateTo("close")}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </FormControl>
                    </form>
                </Box>
              <Typography variant={"caption"}>Made by Yuhan and Warwick</Typography>
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
        <FooterBar />
        </>
    );
}

export default SanitationRequestForm;
