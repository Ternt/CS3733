import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const body = req.body;

  // do not let id be manually specified
  if (body.id !== undefined) {
    console.error("Not allowed to specify request id. It is auto generated");
    res.sendStatus(400);
    return;
  }

  // delete all detail parameters
  // (Not meant be used from API)
  delete body.sanitationDetail;
  delete body.medicineDetail;

  // check for data corresponding to each service request type
  switch (body.type) {
    case "SANITATION":
      body.sanitationDetail = {
        create: {
          messType: body.messType,
          messSize: body.messSize,
        },
      };
      delete body.messType;
      delete body.messSize;
      break;
    case "MEDICINE":
      body.medicineDetail = {
        create: {
          patientName: body.patientName,
          primaryPhysicianName: body.primaryPhysicianName,
          medicine: body.medicine,
          dosage: body.dosage,
          form: body.form,
        },
      };
      delete body.patientName;
      delete body.primaryPhysicianName;
      delete body.medicine;
      delete body.dosage;
      delete body.form;
      break;
  }

  const serviceRequest: Prisma.ServiceRequestCreateInput = req.body;

  try {
    // Attempt to create in the database
    await PrismaClient.serviceRequest.create({ data: serviceRequest });
    console.info("Successfully saved service request attempt"); // Log that it was successful
    res.sendStatus(200);
  } catch (error) {
    // Log any failures
    console.error(`Unable to save service request attempt ${body}: ${error}`);
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

      sanitationDetail: true,
      medicineDetail: true,
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
