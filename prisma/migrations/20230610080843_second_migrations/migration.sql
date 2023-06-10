/*
  Warnings:

  - You are about to drop the column `firebase_uid` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firebase_uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebase_uuid` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_firebase_uid_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "firebase_uid",
ADD COLUMN     "firebase_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uuid_key" ON "users"("firebase_uuid");
