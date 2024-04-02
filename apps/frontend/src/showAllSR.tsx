import React, { useEffect, useState } from "react";

interface ServiceRequest {
  requestID: number;
  type: string;
  notes: string;
  locationID: string;
  // Add other service request properties here
}

const ServiceRequests: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/service-requests") // replace with your server's address and the correct endpoint
      .then((response) => response.json())
      .then((data) => setServiceRequests(data));
  }, []);

  return (
    <div>
      {serviceRequests.map((request) => (
        <div key={request.requestID}>
          <h2>{request.type}</h2>
          <p>{request.notes}</p>
          <p>{request.locationID}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceRequests;
