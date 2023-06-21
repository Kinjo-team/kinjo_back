-- DropIndex
DROP INDEX "itineraries_itinerary_name_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_img" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dy6bhh9th/image/upload/v1687315995/yvmorweuimasnznbjnj3.png';
