import express, {Router, Request, Response} from "express";
import {Prisma, ServiceRequestType} from "database";
import PrismaClient from "../bin/database-connection.ts";
import createServiceRequestBody from "../helper/createServiceRequestBody.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
    const body = createServiceRequestBody(req.body)
    if (body === undefined) {
        res.sendStatus(400);
        return;
    }

    const serviceRequest: Prisma.ServiceRequestCreateInput = body;

    try {
        // Attempt to create in the database
        await PrismaClient.serviceRequest.create({data: serviceRequest});
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
    try {
        const serviceRequests = await PrismaClient.serviceRequest.findMany({
            select: {
                requestID: true,
                type: true,
                notes: true,
                location: true,

                sanitationDetail: true,
                medicineDetail: true,
                giftDetail: {
                    include: {
                        items: true,
                    },
                },
                maintenanceDetail: true,
                flowerDetail: true,
            },
            where: {
                ...(req.query.type !== undefined
                    ? {type: req.query.type as ServiceRequestType}
                    : {}),
            },
        });

        if (serviceRequests == null) {
            // if no service request data is in the db
            console.error("No service requests have been submitted.");
            res.sendStatus(204);
        } else {
            res.json(serviceRequests);
        }
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
        res.sendStatus(400);
        return;
    }
});

export default router;
