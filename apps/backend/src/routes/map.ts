import express, { Router, Request, Response } from "express";
// import { Prisma } from "database";
// import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  // TODO
  res.sendStatus(204); // and send 204, no data
});

export default router;
