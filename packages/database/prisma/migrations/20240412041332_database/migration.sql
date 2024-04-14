-- CreateEnum
CREATE TYPE "CartItemType" AS ENUM ('FLOWER', 'GIFT');

-- CreateEnum
CREATE TYPE "ServiceRequestType" AS ENUM ('MAINTENANCE', 'FLOWERS', 'GIFT', 'SANITATION', 'MEDICINE');

-- CreateEnum
CREATE TYPE "ServiceRequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('UNASSIGNED', 'ASSIGNED', 'IN_PROGRESS', 'CLOSED');

-- CreateEnum
CREATE TYPE "MaintenanceType" AS ENUM ('PLUMBING', 'ELEVATOR');

-- CreateEnum
CREATE TYPE "MessType" AS ENUM ('SOLID_WASTE', 'LIQUID_SPILL', 'OTHER');

-- CreateEnum
CREATE TYPE "MessSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Medicine" AS ENUM ('PAIN_KILLERS', 'TYLENOL', 'PARACETAMOL');

-- CreateEnum
CREATE TYPE "MedicineForm" AS ENUM ('POWDER', 'TAB_OR_CAP', 'CHEWABLE', 'LIQUID', 'INHALER');

-- CreateEnum
CREATE TYPE "ShippingType" AS ENUM ('EXPRESS', 'STANDARD');

-- CreateEnum
CREATE TYPE "FlowerType" AS ENUM ('ROSE', 'DANDELION');

-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NodeDB" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EdgeDB" (
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "type" "CartItemType" NOT NULL,
    "imageURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "requestID" SERIAL NOT NULL,
    "type" "ServiceRequestType" NOT NULL,
    "notes" TEXT NOT NULL,
    "locationID" TEXT NOT NULL,
    "priority" "ServiceRequestPriority" NOT NULL,
    "status" "ServiceRequestStatus" NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("requestID")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "requestID" INTEGER NOT NULL,
    "maintenanceType" "MaintenanceType" NOT NULL,
    "workersNeeded" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SanitationRequest" (
    "requestID" INTEGER NOT NULL,
    "messType" "MessType" NOT NULL,
    "messSize" "MessSize" NOT NULL
);

-- CreateTable
CREATE TABLE "MedicineRequest" (
    "requestID" INTEGER NOT NULL,
    "patientName" TEXT NOT NULL,
    "primaryPhysicianName" TEXT NOT NULL,
    "medicine" "Medicine" NOT NULL,
    "dosage" INTEGER NOT NULL,
    "form" "MedicineForm" NOT NULL
);

-- CreateTable
CREATE TABLE "CartItemsInGiftRequests" (
    "giftRequestID" INTEGER NOT NULL,
    "cartItemID" INTEGER NOT NULL,

    CONSTRAINT "CartItemsInGiftRequests_pkey" PRIMARY KEY ("giftRequestID","cartItemID")
);

-- CreateTable
CREATE TABLE "GiftRequest" (
    "requestID" INTEGER NOT NULL,
    "senderName" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "shippingType" "ShippingType" NOT NULL
);

-- CreateTable
CREATE TABLE "FlowerRequest" (
    "requestID" INTEGER NOT NULL,
    "flowerType" "FlowerType" NOT NULL,
    "numberFlowers" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NodeDB_nodeID_key" ON "NodeDB"("nodeID");

-- CreateIndex
CREATE UNIQUE INDEX "EdgeDB_startNodeID_endNodeID_key" ON "EdgeDB"("startNodeID", "endNodeID");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceRequest_requestID_key" ON "MaintenanceRequest"("requestID");

-- CreateIndex
CREATE UNIQUE INDEX "SanitationRequest_requestID_key" ON "SanitationRequest"("requestID");

-- CreateIndex
CREATE UNIQUE INDEX "MedicineRequest_requestID_key" ON "MedicineRequest"("requestID");

-- CreateIndex
CREATE UNIQUE INDEX "GiftRequest_requestID_key" ON "GiftRequest"("requestID");

-- CreateIndex
CREATE UNIQUE INDEX "FlowerRequest_requestID_key" ON "FlowerRequest"("requestID");

-- AddForeignKey
ALTER TABLE "EdgeDB" ADD CONSTRAINT "EdgeDB_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "NodeDB"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EdgeDB" ADD CONSTRAINT "EdgeDB_endNodeID_fkey" FOREIGN KEY ("endNodeID") REFERENCES "NodeDB"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "NodeDB"("nodeID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "ServiceRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationRequest" ADD CONSTRAINT "SanitationRequest_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "ServiceRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineRequest" ADD CONSTRAINT "MedicineRequest_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "ServiceRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemsInGiftRequests" ADD CONSTRAINT "CartItemsInGiftRequests_giftRequestID_fkey" FOREIGN KEY ("giftRequestID") REFERENCES "GiftRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItemsInGiftRequests" ADD CONSTRAINT "CartItemsInGiftRequests_cartItemID_fkey" FOREIGN KEY ("cartItemID") REFERENCES "CartItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftRequest" ADD CONSTRAINT "GiftRequest_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "ServiceRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerRequest" ADD CONSTRAINT "FlowerRequest_requestID_fkey" FOREIGN KEY ("requestID") REFERENCES "ServiceRequest"("requestID") ON DELETE CASCADE ON UPDATE CASCADE;
