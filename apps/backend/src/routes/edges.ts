// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import {Prisma, PrismaClient} from "database";
import { exportEdgeDBToCSV } from "../helper/manageDatabases";
import path from "path";

const router: Router = express.Router();

router.get("/download/", async function (req: Request, res: Response) {
  const prisma = new PrismaClient();
  await exportEdgeDBToCSV(prisma, "../../map/temp/edgesDownload.csv");
  res.download(path.join(__dirname, "../../map/temp/edgesDownload.csv"));
});

router.put("/update/", async function (req: Request, res: Response) {
    const prisma = new PrismaClient();
    const edge: Prisma.EdgeDBCreateInput = req.body;

    try {
        // check if edge in the reverse direction exists
        // if so flip start/end to match it
        const reverse = await prisma.edgeDB.findUnique({
            where: {
                edgeID: {
                    startNodeID: edge.endNodeID,
                    endNodeID: edge.startNodeID,
                }
            }
        })
        if (reverse != null) {
            const temp = edge.startNodeID;
            edge.startNodeID = edge.endNodeID;
            edge.endNodeID = temp;
        }

        // try to add/update edge in the database
        await prisma.edgeDB.upsert({
            where: {
                edgeID: {
                    startNodeID: edge.startNodeID,
                    endNodeID: edge.endNodeID,
                }
            },
            update: edge,
            create: edge,
        })
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

export default router;
