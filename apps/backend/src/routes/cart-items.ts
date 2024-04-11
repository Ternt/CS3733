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

  const cartItem: Prisma.CartItemCreateInput = body;
  // Attempt to save the high score
  try {
    // Attempt to create in the database
    await PrismaClient.cartItem.create({ data: cartItem });
    console.info("Successfully saved cart item"); // Log that it was successful
  } catch (error) {
    // Log any failures
    console.error(`Unable to save high score attempt ${cartItem}: ${error}`);
    res.sendStatus(400); // Send error
    return; // Don't try to send duplicate statuses
  }

  res.sendStatus(200); // Otherwise say it's fine
});

// Whenever a get request is made, return the high score
router.get("/", async function (req: Request, res: Response) {
  const items = await PrismaClient.cartItem.findMany();

  if (items == null) {
    // if no service request data is in the db
    console.error("No service items have been submitted.");
    res.sendStatus(204);
  } else {
    res.json(items);
  }
});

export default router;
