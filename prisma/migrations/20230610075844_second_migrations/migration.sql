-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "itinerary_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "itinerary_name" TEXT NOT NULL,
    "itinerary_descr" TEXT NOT NULL,
    "itinerary_tags" TEXT[],

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("itinerary_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "loc_id" SERIAL NOT NULL,
    "loc_name" TEXT NOT NULL,
    "loc_coords" DOUBLE PRECISION[],
    "loc_descr_en" TEXT NOT NULL,
    "loc_imgUrls" TEXT[],

    CONSTRAINT "locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "itinerary_location" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "itinerary_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uid_key" ON "users"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_itinerary_name_key" ON "itineraries"("itinerary_name");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_location" ADD CONSTRAINT "itinerary_location_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_location" ADD CONSTRAINT "itinerary_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
