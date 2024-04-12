import { ChangeEvent, useEffect, useState } from "react";
import LocationDropdown from "../../components/LocationDropdown.tsx";
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

function MedicineRequestForm() {
  useEffect(() => {
    document.title = "Medicine Request";
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
        display: "flex",
        justifyContent: "center",
        height: "150vh",
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
          borderRadius: "23px 23px 0 0",
        }}
      >
        <Typography
          style={{ fontFamily: "Open Sans", fontWeight: 600 }}
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
          borderRadius: "0 0 23px 23px",
        }}
      >
        <form
          id="medicineForm"
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            borderRadius: "0 0 23px 23px",
          }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "top",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>Made by Thinh & Nick</Typography>
            </Box>

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
              label={"Name of Primary Physician"}
              onChange={handlePhysicianNameInput}
              margin="normal"
              value={formInput.physicianName}
            />

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
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Emergency"}>Emergency</MenuItem>
            </TextField>

            <LocationDropdown
              onChange={(v: string) => {
                setFormInput({ ...formInput, location: v });
              }}
              value={formInput.location}
              filterTypes={["HALL"]}
              label={"Location"}
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
                inputProps={{ MenuProps: { disableScrollLock: true } }}
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
              />
            </Box>

            <Box>
              <FormLabel id="mess-size">Form</FormLabel>
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
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                    label="Tab/Cap"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
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
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    value="Inhaler"
                    control={<Radio />}
                    label="Inhaler"
                  />
                </Box>
              </RadioGroup>
            </Box>

            <TextField
              required
              select
              value={formInput.status}
              label={"Status"}
              margin="normal"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
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

      <Box sx={{ position: "absolute", width: "80%", top: "127vh" }}>
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#012d5a",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#f6bd38" }}>Patient Name</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Physician Name</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Priority</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Location</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Medicine</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Dosage</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Form</TableCell>
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
