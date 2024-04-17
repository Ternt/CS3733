import axios, { AxiosResponse } from "axios";

type node = {
    xcoord: number;
    ycoord: number;
    nodeID: string;
    nodeType: string;
    longName: string;
    building?: string;
    shortName?: string;
    floor?: string;
};

function findNextNodeWithType(nodeTable: Array<node>, path: Array<string>, index: number){
    for (let i: number = index; i < path.length - 1; i++) {
        const currentNodeType = nodeTable.find(nodes => nodes.nodeID === path[i])!.nodeType;
        if(currentNodeType != 'HALL') {
            return nodeTable.find(nodes => nodes.nodeID === path[i])!.longName;
        }
    }
    return nodeTable.find(nodes => nodes.nodeID === path[index])!.nodeType;
}

async function getLanguageDirection(path: Array<string>): Promise<string[]>{
    const response: AxiosResponse = await axios.get("/api/map");

    const nodeTable: Array<node> = response.data.nodes;
    console.log("nodeTable", nodeTable);
    const nodeList: Array<node> = [];
    const directions: string[] = [];

    for (let i: number = 0; i < path.length - 2; i++) {
        const currentNode = nodeTable.find(nodes => nodes.nodeID === path[i])!;
        const currentNodeName = currentNode.shortName;
        nodeList.push(currentNode);
        const nextNode = nodeTable.find(nodes => nodes.nodeID === path[i+1])!;

        if (i === 0) {
            directions.push("You are currently at: " + currentNodeName + " on floor: " + currentNode.floor);
        }

        else if (currentNode.floor != nextNode.floor) {
            if (currentNode.nodeType === "ELEV") {
                directions.push(`Take elevator to floor ${nextNode.floor}`);
            }
            else {
                directions.push(`Take stairs to floor ${nextNode.floor}`);
            }
            // add the direction when exit the stair/elev
            // "head towards: " find the name of the next node in path that's not a hall
            i++;
            const nextNodeNameWithType = findNextNodeWithType(nodeTable, path, i+1);
            directions.push(`Head towards: ${nextNodeNameWithType}`);

        }
        else {
            const dx: number = nextNode.xcoord - currentNode.xcoord;
            const dy: number = nextNode.ycoord - currentNode.ycoord;
            const angle: number = Math.atan2(dy, dx);


                // add filter for node with only 2 neighbours to walk straight??
                const previousNode = nodeTable.find(nodes => nodes.nodeID === path[i-1])!;
                const dxPrev: number = currentNode.xcoord - previousNode.xcoord;
                const dyPrev: number = currentNode.ycoord - previousNode.ycoord;

                const anglePrev = Math.atan2(dyPrev, dxPrev);

                let directionChange: number = (angle - anglePrev);
                console.log(directionChange);

                //map angle from 0 to pi

                if (directionChange > Math.PI && directionChange < 2*Math.PI){
                    directionChange = directionChange - 2*Math.PI;
                }
                else if (directionChange < -Math.PI && directionChange > -2*Math.PI) {
                    directionChange = directionChange + 2*Math.PI;
                }


                if ((Math.abs(directionChange) < Math.PI / 4) || (Math.abs(directionChange - 2*Math.PI) < Math.PI / 4) || (Math.abs(directionChange + 2*Math.PI) < Math.PI / 4)) {
                    if (directions[directions.length - 1] != "Walk straight") {
                        directions.push("Walk straight");
                    }
                } else if (directionChange > 0) {
                    directions.push("Turn right at: "+ currentNodeName);
                } else {
                    directions.push("Turn left at: " + currentNodeName);
                }
        }}
    const endNodeName = nodeTable.find(nodes => nodes.nodeID === path[path.length - 1])!.longName;
    directions.push("You are at: " + endNodeName);
    console.log("nodeList", nodeList);
    return directions;
}

async function fetchPathData(startLocation: string, endLocation:string, searchAlgorithm: string) {
    try {
        console.log("searchAlgorithm:",searchAlgorithm);
        const response = await axios.get(`/api/pathfind?startNode=${endLocation}&endNode=${startLocation}&algorithm=${searchAlgorithm}`);
        console.log("path:",response.data.path);
        return response.data.path; // Return the path in array
    } catch (error) {
        return ["no path"]; // Return no path if there's error ?probably doesn't work
    }
}


export default async function NaturalLanguageDirection(startLocation: string, endLocation:string, searchAlgorithm: number) {
    let searchAlgorithmString;
    if (searchAlgorithm === 0){
        searchAlgorithmString = "astar";
    }
    else if (searchAlgorithm === 1){
        searchAlgorithmString = "bfs";
    }
    else if (searchAlgorithm === 2){
        searchAlgorithmString = "dfs";
    }
    else {
        searchAlgorithmString = "dijkstra";
    }

    const path = await fetchPathData(startLocation, endLocation, searchAlgorithmString);
    if(path.length === 0)
        return;
   return await getLanguageDirection(path);
}

