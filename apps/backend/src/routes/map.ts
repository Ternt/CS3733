// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";

function splitLines(t: string): string[] {
  return t.split(/\r\n|\r|\n/);
}

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

router.post("/upload", async function (req: Request, res: Response) {
  if (!req.files || Object.keys(req.files).length < 2) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // Get file data
  const files = req.files;
  const node_str: string = files.nodes.data.toString();
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
      res.status(200);
      return;
    }
  }

  const prisma = new PrismaClient();

  try {
    // parse node csv
    const nodeLines = splitLines(node_str).filter((line) => /\S/.test(line));
    if (header) {
      nodeLines.shift();
    }
    const nodeRows = nodeLines.map((line) => line.split(","));

    const nodeData = Array.from(
      nodeRows.map((row) => ({
        nodeID: row[0],
        xcoord: parseInt(row[1]),
        ycoord: parseInt(row[2]),
        floor: row[3],
        building: row[4],
        nodeType: row[5],
        longName: row[6],
        shortName: row[7],
      })),
    );

    // parse edges csv
    const edgeLines = splitLines(edge_str).filter((line) => /\S/.test(line));
    if (header) {
      edgeLines.shift();
    }
    const edgeRows = edgeLines.map((line) => line.split(","));

    const edgeData = Array.from(
      edgeRows.map((row) => ({
        startNodeID: row[0],
        endNodeID: row[1],
        blocked: false,
      })),
    );

    const insertNodeQueries: PrismaPromise<R>[] = nodeData.map((row) => {
      return prisma.nodeDB.create({ data: row });
    });

    const insertEdgeQueries: PrismaPromise<R>[] = edgeData.map((row) => {
      return prisma.edgeDB.create({ data: row });
    });

    await prisma.$transaction([
      prisma.$executeRaw`DELETE FROM "EdgeDB";`,
      prisma.$executeRaw`DELETE FROM "NodeDB";`,
      ...insertNodeQueries,
      ...insertEdgeQueries,
    ]);
  } catch (error) {
    console.log("node file upload failed");
    console.log(error.message);
    res.sendStatus(406);
    return;
  }

  res.sendStatus(200);
});

export default router;
