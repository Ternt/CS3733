import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./displayCSV.scss";

let NodeList: [];
let EdgeList: [];

const MapDataDisplay: React.FC = () => {
  const [nodeTable, setNodeTable] = useState(<></>);
  const [edgeTable, setEdgeTable] = useState(<></>);
  useEffect(() => {
    axios.get<[]>("/api/map").then((response: AxiosResponse) => {
      NodeList = response.data.nodes;
      EdgeList = response.data.edges;
      setNodeTable(
        <div>
          <table>
            <thead>
              <tr>
                <th>NodeID</th>
                <th>xCoord</th>
                <th>yCoord</th>
                <th>floor</th>
                <th>building</th>
                <th>type</th>
                <th>longName</th>
                <th>shortName</th>
              </tr>
            </thead>
            <tbody>
              {NodeList.map(
                (request: {
                  nodeID: string;
                  xcoord: number;
                  ycoord: number;
                  floor: string;
                  building: string;
                  nodeType: string;
                  longName: string;
                  shortName: string;
                }) => {
                  return (
                    <tr key={request.nodeID}>
                      <td>{request.nodeID}</td>
                      <td>{request.xcoord}</td>
                      <td>{request.ycoord}</td>
                      <td>{request.floor}</td>
                      <td>{request.building}</td>
                      <td>{request.nodeType}</td>
                      <td>{request.longName}</td>
                      <td>{request.shortName}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>,
      );

      setEdgeTable(
        <div>
          <table>
            <thead>
              <tr>
                <th>startNode</th>
                <th>endNode</th>
                <th>blocked</th>
              </tr>
            </thead>
            <tbody>
              {EdgeList.map(
                (request: {
                  startNodeID: string;
                  endNodeID: string;
                  blocked: boolean;
                }) => {
                  //console.log(request);
                  return (
                    <tr>
                      <td>{request.startNodeID}</td>
                      <td>{request.endNodeID}</td>
                      <td>{request.blocked.toString()}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>,
      );
    });
  }, []);

  return (
    <div className={"tableContainer"}>
      <div className={"table"}>
        <h2>Node Table</h2>
        {nodeTable}
      </div>
      <div className={"tableEdge"}>
        <h2>Edge Table</h2>
        {edgeTable}
      </div>
    </div>
  );
};

export default MapDataDisplay;
