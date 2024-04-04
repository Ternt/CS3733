// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";

const router: Router = express.Router();

function splitLines(t: string): string[] {
  return t.split(/\r\n|\r|\n/);
}

router.post("/", async function (req: Request, res: Response) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  // Get file data
  const files = req.files;
  const str: string = files.file.data.toString();
  // ^ eslint does not like this line

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
    // parse csv
    const lines = splitLines(str).filter((line) => /\S/.test(line));
    if (header) {
      lines.shift();
    }
    const rows = lines.map((line) => line.split(","));

    const data = Array.from(
      rows.map((row) => ({
        startNodeID: row[0],
        endNodeID: row[1],
        blocked: false,
      })),
    );

    // upload node file
    await prisma.$transaction([
      prisma.EdgeDB.deleteMany(),
      prisma.EdgeDB.createMany({ data }),
    ]);
  } catch {
    console.log("edge file upload failed");
    res.sendStatus(400);
    return;
  }

  res.sendStatus(200);
});

//router.get("/", async function (req: Request, res: Response) {});

export default router;
