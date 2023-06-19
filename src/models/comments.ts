import { prisma } from "../server";

// Add comment
export async function addComment(userID: string, itineraryID: number, comment: string, createdAt: Date) {
    const newComment = await prisma.comments.create({
        data: {
            firebase_uuid: userID,
            itinerary_id: itineraryID,
            comment: comment,
            createdAt: createdAt,
        },
        include: {
            user: true,
        }
    });
    return newComment;
};

// Delete comment
export async function deleteComment(userID: string, itineraryID: number) {
    const deletedComment = await prisma.comments.deleteMany({
        where: {
            firebase_uuid: userID,
            itinerary_id: itineraryID,
        },
    });
    return deletedComment;
}

// Get all comments for itinerary
export async function getComments(itineraryId: number) {
    const comments = await prisma.comments.findMany({
        where: {
            itinerary_id: itineraryId,
        },
        include: { 
            user: true,
        },
    });
    return comments;
}