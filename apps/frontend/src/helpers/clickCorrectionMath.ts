import { vec2, edge, node } from "./typestuff.ts";
import {clamp, distance, dot, lerp} from "./MathHelp.ts";

const MAX_SNAP_DIST = 7500; // Maximum distance from an edge that will snap to an edge

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


export function graphHelper(props: findClosestPointOnGraphProps) {
  let closestPoint: vec2 | null = null;
  let closestDist: number = Infinity;
  let closestEdge: edge | null = null;

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

    const t: number = clamp(
      dot(props.pos.x - pa.x, props.pos.y - pa.y, pb.x - pa.x, pb.y - pa.y) /
        dot(pb.x - pa.x, pb.y - pa.y, pb.x - pa.x, pb.y - pa.y),
      0,
      1,
    );

    const d: vec2 = {
      x: lerp(t, pa.x, pb.x),
      y: lerp(t, pa.y, pb.y),
      z: props.pos.z,
    };
    const dist: number = distance(d, props.pos);
    if (dist < closestDist && dist <= MAX_SNAP_DIST) {
      closestDist = dist;
      closestPoint = d;
      closestEdge = edge;
    }
  }

  if(closestPoint === null)return null;
  return {point:closestPoint, edge:closestEdge};
}


export function pointHelper(props: findClosestNodeOnGraphProps) {
  let closestNode: node | null = null;
  let closestDist: number = Infinity;

  for (let i = 0; i < props.nodes.length; i++) {
    const node = props.nodes[i];
    if (!node || node.point.z !== props.pos.z) continue;

    const pn: vec2 = props.nodes.filter(
      (nodeItem) => nodeItem.nodeID === node.nodeID,
    )[0].point;

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
