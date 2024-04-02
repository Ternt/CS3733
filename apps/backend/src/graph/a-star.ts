import { BaseGraph, GraphNode, Edge } from "./base-graph";
import { PriorityQueue } from "./priority-queue.ts";

export class AStarGraph extends BaseGraph {
  constructor() {
    super();
    this.nodes = new Map<string, GraphNode>();
    this.edges = new Map<string, Edge[]>();
  }

  aStar(startId: string, endId: string): GraphNode[] {
    const frontier = new PriorityQueue();
    frontier.push([startId, 0.0]);
    const came_from = new Map<string, string>();
    const cost_so_far = new Map<string, number>();
    came_from.set(startId, "");
    cost_so_far.set(startId, 0.0);
    console.log(cost_so_far.get(startId));

    // A-Star Algorithm
    while (!frontier.isEmpty()) {
      const current = frontier.pop()[0];

      if (current == endId) {
        break;
      }

      const neighbours = this.edges
        .get(current)!
        .filter((edge) => !edge.blocked)
        .map((edge) => edge.neighborOf(current)!.id);

      for (const neighbour of neighbours) {
        const new_cost =
          cost_so_far.get(current) + this.cost(current, neighbour);

        if (
          !cost_so_far.has(neighbour) ||
          new_cost < cost_so_far.get(neighbour)!
        ) {
          cost_so_far.set(neighbour, new_cost);
          const priority = new_cost + this.cost(endId, neighbour);
          frontier.push([neighbour, priority]);
          came_from.set(neighbour, current);
        }
      }
    }

    // backtrack and create path
    const path: string[] = this.backtrack(came_from, startId, endId);
    this.printPath(path);
    return path.map((node) => this.nodes.get(node)!);
  }
}
