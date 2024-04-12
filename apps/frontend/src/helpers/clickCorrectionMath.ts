import { vec2, edge, node } from "./typestuff.ts";

const MAX_SNAP_DIST = 75000; // Maximum distance from an edge that will snap to an edge

type findClosestPointOnGraphProps = {
  pos: vec2;
  floor: number;
  nodes: node[];
  edges: edge[];
};
type findClosestNodeOnGraphProps = {
  pos: vec2;
  floor: number;
  nodes: node[];
  distance?: number;
};
type findEdgeboundPathProps = {
  end: vec2;
  path: node[];
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
    const startNode = edge.startNode;
    const endNode = edge.endNode;
    if (!startNode || !endNode) continue;
    if (startNode.point.z !== props.floor || endNode.point.z !== props.floor) {
      continue;
    }

    const pa: vec2 = props.nodes.filter(
      (node) => node.nodeID == startNode.nodeID,
    )[0].point;
    const pb = props.nodes.filter((node) => node.nodeID == endNode.nodeID)[0]
      .point;

    // TODO adjust pa and pb for screen scaling of the image
    // let x1 = startNode.x * zoomScale + offset.x;
    // let y1 = startNode.y * zoomScale + offset.y;
    // let x2 = endNode.x * zoomScale + offset.x;
    // let y2 = endNode.y * zoomScale + offset.y;

    const t: number = clamp(
      dot(props.pos.x - pa.x, props.pos.y - pa.y, pb.x - pa.x, pb.y - pa.y) /
        dot(pb.x - pa.x, pb.y - pa.y, pb.x - pa.x, pb.y - pa.y),
      0,
      1,
    );

    const d: vec2 = {
      x: pa.x + t * (pb.x - pa.x),
      y: pa.y + t * (pb.y - pa.y),
      z: props.pos.z,
    };
    const dist: number = distance(d, props.pos);
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
  let closestNode: node | null = null;
  let closestDist: number = Infinity;

  for (let i = 0; i < props.nodes.length; i++) {
    const node = props.nodes[i];
    if (!node || node.point.z !== props.pos.z) continue;

    const pn: vec2 = props.nodes.filter(
      (nodeItem) => nodeItem.nodeID === node.nodeID,
    )[0].point;

    // TODO adjust for screen scaling of the image
    // let x1 = startNode.x * zoomScale + offset.x;
    // let y1 = startNode.y * zoomScale + offset.y;
    // let x2 = endNode.x * zoomScale + offset.x;
    // let y2 = endNode.y * zoomScale + offset.y;

    const mousePos: vec2 = props.pos;
    const dist: number = distance(pn, mousePos);
    if (dist < closestDist) {
      if (props.distance !== undefined && dist > props.distance) continue;
      closestDist = dist;
      closestNode = node;
    }
  }

  return closestNode;
}

export function customPathHelper(props: findEdgeboundPathProps) {
  // Check distances of last two nodes
  const secondToLastIndex = props.path.length - 2;
  const secondToLastNode = props.path[secondToLastIndex];
  const lastIndex = props.path.length - 1;
  const lastNode = props.path[lastIndex];
  const pn2TL: vec2 = secondToLastNode.point;
  const pnL: vec2 = lastNode.point;

  // TODO adjust for screen scaling of the image
  // let x1 = startNode.x * zoomScale + offset.x;
  // let y1 = startNode.y * zoomScale + offset.y;
  // let x2 = endNode.x * zoomScale + offset.x;
  // let y2 = endNode.y * zoomScale + offset.y;

  const dist2TLToL: number = distance(pn2TL, pnL);
  const dist2TLToP: number = distance(pn2TL, props.end);

  if (dist2TLToL < dist2TLToP) {
    // Selected point is past the last pathfinding node
    return lastNode;
  } else {
    return secondToLastNode;
  }
}
