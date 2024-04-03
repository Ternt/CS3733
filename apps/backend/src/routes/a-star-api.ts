import express, { Router, Request, Response } from "express";
import { AStarGraph } from "../graph/a-star.ts";

const router: Router = express.Router();

//Return all map edges and nodes
router.get("/", async function (req: Request, res: Response) {
  const graph = new AStarGraph();
  await graph.loadNodesFromDB();
  await graph.loadEdgesFromDB();

  let startNode: string = "";
  let endNode: string = "";

  //Checking startNide is Passed
  if (req.query.startNode!.toString()) {
    startNode = req.query.startNode!.toString();
  } else {
    console.log("startNode not Passed");
    res.sendStatus(204); // and send 204, no data
  }

  //Checking endNode is Passed
  if (req.query.endNode!.toString()) {
    endNode = req.query.endNode!.toString();
  } else {
    console.log("endNode not Passed");
    res.sendStatus(204); // and send 204, no data
  }

  const path: string[] = graph.aStar(startNode, endNode).map((node) => node.id);
  res.json({ path: path });
  res.end();
});

export default router;
