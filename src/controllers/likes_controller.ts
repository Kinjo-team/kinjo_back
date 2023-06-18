import { Request, Response } from "express";
import { createLike, createDislike, getTotalLikesForItinerary,getTotalLikesAndDislikesForItinerary } from "../models/likes";

export const addLikes = async (req: Request, res: Response) => {

  const { itinerary_id, firebase_uuid } = req.body;
  try {
    const likes = await createLike( firebase_uuid, Number(itinerary_id), );
    res.status(200).json(likes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while adding likes." });
  }
}

export const addDislikes = async (req: Request, res: Response) => {
  const { itinerary_id, firebase_uuid } = req.body;

  try {
    const dislikes = await createDislike( firebase_uuid, Number(itinerary_id), );
    res.status(200).json(dislikes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding dislikes." });
  }
}

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
