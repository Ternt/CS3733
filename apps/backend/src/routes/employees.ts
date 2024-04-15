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

    const employee = Prisma.EmployeeCreateInput = body;

    // Attempt to save the employee
    try {
        // Attempt to create in the database
        await PrismaClient.employee.create({ data: employee });
        console.info("Successfully saved cart item"); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(`Unable to save cart item attempt ${employee}: ${error}`);
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

router.post("/assign", async function (req: Request, res: Response) {
    const body = req.body;

    if (body.employeeID === undefined) {
        console.error("must specify employee id to assign to");
        res.sendStatus(400);
        return;
    }

    if (body.requestID === undefined) {
        console.error("must specify request id to assign");
        res.sendStatus(400);
        return;
    }

    // Attempt to save the employee
    try {
        // Attempt to update record
        await PrismaClient.serviceRequest.update({
            where: {
                requestID: body.requestID
            },
            data: {
                assignedEmployeeID: body.employeeID,
                status: 'ASSIGNED'
            }
        })
    } catch (error) {
        // Log any failures
        console.error(`Unable to assign employee to service request attempt ${body}: ${error}`);
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

// Whenever a get request is made, return the high score
router.get("/", async function (req: Request, res: Response) {
    try {
        const items = await PrismaClient.employee.findMany();

        if (items == null) {
            // if no service request data is in the db
            console.error("No employees have been submitted.");
            res.sendStatus(204);
        } else {
            res.json(items);
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
