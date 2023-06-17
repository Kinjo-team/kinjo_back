import { prisma } from "../server";

// Helper function to check if a user has already liked an itinerary
async function hasUserLikedItinerary(firebase_uuid: any, itinerary_id: any) {
  const existingLike = await prisma.likes.findFirst({
    where: {
      firebase_uuid: firebase_uuid,
      itinerary_id: itinerary_id,
    },
  });
  return existingLike !== null;
}

export async function createLikes(data: any) {
  // Check if the user has already liked the itinerary
  const userHasLiked = await hasUserLikedItinerary(
    data.firebase_uuid,
    data.itinerary_id
  );

  if (userHasLiked) {
    // Return an error indicating that the user has already liked the itinerary
    throw new Error("User has already liked this itinerary");
  }

  // If the user has not liked the itinerary, create a new like record
  const likes = await prisma.likes.create({
    data: {
      firebase_uuid: data.firebase_uuid,
      itinerary_id: data.itinerary_id,
      value: data.value,
      type: data.type,
    },
  });

  return likes;
}

// Calculate the total sum of all likes for a given itinerary
export async function getTotalLikes(
  prisma: any,
  itinerary_id: any,
  type: string
) {
  console.log(
    "getTotalLikes called with itinerary_id:",
    itinerary_id,
    "and type",
    type
  );
  try {
    const totalLikes = await prisma.likes.aggregate({
      where: {
        itinerary_id: itinerary_id,
        type: type,
      },
      _sum: {
        value: true,
      },
    });
    console.log("Total likes fetched:", totalLikes);
    return totalLikes._sum.value;
  } catch (error) {
    console.error("Error in getTotalLikes aggregation query:", error);
    throw error;
  }
}
