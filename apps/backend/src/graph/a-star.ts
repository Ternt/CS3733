import { BaseGraph, GraphNode, Edge } from "./base-graph";
import { PriorityQueue } from "./priority-queue.ts";

export class AStarGraph extends BaseGraph {
  constructor() {
    super();
    this.nodes = new Map<string, GraphNode>();
    this.edges = new Map<string, Edge[]>();
  }

  aStar(startId: string, endId: string): GraphNode[] {
    let path: GraphNode[] = [];
    // const visited_list = [];
    const frontier = new PriorityQueue();
    frontier.push([startId, 0]);
    const came_from = new Map<string, string>();
    const cost_so_far = new Map<string, number>();
    came_from.set(startId, "");
    cost_so_far.set(startId, 0);

    while (!frontier.isEmpty()) {
      const current = frontier.pop()[0];
      // console.log(current);

      if (current == endId) {
        break;
      }

      // get the neighbour of the current node
      // console.log("current", current);
      // console.log(this.edges.get(current));

      const neighbours = this.edges
        .get(current)!
        .filter((edge) => !edge.blocked)
        .map((edge) => edge.neighborOf(current)!.id);

      for (const neighbour of neighbours) {
        // console.log("neighbour", neighbour);
        const new_cost = cost_so_far[current] + this.cost(current, neighbour);
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

    if (!came_from.get(endId)) {
      console.error(
        "PATH FINDING FAILED: NO PATH FROM " + startId + " TO " + endId,
      );
      return [];
    }

    let tmp: string = endId;
    const pathTmp: string[] = [];
    while (tmp !== startId) {
      pathTmp.push(tmp);
      tmp = came_from.get(tmp)!;
    }
    pathTmp.push(tmp);
    this.printPath(pathTmp);
    path = pathTmp.map((node) => this.nodes.get(node)!);

    return path;
  }

  cost(StartNodeID: string, EndNodeID: string): number {
    const startNode = this.nodes.get(StartNodeID)!;
    const endNode = this.nodes.get(EndNodeID)!;
    // console.log(EndNodeID);
    // console.log(endNode);
    // console.log(this.nodes);
    const startZ = startNode.floor.valueOf() + 1;
    const endZ = endNode.floor.valueOf() + 1;
    const cost =
      ((startNode.xCoord - endNode.xCoord) ** 2 +
        (startNode.yCoord - endNode.yCoord) ** 2) **
        (1 / 2) +
      Math.abs(startZ - endZ) * 50;

    return cost;
  }

  printPath(path: string[] | undefined) {
    let string = "Path: ";
    if (path) {
      while (path.length !== 0) {
        string = string.concat(path.pop() + " -> ");
      }
      string = string.concat(" END");
      console.log(string);
    }
  }
}
