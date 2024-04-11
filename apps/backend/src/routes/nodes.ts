// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";
import path from "path";
import { exportNodeDBToCSV } from "../helper/manageDatabases.ts";

const router: Router = express.Router();

router.get("/download/", async function (req: Request, res: Response) {
  const prisma = new PrismaClient();
  await exportNodeDBToCSV(prisma, "../../map/nodes.csv");
  res.download(path.join(__dirname, "../../map/nodes.csv"));
});

export default router;
