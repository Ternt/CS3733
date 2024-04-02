import { PrismaClient } from "database";
import * as fs from "fs";
import csv from "csv-parser";
import path from "path";

export async function populateDatabase(prisma: PrismaClient) {
  populateNodes(prisma);
  populateEdges(prisma);
}

//export async function printDatabase

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

//T is replaceable with anything else its just there so it allows us to
//verify the "keyof" type so we can call multiple different tables without
//errors popping up.
export async function uniqueSearch<T>(
  prisma: PrismaClient,
  model: string,
  field: keyof T,
  id: string,
  id2?: string,
) {
  try {
    let returnData;
    switch (model) {
      case "NodeDB": {
        returnData = await prisma.nodeDB.findUnique({
          where: {
            nodeID: id,
          },
          select: {
            [field]: true,
          },
        });
        break;
      }
      case "EdgeDB": {
        if (id2 == null) {
          console.error("Error EdgeDB needs 2 id fields to call data:");
          return null;
        }
        returnData = await prisma.edgeDB.findUnique({
          where: {
            startNodeID_endNodeID: {
              startNodeID: id,
              endNodeID: id2,
            },
          },
          select: {
            [field]: true,
          },
        });
        break;
      }
      case "ServiceRequest": {
        returnData = await prisma.serviceRequest.findUnique({
          where: {
            requestID: parseInt(id),
          },
          select: {
            [field]: true,
          },
        });
        break;
      }
      case "MaintenanceRequest": {
        returnData = await prisma.maintenanceRequest.findUnique({
          where: {
            requestID: parseInt(id),
          },
          select: {
            [field]: true,
          },
        });
        break;
      }
      case "FlowerRequest": {
        returnData = await prisma.flowerRequest.findUnique({
          where: {
            requestID: parseInt(id),
          },
          select: {
            [field]: true,
          },
        });
        break;
      }
      default: {
        console.log("Error: model not in database.");
        break;
      }
    }
    console.log("update test here");
    console.log(returnData);
  } catch (error) {
    console.error("Error finding table:", error);
  }
}

// async function updateDatabase(prisma: PrismaClient){
//   const absolutePath = path.join(__dirname, "../../");
//
//   fs.createReadStream(absolutePath)
//       .pipe(csv())
//       .on("data", async (row) => {
//         // Create record in database using Prisma
//         await prisma.nodeDB.create({
//           data: {
//             // Map CSV fields
//             nodeID: row.nodeID,
//             xcoord: parseInt(row.xcoord),
//             ycoord: parseInt(row.ycoord),
//             floor: row.floor,
//             building: row.building,
//             nodeType: row.nodeType,
//             longName: row.longName,
//             shortName: row.shortName,
//           },
//         });
//       })
//       .on("end", () => {
//         console.log("CSV file successfully processed for Nodes");
//       });
// }
