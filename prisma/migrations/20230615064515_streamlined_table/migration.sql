/*
  Warnings:

  - You are about to drop the column `firebase_uuid` on the `Itineraries` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `Itineraries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `Itinerary_locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Itineraries" DROP CONSTRAINT "Itineraries_firebase_uuid_fkey";

-- AlterTable
ALTER TABLE "Itineraries" DROP COLUMN "firebase_uuid",
ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary_locations" ADD COLUMN     "creator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
