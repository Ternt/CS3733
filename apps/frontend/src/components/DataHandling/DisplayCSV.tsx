import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {Box} from "@mui/material";
import DownloadCSV from "./DownloadCSV.tsx";
import DataTable from "./DataTable.tsx";

type node = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
};

type edge = {
  startNodeID: string;
  endNodeID: string;
  blocked: boolean;
};



export default function DisplayCSV(){
  const [nodeTable, setNodeTable] = useState<node[]>([]);
  const [edgeTable, setEdgeTable] = useState<edge[]>([]);
  const [tab, setTab] = useState(0);


  useEffect(() => {
    axios.get<[]>("/api/map").then((response: AxiosResponse) => {
      setNodeTable(response.data.nodes);
      setEdgeTable(response.data.edges);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          height: "10vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        {["Nodes", "Edges"].map((v, i) => (
          <Box
            onClick={() => {
              setTab(i);
            }}
            sx={{
              height: "90%",
              p: 3,
              bgcolor: tab === i ? "#fff" : "#eee",
              boxShadow: tab === i ? 5 : 0,
              "&:hover": {
                bgcolor: "#fff",
              },
            }}
            key={i}
          >
            {v}
          </Box>
        ))}
      </Box>

      {tab === 0 && (
        <Box
          sx={{
            p:1
          }}
        >
          <DownloadCSV
            url={"/api/nodes/download"}
            filename={"nodes.csv"}
            title={"Nodes"}
          />
          <DataTable
            title={"Edges"}
            headers={["Node ID", "Short Name", "Long Name", "X", "Y", "Floor", "Building", "Type"]}
            rows={
              nodeTable.map((n)=>{return [n.nodeID, n.shortName, n.longName, n.xcoord+"", n.ycoord+"", n.floor, n.building, n.nodeType];})
            }
          />
        </Box>
      )}
      {tab === 1 && (
        <Box
          sx={{
            p:1
          }}
        >
          <DownloadCSV
            url={"/api/edges/download"}
            filename={"edges.csv"}
            title={"Edges"}
          />
          <DataTable
            title={"Edges"}
            headers={["Index","Start","End","Blocked"]}
            rows={
              edgeTable.map((e,i)=>{return [i+"",e.startNodeID,e.endNodeID,e.blocked+""];})
            }
          />
        </Box>
      )}
    </Box>
  );
};