import { ChangeEvent, useEffect, useState } from "react";
import medicin_delivery from "../../assets/medicin_delivery.png";
import LocationSelectFormDropdown from "../../components/locationSelectFormDropdown.tsx";
import {
  TextField,
  FormControl,
  MenuItem,
  Button,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
//import Checkboxes from "../../components/FormElements/Checkboxes.tsx";

type form = {
  medicine: string;
  dosage: string;
  form: string;
  patientName: string;
  physicianName: string;
  location: string;
  priority: string;
  status: string;
};

type medicineRequestFormProps = {
  title: string;
};

function MedicineRequestForm(props: medicineRequestFormProps) {
  useEffect(() => {
    document.title = props.title;
  });
  const [formData, setFormData] = useState<form[]>([]);
  const [formInput, setFormInput] = useState<form>({
    medicine: "",
    dosage: "",
    form: "",
    patientName: "",
    physicianName: "",
    location: "",
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
      formInput.priority != "" &&
      formInput.status != ""
    );
  }

  function handlePhysicianNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, physicianName: e.target.value });
  }

  function handlePatientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, patientName: e.target.value });
  }

  function submitForm() {
    setFormData((prevRequests) => [...prevRequests, formInput]);
    // sanitationRequests.addRequestToList(formInput);
    clearForm();
    console.log(formData); // Print the array of requests to the console
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
      priority: "",
      status: "",
    });
  }

  return (
    <Box
      position="relative"
      sx={{
        backgroundImage: `url(${medicin_delivery})`,
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Box
        position="absolute"
        top={70}
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#012d5a",
          color: "#f6bd38",
          p: 2,
        }}
      >
        <Typography
          style={{ fontFamily: "Inria Serif" }}
          variant="h4"
          component="h1"
          align="center"
        >
          MEDICINE REQUEST
        </Typography>
      </Box>

      <Box
        position="absolute"
        top={150}
        sx={{
          width: "500px",
          backgroundColor: "whitesmoke",
        }}
        px={10}
      >
        <form
          id="sanitationForm"
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl>
            <TextField
              required
              label="Patient Name"
              onChange={handlePatientNameInput}
              margin="normal"
              value={formInput.patientName}
              fullWidth
            />

            <TextField
              required
              label="Name of Primary Physician"
              onChange={handlePhysicianNameInput}
              margin="normal"
              value={formInput.physicianName}
              fullWidth
            />

            <TextField
              required
              select
              id="priority-select"
              label={"Priority"}
              margin="normal"
              value={formInput.priority}
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  priority: event.target.value,
                });
              }}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Emergency"}>Emergency</MenuItem>
            </TextField>

            <LocationSelectFormDropdown
              value={formInput.location}
              onChange={(v: string) => {
                setFormInput({ ...formInput, location: v });
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                required
                select
                id="medicine-select"
                label={"Medicine"}
                margin="normal"
                sx={{
                  width: "60%",
                  pr: "5%",
                }}
                value={formInput.medicine}
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    medicine: event.target.value,
                  });
                }}
              >
                <MenuItem value={"PainKillers"}>PainKillers</MenuItem>
                <MenuItem value={"Tylenol"}>Tylenol</MenuItem>
                <MenuItem value={"Paracetamol"}>Paracetamol</MenuItem>
              </TextField>

              <TextField
                required
                sx={{
                  width: "35%",
                }}
                label="Dosage"
                onChange={(event) => {
                  setFormInput({
                    ...formInput,
                    dosage: event.target.value,
                  });
                }}
                margin="normal"
                value={formInput.dosage}
                fullWidth
              />
            </Box>

            <FormLabel id="mess-size">Form</FormLabel>
            <RadioGroup
              row
              name="mess-size"
              aria-labelledby="mess-size"
              value={formInput.form}
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  form: event.target.value,
                });
              }}
              sx={{
                width: "80%",
              }}
            >
              <FormControlLabel
                value="Powder"
                control={<Radio />}
                label="Powder"
              />
              <FormControlLabel
                value="Tab or Cap"
                control={<Radio />}
                label="Tab or Cap"
              />
              <FormControlLabel
                value="Chewable"
                control={<Radio />}
                label="Chewable"
              />
              <FormControlLabel
                value="Liquid"
                control={<Radio />}
                label="Liquid"
              />
              <FormControlLabel
                value="Inhaler"
                control={<Radio />}
                label="Inhaler"
              />
            </RadioGroup>

            <TextField
              required
              select
              value={formInput.status}
              label={"Status"}
              margin="normal"
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  status: event.target.value,
                });
              }}
            >
              <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
              <MenuItem value={"Assigned"}>Assigned</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              pb={"30px"}
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
          </FormControl>
        </form>
      </Box>

      <Box position="absolute" top={1000} sx={{ width: "80%" }}>
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#012d5a",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#f6bd38" }}>patientName</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>physicianName</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>priority</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>location</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>medicine</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>dosage</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>form</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>
                  Assignment Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.map((request, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {request.patientName}
                  </TableCell>
                  <TableCell>{request.physicianName}</TableCell>
                  <TableCell>{request.priority}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>{request.medicine}</TableCell>
                  <TableCell>{request.dosage}</TableCell>
                  <TableCell>{request.form}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default MedicineRequestForm;
