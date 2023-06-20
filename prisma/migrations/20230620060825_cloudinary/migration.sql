/*
  Warnings:

  - You are about to drop the column `loc_image_urls` on the `locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locations" DROP COLUMN "loc_image_urls",
ADD COLUMN     "loc_image_url" TEXT;
