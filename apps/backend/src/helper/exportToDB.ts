import { splitLines } from "../routes/map.ts";
import { PrismaClient } from "database";

export async function createDatabase(
  header: boolean,
  node_str: string,
  edge_str: string,
) {
  const prisma = new PrismaClient();

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

  const insertNodeQueries = nodeData.map((row) => {
    return prisma.nodeDB.create({ data: row });
  });

  const insertEdgeQueries = edgeData.map((row) => {
    return prisma.edgeDB.create({ data: row });
  });

  await prisma.$transaction([
    prisma.$executeRaw`DELETE FROM "EdgeDB";`,
    prisma.$executeRaw`DELETE FROM "NodeDB";`,
    ...insertNodeQueries,
    ...insertEdgeQueries,
  ]);
}
