import Box from "@mui/material/Box";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { node } from "../helpers/typestuff.ts";

interface TabPanelProps {
  children?: JSX.Element | JSX.Element[];
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
  };
}

type InfoMenuProp = {
  nodeData: node | null;
  onClose: () => void;
  onChangeNode: (node: node | null) => void;
};

export default function InformationMenu(props: InfoMenuProp) {
  const [tabValue, setTabValue] = useState(0);

  const [newNodeData, setNewNodeData] = useState<node | null>(props.nodeData);
  useEffect(() => {
    console.log(props.nodeData);
    setNewNodeData(props.nodeData);
  }, [props.nodeData]);

  const adminCardStyleBody = {
    fontFamily: "ui-sans-serif",
    fontSize: "15",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    color: "#2f2f2f",
    margin: 1,
    width: "95%",
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
        xcoord: newNodeData.point.x,
        ycoord: newNodeData.point.y,
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
        width: "300px",
        height: "85vh",
        p: 2,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        position: "fixed",
        top: "11vh",
        left: "120px",
        bgcolor: "white",
        boxShadow: 5,
        overflowY: "scroll",
      }}
    >
      <Button onClick={props.onClose} variant={"outlined"}>
        X
      </Button>
      <Box
        sx={{
          backgroundColor: "#f1f1f1",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={() => {
            setTabValue(1 - tabValue);
          }}
        >
          <Tab label="Data" {...a11yProps(0)} />
          <Tab label="Edges" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <FormControl>
          <Box
            sx={{
              padding: 0,
            }}
          >
            <TextField
              label={"nodeID"}
              value={newNodeData.nodeID}
              sx={adminCardStyleBody}
              onChange={(e) => {
                console.log(e.target.value);
                setNewNodeData({ ...newNodeData, nodeID: e.target.value });
              }}
            />
            <TextField
              label={"shortName"}
              value={
                newNodeData.shortName
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, shortName: e.target.value });
              }}
            />
            <TextField
              label={"longName"}
              value={
                newNodeData.longName
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, longName: e.target.value });
              }}
            />
            <TextField
              label={"floor"}
              value={
                newNodeData.floor
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, floor: e.target.value });
              }}
            />
            <TextField
              label={"building"}
              value={
                newNodeData.building
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, building: e.target.value });
              }}
            />
            <TextField
              label={"nodeType"}
              value={
                newNodeData.nodeType
              }
              sx={adminCardStyleBody}
              onChange={(e) => {
                setNewNodeData({ ...newNodeData, nodeType: e.target.value });
              }}
            />
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                label={"x coord"}
                value={
                  newNodeData.point.x
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({
                    ...newNodeData,
                    point: {
                      x: parseFloat(e.target.value),
                      y: newNodeData?.point.y,
                      z: newNodeData?.point.z,
                    },
                  });
                }}
              />
              <TextField
                label={"y coord"}
                value={
                  newNodeData.point.y
                }
                sx={adminCardStyleBody}
                onChange={(e) => {
                  setNewNodeData({
                    ...newNodeData,
                    point: {
                      y: parseFloat(e.target.value),
                      x: newNodeData?.point.x,
                      z: newNodeData?.point.z,
                    },
                  });
                }}
              />
            </Box>
          </Box>
        </FormControl>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}></CustomTabPanel>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={submitForm}
      >
        Submit
      </Button>
    </Box>
  );
}
