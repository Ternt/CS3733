import { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Autocomplete, TextField } from "@mui/material";

enum SortType {
  ASCENDING,
  DECENDING,
}

type dropdownProps = {
  onChange: (value: string) => void;
  label: string;
  value: string;
  filterTypes?: string[] | string;
  sort?: SortType;
};

type selectNode = {
  nodeID: string;
  longName: string;
  nodeType: string;
};
export default function LocationDropdown(props: dropdownProps) {
  /**
   * Update the selected location based on the dropdown option
   * @param e The dropdown element that changed
   */

  const [nodes, _setNodes] = useState<selectNode[] | null>(null);
  const nodesRef = useRef(nodes);

  function getNodes(): selectNode[] {
    if (nodes !== null) {
      return nodes!;
    } else {
      return [];
    }
  }

  function setNodes(nodes: selectNode[]) {
    nodesRef.current = nodes;
    _setNodes(nodes);
  }

  useEffect(() => {
    axios.get("/api/map").then((res: AxiosResponse) => {
      let ns: selectNode[] = [];
      for (const r of res.data.nodes) {
        const n: selectNode = {
          nodeID: r.nodeID,
          longName: r.longName,
          nodeType: r.nodeType,
        };
        ns.push(n);
      }
      if (typeof props.filterTypes === "string") {
        ns = ns.filter((n) => n.nodeType !== props.filterTypes);
      } else if (typeof props.filterTypes === "object") {
        for (const f of props.filterTypes) {
          ns = ns.filter((n) => n.nodeType !== f);
        }
      }

      // Sort alphabetically (Insertion Sort)
      for (let i = 1; i < ns.length; i++) {
        let j = i;
        while (j > 0 && ns[j].longName < ns[j - 1].longName) {
          const temp = ns[j];
          ns[j] = ns[j - 1];
          ns[j - 1] = temp;
          j--;
        }
      }

      setNodes(ns);
    });
  }, [props.filterTypes]);

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id="location"
      value={props.value}
      options={getNodes()
        .map((n) => n.longName)
        .filter((n) => !n.includes("Hall"))}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}
