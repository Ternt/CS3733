import express, { Router, Request, Response } from "express";
import { Graph } from "../graph/graph.ts";
import { breathFirstSearch } from "../graph/breath-first-search";
import { depthFirstSearch } from "../graph/depth-first-search";
import { aStarSearch } from "../graph/a-star-search";

const router: Router = express.Router();

//Return all map edges and nodes
router.get("/", async function (req: Request, res: Response) {
  const graph = new Graph();
  await graph.loadNodesFromDB();
  await graph.loadEdgesFromDB();

  let startNode: string = "";
  let endNode: string = "";

  // Checking startNide is Passed
  if (req.query.startNode !== undefined) {
    startNode = req.query.startNode!.toString();
  } else {
    console.log("startNode not Passed");
    res.sendStatus(204); // and send 204, no data
  }

  // Checking endNode is Passed
  if (req.query.endNode !== undefined) {
    endNode = req.query.endNode!.toString();
  } else {
    console.log("endNode not Passed");
    res.sendStatus(204); // and send 204, no data
  }

  // Check if pathfinding algorithm was specified
  // (default is AStar
  if (req.query.algorithm !== undefined) {
    const algorithm = req.query.algorithm!.toString();
    switch (algorithm) {
      case "bfs":
        graph.searchAlgorithm = breathFirstSearch;
        break;
      case "dfs":
        graph.searchAlgorithm = depthFirstSearch;
        break;
      case "astar":
        graph.searchAlgorithm = aStarSearch;
        break;
      default:
        console.log("invalid search algorithm");
        res.sendStatus(422); // Unprocessable entity
        return;
    }
  }

  const path: string[] = graph.pathfind(startNode, endNode);
  res.json({ path: path });
  res.end();
});

export default router;
