import React, {useEffect, useState} from "react";
import axios from "axios";
import "./displayCSV.scss";

let NodeList: [];
let EdgeList: [];

const EdgeCSVDisplay: React.FC = () => {
    const [nodeTable, setNodeTable] = useState(<></>);
    const [edgeTable, setEdgeTable] = useState(<></>);
    useEffect(() => {
        axios.get<[]>("/api/map").then((response) => {
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
                        {NodeList.map((request) => {
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
                        })}
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
                        {EdgeList.map((request) => {
                            //console.log(request);
                            return (
                                <tr>
                                    <td>{request.startNodeID}</td>
                                    <td>{request.endNodeID}</td>
                                    <td>{request.blocked.toString()}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>,
            );
        });
    }, []);

    return (<div className={"tableContainer"}>
        <div className={"table"}>
            <h2>Node Table</h2>
            {nodeTable}
        </div>
        <div className={"tableEdge"}>
            <h2>Edge Table</h2>
            {edgeTable}
        </div>
    </div>);
};

export default EdgeCSVDisplay;

