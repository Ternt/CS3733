import {Graph} from "./graph.ts";
import {GraphNode, Edge} from "./graphDataTypes.ts";
import { PathfindingStrategy } from "./graph.ts";

export class DepthFirstSearch implements PathfindingStrategy {
    runSearch(graph: Graph, start: string, end: string) {
        end.split("");
        // ^ so esline doesnt complain the end is unused
        const came_from = new Map<string, string>();
        const visited = new Map<string, boolean>();

        graph.nodes.forEach((value: GraphNode, key: string) => {
            visited.set(key, false);
        });

        this.nodeDFS(graph, start, visited, came_from);

        return came_from;
    }

    nodeDFS(
        graph: Graph,
        id: string,
        visited: Map<string, boolean>,
        backtrack: Map<string, string>,
    ) {
        visited.set(id, true);

        const edges = graph.edges.get(id);
        if (edges) {
            edges.forEach((edge: Edge) => {
                const neighborId = edge.neighborOf(id)!.id;
                if (!visited.get(neighborId)) {
                    backtrack.set(neighborId, id);
                    this.nodeDFS(graph, neighborId, visited, backtrack);
                }
            });
        }
    }
}


