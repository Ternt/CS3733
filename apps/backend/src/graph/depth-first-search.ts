import { Edge, Graph, GraphNode } from "./graph.ts";

export function depthFirstSearch(graph: Graph, start: string, end: string) {
  end.split("");
  // ^ so esline doesnt complain the end is unused
  const came_from = new Map<string, string>();
  const visited = new Map<string, boolean>();

  graph.nodes.forEach((value: GraphNode, key: string) => {
    visited.set(key, false);
  });

  nodeDFS(graph, start, visited, came_from);

  return came_from;
}

function nodeDFS(
  graph: Graph,
  id: string,
  visited: Map<string, boolean>,
  backtrack: Map<string, string>,
) {
  visited.set(id, true);
  console.log("Visited Node:" + id);

  const edges = graph.edges.get(id);
  if (edges) {
    edges.forEach((edge: Edge) => {
      const neighborId = edge.neighborOf(id)!.id;
      if (!visited.get(neighborId)) {
        backtrack.set(neighborId, id);
        nodeDFS(graph, neighborId, visited, backtrack);
      }
    });
  }
}
