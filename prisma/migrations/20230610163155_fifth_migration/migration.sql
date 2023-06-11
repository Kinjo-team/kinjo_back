/*
  Warnings:

  - You are about to drop the column `loc_imgUrls` on the `locations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locations" DROP COLUMN "loc_imgUrls",
ADD COLUMN     "loc_tags" TEXT[];
