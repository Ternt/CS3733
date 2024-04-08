import {ChangeEvent, useState} from "react";
import {SanitationFormFields} from "./sanitationFields.ts";
import RequestList from "../../helpers/requestList.ts";
// import Dropdown from "../Form Elements/Dropdown.tsx";
import Checkbox from "../Form Elements/Checkbox.tsx";
import Radio from "../Form Elements/Radio.tsx";
// import "./SanitationRequestForm.scss";
import sanitationImage from './sanitation_background.jpg';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody
    // RadioGroup,
    // FormControlLabel,
    // FormGroup,
    // Checkbox,
    // Radio

} from '@mui/material';

const sanitationRequests = new RequestList();

function SanitationRequestForm() {
    const [submittedRequests, setSubmittedRequests] = useState([]);

    const [formInput, setFormInput] = useState<SanitationFormFields>({
        name: "",
        priority: "Low",
        location: "",
        type: "Unspecified",
        size: "Unspecified",
        assignmentStatus: "Unassigned",
    });

    function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({...formInput, name: e.target.value});
    }

    function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
        setFormInput({...formInput, location: e.target.value});
    }

    function handleTypeInput() {
        // @ts-expect-error Specified type more specifically and typescript doesn't like that
        const boxes: NodeListOf<HTMLInputElement> =
            document.getElementsByName("type");
        let checkedBoxes = "";
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].checked) {
                checkedBoxes += boxes[i].value + ", ";
            }
        }
        setFormInput({...formInput, type: checkedBoxes});
    }

    function updateSizeInput(input: string) {
        setFormInput({...formInput, size: input});
    }

    function submitForm() {
        setSubmittedRequests(prevRequests => [...prevRequests, formInput]);
        sanitationRequests.addRequestToList(formInput);
        clearForm();
        console.log(sanitationRequests.requests); // Print the array of requests to the console
    }

    function clearForm() {
        setFormInput({
            ...formInput,
            name: "",
            priority: "Low",
            location: "",
            type: "Unspecified",
            size: "Unspecified",
            assignmentStatus: "Unassigned",
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
        <Box position="relative"
             sx={{
                 backgroundImage: `url(${sanitationImage})`,
                 backgroundColor: '#5f6f8a',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: '100vh',
                 backgroundSize: 'cover'
             }}
        >
            <Box position="absolute"
                 top={70}
                 sx={{
                     width: '500px',
                     display: 'flex',
                     justifyContent: 'center',
                     backgroundColor: '#012d5a',
                     color: '#f6bd38',
                     p: 2
                 }}
            >
                <Typography variant="h4" component="h1" align="center">
                    Sanitation Request
                </Typography>
            </Box>

            <Box position="absolute"
                 top={150}
                 sx={{width: '500px'}}>
                <form
                    id="sanitationForm"
                    style={{
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <Grid container spacing={2} p={10} pt={2}>

                        <Grid item xs={12}>
                            <InputLabel>Employee Name</InputLabel>
                            <TextField
                                onChange={handleNameInput}
                                value={formInput.name}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Priority</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    value={formInput.priority}
                                    onChange={(event) => {
                                        setFormInput({...formInput, priority: event.target.value});
                                    }}
                                >
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                    <MenuItem value={"Medium"}>Medium</MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                    <MenuItem value={"Emergency"}>Emergency</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Location of Mess</InputLabel>
                            <TextField
                                onChange={handleLocationInput}
                                value={formInput.location}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Checkbox
                                label={"Type of mess (Choose all that apply):"}
                                onChange={handleTypeInput}
                                groupName={"type"}
                                items={["Solid Waste", "Liquid Spill", "Other"]}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Radio
                                label={"Mess Size"}
                                onChange={updateSizeInput}
                                groupName={"messSize"}
                                items={["Small", "Medium", "Large"]}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>Assignment Status:</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    value={formInput.assignmentStatus}
                                    onChange={(event) => {
                                        setFormInput({...formInput, assignmentStatus: event.target.value});
                                    }}
                                >
                                    <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                                    <MenuItem value={"Assigned"}>Assigned</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Closed"}>Closed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}
                              style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="contained" onClick={submitForm}>
                                Submit Request
                            </Button>
                            <Button variant="outlined" onClick={clearForm}>
                                Clear
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>

            <Box position="absolute"
                 top={1000}
                sx={{ width: '80%'}}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{
                            backgroundColor: '#012d5a'
                        }}>
                            <TableRow>
                                <TableCell sx={{ color: '#f6bd38' }}>Name</TableCell>
                                <TableCell sx={{ color: '#f6bd38' }}>Priority</TableCell>
                                <TableCell sx={{ color: '#f6bd38' }}>Location</TableCell>
                                <TableCell sx={{ color: '#f6bd38' }}>Type</TableCell>
                                <TableCell sx={{ color: '#f6bd38' }}>Size</TableCell>
                                <TableCell sx={{ color: '#f6bd38' }}>Assignment Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submittedRequests.map((request, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {request.name}
                                    </TableCell>
                                    <TableCell>{request.priority}</TableCell>
                                    <TableCell>{request.location}</TableCell>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>{request.size}</TableCell>
                                    <TableCell>{request.assignmentStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>







        </Box>

)
    ;
}

export default SanitationRequestForm;

