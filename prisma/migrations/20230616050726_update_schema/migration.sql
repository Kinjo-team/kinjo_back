/*
  Warnings:

  - You are about to drop the `Itineraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itinerary_locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Itineraries" DROP CONSTRAINT "Itineraries_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_locations" DROP CONSTRAINT "Itinerary_locations_itinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_itinerary_id_fkey";

-- DropTable
DROP TABLE "Itineraries";

-- DropTable
DROP TABLE "Itinerary_locations";

-- CreateTable
CREATE TABLE "itineraries" (
    "itinerary_id" DOUBLE PRECISION NOT NULL,
    "creator_id" TEXT NOT NULL,
    "itinerary_name" TEXT NOT NULL,
    "itinerary_descr_en" TEXT NOT NULL,
    "itinerary_descr_jp" TEXT,
    "itinerary_tags" TEXT[],
    "associated_loc_ids" DOUBLE PRECISION[],
    "enteredTags" TEXT[],

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "itinerary_locations" (
    "loc_id" DOUBLE PRECISION NOT NULL,
    "loc_name" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "itinerary_id" DOUBLE PRECISION NOT NULL,
    "loc_coords" DOUBLE PRECISION[],
    "loc_descr_en" TEXT NOT NULL,
    "loc_descr_jp" TEXT,
    "loc_tags" TEXT[],

    CONSTRAINT "itinerary_locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_itinerary_name_key" ON "itineraries"("itinerary_name");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_locations" ADD CONSTRAINT "itinerary_locations_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;
