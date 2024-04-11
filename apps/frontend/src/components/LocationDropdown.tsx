import { useState, useEffect } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { node } from "../helpers/typestuff.ts";

type LocationDropdownProps = {
  onChange: (value: string) => void;
  label: string;
};

function LocationDropdown(props: LocationDropdownProps) {
  const [nodes, setNodes] = useState<node[]>([]);

  useEffect(() => {
    axios.get("/api/map").then((response: AxiosResponse) => {
      const nodeList: node[] = response.data.nodes;
      nodeList.filter((n) => n.nodeType != "HALL");

      for (let i = 1; i < nodeList.length; i++) {
        let j = i;
        while (j > 0 && nodeList[j].longName < nodeList[j - 1].longName) {
          const temp = nodeList[j];
          nodeList[j] = nodeList[j - 1];
          nodeList[j - 1] = temp;
          j--;
        }
      }

      setNodes(nodeList);
    });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        onChange={(e) => props.onChange(e.target.value as string)}
      >
        {nodes.map((node) => (
          <MenuItem key={node.nodeID} value={node.nodeID}>
            {node.longName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default LocationDropdown;
