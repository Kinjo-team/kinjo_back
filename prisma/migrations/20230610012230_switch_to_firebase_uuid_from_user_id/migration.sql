/*
  Warnings:

  - A unique constraint covering the columns `[firebase_uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `firebase_uuid` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Itineraries" DROP CONSTRAINT "Itineraries_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_locations" DROP CONSTRAINT "Itinerary_locations_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_rating" DROP CONSTRAINT "Itinerary_rating_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Location_rating" DROP CONSTRAINT "Location_rating_user_id_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "firebase_uuid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_firebase_uuid_key" ON "Users"("firebase_uuid");

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_rating" ADD CONSTRAINT "Itinerary_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_locations" ADD CONSTRAINT "Itinerary_locations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_rating" ADD CONSTRAINT "Location_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
