/*
  Warnings:

  - You are about to drop the `Business_listing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itineraries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itinerary_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itinerary_rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location_rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BadgeToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business_listing" DROP CONSTRAINT "Business_listing_loc_id_fkey";

-- DropForeignKey
ALTER TABLE "Itineraries" DROP CONSTRAINT "Itineraries_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_locations" DROP CONSTRAINT "Itinerary_locations_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_rating" DROP CONSTRAINT "Itinerary_rating_itinerariesItinerary_id_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary_rating" DROP CONSTRAINT "Itinerary_rating_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Location_rating" DROP CONSTRAINT "Location_rating_itinerary_locationsLoc_id_fkey";

-- DropForeignKey
ALTER TABLE "Location_rating" DROP CONSTRAINT "Location_rating_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeToUsers" DROP CONSTRAINT "_BadgeToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeToUsers" DROP CONSTRAINT "_BadgeToUsers_B_fkey";

-- DropTable
DROP TABLE "Business_listing";

-- DropTable
DROP TABLE "Itineraries";

-- DropTable
DROP TABLE "Itinerary_locations";

-- DropTable
DROP TABLE "Itinerary_rating";

-- DropTable
DROP TABLE "Location_rating";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_BadgeToUsers";

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "user_email" TEXT NOT NULL,
    "access_token" TEXT,
    "affiliation" TEXT,
    "karma" INTEGER,
    "blue_badge" BOOLEAN,
    "location_sharingSharer_user_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "itinerary_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "itinerary_name" TEXT NOT NULL,
    "itinerary_tags" TEXT[],
    "location_ids" INTEGER[],
    "itinerary_duration" INTEGER,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "itinerary_rating" (
    "itinerary_id" INTEGER NOT NULL,
    "rating" INTEGER,
    "user_id" INTEGER NOT NULL,
    "iterinary_comments_en" TEXT,
    "itinerary_comments_jp" TEXT,
    "itinerariesItinerary_id" INTEGER,

    CONSTRAINT "itinerary_rating_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "itinerary_locations" (
    "loc_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "loc_name" TEXT NOT NULL,
    "loc_lat" DOUBLE PRECISION NOT NULL,
    "loc_long" DOUBLE PRECISION NOT NULL,
    "loc_coords" DOUBLE PRECISION[],
    "loc_address" TEXT,
    "loc_duration" INTEGER,
    "loc_descr_en" TEXT,
    "loc_descr_jp" TEXT,
    "loc_imgUrls" TEXT[],
    "loc_tags" TEXT[],

    CONSTRAINT "itinerary_locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "location_rating" (
    "loc_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "loc_rating" INTEGER,
    "loc_comments_en" TEXT,
    "loc_comments_jp" TEXT,
    "itinerary_locationsLoc_id" INTEGER,

    CONSTRAINT "location_rating_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "business_listing" (
    "biz_id" SERIAL NOT NULL,
    "biz_name" TEXT NOT NULL,
    "biz_email" TEXT NOT NULL,
    "biz_address" TEXT NOT NULL,
    "biz_poc_first" TEXT NOT NULL,
    "biz_poc_last" TEXT NOT NULL,
    "biz_desc" TEXT NOT NULL,
    "loc_id" INTEGER,
    "biz_lat" DOUBLE PRECISION NOT NULL,
    "biz_long" DOUBLE PRECISION NOT NULL,
    "biz_coords" DOUBLE PRECISION[],

    CONSTRAINT "business_listing_pkey" PRIMARY KEY ("biz_id")
);

-- CreateTable
CREATE TABLE "_BadgeTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uuid_key" ON "users"("firebase_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_itinerary_name_key" ON "itineraries"("itinerary_name");

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeTousers_AB_unique" ON "_BadgeTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeTousers_B_index" ON "_BadgeTousers"("B");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_rating" ADD CONSTRAINT "itinerary_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_rating" ADD CONSTRAINT "itinerary_rating_itinerariesItinerary_id_fkey" FOREIGN KEY ("itinerariesItinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_locations" ADD CONSTRAINT "itinerary_locations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_rating" ADD CONSTRAINT "location_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_rating" ADD CONSTRAINT "location_rating_itinerary_locationsLoc_id_fkey" FOREIGN KEY ("itinerary_locationsLoc_id") REFERENCES "itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_listing" ADD CONSTRAINT "business_listing_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeTousers" ADD CONSTRAINT "_BadgeTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "Badge"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeTousers" ADD CONSTRAINT "_BadgeTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
