import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";
import { createDatabase } from "../helper/createDatabase.ts";

export function splitLines(t: string): string[] {
  return t.split(/\r\n|\r|\n/);
}

const router: Router = express.Router();

//Return all map edges and nodes
router.get("/", async function (req: Request, res: Response) {
  const prisma = new PrismaClient();
  const nodes = await prisma.nodeDB.findMany();
  const edges = await prisma.edgeDB.findMany();

  if (nodes == null) {
    console.error("Node Retrieval Failed");
    res.sendStatus(204); // and send 204, no data
  }

  if (edges == null) {
    console.error("Edge Retrieval Failed");
    res.sendStatus(204); // and send 204, no data
  }

  res.json({ nodes: nodes, edges: edges });
  res.end();
});

router.post("/upload", async function (req: Request, res: Response) {
  if (!req.files || Object.keys(req.files).length < 2) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // Get file data
  const files = req.files;
  if (!("data" in files.nodes)) {
    res.sendStatus(509);
    return;
  }
  const node_str: string = files.nodes.data.toString();
  if (!("data" in files.edges)) {
    res.sendStatus(509);
    return;
  }
  const edge_str: string = files.edges.data.toString();
  // ^ eslint does not like these lines

  // Check if headers are included in the file
  let header: boolean = true;
  if (req.query.header !== undefined) {
    if (req.query.header!.toString() === "true") {
      header = true;
    } else if (req.query.header!.toString() === "false") {
      header = false;
    } else {
      console.log("header must be 'true' or 'false'");
      res.status(406);
      return;
    }
  }

  try {
    createDatabase(header, node_str, edge_str);
  } catch (error) {
    console.log("node file upload failed");
    res.sendStatus(406);
    return;
  }

  res.sendStatus(200);
});

export default router;
