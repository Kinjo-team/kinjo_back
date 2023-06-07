-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_token" TEXT,
    "affiliation" TEXT,
    "karma" INTEGER,
    "blueBadge" BOOLEAN,
    "location_sharingSharer_user_id" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Itineraries" (
    "itinerary_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "itinerary_name" TEXT NOT NULL,
    "itinerary_tags" TEXT[],
    "location_ids" INTEGER[],
    "itinerary_duration" INTEGER,

    CONSTRAINT "Itineraries_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "Itinerary_rating" (
    "itinerary_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "iterinary_comments_en" TEXT,
    "itinerary_comments_jp" TEXT,
    "itinerariesItinerary_id" INTEGER,

    CONSTRAINT "Itinerary_rating_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "Itinerary_locations" (
    "loc_id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "loc_name" TEXT NOT NULL,
    "loc_lat" DOUBLE PRECISION NOT NULL,
    "loc_long" DOUBLE PRECISION NOT NULL,
    "loc_address" TEXT,
    "loc_duration" INTEGER,
    "loc_descr_en" TEXT,
    "loc_descr_jp" TEXT,
    "loc_imgUrls" TEXT[],
    "loc_tags" TEXT[],

    CONSTRAINT "Itinerary_locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "Location_rating" (
    "loc_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "loc_rating" INTEGER NOT NULL,
    "loc_comments_en" TEXT,
    "loc_comments_jp" TEXT,
    "itinerary_locationsLoc_id" INTEGER,

    CONSTRAINT "Location_rating_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badge_id" SERIAL NOT NULL,
    "badge_name" TEXT NOT NULL,
    "badge_desc" TEXT NOT NULL,
    "badge_img" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("badge_id")
);

-- CreateTable
CREATE TABLE "Business_listing" (
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

    CONSTRAINT "Business_listing_pkey" PRIMARY KEY ("biz_id")
);

-- CreateTable
CREATE TABLE "_BadgeToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Itineraries_itinerary_name_key" ON "Itineraries"("itinerary_name");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_badge_name_key" ON "Badge"("badge_name");

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeToUsers_AB_unique" ON "_BadgeToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeToUsers_B_index" ON "_BadgeToUsers"("B");

-- AddForeignKey
ALTER TABLE "Itineraries" ADD CONSTRAINT "Itineraries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_rating" ADD CONSTRAINT "Itinerary_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_rating" ADD CONSTRAINT "Itinerary_rating_itinerariesItinerary_id_fkey" FOREIGN KEY ("itinerariesItinerary_id") REFERENCES "Itineraries"("itinerary_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary_locations" ADD CONSTRAINT "Itinerary_locations_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_rating" ADD CONSTRAINT "Location_rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location_rating" ADD CONSTRAINT "Location_rating_itinerary_locationsLoc_id_fkey" FOREIGN KEY ("itinerary_locationsLoc_id") REFERENCES "Itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_listing" ADD CONSTRAINT "Business_listing_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "Itinerary_locations"("loc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToUsers" ADD CONSTRAINT "_BadgeToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Badge"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToUsers" ADD CONSTRAINT "_BadgeToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
