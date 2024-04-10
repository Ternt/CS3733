import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./serviceRequest.scss";

function ServiceRequest() {
  // Initialize state variables for service and details with useState hook
  useEffect(() => {
    document.title = "Service Request";
  });

  let requestID = 1;
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");

  // Define a function to handle form submission
  const submitService = () => {
    // Check if the service is not "Null option"
    if (service !== "Null option") {
      // Log the current state of service and details
      console.log("Service:", service);
      console.log("Details:", details);
      console.log("Location", location);

      requestID = Date.now();
      requestID = parseInt(
        requestID.toString().substring(8) +
          parseInt(Math.random() * 1000 + "").toString(),
      );

      // Create a service request object
      const serviceRequest = {
        requestID: requestID,
        type: service,
        notes: details,
        locationID: location,
      };
      console.log(JSON.stringify(serviceRequest));

      // Send a POST request to the server
      fetch("/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceRequest),
      })
        .then((response) => {
          console.log(response);
        })

        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If service is "Null option", do not log anything
      console.log("No service request submitted.");
    }
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#e4e4e4";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  // Return the JSX to render
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh", // Ensure the container fills the full viewport height
        backgroundColor: "transparent", // Ensure the container has a transparent background
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        style={{
          backgroundColor: "#ffffff", // Example: Using hex code for white
          margin: "auto", // Center the grid item horizontally
          padding: 20, // Add some padding inside the grid item for spacing
          borderRadius: 5, // Adds rounded corners to the grid item
          boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", // Adds a shadow for depth
        }}
      >
        <h1 className="header">Service Request</h1>
        <FormControl fullWidth margin="normal">
          {/* Bind the service state variable to the select element and update it on change */}
          <InputLabel id="label" color={"primary"}>
            Service
          </InputLabel>
          <Select
            labelId="service-select-label"
            id="service-select"
            label="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            fullWidth
          >
            <MenuItem value={"Null option"}></MenuItem>
            <MenuItem value={"MAINTENANCE"}>Elevator</MenuItem>
            <MenuItem value={"MAINTENANCE"}>Power</MenuItem>
            <MenuItem value={"MAINTENANCE"}>Cleanup</MenuItem>
            <MenuItem value={"MAINTENANCE"}>Plumbing</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={"Service Details"}
          id="details"
          name={"details"}
          variant="outlined"
          margin="normal"
          color={"primary"}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          fullWidth
        ></TextField>
        {/* Bind the details state variable to the input element and update it on change */}
        {/*
        <input
          type="text"
          id="details"
          name={"details"}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></input>
       */}
        {/* Bind the details state variable to the input element and update it on change */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="location-label" color="primary">
            Location
          </InputLabel>
          <Select
            labelId="location-label"
            id="serviceLocation"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          >
            {/* This menu doesnt start with Null Option due to line 12*/}

            <MenuItem value="CCONF001L1">Anesthesia Conf Floor L1</MenuItem>
            <MenuItem value="CCONF003L1">Abrams Conference Room</MenuItem>
            <MenuItem value="CCONF002L1">
              Medical Records Conference Room Floor L1
            </MenuItem>
            <MenuItem value="CHALL007L1">Hallway 7 Floor L1</MenuItem>
            <MenuItem value="CHALL014L1">Hallway 14 Floor L1</MenuItem>
            <MenuItem value="CHALL015L1">Hallway 15 Floor L1</MenuItem>
            <MenuItem value="CLABS001L1">
              Outpatient Fluoroscopy Floor L1
            </MenuItem>
            <MenuItem value="CLABS002L1">Pre-Op PACU Floor L1</MenuItem>
            <MenuItem value="CLABS003L1">Nuclear Medicine Floor L1</MenuItem>
            <MenuItem value="CLABS004L1">Ultrasound Floor L1</MenuItem>
            <MenuItem value="CLABS005L1">CSIR MRI Floor L1</MenuItem>
            <MenuItem value="CREST001L1">Restroom L Elevator Floor L1</MenuItem>
            <MenuItem value="CREST002L1">Restroom M Elevator Floor L1</MenuItem>
            <MenuItem value="CREST003L1">Restroom K Elevator Floor L1</MenuItem>
            <MenuItem value="CREST004L1">Restroom H Elevator Floor L1</MenuItem>
            <MenuItem value="CRETL001L1">Vending Machine 1 L1</MenuItem>
            <MenuItem value="GELEV00QL1">
              Elevator Q MapNode 7 Floor L1
            </MenuItem>
            <MenuItem value="CSERV001L1">Volunteers Floor L1</MenuItem>
            <MenuItem value="GEXIT001L1">
              Fenwood Road Exit MapNode 1 Floor L1
            </MenuItem>
            <MenuItem value="GHALL002L1">Hallway MapNode 2 Floor L1</MenuItem>
            <MenuItem value="GHALL003L1">Hallway MapNode 3 Floor L1</MenuItem>
            <MenuItem value="GHALL004L1">Hallway MapNode 4 Floor L1</MenuItem>
            <MenuItem value="GHALL005L1">Hallway MapNode 5 Floor L1</MenuItem>
            <MenuItem value="GHALL006L1">Hallway MapNode 6 Floor L1</MenuItem>
            <MenuItem value="GSTAI008L1">Stairs MapNode 8 Floor L1</MenuItem>
            <MenuItem value="WELEV00HL1">Elevator H Floor L1</MenuItem>
            <MenuItem value="WELEV00JL1">Elevator J Floor L1</MenuItem>
            <MenuItem value="WELEV00KL1">Elevator K Floor L1</MenuItem>
            <MenuItem value="WELEV00LL1">Elevator L Floor L1</MenuItem>
            <MenuItem value="WELEV00ML1">Elevator M Floor L1</MenuItem>
            <MenuItem value="CDEPT002L1">
              Day Surgery Family Waiting Floor L1
            </MenuItem>
            <MenuItem value="CDEPT003L1">
              Day Surgery Family Waiting Exit Floor L1
            </MenuItem>
            <MenuItem value="CHALL002L1">Hallway 2 Floor L1</MenuItem>
            <MenuItem value="CHALL001L1">Hallway 1 Floor L1</MenuItem>
            <MenuItem value="CDEPT004L1">
              Medical Records Film Library Floor L1
            </MenuItem>
            <MenuItem value="CHALL005L1">Hallway 5 Floor L1</MenuItem>
            <MenuItem value="CHALL004L1">Hallway 4 Floor L1</MenuItem>
            <MenuItem value="CHALL003L1">Hallway 3 Floor L1</MenuItem>
            <MenuItem value="CHALL006L1">Hallway 6 Floor L1</MenuItem>
            <MenuItem value="CHALL009L1">Hallway 9 Floor L1</MenuItem>
            <MenuItem value="CHALL010L1">Hallway 10 Floor L1</MenuItem>
            <MenuItem value="CHALL008L1">Hallway 8 Floor L1</MenuItem>
            <MenuItem value="CHALL011L1">Hallway 11 Floor L1</MenuItem>
            <MenuItem value="CHALL013L1">Hallway 13 Floor L1</MenuItem>
            <MenuItem value="CHALL012L1">Hallway 12 Floor L1</MenuItem>
          </Select>
          {/* Call the submitService function when the button is clicked */}
          <Button
            variant="contained"
            color={"secondary"}
            onClick={submitService}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
          {/*
        <button type="button" onClick={submitService}>
          Submit
        </button>
        */}

          <Button
            href="#home"
            color={"primary"}
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Return to Homepage
          </Button>
        </FormControl>
        `
      </Grid>
    </Grid>
  );
}

// export Service Request component
export default ServiceRequest;
