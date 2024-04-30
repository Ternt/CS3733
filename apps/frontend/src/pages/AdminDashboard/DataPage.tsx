import axios, {AxiosResponse} from "axios";
import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { motion } from "framer-motion";

import DownloadCSV from "../../components/DataHandling/DownloadCSV.tsx";
import DataTable from "../../components/DataHandling/DataTable.tsx";
import {Node} from "./../../helpers/typestuff.ts";

import UploadGraphData from "../../components/DataHandling/UploadGraphData.tsx";
import UploadEmployeeData from "../../components/DataHandling/UploadEmployeeData.tsx";


type edge = {
    startNodeID: string;
    endNodeID: string;
    blocked: boolean;
};

type employee = {
    id:number;
    firstName:string;
    lastName:string;
    assignedRequests?:{requestID:number}[];
};

export default function DataPage(){
    const [nodeTable, setNodeTable] = useState<Node[]>([]);
    const [edgeTable, setEdgeTable] = useState<edge[]>([]);
    const [employeeTable, setEmployeeTable] = useState<employee[]>([]);
    const [tab, setTab] = useState<number>(0);

    useEffect(() => {
        axios.get<[]>("/api/map").then((response: AxiosResponse) => {
            setNodeTable(response.data.nodes);
            setEdgeTable(response.data.edges);
        });
        axios.get<[]>("/api/employees").then((response: AxiosResponse) => {
            setEmployeeTable(response.data);
        });
    }, []);

    return(
        <Box sx={{width: '100%', height: '15em', }}>
            <Typography variant={"h4"} sx={{height: '3em', padding: 3}}>
                Data Analytics
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '2.5em'}}>
                {["Nodes", "Edges", "Employee"].map((value, i) => {
                    return(
                        <>
                            <ButtonBase
                                onClick={() => setTab(i)}
                                sx={{
                                    p: 0,
                                    width: '5em',
                                    marginLeft: '1.3em',
                                    height: '100%',
                                    textAlign: 'center',
                                }}
                                key={i}
                            >
                                <Typography>
                                    {value}
                                </Typography>
                                {i === tab ?
                                    (<motion.div
                                        style={{
                                            backgroundColor: "#f6bd38",
                                            width: '5em',
                                            marginTop: '2.35em',
                                            height: '0.2em',
                                            position: 'absolute'
                                        }} layoutId={"tab_underline"}/>) : null}
                            </ButtonBase>

                        </>
                    );
                })}
            </Box>
            {tab === 0 && (
                <Box>
                    <DataTable
                        title={"Edges"}
                        headers={["Node ID", "Short Name", "Long Name", "X", "Y", "Floor", "Building", "Type"]}
                        rows={
                            nodeTable.map((n)=>{return [n.nodeID, n.shortName, n.longName, n.xcoord+"", n.ycoord+"", n.floor, n.building, n.nodeType];})
                        }>
                        <>
                            <UploadGraphData/>
                            <DownloadCSV
                                url={"/api/nodes/download"}
                                filename={"nodes.csv"}
                                title={"Nodes"}
                            />
                        </>
                    </DataTable>
                </Box>
            )}
            {tab === 1 && (
                <Box>

                    <DataTable
                        title={"Edges"}
                        headers={["Index","Start","End","Blocked"]}
                        rows={
                            edgeTable.map((e,i)=>{return [i+"",e.startNodeID,e.endNodeID,e.blocked+""];})
                        }>
                        <>
                            <UploadGraphData/>
                            <DownloadCSV
                                url={"/api/edges/download"}
                                filename={"edges.csv"}
                                title={"Edges"}
                            />
                        </>
                    </DataTable>
                </Box>
            )}
            {tab === 2 && (
                <Box>
                    <Box>
                        <DataTable
                            title={"Employees"}
                            headers={["Employee ID", "First", "Last"]}
                            rows={
                                employeeTable.map((e)=>{return [e.id+"", e.firstName, e.lastName];})
                            }>
                            <>
                                <UploadEmployeeData/>
                                <DownloadCSV
                                    url={"/api/employees/download"}
                                    filename={"employees.csv"}
                                    title={"Employees"}
                                />
                            </>
                        </DataTable>
                    </Box>
                </Box>
            )}

        </Box>
    );
}
