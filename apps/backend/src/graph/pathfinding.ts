import { BaseGraph, GraphNode, Edge } from "./base-graph";

export class PathfindingGraph extends BaseGraph {
  constructor() {
    super();
    this.nodes = new Map<string, GraphNode>();
    this.edges = new Map<string, Edge[]>();
  }

  //Searching Algorithms
  nodeDFS(id: string, visited: Map<string, boolean>) {
    visited.set(id, true);
    console.log("Visited Node:" + id);

    const edges = this.edges.get(id);
    if (edges) {
      edges.forEach((edge: Edge) => {
        const neighborId = edge.neighborOf(id)!.id;
        if (!visited.get(neighborId)) {
          this.nodeDFS(neighborId, visited);
        }
      });
    }
  }

  graphDFS(id: string) {
    const visited = new Map<string, boolean>();

    this.nodes.forEach((value: GraphNode, key: string) => {
      visited.set(key, false);
    });

    this.nodeDFS(id, visited);
  }

  nodeBFS(
    id: string,
    visited: Map<string, boolean>,
    queue: Array<GraphNode | undefined>,
    backtrack: Map<string, string>,
  ) {
    visited.set(id, true);
    //console.log("Visited Node:" + id);

    const edges = this.edges.get(id);
    if (edges) {
      edges.forEach((edge: Edge) => {
        const neighborId = edge.neighborOf(id)!.id;
        if (!visited.get(neighborId)) {
          queue.push(this.nodes.get(neighborId));
          backtrack.set(neighborId, id);
        }
      });
    }
    if (queue.length !== 0) {
      this.nodeBFS(queue.shift()!.id, visited, queue, backtrack);
    }
  }

  graphBFS(id: string): Map<string, string> {
    const backtrack: Map<string, string> = new Map<string, string>();
    const visited = new Map<string, boolean>();
    const queue: GraphNode[] = [];

    this.nodes.forEach((value: GraphNode, key: string) => {
      visited.set(key, false);
    });

    this.nodeBFS(id, visited, queue, backtrack);

    return backtrack;
  }

  pathfind(startId: string, endId: string) {
    const came_from: Map<string, string> = this.graphBFS(startId);
    return this.backtrack(came_from, startId, endId);
  }
}
