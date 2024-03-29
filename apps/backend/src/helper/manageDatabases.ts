import { PrismaClient } from "database";
import * as fs from "fs";
import csv from "csv-parser";
import path from "path";

export async function populateDatabase(prisma: PrismaClient) {
  populateNodes(prisma);
  populateEdges(prisma);
}

async function populateNodes(prisma: PrismaClient) {
  const absolutePath = path.join(__dirname, "../../map/L1Nodes.csv");
  try {
    //Clears the table
    await prisma.nodeDB.deleteMany();
    //Populates table
    fs.createReadStream(absolutePath)
      .pipe(csv())
      .on("data", async (row) => {
        // Create record in database using Prisma
        await prisma.nodeDB.create({
          data: {
            // Map CSV fields
            nodeID: row.nodeID,
            xcoord: parseInt(row.xcoord),
            ycoord: parseInt(row.ycoord),
            floor: row.floor,
            building: row.building,
            nodeType: row.nodeType,
            longName: row.longName,
            shortName: row.shortName,
          },
        });
      })
      .on("end", () => {
        console.log("CSV file successfully processed for Nodes");
      });
  } catch (error) {
    console.error("Error populating nodes:", error);
  }
}

async function populateEdges(prisma: PrismaClient) {
  const absolutePath = path.join(__dirname, "../../map/L1Edges.csv");
  try {
    console.log("Populating EdgesDB with CSV Data");
    //Clears the table
    await prisma.edgeDB.deleteMany();
    //Populates table
    fs.createReadStream(absolutePath)
      .pipe(csv())
      .on("data", async (row) => {
        // Create record in database using Prisma
        await prisma.edgeDB.create({
          data: {
            // Map CSV fields
            startNodeID: row.startNodeID,
            endNodeID: row.endNodeID,
            blocked: false,
          },
        });
      })
      .on("end", () => {
        console.log("CSV file successfully processed for Edges");
      });
  } catch (error) {
    console.error("Error populating edges:", error);
  }
}
