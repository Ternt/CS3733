import * as fs from "fs";
import path from "path";
import PrismaClient from "../bin/database-connection.ts";

// Export to CSV file
export async function exportNodeDBToCSV(
  filename: string,
) {
  try {
    const data = await PrismaClient.nodeDB.findMany();

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
  filename: string,
) {
  try {
    const data = await PrismaClient.edgeDB.findMany();

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
