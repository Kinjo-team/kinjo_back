import { prisma } from "../server";

//Add bookmark
export async function addBookmark(userID: string, itineraryID: number) {
  const newBookmark = await prisma.bookmarks.create({
    data: {
      firebase_uuid: userID,
      itinerary_id: itineraryID,
    },
  });
  return newBookmark;
}

//Delete bookmark
export async function deleteBookmark(userID: string, itineraryID: number) {
    const deletedBookmark = await prisma.bookmarks.deleteMany({
        where: {
        firebase_uuid: userID,
        itinerary_id: itineraryID,
        },
    });
    return deletedBookmark;
}

//Get all bookmarks from user
export async function getAllBookmarksFromUser(userID: string) {
    const bookmarks = await prisma.bookmarks.findMany({
        where: {
            firebase_uuid: userID,
        },
        include: {
          itinerary: true,
        },
    });
    return bookmarks;
}


