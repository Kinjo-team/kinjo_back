-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "itinerary_id" SERIAL NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
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
    "loc_tags" TEXT[],

    CONSTRAINT "locations_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "itinerary_location" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "itinerary_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" SERIAL NOT NULL,
    "firebase_uuid" TEXT NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uuid_key" ON "users"("firebase_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "itineraries_itinerary_name_key" ON "itineraries"("itinerary_name");

-- CreateIndex
CREATE UNIQUE INDEX "likes_firebase_uuid_itinerary_id_key" ON "likes"("firebase_uuid", "itinerary_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_firebase_uuid_itinerary_id_key" ON "bookmarks"("firebase_uuid", "itinerary_id");

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_firebase_uuid_fkey" FOREIGN KEY ("firebase_uuid") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_location" ADD CONSTRAINT "itinerary_location_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_location" ADD CONSTRAINT "itinerary_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_firebase_uuid_fkey" FOREIGN KEY ("firebase_uuid") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_firebase_uuid_fkey" FOREIGN KEY ("firebase_uuid") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("itinerary_id") ON DELETE RESTRICT ON UPDATE CASCADE;
