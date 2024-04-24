import express, { Router, Request, Response } from "express";
import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import {createDatabase} from "../helper/createDatabase.ts";
import {employees} from "../helper/initialData/employees.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
    const body = req.body;

    // do not let id be manually specified
    if (body.id !== undefined) {
        console.error("Not allowed to specify employee id. It is auto generated");
        res.sendStatus(400);
        return;
    }

    const employee: Prisma.EmployeeCreateInput = body;

    // Attempt to save the employee
    try {
        // Attempt to create in the database
        await PrismaClient.employee.create({ data: employee });
        console.info("Successfully saved employee"); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(`Unable to save employee attempt ${employee}: ${error}`);
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

    // Attempt to assign employee
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
        });
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

    let assigned: boolean = false;
    if (req.query.assigned !== undefined) {
        if (req.query.assigned!.toString() === "true") {
            assigned = true;
        } else if (req.query.assigned!.toString() === "false") {
            assigned = false;
        } else {
            console.log("assigned must be 'true' or 'false'");
            res.sendStatus(406);
            return;
        }
    }

    try {
        const employees = await PrismaClient.employee.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                assignedRequests: assigned ? {
                    select: {
                        requestID: true
                    }
                } : false
            }
        });

        if (employees == null) {
            // if no service request data is in the db
            console.error("No employees have been submitted.");
            res.sendStatus(204);
        }
        else {
            res.json(employees);
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

//update or create new employees
router.post("/upload", async function (req: Request, res: Response) {
    if (!req.files) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    // Get file data
    const files = req.files;
    if (!("data" in files.employee)) {
        res.sendStatus(509);
        return;
    }
    const employee_str: string = files.employee.data.toString();

    // Check if headers are included in the file
    let header: boolean = true;
    if (req.query.header !== undefined) {
        if (req.query.header!.toString() === "true") {
            header = true;
        } else if (req.query.header!.toString() === "false") {
            header = false;
        } else {
            console.log("header must be 'true' or 'false'");
            res.status(406);
            return;
        }
    }


    try {
        //console.log(employee_str);

        const employee_lines = employee_str.split("\n");
        const employee_s = [];
        console.log(employee_lines);

        employee_lines.forEach((line) => {
            const data = line.split(",");
            employee_s.push({
                id: parseInt(data[0]),
                firstName: data[1],
                lastName: data[2],
            })
        });
        console.log(employee_s);

        await PrismaClient.$transaction([
            PrismaClient.employee.deleteMany(),
            PrismaClient.employee.createMany({data: employee_s})
        ]);
    } catch (error) {
        console.log("node file upload failed");
        res.sendStatus(406);
        return;
    }

    res.sendStatus(200);
});

export default router;
