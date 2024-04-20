import Box from "@mui/material/Box";
import * as React from "react";
//import Tabs from "@mui/material/Tabs";
//import Tab from "@mui/material/Tab";
import {Chip, FormControl, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {edge, node} from "../helpers/typestuff.ts";

type InfoMenuProp = {
  nodeData: node | null;
  onClose: () => void;
  onChangeNode: (node: node | null) => void;
  edges: edge[];
};

export default function InformationMenu(props: InfoMenuProp) {
  //const [tabValue, setTabValue] = useState(0);

  const [newNodeData, setNewNodeData] = useState<node | null>(props.nodeData);
  useEffect(() => {
    setNewNodeData(props.nodeData);
  }, [props.nodeData]);

  const adminCardStyleBody = {
    fontFamily: "Open Sans",
    fontSize: "15",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    color: "#2f2f2f",
    width: "100%",
  };
  if (newNodeData === null) {
    return <></>;
  }

  function isComplete(): boolean {
    return (
        newNodeData?.nodeID != "" &&
        newNodeData?.point.x != null &&
        newNodeData?.point.y != null &&
        newNodeData.floor != "" &&
        newNodeData.building != "" &&
        newNodeData.longName != "" &&
        newNodeData.shortName != "" &&
        newNodeData.nodeType != ""
    );
  }

  function submitForm() {
    props.onChangeNode(newNodeData);

    if(isComplete() && newNodeData !== null) {
      const editedNode = {
        nodeID: newNodeData.nodeID,
        xcoord: Math.round(newNodeData.point.x),
        ycoord: Math.round(newNodeData.point.y),
        floor: newNodeData.floor,
        building: newNodeData.building,
        longName: newNodeData.longName,
        shortName: newNodeData.shortName,
        nodeType: newNodeData.nodeType
      };

      // Send a PUT request to the server
      fetch("/api/nodes/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedNode),
      })
          .then((response) => {
            console.log(response);
          })

          .then((data) => console.log(data))
          .catch((error) => {
            console.error("Error:", error);
          });
    }
  }

  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        position: "fixed",
        top: "11vh",
        left: "120px",
        bgcolor: "transparent",
      }}
    >
        <FormControl
          sx={{
            display:'flex',
            flexDirection:'row',
            bgcolor:'transparent'
          }}
        >
          <Box
            sx={{
              mt:'2rem',
              height:'2.5rem',
              bgcolor:'white',
              boxShadow:5,
            }}
          >
            <Button
              sx={{
                fontSize:'1.5rem',
                width:'100%',
                height:'100%',
              }}
              onClick={()=>{
                props.onClose();
              }}
            >
              &lt;
            </Button>
          </Box>
          <Box
            sx={{
              padding: 0,
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
              height:'88vh',
              px:2,
              boxShadow: 5,
              bgcolor:'white'
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection:'row',
                gap:1
              }}
            >
              <TextField
                label={"Node ID"}
                value={newNodeData.nodeID}
                sx={adminCardStyleBody}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNewNodeData({ ...newNodeData, nodeID: e.target.value });
                }}
              />
              <TextField
                label={"Floor"}
                value={
                  newNodeData.floor
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({ ...newNodeData, floor: e.target.value });
                }}
              />
            </Box>
            <TextField
              label={"Short Name"}
              value={
                newNodeData.shortName
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, shortName: e.target.value });
              }}
            />
            <TextField
              label={"Long Name"}
              value={
                newNodeData.longName
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, longName: e.target.value });
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection:'row',
                gap:1
              }}
            >
              <TextField
                label={"Building"}
                value={
                  newNodeData.building
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({ ...newNodeData, building: e.target.value });
                }}
              />
              <TextField
                label={"Node Type"}
                value={
                  newNodeData.nodeType
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({ ...newNodeData, nodeType: e.target.value });
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection:'row',
                gap:1
              }}
            >
              <TextField
                label={"X"}
                value={
                  newNodeData.point.x
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({
                    ...newNodeData,
                    point: {
                      x: Math.round(parseFloat(e.target.value)),
                      y: newNodeData?.point.y,
                      z: newNodeData?.point.z,
                    },
                  });
                }}
              />
              <TextField
                label={"Y"}
                value={
                  newNodeData.point.y
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({
                    ...newNodeData,
                    point: {
                      y: Math.round(parseFloat(e.target.value)),
                      x: newNodeData?.point.x,
                      z: newNodeData?.point.z,
                    },
                  });
                }}
              />
            </Box>
            <Box
              sx={{
                display:'flex',
                flexWrap:'wrap',
                gap:1
              }}
            >
              <Typography variant={'caption'} sx={{display:'block', width:'100%'}}>Neighbors</Typography>
              {
                // filter all edges that have this as a node, display the other node as the neighbors
                // add neighbor button that brings up a text popup to add the selection
                props.edges.filter((x)=>{
                  if(props.nodeData === null)return false;
                  if(x.startNode.nodeID === props.nodeData?.nodeID || x.endNode.nodeID === props.nodeData?.nodeID)return true;
                }).map((x)=>{
                  if(x.startNode.nodeID === props.nodeData?.nodeID)
                    return (<Chip label={x.endNode.nodeID} variant="outlined" onDelete={()=>{
                      return true;
                    }} />);
                  if(x.endNode.nodeID === props.nodeData?.nodeID)
                    return (<Chip label={x.startNode.nodeID} variant="outlined" onDelete={()=>{
                      return true;
                    }} />);
                  return (<></>);
                })
              }
              <Chip label={"+"} variant="outlined" onClick={()=>{
                return true;
              }} />
            </Box>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={submitForm}
            >
              Save Node
            </Button>
          </Box>
        </FormControl>
    </Box>
  );
}
