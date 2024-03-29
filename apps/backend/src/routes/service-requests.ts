import express, { Router, Request, Response } from "express";
// import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  // TODO
  res.sendStatus(400); // Send error
});

router.get("/", async function (req: Request, res: Response) {
  const serviceRequests = await PrismaClient.serviceRequest.findMany();

  if (serviceRequests == null) {
    // if no data
    console.error("No service requests have been submitted.");
    res.sendStatus(204);
  } else {
    res.json(serviceRequests);
  }
});

export default router;
