import app from "../app.ts";
import http from "http";
import { AddressInfo } from "net";
import { createHttpTerminator } from "http-terminator";

// Attempt a database connection
console.info("Connecting to database...");
try {
  // This intrinsically connects to the database
  require("./database-connection.ts");
  console.log("Successfully connected to the database");
} catch (error) {
  // Log any errors
  console.error(`Unable to establish database connection:
  ${error}`);
  process.exit(1); // Then exit
}

// Get port from environment and store in Express
const port: string | undefined = process.env.BACKEND_PORT;

if (port === undefined) {
  console.error("Failed to start: Missing PORT environment variable");
  process.exit(1);
}

app.set("port", port);

// Create the server, enable the application
console.info("Starting server...");
const server: http.Server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
server.listen(port, () => {
  console.log('listening on *:'+port);
});


type userData = {
  userId: string;
  x: number;
  y: number;
  tabId: number;

};
const currentUsers: userData[] = [];//when someone connects, add their socket id to the array, when they disconnect, remove it and send it as my data
io.on('connection', (socket) => {
  console.log('a user connected');
  currentUsers.push({userId: socket.id, x: 0, y: 0, tabId: 0});

  socket.on('mousePosition', (userData) => {
    // Emit the 'mousePosition' event with the user's data
    socket.broadcast.emit('mousePosition', userData);
    currentUsers[currentUsers.findIndex((element) => element.userId === socket.id)] = userData;
  });

  socket.on('updateMap', (userData) => {
    // Emit the 'mousePosition' event with the user's data
    socket.broadcast.emit('updateMap', userData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
    // Emit the 'userDisconnected' event with the user's ID
    socket.broadcast.emit('userDisconnected', socket.id);
    currentUsers.splice(currentUsers.findIndex((element) => element.userId === socket.id), 1);
  });
});


// Export the server, so that testing client can use it
export default server;

// Setup graceful exit logic
// Exit conditions
[
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
].forEach(function (sig) {
  // On any of those
  process.on(sig, async function () {
    // On shutdown request
    console.info(`Server shutting down due to ${sig}...`);

    // Create a terminator, to safely destroy the HTTP server
    const httpTerminator = createHttpTerminator({
      server,
      gracefulTerminationTimeout: 10,
    });
    await httpTerminator.terminate();

    // Log the exit
    console.log("Server shutdown complete");
    process.exit(0); // Exit normally
  });
});

// Listen on the provided port, on all interfaces
// server.listen(port);
server.on("error", onError); // Error handler
server.on("listening", onListening); // Notify that we started

/**
 * Event listener for HTTP server "error" event, to provide user friendly error output and then exit
 */
function onError(error: NodeJS.ErrnoException): void {
  // If we're doing something other than try to listen, we can't help
  if (error.syscall !== "listen") {
    throw error; // Re-throw
  }

  // Get the pipe/port we're listening on
  const bind: string =
    typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    // Server can't get start permission
    case "EACCES":
      console.error(`Failed to start: ${bind} requires elevated permissions!`);
      process.exit(1);
      break;
    // Server can't get address
    case "EADDRINUSE":
      console.error(`Failed to start: ${bind} + ' is already in use`);
      process.exit(1); // Exit with failure
      break;
    default:
      // Print the default error otherwise, and exit
      console.error(`Failed to start: Unknown binding error:
    ${error}`);
      process.exit(1);
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  // Get the address we're listening on
  const addr: string | AddressInfo | null = server.address();

  // If it's a string, simply get it (it's a pipe)
  const bind: string =
    typeof addr === "string" ? "pipe " + addr : "port " + addr?.port; // Otherwise get the port
  console.info("Server listening on " + bind); // Debug output that we're listening
  console.log("Startup complete");
}
