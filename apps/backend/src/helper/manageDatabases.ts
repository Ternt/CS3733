import {
  FlowerRequest,
  FlowerType,
  MaintenanceRequest,
  MaintenanceType,
  NodeDB,
  PrismaClient,
  ServiceRequest,
  ServiceRequestType,
} from "database";
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

//Update A Field within a DataBase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateAFieldInNodeDB<T>(
  prisma: PrismaClient,
  id: number,
  field: keyof T,
  change: string | number,
) {
  try {
    const updatedField = await prisma.serviceRequest.update({
      where: { requestID: id },
      data: {
        [field]: change,
      },
    });
    console.log(updatedField);
  } catch (error) {
    console.error("NodeDB unsuccessfully updated: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateAFieldInEdgeDB<T>(
  prisma: PrismaClient,
  id: string,
  id2: string,
  field: keyof T,
  change: string | boolean,
) {
  try {
    const updatedField = await prisma.edgeDB.update({
      where: {
        startNodeID_endNodeID: {
          startNodeID: id,
          endNodeID: id2,
        },
      },
      data: {
        [field]: change,
      },
    });
    console.log(updatedField.startNodeID);
  } catch (error) {
    console.error("EdgeDB unsuccessfully updated: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateAFieldInServiceReqDB<T>(
  prisma: PrismaClient,
  id: number,
  field: keyof T,
  change:
    | string
    | MaintenanceRequest
    | FlowerRequest
    | ServiceRequestType
    | NodeDB,
) {
  try {
    const updatedField = await prisma.serviceRequest.update({
      where: { requestID: id },
      data: {
        [field]: change,
      },
    });
    console.log(updatedField);
  } catch (error) {
    console.error("ServiceRequestDB unsuccessfully updated: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateAFieldInMaintenanceReqDB<T>(
  prisma: PrismaClient,
  id: number,
  field: keyof T,
  change: number | MaintenanceType | ServiceRequest,
) {
  try {
    const updatedField = await prisma.serviceRequest.update({
      where: { requestID: id },
      data: {
        [field]: change,
      },
    });
    console.log(updatedField);
  } catch (error) {
    console.error("ServiceRequestDB unsuccessfully updated: ", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function updateAFieldInFlowerReqDB<T>(
  prisma: PrismaClient,
  id: number,
  field: keyof T,
  change: number | FlowerType | ServiceRequest,
) {
  try {
    const updatedField = await prisma.flowerRequest.update({
      where: { requestID: id },
      data: {
        [field]: change,
      },
    });
    console.log(updatedField);
  } catch (error) {
    console.error("ServiceRequestDB unsuccessfully updated: ", error);
  }
}

export async function updateFieldAcrossNodeDB(
  prisma: PrismaClient,
  field: string,
  change: string,
) {
  try {
    const allRecords = await prisma.nodeDB.findMany();

    for (const record of allRecords) {
      await prisma.nodeDB.update({
        where: { nodeID: record.nodeID },
        data: { [field]: change },
      });
    }
  } catch (error) {
    console.error("Error updating fields:", error);
  }
}

export async function updateFieldAcrossEdgeDB(
  prisma: PrismaClient,
  field: string,
  change: boolean,
) {
  try {
    const allRecords = await prisma.edgeDB.findMany();

    //console.log(allRecords);

    for (const record of allRecords) {
      // console.log("A record:");
      // console.log(record);
      // console.log(record.startNodeID);
      // console.log(record.endNodeID);
      await prisma.edgeDB.updateMany({
        where: {
          AND: {
            startNodeID: record.startNodeID,
            endNodeID: record.endNodeID,
          },
        },
        data: { blocked: change },
      });
    }
  } catch (error) {
    console.error("Error updating fields:", error);
  }
}

// Export to CSV file
export async function exportNodeDBToCSV(
  prisma: PrismaClient,
  filename: string,
) {
  try {
    const data = await prisma.nodeDB.findMany();

    if (data.length === 0) {
      console.error("No data found to export.");
      return;
    }

    const columns = Object.keys(data[0]);
    let csvContent = columns.join(",") + "\n";
    const rows: string = data
      .map((node) => {
        return [
          node.nodeID,
          node.xcoord,
          node.ycoord,
          node.floor,
          node.building,
          node.longName,
          node.shortName,
          node.nodeType,
        ].join(",");
      })
      .join("\n");
    csvContent += rows;

    const filePath = path.join(__dirname, filename);

    writeToFile(filePath, csvContent);
  } catch (error) {
    console.error("Error exporting to CSV: ", error);
  }
}

export async function exportEdgeDBToCSV(
  prisma: PrismaClient,
  filename: string,
) {
  try {
    const data = await prisma.edgeDB.findMany();

    if (data.length === 0) {
      console.error("No data found to export.");
      return;
    }

    const columns = Object.keys(data[0]);
    let csvContent = columns.join(",") + "\n";
    const rows: string = data
      .map((edge) => {
        return [edge.endNodeID, edge.endNodeID, edge.blocked].join(",");
      })
      .join("\n");
    csvContent += rows;

    const filePath: path = path.join(__dirname, filename);

    writeToFile(filePath, csvContent);
  } catch (error) {
    console.error("Error exporting to CSV: ", error);
  }
}

function writeToFile(filePath: path, content: string) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf8", (err) => {
        if (err) {
            console.error("An error occurred:", err);
            return;
        }
        console.log(`CSV file successfully exported to ${filePath}`);
    });
}
