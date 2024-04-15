import PrismaClient from "../bin/database-connection.ts";
import {aStarSearch} from "./a-star-search.ts";
import {GraphNode, NodeType, Edge, floorNameArray, floorArray, floorValueDict} from "./graphDataTypes.ts"

export class Graph {
    nodes: Map<string, GraphNode>;
    edges: Map<string, Edge[]>;

    searchAlgorithm: (
        graph: Graph,
        start: string,
        end: string,
    ) => Map<string, string>;

    constructor() {
        this.nodes = new Map<string, GraphNode>();
        this.edges = new Map<string, Edge[]>();
        this.searchAlgorithm = aStarSearch;
    }

    pathfind(start: string, end: string) {
        const came_from = this.searchAlgorithm(this, start, end);
        let path: string[] = this.backtrack(came_from, start, end);
        path = this.postProcessPath(path);
        this.printPath(path);
        return path;
    }

    async loadNodesFromDB() {
        const dbContent = await PrismaClient.nodeDB.findMany();

        for (const record of dbContent) {
            const node = new GraphNode(
                record.nodeID,
                record.xcoord,
                record.ycoord,
                floorArray[floorNameArray.indexOf(record.floor)],
                record.building,
                NodeType[record.nodeType as keyof typeof NodeType],
                record.longName,
                record.shortName,
            );

            this.nodes.set(node.id, node);
            this.edges.set(node.id, []);
        }
    }

    async loadEdgesFromDB() {
        const dbContent = await PrismaClient.edgeDB.findMany();

        for (const record of dbContent) {
            const edge = new Edge(
                this.nodes.get(record.startNodeID)!,
                this.nodes.get(record.endNodeID)!,
            );

            // check if edge is valid
            if (edge.start === undefined || edge.end === undefined) {
                console.error(
                    "reading edge",
                    "(",
                    record.startNodeID,
                    "->",
                    record.endNodeID,
                    ")",
                    "failed",
                );
                continue;
            }

            // add bidirectional edges
            this.edges.get(edge.start.id)?.push(edge);
            this.edges.get(edge.end.id)?.push(edge);
        }
    }

    printPath(path: string[] | undefined) {
        // check if no path
        if (path === undefined || path.length == 0) {
            return;
        }

        let string = "Path: ";
        string = string.concat(path!.join(" -> "));
        console.log(string);
    }

    cost(StartNodeID: string, EndNodeID: string): number {
        const startNode = this.nodes.get(StartNodeID)!;
        const endNode = this.nodes.get(EndNodeID)!;
        const startZ = floorValueDict[startNode.floor];
        const endZ = floorValueDict[endNode.floor];
        const cost =
            ((startNode.xCoord - endNode.xCoord) ** 2 +
                (startNode.yCoord - endNode.yCoord) ** 2) **
            (1 / 2) +
            Math.abs(startZ - endZ) * 50;
        return cost;
    }

    backtrack(
        came_from: Map<string, string>,
        start: string,
        end: string,
    ): string[] {
        // check that path exists
        if (!came_from.get(end)) {
            console.log(
                "\x1b[31m%s\x1b[0m", // output color to make debugging easier
                "PATH FINDING FAILED: NO PATH FROM " + start + " TO " + end,
            );
            return [];
        }

        // backtrack and create path
        const path: string[] = [];
        let tmp: string = end;

        while (tmp !== start) {
            path.push(tmp);
            tmp = came_from.get(tmp)!;
        }
        path.push(tmp);

        return path;
    }

    postProcessPath(path: string[] | undefined) {
        if (path === undefined || path.length == 0) {
            return [];
        }

        const toRemove: number[] = [];
        let elevatorCount = 0;

        for (let i = 0; i < path.length ; i++) {
            const node: GraphNode = this.nodes.get(path[i])!;
            if (node.type === NodeType.ELEV) {
                elevatorCount += 1;
                if (elevatorCount >= 3) {
                    toRemove.push(i - 1);
                    elevatorCount -= 1;
                }
            }
            else {
                elevatorCount = 0;
            }
        }

        toRemove.forEach((value, index) => {
            path.splice(value - index, 1);
        });

        return path;
    }
}
