-- AlterTable
ALTER TABLE "Itinerary_rating" ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Location_rating" ALTER COLUMN "loc_rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "firebase_uuid" INTEGER;
