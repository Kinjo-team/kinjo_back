import { Request, Response } from "express";
import { createLikes, getTotalLikes } from "../models/likes";

import { validationResult } from "express-validator";

export const addLikes = async (req: Request, res: Response) => {
  try {
    await createLikes(req.body);
    res.json({ message: "Likes added successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding likes." });
  }
};

export const fetchTotalLikes =
  (prisma: any) => async (req: Request, res: Response) => {
    try {
      const itinerary_id = parseInt(req.params.itinerary_id, 10);
      console.log("fetchTotalLikes called with itinerary_id:", itinerary_id);
      const totalLikes = await getTotalLikes(prisma, itinerary_id, "like");
      const totalDislikes = await getTotalLikes(
        prisma,
        itinerary_id,
        "dislike"
      );
      res.json({ totalLikes: totalLikes, totalDislikes: totalDislikes });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching total likes." });
    }
  };
