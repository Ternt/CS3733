import React, { useEffect, useState } from "react";
import axios from "axios";
import "./serviceRequestDisplay.scss";


interface ServiceRequest {
  requestID: number;
  type: string;
  notes: string;
  location: Location;
  maintenanceDetail: null;
  flowerDetail: null;
  // Add other service request properties here
}
type Location = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  longName: string;
  shortName: string;
  nodeType: string;
};

let RequestList: ServiceRequest[];

const ServiceRequests: React.FC = () => {
  const [placeholder, setplaceholder] = useState(<></>);
  useEffect(() => {
    axios.get<ServiceRequest[]>("/api/service-requests").then((response) => {
      RequestList = response.data;

      setplaceholder(
        <div>
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Type</th>
                <th>Notes</th>
                <th>Location ID</th>
              </tr>
            </thead>
            <tbody>
              {RequestList.map((request) => {
                //console.log(request);
                return (
                  <tr key={request.requestID}>
                    <td>{request.requestID}</td>
                    <td>{request.type}</td>
                    <td>{request.notes}</td>
                    <td>{request.location.nodeID}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>,
      );
    });
  }, []);

  console.log(placeholder);
  return placeholder;

  //const [serviceRequests] = useState<ServiceRequest[]>([]);
};

export default ServiceRequests;
