import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const serviceRequest: Prisma.ServiceRequestCreateInput = req.body;

  try {
    // Attempt to create in the database
    await PrismaClient.serviceRequest.create({ data: serviceRequest });
    console.info("Successfully saved service request attempt"); // Log that it was successful
  } catch (error) {
    // Log any failures
    console.error(
      `Unable to save service request attempt ${serviceRequest}: ${error}`,
    );
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }
});

router.get("/", async function (req: Request, res: Response) {
  const serviceRequests = await PrismaClient.serviceRequest.findMany({
    select: {
      requestID: true,
      type: true,
      notes: true,
      location: true,

      maintenanceDetail: true,
      flowerDetail: true,
    },
  });

  if (serviceRequests == null) {
    // if no service request data is in the db
    console.error("No service requests have been submitted.");
    res.sendStatus(204);
  } else {
    res.json(serviceRequests);
  }
});

export default router;
