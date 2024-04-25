import {Graph} from "./graph.ts";
import {UselessClass} from "./useless-class.ts";

export class AStarSearch extends UselessClass {
    override heuristic(graph: Graph, StartNodeID: string, EndNodeID: string): number {
        return graph.cost(StartNodeID, EndNodeID);
    }
}
