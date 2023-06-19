/*
  Warnings:

  - You are about to drop the column `type` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `likes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "likes" DROP COLUMN "type",
DROP COLUMN "value",
ADD COLUMN     "dislike" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;
