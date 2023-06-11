/*
  Warnings:

  - The primary key for the `Itinerary_locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itinerariesItinerary_id` on the `Itinerary_rating` table. All the data in the column will be lost.
  - Added the required column `associated_itinerary_id` to the `Itinerary_rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business_listing" DROP CONSTRAINT "Business_listing_loc_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_rating" DROP CONSTRAINT "Itinerary_rating_itinerariesItinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "Location_rating" DROP CONSTRAINT "Location_rating_itinerary_locationsLoc_id_fkey";

-- AlterTable
ALTER TABLE "Business_listing" ALTER COLUMN "loc_id" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Itinerary_locations" DROP CONSTRAINT "Itinerary_locations_pkey",
ALTER COLUMN "loc_id" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Itinerary_locations_pkey" PRIMARY KEY ("loc_id");

-- AlterTable
ALTER TABLE "Itinerary_rating" DROP COLUMN "itinerariesItinerary_id",
ADD COLUMN     "associated_itinerary_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Location_rating" ALTER COLUMN "itinerary_locationsLoc_id" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Itinerary_rating" ADD CONSTRAINT "Itinerary_rating_associated_itinerary_id_fkey" FOREIGN KEY ("associated_itinerary_id") REFERENCES "Itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_rating" ADD CONSTRAINT "Location_rating_itinerary_locationsLoc_id_fkey" FOREIGN KEY ("itinerary_locationsLoc_id") REFERENCES "Itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_listing" ADD CONSTRAINT "Business_listing_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;
