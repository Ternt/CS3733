
export enum Floor {
    L2 = "L2",
    L1 = "L1",
    F1 = "1",
    F2 = "2",
    F3 = "3",
}

export const floorNameArray = ["L2", "L1", "1", "2", "3"];
export const floorArray = [Floor.L2, Floor.L1, Floor.F1, Floor.F2, Floor.F3];

export const floorValueDict = {
    [Floor.L2]: 1,
    [Floor.L1]: 2,
    [Floor.F1]: 3,
    [Floor.F2]: 4,
    [Floor.F3]: 5,
};

export enum NodeType {
    CONF = "CONF",
    DEPT = "DEPT",
    HALL = "HALL",
    LABS = "LABS",
    REST = "REST",
    SERV = "SERV",
    ELEV = "ELEV",
    EXIT = "EXIT",
    STAI = "STAI",
    RETL = "RETL",
    INFO = "INFO",
    BATH = "BATH",
}

export class GraphNode {
    //Attributes
    id: string;
    xCoord: number;
    yCoord: number;
    floor: Floor;
    building: string;
    type: NodeType;
    longName: string;
    shortName: string;

    //Constructor
    constructor(
        id: string,
        xCoord: number,
        yCoord: number,
        floor: Floor,
        building: string,
        type: NodeType,
        longName: string,
        shortName: string,
    ) {
        this.id = id;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.floor = floor;
        this.building = building;
        this.type = type;
        this.longName = longName;
        this.shortName = shortName;
    }
}

export class Edge {
    start: GraphNode;
    end: GraphNode;
    blocked: boolean;

    constructor(start: GraphNode, end: GraphNode) {
        this.start = start;
        this.end = end;
        this.blocked = false;
    }

    public distance(): number {
        const x1 = this.start.xCoord;
        const x2 = this.end.xCoord;
        const y1 = this.start.yCoord;
        const y2 = this.end.yCoord;
        const z1 = floorValueDict[this.start.floor];
        const z2 = floorValueDict[this.end.floor];

        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
    }

    public neighborOf(node: GraphNode | string): GraphNode | undefined {
        let id: string;
        if (node instanceof GraphNode) {
            id = node.id;
        } else {
            id = node;
        }

        if (this.start.id == id) {
            return this.end;
        } else if (this.end.id == id) {
            return this.start;
        }
        return undefined;
    }
}
