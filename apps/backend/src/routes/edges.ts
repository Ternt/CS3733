// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import { PrismaClient } from "database";
import { exportEdgeDBToCSV } from "../helper/manageDatabases";
import path from "path";

const router: Router = express.Router();

router.get("/download/", async function (req: Request, res: Response) {
  const prisma = new PrismaClient();
  await exportEdgeDBToCSV(prisma, "../../map/nodesDownload.csv");
  res.download(path.join(__dirname, "../../map/edgesDownload.csv"));
});

export default router;
