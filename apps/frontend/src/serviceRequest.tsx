import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

function ServiceRequest() {
  // Initialize state variables for service and details with useState hook

  const requestID = 1;
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const location = "CCONF001L1";

  // Define a function to handle form submission
  const submitService = () => {
    // Check if the service is not "Null option"
    if (service !== "Null option") {
      // Log the current state of service and details
      console.log("Service:", service);
      console.log("Details:", details);

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
  // Return the JSX to render
  return (
    <div className="w-full flex flex-col px-20 gap-5">
      <form>
        //write location,
        <label id="dropdownLabel">Choose a Service </label>
        {/* Bind the service state variable to the select element and update it on change */}
        <select
          id="service"
          name={"service"}
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value={"Null option"}></option>

          <option value={"MAINTENANCE"}>Elevator</option>
          <option value={"MAINTENANCE"}>Power</option>
          <option value={"MAINTENANCE"}>Plumbing</option>
          <option value={"FLOWERS"}>Cleanup</option>
        </select>
        <br />
        <br />
        <label id="serviceText">Details on Issue: </label>
        {/* Bind the details state variable to the input element and update it on change */}
        <input
          type="text"
          id="details"
          name={"details"}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></input>
        <br />
        <br />
        {/* Bind the details state variable to the input element and update it on change */}
        <input
          type="text"
          id="details"
          name={"details"}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></input>
        <br />
        <br />
        {/* Call the submitService function when the button is clicked */}
        <button type="button" onClick={submitService}>
          Submit
        </button>
      </form>
      <br />
      <Link to="/home">Return to Homepage</Link>
    </div>
  );
}

// export Service Request component
export default ServiceRequest;
