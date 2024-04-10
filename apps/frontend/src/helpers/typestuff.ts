export type vec2 = {
  x: number;
  y: number;
};
export type node = {
  point: vec2;
  nodeID: string;
  nodeType: string;
  longName: string;
};
export type edge = {
  startNode: node;
  endNode: node;
};

export type nodesAndEdges = {
    nodes: node[];
    edges: edge[];
}
