/*
  Warnings:

  - You are about to drop the `itineraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itinerary_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itineraries" DROP CONSTRAINT "itineraries_firebase_uuid_fkey";

-- DropForeignKey
ALTER TABLE "itinerary_location" DROP CONSTRAINT "itinerary_location_itinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "itinerary_location" DROP CONSTRAINT "itinerary_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_itinerary_id_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "itinerary_id" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "itineraries";

-- DropTable
DROP TABLE "itinerary_location";

-- DropTable
DROP TABLE "locations";

-- CreateTable
CREATE TABLE "Itineraries" (
    "itinerary_id" DOUBLE PRECISION NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
    "itinerary_name" TEXT NOT NULL,
    "itinerary_descr_en" TEXT NOT NULL,
    "itinerary_descr_jp" TEXT,
    "itinerary_tags" TEXT[],

    CONSTRAINT "Itineraries_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "Itinerary_locations" (
    "loc_id" DOUBLE PRECISION NOT NULL,
    "loc_name" TEXT NOT NULL,
    "itinerary_id" DOUBLE PRECISION NOT NULL,
    "loc_coords" DOUBLE PRECISION[],
    "loc_descr_en" TEXT NOT NULL,
    "loc_descr_jp" TEXT,
    "loc_tags" TEXT[],

    CONSTRAINT "Itinerary_locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Itineraries_itinerary_name_key" ON "Itineraries"("itinerary_name");

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_firebase_uuid_fkey" FOREIGN KEY ("firebase_uuid") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_locations" ADD CONSTRAINT "Itinerary_locations_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;
