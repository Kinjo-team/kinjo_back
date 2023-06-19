import { Request, Response } from "express";
import { addComment, deleteComment, getComments } from "../models/comments";

export const createComment = async (req: Request, res: Response) => {
    const comment = req.body;
    try {
        const newComment = await addComment(comment.firebase_uuid, comment.itinerary_id, comment.comment, comment.createdAt);
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to add comment to database" });
    }
}

export const deleteExistingComment = async (req: Request, res: Response) => {
    const comment = req.body;
    try {
        const deletedComment = await deleteComment(comment.firebase_uuid, comment.itinerary_id);
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json({error: "Unable to remove comment from database"});
    }
}

export const getCommentsFromItinerary = async (req: Request, res: Response) => {
    const itineraryId = Number(req.params.itineraryId);
    try {
        const comments = await getComments(itineraryId);
        res.status(200).json(comments);
    }  catch (error) {
        res.status(500).json({error: "Unable to find comments in database"});
    }
}