import {vec2} from "./vec2.ts";

const MAX_SNAP_DIST = 75; // Maximum distance from an edge that will snap to an edge
type node = {
    point: vec2;
    nodeID: string;
    xcoord: number;
    ycoord: number;
};
type edge = {
    startNodeID: node;
    endNodeID: node;
};
type findClosestPointOnGraphProps = {
    x: number;
    y: number;
    nodes: node[];
    edges: edge[];
};
type findClosestNodeOnGraphProps = {
    x: number;
    y: number;
    nodes: node[];
};

function dot(ax: number, ay: number, bx: number, by: number): number {
    return ax * bx + ay * by;
}

function clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
}

function distance(a: vec2, b: vec2): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

/**
 * Determine the closest point on an edge to a selected point,
 * if the selected point was close enough to an edge
 * @param props Object containing values for the selected coordinate and the nodes and edges arrays
 */
export function graphHelper(props: findClosestPointOnGraphProps) {
    let closestPoint: vec2 | null = null;
    let closestDist: number = Infinity;

    for (let i = 0; i < props.edges.length; i++) {
        const edge = props.edges[i];
        const startNode = edge.startNodeID;
        const endNode = edge.endNodeID;
        if (!startNode || !endNode) continue;

        const pa: vec2 = {
            x: props.nodes.filter((node) => node.nodeID == startNode)[0].xcoord,
            y: props.nodes.filter((node) => node.nodeID == startNode)[0].ycoord,
        };
        const pb: vec2 = {
            x: props.nodes.filter((node) => node.nodeID == endNode)[0].xcoord,
            y: props.nodes.filter((node) => node.nodeID == endNode)[0].ycoord,
        };

        // TODO adjust pa and pb for screen scaling of the image
        // let x1 = startNode.x * zoomScale + offset.x;
        // let y1 = startNode.y * zoomScale + offset.y;
        // let x2 = endNode.x * zoomScale + offset.x;
        // let y2 = endNode.y * zoomScale + offset.y;

        const t: number = clamp(
            dot(props.x - pa.x, props.y - pa.y, pb.x - pa.x, pb.y - pa.y) /
            dot(pb.x - pa.x, pb.y - pa.y, pb.x - pa.x, pb.y - pa.y),
            0,
            1,
        );

        const d: vec2 = {
            x: pa.x + t * (pb.x - pa.x),
            y: pa.y + t * (pb.y - pa.y),
        };
        const mousePos: vec2 = { x: props.x, y: props.y };
        const dist: number = distance(d, mousePos);
        if (dist < closestDist && dist <= MAX_SNAP_DIST) {
            closestDist = dist;
            closestPoint = d;
        }
    }

    //console.log(closestPoint);
    return closestPoint;
}

/**
 * Find the closest node to a selected point
 * @param props Set of coordinates for the input and an array of nodes to check
 */
export function pointHelper(props: findClosestNodeOnGraphProps) {
    let closestNode: string | null = null;
    let closestDist: number = Infinity;

    for (let i = 0; i < props.nodes.length; i++) {
        const node = props.nodes[i];
        if (!node) continue;

        const pn: vec2 = {
            x: props.nodes.filter((nodeItem) => nodeItem.nodeID === node.nodeID)[0]
                .xcoord,
            y: props.nodes.filter((nodeItem) => nodeItem.nodeID === node.nodeID)[0]
                .ycoord,
        };

        // TODO adjust for screen scaling of the image
        // let x1 = startNode.x * zoomScale + offset.x;
        // let y1 = startNode.y * zoomScale + offset.y;
        // let x2 = endNode.x * zoomScale + offset.x;
        // let y2 = endNode.y * zoomScale + offset.y;

        const mousePos: vec2 = { x: props.x, y: props.y };
        const dist: number = distance(pn, mousePos);
        if (dist < closestDist) {
            closestDist = dist;
            closestNode = node.nodeID;
        }
    }

    //console.log(closestNode);
    return closestNode;
}
