import { ChangeEvent, useEffect, useState } from "react";
import { SanitationFormFields } from "./sanitationFields.ts";
import RequestList from "../../helpers/requestList.ts";
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

import Checkboxes from "../../components/FormElements/Checkboxes.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const sanitationRequests = new RequestList();

function SanitationRequestForm() {
  useEffect(() => {
    document.title = "Sanitation Request";
  });
  const [submittedRequests, setSubmittedRequests] = useState<
    SanitationFormFields[]
  >([]);

  const [formInput, setFormInput] = useState<SanitationFormFields>({
    name: "",
    priority: "",
    location: "",
    type: [],
    size: "",
    assignmentStatus: "",
  });

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
      formInput.type.length !== 0 &&
      formInput.size != "" &&
      formInput.assignmentStatus != ""
    );
  }

  function submitForm() {
    setSubmittedRequests((prevRequests) => [...prevRequests, formInput]);
    sanitationRequests.addRequestToList(formInput);
    clearForm();
    console.log(sanitationRequests.requests); // Print the array of requests to the console
  }

  function clearForm() {
    setFormInput({
      ...formInput,
      name: "",
      priority: "",
      location: "",
      type: [],
      size: "",
      assignmentStatus: "",
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
          SANITATION REQUEST
        </Typography>
      </Box>

      <Box
        position="absolute"
        top={150}
        sx={{
          width: "500px",
          backgroundColor: "whitesmoke",
          borderRadius: "0 0 23px 23px ",
        }}
      >
        <form
          id="sanitationForm"
          style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            borderRadius: "0 0 23px 23px ",
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
              <Typography>Made by Yuhan & Warwick</Typography>
            </Box>

            <TextField
              required
              label="Employee Name"
              onChange={handleNameInput}
              margin="normal"
              value={formInput.name}
              fullWidth
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

            <Checkboxes
              label={"Mess Type"}
              onChange={handleTypeChange}
              items={["Solid Waste", "Liquid Spill", "Other"]}
              checked={formInput.type}
            />

            <FormLabel id="mess-size">Mess Size</FormLabel>
            <RadioGroup
              row
              name="mess-size"
              aria-labelledby="mess-size"
              value={formInput.size}
              onChange={updateSizeInput}
            >
              <FormControlLabel
                value="small"
                control={<Radio />}
                label="Small"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="large"
                control={<Radio />}
                label="Large"
              />
            </RadioGroup>

            <TextField
              required
              select
              value={formInput.assignmentStatus}
              label={"Status"}
              margin="normal"
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              onChange={(event) => {
                setFormInput({
                  ...formInput,
                  assignmentStatus: event.target.value,
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

      <Box sx={{ position: "absolute", width: "80%", top: "120vh" }}>
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#012d5a",
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#f6bd38" }}>Name</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Priority</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Location</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Type</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>Size</TableCell>
                <TableCell sx={{ color: "#f6bd38" }}>
                  Assignment Status
                </TableCell>
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
                  <TableCell>{request.type.join(", ")}</TableCell>
                  <TableCell>{request.size}</TableCell>
                  <TableCell>{request.assignmentStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default SanitationRequestForm;
