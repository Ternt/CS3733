import { ChangeEvent, useEffect, useState } from "react";
import { SanitationFormFields } from "./sanitationFields.ts";
import RequestList from "../../helpers/requestList.ts";
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
  FormLabel,
} from "@mui/material";

import Checkboxes from "../../components/FormElements/Checkboxes.tsx";
import LocationDropdown from "../../components/LocationDropdown.tsx";

const sanitationRequests = new RequestList();

function SanitationRequestForm() {
  useEffect(() => {
    document.title = "Sanitation Request";
  });

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
            boxShadow: 3,
        }}
      >
          {/*<Box*/}
          {/*    sx={{*/}
          {/*        display: "flex",*/}
          {/*        justifyContent: "center",*/}
          {/*    }}*/}
          {/*>*/}
          {/*    <Typography>Made by Yuhan & Warwick</Typography>*/}
          {/*</Box>*/}

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
                padding: 2,
                gap: 1,
            }}
          >
            <TextField
              required
              label="Employee Name"
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
              sx={{marginY: 0}}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Emergency"}>Emergency</MenuItem>
            </TextField>

              <Box sx={{marginY: 0}}><LocationDropdown
                  onChange={(v: string) => {
                      setFormInput({ ...formInput, location: v });
                  }}
                  value={formInput.location}
                  filterTypes={["HALL"]}
                  label={"Location"}
              /></Box>

            <Box sx={{marginY: 0}}><Checkboxes
              label={"Mess Type"}
              onChange={handleTypeChange}
              items={["Solid Waste", "Liquid Spill", "Other"]}
              checked={formInput.type}
            /></Box>

            <Box sx={{marginY: 0}}><FormLabel id="mess-size">Mess Size</FormLabel>
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
            </RadioGroup></Box>

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
              sx={{marginY: 0}}
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
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}

export default SanitationRequestForm;
