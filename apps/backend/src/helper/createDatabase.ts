import { splitLines } from "../routes/map.ts";
import { cartItems } from "./initialData/cartItems.ts";
import { employees } from "./initialData/employees.ts";
import { serviceRequests } from "./initialData/serviceRequests.ts";
import PrismaClient from "../bin/database-connection.ts";


export async function createDatabase(
    header: boolean,
    node_str: string,
    edge_str: string,
    initial: boolean
) {
    const nodeLines = splitLines(node_str).filter((line) => /\S/.test(line));
    if (header) {
        nodeLines.shift();
    }
    const nodeRows = nodeLines.map((line) => line.split(","));

    const nodeData = Array.from(
        nodeRows.map((row) => ({
            nodeID: row[0],
            xcoord: parseInt(row[1]),
            ycoord: parseInt(row[2]),
            floor: row[3],
            building: row[4],
            nodeType: row[5],
            longName: row[6],
            shortName: row[7],
        })),
    );

    const edgeLines = splitLines(edge_str).filter((line) => /\S/.test(line));
    if (header) {
        edgeLines.shift();
    }
    const edgeRows = edgeLines.map((line) => line.split(","));

    const edgeData = Array.from(
        edgeRows.map((row) => ({
            startNodeID: row[0],
            endNodeID: row[1],
            blocked: (row[2] == "true"),
            heat: parseInt(row[3]) || 0
        })),
    );

    // const insertNodeQueries = nodeData.map((row) => {
    //     return PrismaClient.nodeDB.create({data: row});
    // });
    //
    // const insertEdgeQueries = edgeData.map((row) => {
    //     return PrismaClient.edgeDB.create({data: row});
    // });

    // add nodes and edges to database
    await PrismaClient.$transaction([
        PrismaClient.$executeRaw`DELETE FROM "EdgeDB";`,
        PrismaClient.$executeRaw`DELETE FROM "NodeDB";`,
        PrismaClient.nodeDB.createMany({data: nodeData}),
        PrismaClient.edgeDB.createMany({data: edgeData}),
    ]);

    // add cart items
    if (initial) {
        await createCartItems();
        await createEmployees();
        await createServiceRequests();
    }
}

async function createCartItems() {
    await PrismaClient.$transaction([
        PrismaClient.cartItem.deleteMany(),
        PrismaClient.cartItem.createMany({data: cartItems})
    ]);
}

async function createEmployees() {
    await PrismaClient.$transaction([
        PrismaClient.employee.deleteMany(),
        PrismaClient.employee.createMany({data: employees})
    ]);
}

async function createServiceRequests() {
    await PrismaClient.serviceRequest.deleteMany();
    for (let data of serviceRequests) {
        await PrismaClient.serviceRequest.create({data: data});
    }
}
