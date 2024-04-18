import { Graph } from "../graph/graph.ts";
import {Edge, NodeType} from "../graph/graphDataTypes.ts";

async function generateHeatmapData() {
    const graph = new Graph();
    await graph.loadNodesFromDB();
    await graph.loadEdgesFromDB();

    for (const node of [...graph.nodes].filter((node) => node[1].type != NodeType.HALL)) {
        const came_from = graph.strategy.runSearch(graph, node[0], "n/a");
        for (const edge of came_from) {
            graph.incrementEdge(edge[0], edge[1]);
        }
    }

    const edges = new Set<Edge>;

    for (const neighbors of graph.edges) {
        for (const edge of neighbors[1]) {
            edges.add(edge);
        }
    }

    for (const edge of edges) {
        console.log(edge.start, edge.end, edge.blocked, edge.count);
    }
}





