import {ChangeEvent, useEffect, useState} from "react";
import LocationDropdown from "../../components/LocationDropdown.tsx";
import {
    TextField,
    FormControl,
    MenuItem,
    Button,
    Box,
    Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@mui/material";

import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import * as React from "react";
import axios, {AxiosResponse} from "axios";
import FooterBar from "../../components/Footerbar/footer.tsx";

type Interpreter = {
    language: string;
    count: number;
}

type TempInterpreterFormProps = {
    name: string;
    priority: string;
    location: string;
    status: string;
    language: string;
    interpreterRemain: Interpreter[];
}

function LanguageInterpreterRequestForm() {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [submitDialogText, setSubmitDialogText] = useState("Request Submitted");
    const [submitDialogFlag, setSubmitDialogFlag] = useState(false);
    const [data, setData] = useState<Interpreter[]>([]);
    const [formInput, setFormInput] = useState<TempInterpreterFormProps>({
        name: "",
        location: "",
        language: "",
        priority: "",
        status: "",
        interpreterRemain: [],
    });

    const isComplete = (): boolean => {
        return Object.values(formInput).every((value) => value !== "");
    };

    useEffect(() => {
        document.title = "Language Interpreter Request";
    });

    useEffect(() => {
        axios.get('/api/language-interpreter').then((res: AxiosResponse) => {
            setData(res.data);
            console.log(res.data);
        });
        console.log("initial language data fetched");
    }, []);

    const handleDialogClose = () =>{
        setSubmitDialogFlag(!submitDialogFlag);
    };

    const handleSubmitForm = () => {
        if (isComplete()) {
            const selectedLanguageData = data.find(item => item.language === formInput.language.toUpperCase());
            if (selectedLanguageData && selectedLanguageData.count <= 0) {
                setDialogMessage(`No interpreters available for ${formInput.language}.`);
                setDialogOpen(true);
                return; // Stop the submission process
            }

            // update data
            const newData = data.map((item) => {
                if (item.language === formInput.language.toUpperCase()) {
                    return {...item, count: Math.max(0, item.count - 1)}; // Decrease by 1, but not below 0
                }
                return item;
            });

            setData(newData);
            setFormInput({...formInput, interpreterRemain: newData});
            const languageRequest = {
                type: "LANGUAGE",
                priority: formInput.priority.toUpperCase(),
                status: formInput.status.toUpperCase().replace(" ", "_"),
                locationID: formInput.location,
                name: formInput.name,
                language: formInput.language.toUpperCase(),
            };
            console.log(JSON.stringify(languageRequest));

            // Send a POST request to the server
            fetch("/api/service-requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(languageRequest),
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
            console.log("No service request submitted.");
        }
    };

    const clearForm = () => {
        setFormInput({
            ...formInput,
            name: "",
            location: "",
            language: "",
            priority: "",
            status: "",
        });
    };

    return (
      <>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        m: '3%',
                        mt: '3%',
                        width: '40%',
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
                            LANGUAGE INTERPRETER REQUEST
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
                            id="languageInterpreterForm"
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
                                    label="Employee Name"
                                    value={formInput.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormInput({
                                        ...formInput,
                                        name: e.target.value
                                    })}
                                    fullWidth
                                />

                                <LocationDropdown
                                    label="Location"
                                    value={formInput.location}
                                    onChange={(value: string) => setFormInput({...formInput, location: value})}
                                />
                                <TextField
                                    required
                                    select
                                    label="Language Required"
                                    value={formInput.language}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormInput({
                                        ...formInput,
                                        language: e.target.value
                                    })}
                                    fullWidth
                                >
                                    <MenuItem value="Spanish">Spanish</MenuItem>
                                    <MenuItem value="French">French</MenuItem>
                                    <MenuItem value="Chinese">Chinese</MenuItem>
                                </TextField>

                                <TextField
                                    required
                                    select
                                    id="priority-select"
                                    label={"Priority"}
                                    margin="normal"
                                    inputProps={{MenuProps: {disableScrollLock: true}}}
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

                                <TextField
                                    required
                                    select
                                    label="Status"
                                    value={formInput.status}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormInput({
                                        ...formInput,
                                        status: e.target.value
                                    })}
                                    fullWidth
                                >
                                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                                    <MenuItem value="Assigned">Assigned</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
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
                                        onClick={handleSubmitForm}
                                    >
                                        Submit
                                    </Button>
                                </Box>


                            </FormControl>
                        </form>

                        <Dialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title" sx={{
                                backgroundColor: '#012d5a',
                                color: '#f6bd38',
                                marginBottom: 5
                            }}>{"Submission Error"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {dialogMessage}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    sx={{margin: 1}}
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

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
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        m: '3%',
                        mt: '3%',
                        width: '40%',
                    }}
                >
                    <Box
                        sx={{
                            width: '80%',
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
                            INTERPRETER AVAILABILITY
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexdirection: 'center',
                            width: '80%',
                            backgroundColor: 'whitesmoke',
                            borderRadius: '0 0 23px 23px',
                            boxShadow: 3,
                            py: 5
                        }}
                    >

                        <PieChart
                            series={[
                                {
                                    arcLabel: (item) => `${item.value}`,
                                    arcLabelMinAngle: 30,
                                    data: [
                                        ...data.map((item, index) => ({
                                            id: index,
                                            value: item.count,
                                            label: item.language
                                        }))
                                    ],
                                    highlightScope: {faded: 'global', highlighted: 'item'},
                                    faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'},
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontWeight: 'bold',
                                },
                            }}
                            width={400}
                            height={200}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
  <FooterBar />
      </>
        );
}

export default LanguageInterpreterRequestForm;
