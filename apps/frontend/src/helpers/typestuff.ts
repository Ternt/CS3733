export type vec2 = {
  x: number;
  y: number;
  z: number;
};
export type node = {
  point: vec2;
  nodeID: string;
};
export type edge = {
  startNode: node;
  endNode: node;
};
