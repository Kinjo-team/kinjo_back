import { prisma } from "../server";

// Helper function to check if a user has already liked an itinerary
export async function checkLikeDislike(firebase_uuid: string, itinerary_id: number) {
  const existingRecord = await prisma.likes.findUnique({
    where: {
      firebase_uuid_itinerary_id: {
        firebase_uuid: firebase_uuid,
        itinerary_id: itinerary_id,
      },
    },
  });

  return existingRecord;
}


// Create a new like record
export async function createLike(firebase_uuid : string, itinerary_id :number) {
  const existingRecord = await checkLikeDislike(firebase_uuid, itinerary_id);

  if (existingRecord) {
    throw new Error('User has already liked or disliked this itinerary');
  }

  const newLikeRecord = await prisma.likes.create({
    data: {
      firebase_uuid: firebase_uuid,
      itinerary_id: itinerary_id,
      like: 1,  // Initial like count set to 1
      dislike: 0  // Initial dislike count set to 0
    },
  });

  return newLikeRecord;
}

// Create a new dislike record
export async function createDislike(firebase_uuid : string, itinerary_id :number) {
  const existingRecord = await checkLikeDislike(firebase_uuid, itinerary_id);

  if (existingRecord) {
    throw new Error('User has already liked or disliked this itinerary');
  }

  const newDislikeRecord = await prisma.likes.create({
    data: {
      firebase_uuid: firebase_uuid,
      itinerary_id: itinerary_id,
      like: 0,  // Initial like count set to 0
      dislike: 1  // Initial dislike count set to 1
    },
  });

  return newDislikeRecord;
}

// Calculate the total sum of all likes for a given itinerary
export async function getTotalLikesForItinerary(itineraryId : number) {
  const itinerary = await prisma.itineraries.findUnique({
    where: { itinerary_id: itineraryId },
    include: { likes: true }, // Include the 'likes' relation
  });

  if (!itinerary) {
    throw new Error('Itinerary not found');
  }

  const totalLikes = itinerary.likes.reduce((sum, like) => sum + like.like, 0);

  return totalLikes;
}

// Calculate the total sum of all dislikes for a given itinerary
export async function getTotalLikesAndDislikesForItinerary(itineraryId: number) {
  const itinerary = await prisma.itineraries.findUnique({
    where: { itinerary_id: itineraryId },
    include: { likes: true }, // Include the 'likes' relation
  });

  if (!itinerary) {
    throw new Error('Itinerary not found');
  }

  const totalDislikes = itinerary.likes.reduce((sum, like) => sum + like.dislike, 0);

  return  totalDislikes;
}

// Update the existing like record
export async function updateLikeDislike(firebase_uuid: string, itinerary_id: number, like: number, dislike: number) {
  const existingRecord = await checkLikeDislike(firebase_uuid, itinerary_id);

  if (!existingRecord) {
    throw new Error('User has not liked or disliked this itinerary');
  }

  const updatedLikeRecord = await prisma.likes.update({
    where: {
      id: existingRecord.id,
    },
    data: {
      like: like,
      dislike: dislike,
    },
  });

  return updatedLikeRecord;
}


