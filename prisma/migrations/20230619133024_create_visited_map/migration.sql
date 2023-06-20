-- CreateTable
CREATE TABLE "visited_map" (
    "id" SERIAL NOT NULL,
    "visited_coords" DOUBLE PRECISION[],
    "visited_name" TEXT NOT NULL,
    "visited_descr" TEXT NOT NULL,
    "firebase_uuid" TEXT NOT NULL,

    CONSTRAINT "visited_map_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visited_map" ADD CONSTRAINT "visited_map_firebase_uuid_fkey" FOREIGN KEY ("firebase_uuid") REFERENCES "users"("firebase_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
