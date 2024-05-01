import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import serviceRequestRouter from "./routes/service-requests.ts";
import mapRouter from "./routes/map.ts";
import pathfindingRouter from "./routes/pathfind.ts";
import nodesRouter from "./routes/nodes.ts";
import edgesRouter from "./routes/edges.ts";
import cartItemRouter from "./routes/cart-items.ts";
import employeeRouter from "./routes/employees";
import languageRouter from "./routes/language-interpreter.ts";
import smsRouter from "./routes/Twilio/sms_and_call.ts";
import voiceRouter from "./routes/Twilio/voice-message.ts";
import fileUpload from "express-fileupload";
import * as fs from "fs";
import path from "path";
import { createDatabase } from "./helper/createDatabase.ts";
import {auth} from "express-oauth2-jwt-bearer";
// import { generateHeatmapData } from "./helper/generateHeatmapData.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};


const app: Express = express(); // Set up the backend


// uncomment if you want to generate heatmap data again
// generateHeatmapData();

(async () => {
  // this will remove all service requests from the DB
  const nodePath = path.join(__dirname, "../map/allNodes.csv");
  const edgePath = path.join(__dirname, "../map/allEdges.csv");

  const node_str = fs.readFileSync(nodePath, "utf8");
  const edge_str = fs.readFileSync(edgePath, "utf8");

  await createDatabase(true, node_str, edge_str, true);
})();

//const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/api/service-requests", serviceRequestRouter);
app.use("/api/map", mapRouter);
app.use("/api/astar-api", pathfindingRouter);
app.use("/api/pathfind", pathfindingRouter);
app.use("/api/nodes", nodesRouter);
app.use("/api/edges", edgesRouter);
app.use("/api/cart-items", cartItemRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/sms", smsRouter);
app.use("/api/voice.xml", voiceRouter);
app.use("/api/language-interpreter", languageRouter);
app.use("/healthcheck", (req, res) => {
  res.status(200).send();
});

// Create the auth middleware
const authMiddleware = auth({
  audience: "/api",
  issuerBaseURL: "dev-0kmc0cto8b1g261n.us.auth0.com",
  tokenSigningAlg: "RS256",
});

// Apply the auth middleware only to the /secure route
app.use('/secure', authMiddleware);

// Now only the /secure route requires authentication
app.get('/secure', (req, res) => {
  res.send('This is a secure route');
});

app.get('/public', (req, res) => {
  res.send('This is a public route');
});

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
