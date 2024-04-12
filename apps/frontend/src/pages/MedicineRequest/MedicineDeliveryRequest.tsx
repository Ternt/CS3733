import { ChangeEvent, useEffect, useState } from "react";
import LocationDropdown from "../../components/LocationDropdown.tsx";
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
                  boxShadow: 3,
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
                          padding: 2
                      }}
                  >
                      {/*<Box*/}
                      {/*  sx={{*/}
                      {/*    display: "flex",*/}
                      {/*    justifyContent: "center",*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  <Typography>Made by Thinh & Nick</Typography>*/}
                      {/*</Box>*/}

                      <TextField
                          required
                          label="Patient Name"
                          onChange={handlePatientNameInput}
                          margin="normal"
                          value={formInput.patientName}
                          fullWidth
                          sx={{marginY: 1}}
                      />

                      <TextField
                          required
                          label={"Name of Primary Physician"}
                          onChange={handlePhysicianNameInput}
                          margin="normal"
                          value={formInput.physicianName}
                          sx={{marginY: 1}}
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
                          sx={{marginY: 1}}
                      >
                          <MenuItem value={"Low"}>Low</MenuItem>
                          <MenuItem value={"Medium"}>Medium</MenuItem>
                          <MenuItem value={"High"}>High</MenuItem>
                          <MenuItem value={"Emergency"}>Emergency</MenuItem>
                      </TextField>

                      <Box sx={{marginY: 1}}><LocationDropdown
                          onChange={(v: string) => {
                              setFormInput({ ...formInput, location: v });
                          }}
                          value={formInput.location}
                          filterTypes={["HALL"]}
                          label={"Location"}
                      /></Box>


                      <Box
                          sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginY: 1,
                          }}
                      >
                          <TextField
                              required
                              select
                              id="medicine-select"
                              label={"Medicine"}
                              inputProps={{ MenuProps: { disableScrollLock: true } }}
                              value={formInput.medicine}
                              onChange={(event) => {
                                  setFormInput({
                                      ...formInput,
                                      medicine: event.target.value,
                                  });
                              }}
                              sx={{ width: "60%", pr: "5%" }}
                          >
                              <MenuItem value={"PainKillers"}>PainKillers</MenuItem>
                              <MenuItem value={"Tylenol"}>Tylenol</MenuItem>
                              <MenuItem value={"Paracetamol"}>Paracetamol</MenuItem>
                          </TextField>

                          <TextField
                              required
                              sx={{ width: "35%" }}
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

                      <Box sx={{ marginY: 1 }}>
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
                                  <Box sx={{width: "10rem"}}><FormControlLabel
                                      value="Powder"
                                      control={<Radio />}
                                      label="Powder"
                                  /></Box>
                                  <Box><FormControlLabel
                                      value="Tab or Cap"
                                      control={<Radio />}
                                      label="Tab/Cap"
                                  /></Box>
                              </Box>
                              <Box sx={{display: "flex"}}>
                                  <Box sx={{width: "10rem"}}><FormControlLabel
                                      value="Chewable"
                                      control={<Radio />}
                                      label="Chewable"
                                  /></Box>
                                  <Box><FormControlLabel
                                      value="Liquid"
                                      control={<Radio />}
                                      label="Liquid"
                                  /></Box>
                              </Box>
                              <Box sx={{display: "flex"}}>
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
                          sx={{marginY: 1}}
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
                              marginY: 1,
                          }}
                      >
                          <Button
                              type="button"
                              variant="contained"
                              color="secondary"
                              sx={{ margin: 1 }}
                              onClick={clearForm}
                          >
                              Clear
                          </Button>

                          <Button
                              type="button"
                              variant="contained"
                              color="secondary"
                              sx={{ margin: 1 }}
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
  );
}

export default MedicineRequestForm;
