-- DropForeignKey
ALTER TABLE "itineraries" DROP CONSTRAINT "itineraries_user_id_fkey";

-- AlterTable
ALTER TABLE "itineraries" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
