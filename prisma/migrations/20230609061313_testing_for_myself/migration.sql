/*
  Warnings:

  - A unique constraint covering the columns `[firebase_uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `firebase_uuid` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "firebase_uuid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_firebase_uuid_key" ON "Users"("firebase_uuid");
