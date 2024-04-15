import {Graph} from "./graph.ts";

export function breathFirstSearch(graph: Graph, start: string, end: string) {
    const came_from = new Map<string, string>();
    const visited = new Map<string, boolean>();
    const queue: string[] = [];

    queue.push(start);
    visited.set(start, true);

    main_loop:
    while (queue.length != 0) {
        const current: string = queue.shift()!;

        const neighbours = graph.edges
            .get(current)!
            .filter((edge) => !edge.blocked)
            .map((edge) => edge.neighborOf(current)!.id);

        for (const neighbor of neighbours) {
            if (!visited.get(neighbor)) {
                visited.set(current, true);
                came_from.set(neighbor, current);
                queue.push(neighbor);

                if (neighbor === end) {
                    break main_loop;
                }
            }
        }
    }

    return came_from;
}


