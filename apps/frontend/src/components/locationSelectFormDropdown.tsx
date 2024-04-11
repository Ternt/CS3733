// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {TextField, MenuItem} from "@mui/material";
import {ChangeEvent} from "react";
import axios, {AxiosResponse} from "axios";
import {useEffect, useRef, useState} from "react";

type dropdownProps = {
    onChange: (value: string) => void;
    value: string;
};

type selectNode = {
    nodeID: string;
    name: string;
};

function LocationSelectFormDropdown(props: dropdownProps) {
    /**
     * Update the selected location based on the dropdown option
     * @param e The dropdown element that changed
     */
    function handleLocationInput(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        props.onChange(e.target.value);
    }

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
            const ns: selectNode[] = [];

            for (const r of res.data.nodes.filter(
                (node) => node.nodeType !== "HALL",
            )) {
                const n: selectNode = {nodeID: r.nodeID, name: r.longName};
                ns.push(n);
            }

            setNodes(ns);
        });
    }, []);

    return (
        <TextField
            sx={{
                backgroundColor: "white",
                borderRadius: "5px",
            }}
            required
            select
            id="location"
            label={"Location"}
            margin="normal"
            onChange={handleLocationInput}
            value={props.value}
        >
            {getNodes().map((node) => (
                <MenuItem value={node.nodeID} key={node.nodeID}>
                    {node.name}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default LocationSelectFormDropdown;
