import {Graph} from "./graph.ts";
import { PathfindingStrategy } from "./graph.ts";

export class DepthFirstSearch implements PathfindingStrategy {
    runSearch(graph: Graph, start: string, end: string) {
        const came_from = new Map<string, string>();
        const visited = new Map<string, boolean>();
        const stack: string[] = [];

        stack.push(start);
        visited.set(start, true);

        main_loop:
            while (stack.length != 0) {
                const current: string = stack.pop()!;

                const neighbours = graph.edges
                    .get(current)!
                    .filter((edge) => !edge.blocked)
                    .map((edge) => edge.neighborOf(current)!.id);

                for (const neighbor of neighbours) {
                    if (!visited.get(neighbor)) {
                        visited.set(current, true);
                        came_from.set(neighbor, current);
                        stack.push(neighbor);

                        if (neighbor === end) {
                            break main_loop;
                        }
                    }
                }
            }

        return came_from;
    }
}


