import express, { Router, Request, Response } from "express";
// import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

//Return all map edges and nodes
router.get("/", async function (req: Request, res: Response) {
  const nodes = await PrismaClient.nodeDB.findMany({});
  const edges = await PrismaClient.edgeDB.findMany({});

  if (nodes == null) {
    console.log("Node Retrieval Failed");
    res.sendStatus(204); // and send 204, no data
  }

  if (edges == null) {
    console.log("Edge Retrieval Failed");
    res.sendStatus(204); // and send 204, no data
  }

  res.json({ nodes: nodes, edges: edges });
  res.end();
});

export default router;
