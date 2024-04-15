import { Box, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";


async function getLanguageDirection(path: Array<string>){
    const response: AxiosResponse = await axios.get("/api/map");

    const nodeTable = response.data.nodes;
    const nodeList = [];
    // const pathName = [];
    console.log("path", path);
    const directions: string[] = [];

    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = nodeTable.find(nodes => nodes.nodeID === path[i]);
        nodeList.push(currentNode);
        const nextNode = nodeTable.find(nodes => nodes.nodeID === path[i+1]);

        if (currentNode.floor != nextNode.floor) {
            directions.push(`Take elevator/stair to floor ${nextNode.floor}`);
        }
        else {
            const dx = nextNode.xcoord - currentNode.xcoord;
            const dy = nextNode.ycoord - currentNode.ycoord;
            const angle = Math.atan2(dx, dy);

            if (i > 0) {
                const previousNode = nodeTable.find(nodes => nodes.nodeID === path[i-1]);
                const dxPrev = currentNode.xcoord - previousNode.xcoord;
                const dyPrev = currentNode.ycoord - previousNode.ycoord;
                const anglePrev = Math.atan2(dxPrev, dyPrev);

                const directionChange = angle - anglePrev;
                console.log(directionChange);
                if (Math.abs(directionChange) < Math.PI / 4) {
                    directions.push("Walk straight");
                } else if (directionChange > 0) {
                    directions.push("Turn right");
                } else {
                    directions.push("Turn left");
                }
            }
        }}
    console.log("nodeList", nodeList);
    return directions;
}

async function fetchPathData({startLocation, endLocation}) {
    try {
        const response = await axios.get(`/api/astar-api?&startNode=${endLocation}&endNode=${startLocation}`);
        return response.data.path; // Return the path in array
    } catch (error) {
        // console.error("Error fetching path data:", error);
        return ["no path"]; // Return no path if there's error ?probably doesn't work
    }
}

function NaturalLanguageDirection({startLocation, endLocation}) {

    const [path, setPathData] = useState([]); // Use useState to manage the path data state
    const [directionData, setDirectionData] = useState([]);

    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
            const path = await fetchPathData({startLocation, endLocation});
            setPathData(path); // Update state with the fetched path data
        };

        fetchData(); // Call the fetchData function
    }, [startLocation, endLocation]); // Re-fetch data when startLocation or endLocation changes


    useEffect(() => {
        // Define a function to fetch data
        const fetchDirection = async () => {
            const directions = await getLanguageDirection(path);
            setDirectionData(directions); // Update state with the fetched path data
        };

        if (path.length > 0) {
            fetchDirection();
        }
    }, [path]); // Re-fetch data when startLocation or endLocation changes


    return (
        <Box sx={{ p: 2, width: "100%"}}>
            <Typography>
                Path from {startLocation} to {endLocation}: {directionData.join(", ")}
            </Typography>
        </Box>
    );
}

export default NaturalLanguageDirection;
