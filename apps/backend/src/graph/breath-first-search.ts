import { Edge, Graph, GraphNode } from "./graph.ts";

export function breathFirstSearch(graph: Graph, start: string, end: string) {
  end.split("");
  // ^ so esline doesnt complain the end is unused
  const came_from = new Map<string, string>();
  const visited = new Map<string, boolean>();
  const queue: GraphNode[] = [];

  graph.nodes.forEach((value: GraphNode, key: string) => {
    visited.set(key, false);
  });

  nodeBFS(graph, start, visited, queue, came_from);

  return came_from;
}

function nodeBFS(
  graph: Graph,
  id: string,
  visited: Map<string, boolean>,
  queue: Array<GraphNode | undefined>,
  backtrack: Map<string, string>,
) {
  visited.set(id, true);

  const edges = graph.edges.get(id);
  if (edges) {
    edges.forEach((edge: Edge) => {
      const neighborId = edge.neighborOf(id)!.id;
      if (!visited.get(neighborId)) {
        queue.push(graph.nodes.get(neighborId));
        backtrack.set(neighborId, id);
      }
    });
  }
  if (queue.length !== 0) {
    nodeBFS(graph, queue.shift()!.id, visited, queue, backtrack);
  }
}
