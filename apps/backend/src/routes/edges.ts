// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { exportEdgeDBToCSV } from "../helper/manageDatabases";
import path from "path";

const router: Router = express.Router();

router.get("/download/", async function (req: Request, res: Response) {
  await exportEdgeDBToCSV("../../map/temp/edgesDownload.csv");
  res.download(path.join(__dirname, "../../map/temp/edgesDownload.csv"));
});

router.put("/update/", async function (req: Request, res: Response) {
    const edge: Prisma.EdgeDBCreateInput = req.body;

    try {
        // check if edge in the reverse direction exists
        // if so flip start/end to match it
        const reverse = await PrismaClient.edgeDB.findUnique({
            where: {
                edgeID: {
                    startNodeID: edge.endNodeID,
                    endNodeID: edge.startNodeID,
                }
            }
        });
        if (reverse != null) {
            const temp = edge.startNodeID;
            edge.startNodeID = edge.endNodeID;
            edge.endNodeID = temp;
        }

        // try to add/update edge in the database
        await PrismaClient.edgeDB.upsert({
            where: {
                edgeID: {
                    startNodeID: edge.startNodeID,
                    endNodeID: edge.endNodeID,
                }
            },
            update: edge,
            create: edge,
        });
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

router.delete("/delete/", async function (req: Request, res: Response) {
    const startNodeID = req.query.startNodeID;
    const endNodeID = req.query.endNodeID;
    if (startNodeID === undefined || endNodeID === undefined) {
        console.error("start and end node ids must be specified to delete an edge");
        res.sendStatus(400);
        return;
    }

    // try to delete original start/end ordering
    let error = undefined;
    try {
        await PrismaClient.edgeDB.delete({
            where: {
                edgeID: {
                    startNodeID: startNodeID,
                    endNodeID: endNodeID,
                }
            }
        });

        res.sendStatus(200);
        return;
    }
    catch (e) {
        error = e;
    }

    // try to delete reverse start/end ordering
    try {
        await PrismaClient.edgeDB.delete({
            where: {
                edgeID: {
                    startNodeID: endNodeID,
                    endNodeID: startNodeID,
                }
            }
        });
    }
    catch {
        console.error(error.message);
        res.sendStatus(400);
        return;
    }

    res.sendStatus(200);
});

export default router;
