import {Graph} from "../graph/graph.ts";
import {Edge, NodeType} from "../graph/graphDataTypes.ts";
import {DijkstraSearch} from "../graph/dijkstra-search.ts";

export async function generateHeatmapData() {
    const graph = new Graph();
    graph.strategy = new DijkstraSearch();
    await graph.loadNodesFromDB();
    await graph.loadEdgesFromDB();

    const nodesWithoutHalls = [...graph.nodes].filter((node) => node[1].type != NodeType.HALL);

    for (const node of nodesWithoutHalls) {
        const came_from = graph.strategy.runSearch(graph, node[0], "n/a");

        for (const end of nodesWithoutHalls) {
            if (end[0] === node[0]) {
                continue;
            }

            let current: string = end[0];
            let previous: string = came_from.get(current)!;

            while (previous !== "") {
                graph.incrementEdge(current, previous);
                current = previous;
                previous = came_from.get(current)!;
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





