/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BadgeTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BadgeTousers" DROP CONSTRAINT "_BadgeTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeTousers" DROP CONSTRAINT "_BadgeTousers_B_fkey";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "_BadgeTousers";

-- CreateTable
CREATE TABLE "badge" (
    "badge_id" SERIAL NOT NULL,
    "badge_name" TEXT NOT NULL,
    "badge_desc" TEXT NOT NULL,
    "badge_img" TEXT NOT NULL,

    CONSTRAINT "badge_pkey" PRIMARY KEY ("badge_id")
);

-- CreateTable
CREATE TABLE "_badgeTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "badge_badge_name_key" ON "badge"("badge_name");

-- CreateIndex
CREATE UNIQUE INDEX "_badgeTousers_AB_unique" ON "_badgeTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_badgeTousers_B_index" ON "_badgeTousers"("B");

-- AddForeignKey
ALTER TABLE "_badgeTousers" ADD CONSTRAINT "_badgeTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "badge"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_badgeTousers" ADD CONSTRAINT "_badgeTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
