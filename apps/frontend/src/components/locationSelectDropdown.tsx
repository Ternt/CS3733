import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {node, nodesAndEdges} from "../helpers/typestuff.ts";
import axios from "axios";

type dropdownProps = {
  onChange: (value: string) => void;
};

let NodeList: node[];

function LocationSelectDropdown(props: dropdownProps) {
    const [placeholder, setplaceholder] = useState(<></>);
    const callbacker = useCallback(handleLocationInput, [props]);

    /**
     * Update the selected location based on the dropdown option
     * @param e The dropdown element that changed
     */
    function handleLocationInput(e: ChangeEvent<HTMLSelectElement>) {
        props.onChange(e.target.value);
    }

    useEffect(() => {
        axios.get<nodesAndEdges>("/api/map").then((response) => {
            NodeList = response.data.nodes;
            console.log(NodeList);

            setplaceholder(
                <select defaultValue="CCNF001L1"
                        name="locations"
                        id="locSelect"
                        onChange={callbacker}>
                        {NodeList.map((request) => {
                            //console.log(request);
                            return (
                                <option value={request.nodeID} key={request.nodeID}>{request.longName}</option>
                            );
                        })}
                </select>,
            );
        });
    }, [callbacker]);

    console.log(placeholder);
    return placeholder;
}

export default LocationSelectDropdown;
