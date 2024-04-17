import axios, { AxiosResponse } from "axios";


async function getLanguageDirection(path: Array<string>){
    const response: AxiosResponse = await axios.get("/api/map");

    const nodeTable = response.data.nodes;
    const nodeList = [];
    // const pathName = [];
    console.log("path", path);
    const directions: string[] = [];

    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = nodeTable.find(nodes => nodes.nodeID === path[i]);
        const currentNodeName = currentNode.shortName;
        nodeList.push(currentNode);
        const nextNode = nodeTable.find(nodes => nodes.nodeID === path[i+1]);

        if (currentNode.floor != nextNode.floor) {
            directions.push(`Take elevator/stair to floor ${nextNode.floor}`);
        }
        else {
            const dx = nextNode.xcoord - currentNode.xcoord;
            const dy = nextNode.ycoord - currentNode.ycoord;
            const angle = Math.atan2(dy, dx);

            if (i > 0) {
                const previousNode = nodeTable.find(nodes => nodes.nodeID === path[i-1]);
                const dxPrev = currentNode.xcoord - previousNode.xcoord;
                const dyPrev = currentNode.ycoord - previousNode.ycoord;

                const anglePrev = Math.atan2(dyPrev, dxPrev);

                const directionChange = angle - anglePrev;
                console.log(directionChange);
                if (Math.abs(directionChange) < Math.PI / 4) {
                    if (directions[directions.length - 1] != "Walk straight") { // TODO add a distance to the walk straight
                        directions.push("Walk straight");
                    }
                } else if (directionChange > 0) {
                    directions.push("Turn right at "+ currentNodeName);
                } else {
                    directions.push("Turn left at " + currentNodeName);
                }
            }
        }}
    console.log("nodeList", nodeList);
    return directions;
}

async function fetchPathData(startLocation: string, endLocation:string) {
    try {
        const response = await axios.get(`/api/astar-api?&startNode=${endLocation}&endNode=${startLocation}`);
        return response.data.path; // Return the path in array
    } catch (error) {
        return ["no path"]; // Return no path if there's error ?probably doesn't work
    }
}


export default async function NaturalLanguageDirection(startLocation: string, endLocation:string) {
    const path = await fetchPathData(startLocation, endLocation);
    if(path.length === 0)
        return;
   return await getLanguageDirection(path);
}

