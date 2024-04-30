import axios, { AxiosResponse } from "axios";
import {FLOOR_NAME_TO_INDEX} from "../../helpers/MapHelper.ts";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

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

export enum directionTypes{
  STRAIGHT,
  RIGHT,
  LEFT,
  START,
  END,
  ELEVATOR,
  STAIRS,
  HELP
}

export const PIXELS_PER_FOOT = 8;

function findNextNodeWithType(nodeTable: node[], path: string[], index: number){
    for (let i: number = index; i < path.length - 1; i++) {
        const currentNodeType = nodeTable.find(nodes => nodes.nodeID === path[i])!.nodeType;
        if (currentNodeType != 'HALL') {
            return nodeTable.find(nodes => nodes.nodeID === path[i])!.longName;
        }
    }
    return nodeTable.find(nodes => nodes.nodeID === path[index])!.nodeType;
}

async function getLanguageDirection(path: string[]){
    const response: AxiosResponse = await axios.get("/api/map");
    let distance = 0;
    const nodeTable: node[] = response.data.nodes;
    const directions: {message:string, floor:number, type:directionTypes}[] = [];

    for (let i: number = 0; i < path.length - 1; i++) {
        const currentNode = nodeTable.find(nodes => nodes.nodeID === path[i])!;
        const currentNodeName = currentNode.shortName;
        const nextNode = nodeTable.find(nodes => nodes.nodeID === path[i + 1])!;

        if (i === 0) {
            directions.push({message: TranslateTo("langDir.currAt") +currentNodeName + TranslateTo("langDir.onFloor") + currentNode.floor, floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.START});
        }

        else if (currentNode.floor != nextNode.floor) {
            if (currentNode.nodeType === "ELEV") {
                directions.push({message: TranslateTo("langDir.takeElev")  + nextNode.floor, floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.ELEVATOR});
            }
            else {
                directions.push({message: TranslateTo("langDir.takeStr")  + nextNode.floor, floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.STAIRS});
            }
            // add the direction when exit the stair/elev
            // "head towards: " find the name of the next node in path that's not a hall
            i++;
            if(i === path.length - 1){
                continue;
            }
            else{
                const nextNodeNameWithType = findNextNodeWithType(nodeTable, path, i+1);
                const nn =  nextNodeNameWithType.toUpperCase().indexOf('HALL') === -1 ? TranslateTo("langDir.towards") +nextNodeNameWithType : TranslateTo("langDir.downHall");
                directions.push({message: TranslateTo("langDir.head") + nn, floor: FLOOR_NAME_TO_INDEX(nextNode.floor!), type:directionTypes.STRAIGHT});
            }
        } else {
            const dx: number = nextNode.xcoord - currentNode.xcoord;
            const dy: number = nextNode.ycoord - currentNode.ycoord;
            const angle: number = Math.atan2(dy, dx);

            const previousNode = nodeTable.find(nodes => nodes.nodeID === path[i - 1])!;
            const dxPrev: number = currentNode.xcoord - previousNode.xcoord;
            const dyPrev: number = currentNode.ycoord - previousNode.ycoord;

            const anglePrev = Math.atan2(dyPrev, dxPrev);

            let dxNext = 0;
            let dyNext = 0;
            if (i < path.length - 2) {
                const theNextOfNextNode: node = nodeTable.find(nodes => nodes.nodeID === path[i + 2])!;
                dxNext = theNextOfNextNode.xcoord - nextNode.xcoord;
                dyNext = theNextOfNextNode.ycoord - nextNode.ycoord;
            }

            const angleNext = Math.atan2(dyNext, dxNext);

            let directionChange: number = (angle - anglePrev);

            const directionChangeNext: number = (angleNext - anglePrev);

            const distCurrToNext: number = (Math.sqrt(dx**2 + dy**2));
            //map angle from 0 to pi

            if (directionChange > Math.PI && directionChange < 2 * Math.PI) {
                directionChange = directionChange - 2 * Math.PI;
            } else if (directionChange < -Math.PI && directionChange > -2 * Math.PI) {
                directionChange = directionChange + 2 * Math.PI;
            }

                if ((Math.abs(directionChange) < Math.PI / 4) || (Math.abs(directionChange - 2*Math.PI) < Math.PI / 4) || (Math.abs(directionChange + 2*Math.PI) < Math.PI / 4)) {
                    if (!directions[directions.length - 1].message.startsWith(TranslateTo("langDir.walkStrt"))){
                        distance = Math.sqrt(dx**2 + dy**2);
                        directions.push({message: TranslateTo("langDir.walkStrt") +Math.round(distance / PIXELS_PER_FOOT) + "ft", floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.STRAIGHT});
                    }
                    else {
                        directions.pop();
                        distance = distance + Math.sqrt(dx**2 + dy**2);
                        directions.push({message:TranslateTo("langDir.walkStrt") +Math.round(distance / PIXELS_PER_FOOT) + "ft", floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.STRAIGHT});
                    }
                }

                else if (((Math.abs(directionChangeNext) < Math.PI / 4) || (Math.abs(directionChangeNext - 2 * Math.PI) < Math.PI / 4) || (Math.abs(directionChangeNext + 2 * Math.PI) < Math.PI / 4)) && (distCurrToNext < 50)) {
                    if (!directions[directions.length - 1].message.startsWith('Walk straight')){
                        directions.pop();
                        distance = distance + Math.sqrt(dx**2 + dy**2);
                        directions.push({message:TranslateTo("langDir.walkStrt") +Math.round(distance / PIXELS_PER_FOOT) + "ft", floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.STRAIGHT});

                    }
                    i = i + 2;
                }

                else {
                  const cn = currentNodeName === undefined ? "" : currentNodeName!;
                  const nn =  cn.toUpperCase().indexOf('HALL') === -1 ? (" at "+cn) : "";
                  if (directionChange > 0) {
                    directions.push({message: TranslateTo("langDir.turnR") +nn, floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.RIGHT});
                  } else {
                    directions.push({message:TranslateTo("langDir.turnL") +nn, floor: FLOOR_NAME_TO_INDEX(currentNode.floor!), type:directionTypes.LEFT});
                  }
                }
        }}
    const endingNode = nodeTable.find(nodes => nodes.nodeID === path[path.length - 1])!;
    directions.push({message: TranslateTo("langDir.currAt") +endingNode.longName, floor: FLOOR_NAME_TO_INDEX(endingNode.floor!), type:directionTypes.END});
    return directions;
}

async function fetchPathData(startLocation: string, endLocation: string, searchAlgorithm: string) {
    try {
        const response = await axios.get(`/api/pathfind?startNode=${endLocation}&endNode=${startLocation}&algorithm=${searchAlgorithm}`);
        return response.data.path; // Return the path in array
    } catch (error) {
        return ["no path found"]; // Return no path if there's error ?probably doesn't work
    }
}


export default async function NaturalLanguageDirection(startLocation: string, endLocation: string, searchAlgorithmString: string) {

    const path = await fetchPathData(startLocation, endLocation, searchAlgorithmString);
    if (path.length === 0)
        return;
    return await getLanguageDirection(path);
}

