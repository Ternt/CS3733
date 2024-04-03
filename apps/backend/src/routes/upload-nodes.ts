import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
//import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// function splitLines(t: string): string[] {
//   return t.split(/\r\n|\r|\n/);
// }

router.post("/", async function (req: Request, res: Response) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const files = req.files;
  console.log(files.data.toString());

  res.sendStatus(200);
});

//router.get("/", async function (req: Request, res: Response) {});

export default router;
