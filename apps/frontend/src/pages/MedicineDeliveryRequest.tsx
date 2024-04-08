import React, { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  MenuItem,
  Typography,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  createTheme,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#012D5A",
    },
    secondary: {
      main: "#F6BD38",
    },
    background: {
      default: "#e4e4e4",
      paper: "#f1f1f1",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h1: {
      fontFamily: "sans-serif",
      fontWeight: 300,
    },
    h4: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
  },
});

export default function MedicineDeliveryForm() {
  type form = {
    medicine: "";
    dosage: "";
    form: "";
    patientName: "";
    physicianName: "";
    location: "";
    priority: "";
    status: "";
  };

  const [formData, setFormData] = useState<form[]>([]);
  const [formValues, setFormValues] = useState<form>({
    medicine: "",
    dosage: "",
    form: "",
    patientName: "",
    physicianName: "",
    location: "",
    priority: "",
    status: "",
  });

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setFormData([...formData, formValues]);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container sx={{ margin: 0 }}>
          <Box
            sx={{
              width: 507,
              height: "100vh",
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <Typography variant="h5" sx={{ color: "secondary.main" }}>
                MEDICINE DELIVERY
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "#FF0000", paddingBottom: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="filled" sx={{ m: 3, width: 210 }}>
                  <InputLabel id="medicine-label">Medicine</InputLabel>
                  <Select
                    value={formValues.medicine}
                    name="medicine"
                    label="Medicine"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Tylenol"}>Tylenol</MenuItem>
                    <MenuItem value={"Pain Killers"}>Pain Killers</MenuItem>
                    <MenuItem value={"Paracetamol"}>Paracetamol</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="patient-name"
                  name="dosage"
                  label="Dosage"
                  variant="filled"
                  onChange={handleTextChange}
                  sx={{ m: 3, width: 85 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl>
                  <FormLabel id={"medicine-form"}>Form</FormLabel>
                  <RadioGroup row name="form" onChange={handleSelectChange}>
                    <FormControlLabel
                      value="Tab or Cap"
                      control={<Radio />}
                      label="Tab or Cap"
                    />
                    <FormControlLabel
                      value="Cream"
                      control={<Radio />}
                      label="Cream"
                    />
                    <FormControlLabel
                      value="Inhaler"
                      control={<Radio />}
                      label="Inhaler"
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
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="patient-name"
                  name="patientName"
                  label="Patient Name"
                  variant="standard"
                  onChange={handleTextChange}
                  // InputLabelProps={{shrink: true}}
                  sx={{ m: 3, width: 343 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="physician-name"
                  name="physicianName"
                  label="Name of Primary Physician"
                  variant="standard"
                  onChange={handleTextChange}
                  sx={{ m: 3, width: 343 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="filled" sx={{ m: 3, width: 343 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    value={formValues.location}
                    name="location"
                    label="Location"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                    <MenuItem value={"Location"}>Location</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ m: 3, width: 343 }} variant="filled">
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    value={formValues.priority}
                    name="priority"
                    label="Priority"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Priority"}>Priority</MenuItem>
                    <MenuItem value={"Priority"}>Priority</MenuItem>
                    <MenuItem value={"Priority"}>Priority</MenuItem>
                    <MenuItem value={"Priority"}>Priority</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ m: 3, width: 343 }} variant="filled">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    value={formValues.status}
                    name="status"
                    label="Status"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                    <MenuItem value={"Assigned"}>Assigned</MenuItem>
                    <MenuItem value={"InProgress"}>In Progress</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  m: 2,
                  color: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
