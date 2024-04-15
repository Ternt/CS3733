import {Graph} from "./graph.ts";
import {PriorityQueue} from "./priority-queue.ts";
import { PathfindingStrategy } from "./graph.ts";

export class AStarSearch implements PathfindingStrategy {
    runSearch(graph: Graph, start: string, end: string) {
        const frontier = new PriorityQueue();
        frontier.push([start, 0.0]);
        const came_from = new Map<string, string>();
        const cost_so_far = new Map<string, number>();
        came_from.set(start, "");
        cost_so_far.set(start, 0.0);

        // A-Star Algorithm
        while (!frontier.isEmpty()) {
            const current = frontier.pop()[0];

            if (current == end) {
                break;
            }

            const neighbours = graph.edges
                .get(current)!
                .filter((edge) => !edge.blocked)
                .map((edge) => edge.neighborOf(current)!.id);

            for (const neighbour of neighbours) {
                const soFar = cost_so_far.get(current);
                if (soFar === undefined) continue;
                const new_cost = soFar + graph.cost(current, neighbour);

                if (
                    !cost_so_far.has(neighbour) ||
                    new_cost < cost_so_far.get(neighbour)!
                ) {
                    cost_so_far.set(neighbour, new_cost);
                    const priority = new_cost + graph.cost(end, neighbour);
                    frontier.push([neighbour, priority]);
                    came_from.set(neighbour, current);
                }
            }
        }

        return came_from;
    }
}
