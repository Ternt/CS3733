import {Graph} from "../graph/graph.ts";
import {Edge, NodeType} from "../graph/graphDataTypes.ts";
import {DijkstraSearch} from "../graph/dijkstra-search.ts";

export async function generateHeatmapData() {
    const graph = new Graph();
    graph.strategy = new DijkstraSearch();
    await graph.loadNodesFromDB();
    await graph.loadEdgesFromDB();

    for (const node of [...graph.nodes].filter((node) => node[1].type != NodeType.HALL)) {
        const came_from = graph.strategy.runSearch(graph, node[0], "n/a");
        const include = new Set<string>;
        for (const edge of came_from) {
            include.add(edge[1]);
            if (graph.nodes.get(edge[0])?.type !== NodeType.HALL) {
                include.add(edge[0]);
            }
        }

        for (const edge of came_from) {
            if (edge[0] !== "" && edge[1] !== "" && include.has(edge[0])) {
                graph.incrementEdge(edge[0], edge[1]);
            }
        }
    }

    const edges = new Set<Edge>;

    for (const neighbors of graph.edges) {
        for (const edge of neighbors[1]) {
            edges.add(edge);
        }
    }

    for (const edge of edges) {
        console.log(edge.start.id, edge.end.id, edge.blocked, edge.count);
    }
}





