import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

// Whenever a get request is made, return the high score
router.get("/", async function (req: Request, res: Response) {
    try {
        const items = await PrismaClient.languageInterpreterCount.findMany();

        if (items == null) {
            // if no service request data is in the db
            console.error("No language interpreter have been submitted.");
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
