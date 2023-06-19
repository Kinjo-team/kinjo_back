import { Request, Response } from "express";
import { prisma } from "../server";
import { createLike, createDislike, getTotalLikesForItinerary,getTotalLikesAndDislikesForItinerary, updateLikeDislike, checkLikeDislike } from "../models/likes";

// export const addLikes = async (req: Request, res: Response) => {

//   const { itinerary_id, firebase_uuid } = req.body;
//   try {
//     const likes = await createLike( firebase_uuid, Number(itinerary_id), );
//     res.status(200).json(likes);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "An error occurred while adding likes." });
//   }
// }

// export const addDislikes = async (req: Request, res: Response) => {
//   const { itinerary_id, firebase_uuid } = req.body;

//   try {
//     const dislikes = await createDislike( firebase_uuid, Number(itinerary_id), );
//     res.status(200).json(dislikes);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while adding dislikes." });
//   }
// }

export const addLikes = async (req: Request, res: Response) => {
  const { itinerary_id, firebase_uuid } = req.body;

  try {
    const existingRecord = await checkLikeDislike(firebase_uuid, Number(itinerary_id));

    if (existingRecord) {
      if (existingRecord.like === 1) {
        // User has already liked, remove the like
        await prisma.likes.delete({
          where: { id: existingRecord.id },
        });
        res.status(200).json({ message: 'Like removed' });
      } else {
        // User has disliked, update the like
        const updatedLike = await updateLikeDislike(firebase_uuid, Number(itinerary_id), 1, 0);
        res.status(200).json(updatedLike);
      }
    } else {
      // User has not liked or disliked, create a new like
      const newLike = await createLike(firebase_uuid, Number(itinerary_id));
      res.status(200).json(newLike);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while adding likes.' });
  }
};

export const addDislikes = async (req: Request, res: Response) => {
  const { itinerary_id, firebase_uuid } = req.body;

  try {
    const existingRecord = await checkLikeDislike(firebase_uuid, Number(itinerary_id));

    if (existingRecord) {
      if (existingRecord.dislike === 1) {
        // User has already disliked, remove the dislike
        await prisma.likes.delete({
          where: { id: existingRecord.id },
        });
        res.status(200).json({ message: 'Dislike removed' });
      } else {
        // User has liked, update the dislike
        const updatedDislike = await updateLikeDislike(firebase_uuid, Number(itinerary_id), 0, 1);
        res.status(200).json(updatedDislike);
      }
    } else {
      // User has not liked or disliked, create a new dislike
      const newDislike = await createDislike(firebase_uuid, Number(itinerary_id));
      res.status(200).json(newDislike);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding dislikes.' });
  }
};



export const getLikesForItinerary = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const likes = await getTotalLikesForItinerary(Number(id));
    res.status(200).json(likes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while fetching likes." });
  }
}

export const getLikesAndDislikesForItinerary = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const likes = await getTotalLikesAndDislikesForItinerary(Number(id));
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching likes." });
  }
}
