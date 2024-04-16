import {Graph} from "./graph.ts";
import { AStarSearch } from "./a-star-search.ts";

export class DijkstraSearch extends AStarSearch {

    override heuristic(graph: Graph, StartNodeID: string, EndNodeID: string): number {
        return 0;
    }

}
