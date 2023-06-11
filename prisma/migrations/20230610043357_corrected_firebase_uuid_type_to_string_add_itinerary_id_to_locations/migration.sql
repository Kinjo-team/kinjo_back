/*
  Warnings:

  - You are about to drop the column `creator_id` on the `Itinerary_locations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Itinerary_rating` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Location_rating` table. All the data in the column will be lost.
  - Added the required column `creator_uuid` to the `Itinerary_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `Itinerary_rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `Location_rating` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "Itineraries" ALTER COLUMN "itinerary_id" DROP DEFAULT,
ALTER COLUMN "creator_id" SET DATA TYPE TEXT;
DROP SEQUENCE "Itineraries_itinerary_id_seq";

-- AlterTable
ALTER TABLE "Itinerary_locations" DROP COLUMN "creator_id",
ADD COLUMN     "creator_uuid" TEXT NOT NULL,
ADD COLUMN     "itinerary_id" INTEGER,
ALTER COLUMN "loc_id" DROP DEFAULT;
DROP SEQUENCE "Itinerary_locations_loc_id_seq";

-- AlterTable
ALTER TABLE "Itinerary_rating" DROP COLUMN "user_id",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location_rating" DROP COLUMN "user_id",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "firebase_uuid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_rating" ADD CONSTRAINT "Itinerary_rating_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_locations" ADD CONSTRAINT "Itinerary_locations_creator_uuid_fkey" FOREIGN KEY ("creator_uuid") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_locations" ADD CONSTRAINT "Itinerary_locations_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "Itineraries"("itinerary_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_rating" ADD CONSTRAINT "Location_rating_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "Users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
